import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { refreshToken as doRefreshToken, logout } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const baseURL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8000";

export interface ApiEnvelope<TPayload = Record<string, unknown>> {
  message?: string;
  payload?: TPayload;
  status?: number;
  extra?: Record<string, unknown>;
}

interface RefreshPayload {
  accessToken?: string;
  refreshToken?: string;
}

export type EnvelopeResponse<TPayload = Record<string, unknown>> = Omit<
  AxiosResponse<TPayload>,
  "data"
> & {
  data: TPayload;
  payload?: TPayload;
  message?: string;
  status?: number;
  extra?: Record<string, unknown>;
};

export interface customFilterProps {
  field: string;
  filteredTerm: {
    dataType: string;
    value: string;
  };
  filterOperator: string;
}

export interface GetDataProps {
  filters?: Record<string, string>;
  page?: number;
  capacity?: number;
  customFilters?: customFilterProps[];
}

export const formatGetFilters = (
  filters: Record<string, string> = {},
  customFilters?: customFilterProps[]
) => {
  const conditions = Object.keys(filters)
    .filter((key) => filters[key])
    .map((key) => {
      return {
        field: key.replaceAll("=>", "."),
        filteredTerm: {
          dataType: "string",
          value: filters[key],
        },
        filterOperator: "stringEquals",
      };
    });

  return {
    conditions: JSON.stringify([...conditions, ...(customFilters || [])]),
  };
};

const service = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    store.dispatch(startLoading());

    const { accessToken } = (store.getState() as RootState).auth;

    if (accessToken && accessToken !== "null") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (config.headers && (config.headers as AxiosRequestHeaders).Authorization) {
      delete (config.headers as AxiosRequestHeaders).Authorization;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const fallbackMessage = "Something Went Wrong";

service.interceptors.response.use(
  async (res: AxiosResponse): Promise<AxiosResponse> => {
    store.dispatch(endLoading());

    const httpStatus = res.status;
    const apiStatus = res.data?.status;
    const effectiveStatus = typeof apiStatus === "number" ? apiStatus : httpStatus;

    const msg = res.data?.message || fallbackMessage;

    const { accessToken, refreshToken } = (store.getState() as RootState).auth || {};
    const originalRequest = res.config;

    // Handle nested 401 from API envelope (non-standard but possible)
    if (
      accessToken &&
      accessToken !== "null" &&
      refreshToken &&
      refreshToken !== "null" &&
      effectiveStatus === 401
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await service.post<ApiEnvelope<RefreshPayload>>("/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = data.payload?.accessToken;
        const newRefreshToken = data.payload?.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          store.dispatch(logout());
          return Promise.reject(new Error("Token refresh failed"));
        }

        store.dispatch(
          doRefreshToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        } as AxiosRequestHeaders;

        return service.request(originalRequest).then((r) => {
          const env = r.data as ApiEnvelope<unknown>;
          const payload = env && typeof env === "object" && "payload" in env ? env.payload : r.data;
          const augmented: EnvelopeResponse<unknown> = {
            ...r,
            data: payload,
            payload: env?.payload,
            message: env?.message,
            status: typeof env?.status === "number" ? env.status : r.status,
            extra: env?.extra || {},
          };
          return augmented;
        });
      } catch (e) {
        store.dispatch(logout());
        return Promise.reject(e);
      }
    }

    if (
      (store.getState() as RootState).auth.accessToken &&
      (store.getState() as RootState).auth.accessToken !== "null" &&
      effectiveStatus === 403
    ) {
      store.dispatch(logout());
      return Promise.reject(new Error(msg));
    }

    if ([200, 201, 202, 204].includes(effectiveStatus)) {
      return res.data as AxiosResponse;
    }

    store.dispatch(
      addNotification({
        type: "err",
        msg,
      })
    );

    return Promise.reject(new Error(msg));
  },
  (err: AxiosError<ApiEnvelope<unknown>>) => {
    store.dispatch(endLoading());

    let errMsg: string = fallbackMessage;
    const data = err.response?.data;
    if (data && typeof data === "object" && "message" in data) {
      const maybe = (data as { message?: string }).message;
      if (typeof maybe === "string") {
        errMsg = maybe;
      }
    } else if (typeof err.message === "string") {
      errMsg = err.message;
    }

    const status = err.response?.status || 0;

    if (
      (store.getState() as RootState).auth.accessToken &&
      (store.getState() as RootState).auth.accessToken !== "null" &&
      [403, 401].includes(status)
    ) {
      store.dispatch(logout());
      return Promise.reject(new Error(errMsg));
    }

    store.dispatch(
      addNotification({
        type: "err",
        msg: errMsg,
      })
    );

    return Promise.reject(new Error(errMsg));
  }
);

// Centralized typed API wrapper returning EnvelopeResponse<T>
const api = {
  get<TPayload = Record<string, unknown>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<EnvelopeResponse<TPayload>> {
    return service.get(url, config) as Promise<EnvelopeResponse<TPayload>>;
  },
  delete<TPayload = Record<string, unknown>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<EnvelopeResponse<TPayload>> {
    return service.delete(url, config) as Promise<EnvelopeResponse<TPayload>>;
  },
  post<TPayload = Record<string, unknown>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<EnvelopeResponse<TPayload>> {
    return service.post(url, data, config) as Promise<EnvelopeResponse<TPayload>>;
  },
  put<TPayload = Record<string, unknown>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<EnvelopeResponse<TPayload>> {
    return service.put(url, data, config) as Promise<EnvelopeResponse<TPayload>>;
  },
  patch<TPayload = Record<string, unknown>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<EnvelopeResponse<TPayload>> {
    return service.patch(url, data, config) as Promise<EnvelopeResponse<TPayload>>;
  },
  // expose the underlying axios instance for advanced use
  axios: service,
};

export default api;

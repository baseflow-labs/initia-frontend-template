/// <reference types="vite/client" />
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { NotificationProps } from "../types/notifications";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Store callbacks that apps will provide
interface StoreCallbacks {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  onRefreshToken: (accessToken: string, refreshToken: string) => void;
  onLogout: () => void;
  onStartLoading: () => void;
  onEndLoading: () => void;
  onAddNotification: (notification: NotificationProps) => void;
}

let storeCallbacks: StoreCallbacks | null = null;

export function initializeApiClient(callbacks: StoreCallbacks) {
  storeCallbacks = callbacks;
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
  payload: TPayload;
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
    if (storeCallbacks) {
      storeCallbacks.onStartLoading();
    }

    const accessToken = storeCallbacks?.getAccessToken();

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
    if (storeCallbacks) {
      storeCallbacks.onEndLoading();
    }

    const httpStatus = res.status;
    const apiStatus = res.data?.status;
    const effectiveStatus = typeof apiStatus === "number" ? apiStatus : httpStatus;

    const msg = res.data?.message || fallbackMessage;

    const accessToken = storeCallbacks?.getAccessToken();
    const refreshToken = storeCallbacks?.getRefreshToken();
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
          if (storeCallbacks) {
            storeCallbacks.onLogout();
          }
          return Promise.reject(new Error("Token refresh failed"));
        }

        if (storeCallbacks) {
          storeCallbacks.onRefreshToken(newAccessToken, newRefreshToken);
        }

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
        if (storeCallbacks) {
          storeCallbacks.onLogout();
        }
        return Promise.reject(e);
      }
    }

    if (accessToken && accessToken !== "null" && effectiveStatus === 403) {
      if (storeCallbacks) {
        storeCallbacks.onLogout();
      }
      return Promise.reject(new Error(msg));
    }

    if ([200, 201, 202, 204].includes(effectiveStatus)) {
      return res.data as AxiosResponse;
    }

    if (storeCallbacks) {
      storeCallbacks.onAddNotification({ type: "err", msg, id: Date.now() });
    }

    return Promise.reject(new Error(msg));
  },
  (err: AxiosError<ApiEnvelope<unknown>>) => {
    if (storeCallbacks) {
      storeCallbacks.onEndLoading();
    }

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

    const accessToken = storeCallbacks?.getAccessToken();
    if (accessToken && accessToken !== "null" && [403, 401].includes(status)) {
      if (storeCallbacks) {
        storeCallbacks.onLogout();
      }
      return Promise.reject(new Error(errMsg));
    }

    if (storeCallbacks) {
      storeCallbacks.onAddNotification({ type: "err", msg: errMsg, id: Date.now() });
    }

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

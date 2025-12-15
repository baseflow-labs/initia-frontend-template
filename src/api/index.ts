import axios, {
  AxiosError,
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

export const baseURL =
  import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8000";

export const demoStatus = import.meta.env.VITE_APP_ENVIRONMENT === "staging";

export interface customFilterProps {
  field: string;
  filteredTerm: {
    dataType: string;
    value: string;
  };
  filterOperator: string;
}

export interface GetDataProps {
  filters?: object;
  page?: number;
  capacity?: number;
  customFilters?: customFilterProps[];
}

export const formatGetFilters = (
  filters = {},
  customFilters?: customFilterProps[]
) => {
  const conditions = Object.keys(filters)
    .filter((key) => (filters as any)[key])
    .map((key) => {
      return {
        field: key.replaceAll("=>", "."),
        filteredTerm: {
          dataType: "string",
          value: (filters as any)[key],
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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.method?.toLowerCase() === "get") {
      const defaultParams = {
        page: 1,
        capacity: 999,
      };

      config.params = {
        ...defaultParams,
        ...(config.params || {}),
      };
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const fallbackMessage = "Something Went Wrong";

service.interceptors.response.use(
  async (res: AxiosResponse) => {
    store.dispatch(endLoading());

    const msg = (res.data as { message?: string })?.message || fallbackMessage;
    const { accessToken, refreshToken } =
      (store.getState() as RootState).auth || {};
    const originalRequest = res.config;

    const status = parseInt(`${res.status}`);

    if (
      accessToken &&
      accessToken !== "null" &&
      refreshToken &&
      refreshToken !== "null" &&
      status === 401
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await service.post("/auth/refresh-token", {
          refreshToken,
        });

        // adjust shape according to your API response
        const newAccessToken = data?.accessToken || data?.payload?.accessToken;
        const newRefreshToken =
          data?.refreshToken || data?.payload?.refreshToken;

        // 1) store tokens in redux
        store.dispatch(
          doRefreshToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        // 2) update Authorization header for the retried request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        } as AxiosRequestHeaders;

        // 3) retry original request
        return service(originalRequest);
      } catch (e) {
        // refresh failed -> logout and reject
        store.dispatch(logout());
        return Promise.reject(e);
      }
    }

    if (
      store.getState().auth.accessToken &&
      store.getState().auth.accessToken !== "null" &&
      status === 403
    ) {
      store.dispatch(logout());
      return Promise.reject(new Error(msg));
    }

    if ([200, 201, 202, 204].includes(status)) {
      return res.data;
    }

    store.dispatch(
      addNotification({
        type: "err",
        msg,
      })
    );

    return Promise.reject(new Error(msg));
  },
  (err: AxiosError) => {
    store.dispatch(endLoading());

    const errMsg =
      (err?.response?.data as any)?.message || err.message || fallbackMessage;

    const status = parseInt(`${err.status}`);

    if (
      store.getState().auth.accessToken &&
      store.getState().auth.accessToken !== "null" &&
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

export default service;

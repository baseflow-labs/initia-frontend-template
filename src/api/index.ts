import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";
import { t } from "i18next";
import { logout } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";

export const baseURL =
  (process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000") + "/api";

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

    const { token } = (store.getState() as RootState).auth;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const errorHandle = (res?: AxiosResponse): Promise<never> => {
  if (!res) {
    const fallbackMessage = t("Global.Errors.Something Went Wrong");

    store.dispatch(
      addNotification({
        id: 1,
        type: "error",
        message: fallbackMessage,
      })
    );
    return Promise.reject(fallbackMessage);
  }

  if (res.status === 401 || res.status === 403) {
    store.dispatch(logout());
  }

  const msg =
    (res.data as { message?: string })?.message ||
    t("Global.Errors.Something Went Wrong");

  store.dispatch(
    addNotification({
      id: 1,
      type: "error",
      message: msg,
    })
  );

  return Promise.reject(msg);
};

service.interceptors.response.use(
  (res: AxiosResponse) => {
    store.dispatch(endLoading());

    if ([200, 201, 204].includes(res.status)) {
      return res.data;
    }

    return errorHandle(res);
  },
  (err: AxiosError) => {
    store.dispatch(endLoading());

    if (err.response) {
      return errorHandle(err.response);
    }

    const fallbackMessage = t("Global.Errors.Something Went Wrong");

    store.dispatch(
      addNotification({
        id: 1,
        type: "error",
        message: fallbackMessage,
      })
    );

    return Promise.reject(fallbackMessage);
  }
);

export default service;

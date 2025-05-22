import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { logout } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";

export const baseURL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const fallbackMessage = "Something Went Wrong";

const errorHandle = (res?: AxiosResponse): Promise<never> => {
  if (!res) {
    store.dispatch(
      addNotification({
        type: "err",
        msg: fallbackMessage,
      })
    );
    return Promise.reject(fallbackMessage);
  }

  if (res.status === 401 || res.status === 403) {
    store.dispatch(logout());
  }

  const msg = (res.data as { message?: string })?.message || fallbackMessage;

  store.dispatch(
    addNotification({
      type: "err",
      msg,
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

    return { __error: true, ...res.data };
  },
  (err: AxiosError) => {
    store.dispatch(endLoading());

    console.log({ err });

    const errMsg =
      (err?.response?.data as any)?.message || err.message || fallbackMessage;

    store.dispatch(
      addNotification({
        type: "err",
        msg: errMsg,
      })
    );

    return Promise.resolve({ __error: true, message: errMsg });
  }
);

export default service;

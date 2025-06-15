import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";

export const baseURL = "https://api.mustaheq.org";

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

service.interceptors.response.use(
  (res: AxiosResponse) => {
    store.dispatch(endLoading());

    if ([200, 201, 202, 204].includes(res.status)) {
      return res.data.payload;
    }

    const msg = (res.data as { message?: string })?.message || fallbackMessage;

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

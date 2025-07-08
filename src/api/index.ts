import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { logout } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";

export const baseURL = "https://sawaed-api.mustaheq.org";

export interface GetDataProps {
  filters?: object;
}

export const formatGetFilters = (filters = {}) => {
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
    params: {
      conditions: JSON.stringify(conditions),
    },
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

    const msg = (res.data as { message?: string })?.message || fallbackMessage;

    const status = parseInt(`${res.status}`);

    if (
      store.getState().auth.token &&
      store.getState().auth.token !== "null" &&
      [403, 401].includes(status)
    ) {
      store.dispatch(logout());
      return Promise.reject(new Error(msg));
    }

    if ([200, 201, 202, 204].includes(status)) {
      return res.data.payload;
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
      store.getState().auth.token &&
      store.getState().auth.token !== "null" &&
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

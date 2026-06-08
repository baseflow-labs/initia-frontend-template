import { initializeApiClient } from "@initia/shared/api";

import { logout, refreshToken as doRefreshToken } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";

export const initializeApi = () => {
  initializeApiClient({
    getAccessToken: () => (store.getState() as RootState).auth.accessToken || null,
    getRefreshToken: () => (store.getState() as RootState).auth.refreshToken || null,
    onRefreshToken: (accessToken: string, refreshToken: string) => {
      store.dispatch(doRefreshToken({ accessToken, refreshToken }));
    },
    onLogout: () => {
      store.dispatch(logout());
    },
    onStartLoading: () => {
      store.dispatch(startLoading());
    },
    onEndLoading: () => {
      store.dispatch(endLoading());
    },
    onAddNotification: (notification) => {
      store.dispatch(addNotification(notification));
    },
  });
};

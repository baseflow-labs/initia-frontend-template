import { initializeApiClient } from "@initia/shared/api";
import { logout, refreshToken as doRefreshToken } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification, NotificationProps } from "@initia/shared/types/notifications.js";
import store, { RootState } from "../store/store";

// Initialize the shared API client with user-app's store
export function initializeApi() {
  initializeApiClient({
    getAccessToken: () => {
      const state = store.getState() as RootState;
      return state.auth.accessToken || null;
    },
    getRefreshToken: () => {
      const state = store.getState() as RootState;
      return state.auth.refreshToken || null;
    },
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
    onAddNotification: (notification: NotificationProps) => {
      store.dispatch(addNotification(notification));
    },
  });
}

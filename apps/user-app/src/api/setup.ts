import { initializeApiClient } from "@initia/shared/api";
import { addNotification, NotificationProps } from "@initia/shared/types/notifications.js";

import { logout, refreshToken as doRefreshToken } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import store, { RootState } from "../store/store";
import { logActivity } from "../utils/activityLogger";

// Initialize the shared API client with user-app's store
export function initializeApi() {
  initializeApiClient({
    appId: "user-app",
    firebase: {
      realtimeDbUrl: import.meta.env.VITE_FIREBASE_RTDB_URL || "",
      databaseSecret: import.meta.env.VITE_FIREBASE_DATABASE_SECRET,
      permissionsCollection: import.meta.env.VITE_FIREBASE_PERMISSIONS_COLLECTION || "permissions",
      dataRootPath: import.meta.env.VITE_FIREBASE_DATA_ROOT || "api",
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      storageAuthToken: import.meta.env.VITE_FIREBASE_STORAGE_AUTH_TOKEN,
    },
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
    onApiError: (status: number, url: string, message: string) => {
      logActivity({
        level: "error",
        message: `API error ${status}: ${message}`,
        context: "api",
        meta: { url, status },
      });
    },
  });
}

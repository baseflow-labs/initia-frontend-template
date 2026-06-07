import { initializeApiClient } from "@initia/shared/api";

import { logout, refreshToken as doRefreshToken } from "../store/actions/auth";
import { endLoading, startLoading } from "../store/actions/loading";
import { addNotification } from "../store/actions/notifications";
import store, { RootState } from "../store/store";

export function initializeApi() {
  initializeApiClient({
    appId: "user-mobile-app",
    firebase: {
      realtimeDbUrl: import.meta.env.VITE_FIREBASE_RTDB_URL || "",
      databaseSecret: import.meta.env.VITE_FIREBASE_DATABASE_SECRET,
      permissionsCollection: import.meta.env.VITE_FIREBASE_PERMISSIONS_COLLECTION || "permissions",
      dataRootPath: import.meta.env.VITE_FIREBASE_DATA_ROOT || "api",
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      storageAuthToken: import.meta.env.VITE_FIREBASE_STORAGE_AUTH_TOKEN,
    },
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
}

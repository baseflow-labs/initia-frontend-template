import { setAnalysisProvider } from "@initia/analysis";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { Provider, useDispatch } from "react-redux";
import { getMyRolePermissions } from "@initia/shared/api/users/permissions";

import AppNavigator from "./src/navigation/AppNavigator";
import { initializeApi } from "./src/api/setup";
import i18n from "./src/i18n";
import store from "./src/store/store";
import { useAppSelector } from "./src/store/hooks";
import { setPermissions } from "./src/store/actions/auth";

function AppBootstrap() {
  const dispatch = useDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(accessToken && accessToken !== "null");

  useEffect(() => {
    if (!isAuthenticated) return;

    getMyRolePermissions()
      .then((res: Record<string, unknown>) => {
        const perms = (res?.payload as { action: string; table: string }[]) ?? [];
        dispatch(setPermissions(perms.map(({ action, table }) => ({ action, table })) as never));
      })
      .catch(() => {
        dispatch(setPermissions([] as never));
      });
  }, [dispatch, isAuthenticated]);

  return <AppNavigator />;
}

export default function App() {
  useEffect(() => {
    initializeApi();
    setAnalysisProvider({
      name: "mobile-debug",
      initialize: () => undefined,
      trackEvent: (eventName, payload) => {
        console.log("[analysis]", eventName, payload || {});
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StatusBar style="dark" />
        <AppBootstrap />
      </I18nextProvider>
    </Provider>
  );
}

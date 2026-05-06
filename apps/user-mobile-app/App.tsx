import { setAnalysisProvider } from "@initia/analysis";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import AppNavigator from "./src/navigation/AppNavigator";
import i18n from "./src/i18n";
import store from "./src/store/store";

export default function App() {
  useEffect(() => {
    setAnalysisProvider({
      name: "mobile-debug",
      initialize: () => undefined,
      trackEvent: (eventName, payload) => {
        console.log("[analysis]", eventName, payload || {});
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StatusBar style="dark" />
        <AppNavigator />
      </I18nextProvider>
    </Provider>
  );
}

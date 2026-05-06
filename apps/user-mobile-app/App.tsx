import { setAnalysisProvider } from "@initia/analysis";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "./src/navigation/AppNavigator";

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
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}

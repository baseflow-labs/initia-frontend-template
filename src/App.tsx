import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";

import NotificationsToaster from "./components/toaster";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { fontSize } = useAppSelector((state) => state.settings);
  const { i18n } = useTranslation();

  document.documentElement.dir = i18n.dir();
  document.documentElement.lang = i18n.language;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--base-font-size",
      fontSize + "px"
    );
  }, [fontSize]);

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <NotificationsToaster />

        <Routes>
          {token !== "null" ? (
            <Route path="*" element={<AuthLayout />} />
          ) : (
            <Route path="*" element={<PublicLayout />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

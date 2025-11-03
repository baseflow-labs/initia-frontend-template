import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import * as MetadataApi from "./api/metadata";
import Spinner from "./components/core/spinner";
import NotificationsToaster from "./components/toaster";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { setMetadata } from "./store/actions/settings";
import { useAppSelector } from "./store/hooks";
import { apiCatchGlobalHandler } from "./utils/function";

const App = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    MetadataApi.get()
      .then((res: any) => {
        dispatch(
          setMetadata({
            ...res.payload,
            logo:
              (res.payload.logo && res.payload.logo[0].path) ||
              "/samples/logo.png",
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
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

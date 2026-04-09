import Spinner from "@initia/shared/ui/components/core/spinner";
import NotificationsToaster from "@initia/shared/ui/components/toaster";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import * as MetadataApi from "./api/metadata";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { setMetadata } from "./store/actions/settings";
import { useAppSelector } from "./store/hooks";
import { apiCatchGlobalHandler } from "./utils/function";
import { useDirectionHandler } from "./utils/useDirectionHandler";

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { fontSize, theme, layoutWidth, layoutMode, primaryColor, secondaryColor } = useAppSelector(
    (state) => state.settings
  );
  const isAuthenticated = Boolean(accessToken && accessToken !== "null");

  // Handle RTL/LTR direction changes
  useDirectionHandler();

  // Apply theme and layout CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty("--base-font-size", fontSize + "px");
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-layout", layoutWidth);
    document.documentElement.setAttribute("data-layout-mode", layoutMode);
    document.documentElement.style.setProperty("--theme-primary", primaryColor);
    document.documentElement.style.setProperty("--theme-secondary", secondaryColor);
  }, [fontSize, theme, layoutWidth, layoutMode, primaryColor, secondaryColor]);

  useEffect(() => {
    MetadataApi.get()
      .then((res) => {
        dispatch(setMetadata(res.payload));
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  return (
    <div
      className="max-vw-100 overflow-x-hidden"
      style={{
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <NotificationsToaster />

          <Routes>
            {isAuthenticated ? (
              <Route path="*" element={<AuthLayout />} />
            ) : (
              <Route path="*" element={<PublicLayout />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;

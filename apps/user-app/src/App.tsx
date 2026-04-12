import Spinner from "@initia/shared/ui/components/core/spinner";
import NotificationsToaster from "@initia/shared/ui/components/toaster";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import * as MetadataApi from "./api/metadata";
import * as PermissionsApi from "./api/users/permissions";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { setMetadata } from "./store/actions/settings";
import { setPermissions } from "./store/actions/auth";
import { useAppSelector } from "./store/hooks";
import { apiCatchGlobalHandler } from "./utils/function";
import { useDirectionHandler } from "./utils/useDirectionHandler";
import { logActivity } from "./utils/activityLogger";

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
    const metadataColor = localStorage.getItem("defaultThemeColor");
    document.documentElement.style.setProperty("--theme-primary", metadataColor || primaryColor);
    document.documentElement.style.setProperty("--theme-secondary", secondaryColor);
  }, [fontSize, theme, layoutWidth, layoutMode, primaryColor, secondaryColor]);

  useEffect(() => {
    MetadataApi.get()
      .then((res) => {
        dispatch(setMetadata(res.payload));
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  // Fetch and store the current user's role permissions whenever they log in
  useEffect(() => {
    if (!isAuthenticated) return;
    PermissionsApi.getMyRolePermissions()
      .then((res: Record<string, unknown>) => {
        const perms = (res?.payload as { action: string; table: string }[]) ?? [];
        dispatch(setPermissions(perms.map(({ action, table }) => ({ action, table }))));
      })
      .catch(apiCatchGlobalHandler);
  }, [isAuthenticated]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      logActivity({
        level: "error",
        message: event.message || "Unhandled window error",
        context: "window.onerror",
        stack: event.error?.stack,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as Error | string | undefined;
      logActivity({
        level: "error",
        message:
          typeof reason === "string" ? reason : reason?.message || "Unhandled promise rejection",
        context: "window.onunhandledrejection",
        stack: typeof reason === "string" ? undefined : reason?.stack,
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
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

export type BackendTarget = "app" | "firebase";

export type FrontendAppId =
  | "admin-app"
  | "user-app"
  | "user-mobile-app"
  | "landing-page"
  | "help-center"
  | "documentation";

// Single hard-coded switchboard for backend target selection across all frontend apps.
const APP_BACKEND_TARGETS: Record<FrontendAppId, BackendTarget> = {
  "admin-app": "app",
  "user-app": "app",
  "user-mobile-app": "app",
  "landing-page": "app",
  "help-center": "app",
  documentation: "app",
};

export function getAppBackendTarget(appId?: FrontendAppId): BackendTarget {
  if (!appId) {
    return "app";
  }

  return APP_BACKEND_TARGETS[appId] || "app";
}

export function getAppBackendTargets(): Readonly<Record<FrontendAppId, BackendTarget>> {
  return APP_BACKEND_TARGETS;
}

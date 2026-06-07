import { getAppBackendTarget, type FrontendAppId } from "./backendTarget";
import { FirebaseMiddlewareConfig, handleFirebaseApiRequest } from "./firebaseMiddleware";

export interface PublicBridgeConfig {
  appId: FrontendAppId;
  appBaseUrl: string;
  firebase?: FirebaseMiddlewareConfig;
  defaultHeaders?: Record<string, string>;
}

export interface PublicBridgeRequest {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
}

function stripSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function toQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) {
    return "";
  }

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    search.append(key, String(value));
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

export function createPublicApiBridge(config: PublicBridgeConfig) {
  const mode = getAppBackendTarget(config.appId);
  const normalizedBase = config.appBaseUrl.replace(/\/+$/, "");

  return {
    async request<T = unknown>(request: PublicBridgeRequest): Promise<T> {
      const method = request.method || "GET";
      const endpoint = `/${stripSlashes(request.endpoint)}`;
      const query = toQuery(request.params);

      if (mode === "firebase") {
        if (!config.firebase) {
          throw new Error("Firebase mode is enabled for this app but firebase config is missing");
        }

        const envelope = await handleFirebaseApiRequest({
          appId: config.appId,
          method,
          url: `${endpoint}${query}`,
          params: request.params as Record<string, unknown> | undefined,
          data: request.body,
          headers: request.headers,
          firebase: config.firebase,
        });

        const payload =
          envelope && typeof envelope === "object" && "payload" in envelope
            ? (envelope.payload as T)
            : (envelope as T);

        return payload;
      }

      const response = await fetch(`${normalizedBase}${endpoint}${query}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(config.defaultHeaders || {}),
          ...(request.headers || {}),
        },
        body: request.body === undefined ? undefined : JSON.stringify(request.body),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    },
  };
}

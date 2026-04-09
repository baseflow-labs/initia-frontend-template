import { baseURL } from "@/api";

type ActivityLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";

interface ActivityLogPayload {
  level?: ActivityLevel;
  message: string;
  context?: string;
  stack?: string;
  meta?: Record<string, unknown>;
}

export const logActivity = (payload: ActivityLogPayload) => {
  const url = `${baseURL}/logging`;
  const body = JSON.stringify({
    level: payload.level || "info",
    message: payload.message,
    context: payload.context || "user-app",
    stack: payload.stack,
    meta: {
      app: "user-app",
      ...payload.meta,
    },
  });

  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }

    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Do not break user flow if logging fails
  }
};

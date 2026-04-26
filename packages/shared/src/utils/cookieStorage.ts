type SameSite = "Strict" | "Lax" | "None";

export interface SetCookieOptions {
  path?: string;
  maxAgeSeconds?: number;
  expires?: Date;
  secure?: boolean;
  sameSite?: SameSite;
}

const isBrowser = () => typeof document !== "undefined";

export const getCookie = (name: string): string | null => {
  if (!isBrowser()) return null;

  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = cookie.slice(0, separatorIndex);
    if (key !== encodedName) continue;

    const value = cookie.slice(separatorIndex + 1);
    return decodeURIComponent(value);
  }

  return null;
};

export const setCookie = (name: string, value: string, options: SetCookieOptions = {}) => {
  if (!isBrowser()) return;

  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

  if (options.maxAgeSeconds !== undefined) {
    parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAgeSeconds))}`);
  }

  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`);
  }

  parts.push(`Path=${options.path || "/"}`);
  parts.push(`SameSite=${options.sameSite || "Lax"}`);

  if (options.secure ?? window.location.protocol === "https:") {
    parts.push("Secure");
  }

  document.cookie = parts.join("; ");
};

export const removeCookie = (name: string, path = "/") => {
  setCookie(name, "", { path, maxAgeSeconds: 0 });
};

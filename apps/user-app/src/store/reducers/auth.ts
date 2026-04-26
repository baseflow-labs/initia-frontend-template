import type { UserProps } from "@initia/shared/types/auth";
import { getCookie, removeCookie, setCookie } from "@initia/shared/utils/cookieStorage";

export interface PermissionEntry {
  action: string;
  table: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProps;
  permissions: PermissionEntry[];
}

export type AuthAction =
  | {
      type: "login";
      resp: { accessToken: string; refreshToken: string; user: UserProps };
    }
  | {
      type: "refreshToken";
      resp: { accessToken: string; refreshToken: string };
    }
  | { type: "logout"; resp?: string }
  | { type: "updateUserStatus"; resp?: string }
  | { type: "setPermissions"; resp: PermissionEntry[] }
  | { type: "updateUserProfile"; user: Partial<UserProps> };

const getStoredValue = (key: "accessToken" | "refreshToken" | "user") => {
  const cookieValue = getCookie(key);
  if (cookieValue && !["null", "undefined", ""].includes(cookieValue)) return cookieValue;

  const localValue = localStorage.getItem(key);
  if (localValue && !["null", "undefined", ""].includes(localValue)) {
    setCookie(key, localValue);
    localStorage.removeItem(key);
    return localValue;
  }

  return null;
};

const storedAccessToken = getStoredValue("accessToken");
const storedRefreshToken = getStoredValue("refreshToken");
const storedUser = getStoredValue("user");

const initialState: AuthState = {
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  user: storedUser?.length ? JSON.parse(storedUser) : {},
  permissions: [],
};

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "login": {
      setCookie("accessToken", action.resp.accessToken);
      setCookie("refreshToken", action.resp.refreshToken);
      setCookie("user", JSON.stringify(action.resp.user));
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
        permissions: [],
      };
    }

    case "refreshToken": {
      setCookie("accessToken", action.resp.accessToken);
      setCookie("refreshToken", action.resp.refreshToken);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: state.user,
        permissions: state.permissions,
      };
    }

    case "logout": {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.assign(action.resp || "/");

      return {
        accessToken: null,
        refreshToken: null,
        user: { role: "" },
        permissions: [],
      };
    }

    case "updateUserStatus": {
      const currentUser = JSON.parse(getCookie("user") || "{}");

      const newUser = { ...currentUser, status: "In Preview" };

      setCookie("user", JSON.stringify(newUser));
      localStorage.removeItem("user");

      return {
        ...state,
        user: newUser,
      };
    }

    case "setPermissions": {
      return {
        ...state,
        permissions: action.resp,
      };
    }

    case "updateUserProfile": {
      const updatedUser = { ...state.user, ...action.user };
      setCookie("user", JSON.stringify(updatedUser));
      localStorage.removeItem("user");
      return { ...state, user: updatedUser };
    }

    default:
      return state;
  }
};

export default auth;

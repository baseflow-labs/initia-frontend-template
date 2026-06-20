import type { UserProps } from "@initia/shared/types/auth";
import { getCookie, removeCookie, setCookie } from "@initia/shared/utils/cookieStorage";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProps;
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
  | { type: "updateUserStatus"; resp?: string };

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
};

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "login": {
      setCookie("accessToken", action.resp.accessToken);
      setCookie("refreshToken", action.resp.refreshToken);
      setCookie("user", JSON.stringify(action.resp.user));

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
      };
    }

    case "refreshToken": {
      setCookie("accessToken", action.resp.accessToken);
      setCookie("refreshToken", action.resp.refreshToken);

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: state.user,
      };
    }

    case "logout": {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // window.location.assign(action.resp || "/");

      return {
        accessToken: null,
        refreshToken: null,
        user: { role: "" },
      };
    }

    case "updateUserStatus": {
      const currentUser = JSON.parse(getCookie("user") || "{}");

      const newUser = { ...currentUser, status: "In Preview" };

      setCookie("user", JSON.stringify(newUser));

      return {
        ...state,
        user: newUser,
      };
    }

    default:
      return state;
  }
};

export default auth;

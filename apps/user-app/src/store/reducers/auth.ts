import type { UserProps } from "@initia/shared/types/auth";

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
  | { type: "setPermissions"; resp: PermissionEntry[] };

const initialState: AuthState = {
  accessToken: ["null", "undefined", ""].includes(localStorage.getItem("accessToken") || "")
    ? null
    : localStorage.getItem("accessToken"),
  refreshToken: ["null", "undefined", ""].includes(localStorage.getItem("refreshToken") || "")
    ? null
    : localStorage.getItem("refreshToken"),
  user: localStorage.getItem("user")?.length ? JSON.parse(localStorage.getItem("user")!) : {},
  permissions: [],
};

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("accessToken", action.resp.accessToken);
      localStorage.setItem("refreshToken", action.resp.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.resp.user));

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
        permissions: [],
      };
    }

    case "refreshToken": {
      localStorage.setItem("accessToken", action.resp.accessToken);
      localStorage.setItem("refreshToken", action.resp.refreshToken);

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: state.user,
        permissions: state.permissions,
      };
    }

    case "logout": {
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
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

      const newUser = { ...currentUser, status: "In Preview" };

      localStorage.setItem("user", JSON.stringify(newUser));

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

    default:
      return state;
  }
};

export default auth;

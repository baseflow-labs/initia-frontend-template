import { UserProps } from "../actions/auth";

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

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: localStorage.getItem("user")?.length ? JSON.parse(localStorage.getItem("user")!) : {},
};

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("accessToken", action.resp.accessToken);
      localStorage.setItem("user", JSON.stringify(action.resp.user));

      // window.location.assign("/dashboard");

      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
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
      };
    }

    case "logout": {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      window.location.assign(action.resp || "/");

      return {
        accessToken: null,
        refreshToken: null,
        user: { role: "" },
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

    default:
      return state;
  }
};

export default auth;

import { UserProps } from "../actions/auth";

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: UserProps;
}

export type AuthAction =
  | {
      type: "login";
      resp: { jwt: string; refreshToken: string; user: UserProps };
    }
  | { type: "logout" };

const initialState: AuthState = {
  token: localStorage.getItem("token") || "null",
  refreshToken: localStorage.getItem("refreshToken") || "null",
  user: localStorage.getItem("user")?.length
    ? JSON.parse(localStorage.getItem("user")!)
    : {},
};

const auth = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "login": {
      localStorage.setItem("token", action.resp.jwt);
      localStorage.setItem("refreshToken", action.resp.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.resp.user));

      return {
        token: action.resp.jwt,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
      };
    }

    case "logout": {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      return {
        token: null,
        refreshToken: null,
        user: {},
      };
    }

    default:
      return state;
  }
};

export default auth;

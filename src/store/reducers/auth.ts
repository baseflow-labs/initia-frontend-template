import { UserProps } from "../actions/auth";

export interface AuthState {
  token: string | null;
  user: UserProps;
}

export type AuthAction =
  | {
      type: "login";
      resp: { jwt: string; user: UserProps };
    }
  | { type: "logout"; resp?: string }
  | { type: "updateBeneficiaryStatus"; resp?: string };

const initialState: AuthState = {
  token: localStorage.getItem("token") || "null",
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
      localStorage.setItem("user", JSON.stringify(action.resp.user));

      // window.location.assign("/dashboard");

      return {
        token: action.resp.jwt,
        user: action.resp.user,
      };
    }

    case "logout": {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.assign(action.resp || "/");

      return {
        token: null,
        user: { role: "" },
      };
    }

    case "updateBeneficiaryStatus": {
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

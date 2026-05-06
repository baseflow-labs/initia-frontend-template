import { AuthState } from "../types";

export type AuthAction =
  | { type: "login"; resp: { accessToken: string; refreshToken: string; user: AuthState["user"] } }
  | { type: "refreshToken"; resp: { accessToken: string; refreshToken: string } }
  | { type: "logout" }
  | { type: "setPermissions"; resp: AuthState["permissions"] }
  | { type: "updateUserProfile"; user: Partial<AuthState["user"]> };

export const createAuthInitialState = (partial?: Partial<AuthState>): AuthState => ({
  accessToken: partial?.accessToken ?? null,
  refreshToken: partial?.refreshToken ?? null,
  user: partial?.user ?? ({ role: "" } as AuthState["user"]),
  permissions: partial?.permissions ?? [],
});

export const authReducer = (
  state: AuthState = createAuthInitialState(),
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "login":
      return {
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
        user: action.resp.user,
        permissions: [],
      };
    case "refreshToken":
      return {
        ...state,
        accessToken: action.resp.accessToken,
        refreshToken: action.resp.refreshToken,
      };
    case "logout":
      return createAuthInitialState();
    case "setPermissions":
      return { ...state, permissions: action.resp };
    case "updateUserProfile":
      return { ...state, user: { ...state.user, ...action.user } };
    default:
      return state;
  }
};

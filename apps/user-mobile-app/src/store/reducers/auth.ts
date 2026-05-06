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
  | { type: "login"; resp: { accessToken: string; refreshToken: string; user: UserProps } }
  | { type: "refreshToken"; resp: { accessToken: string; refreshToken: string } }
  | { type: "logout" }
  | { type: "setPermissions"; resp: PermissionEntry[] }
  | { type: "updateUserProfile"; user: Partial<UserProps> };

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: { role: "" },
  permissions: [],
};

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
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
      return { ...initialState, user: { role: "" } };
    case "setPermissions":
      return { ...state, permissions: action.resp };
    case "updateUserProfile":
      return { ...state, user: { ...state.user, ...action.user } };
    default:
      return state;
  }
};

export default auth;

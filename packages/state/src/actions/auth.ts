import { AuthState } from "../types";

export const login = (resp: {
  token: string;
  refreshToken?: string;
  user?: AuthState["user"];
}) => ({
  type: "login" as const,
  resp: {
    accessToken: resp.token,
    refreshToken: resp.refreshToken || "",
    user: resp.user || ({ role: "" } as AuthState["user"]),
  },
});

export const refreshToken = (resp: { accessToken: string; refreshToken: string }) => ({
  type: "refreshToken" as const,
  resp,
});

export const logout = () => ({ type: "logout" as const });

export const setPermissions = (resp: AuthState["permissions"]) => ({
  type: "setPermissions" as const,
  resp,
});

export const updateUserProfile = (user: Partial<AuthState["user"]>) => ({
  type: "updateUserProfile" as const,
  user,
});

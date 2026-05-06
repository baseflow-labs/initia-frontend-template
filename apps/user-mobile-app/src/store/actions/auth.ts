import type { AuthResponse, RefreshTokenResponse, UserProps } from "@initia/shared/types/auth";

import type { PermissionEntry } from "../reducers/auth";

export const login = (resp: AuthResponse) => ({
  type: "login" as const,
  resp: {
    accessToken: resp.token,
    refreshToken: resp.refreshToken,
    user: resp.user || { id: "", role: "" },
  },
});

export const refreshToken = (resp: RefreshTokenResponse) => ({
  type: "refreshToken" as const,
  resp: {
    accessToken: resp.accessToken,
    refreshToken: resp.refreshToken,
  },
});

export const logout = () => ({ type: "logout" as const });

export const setPermissions = (resp: PermissionEntry[]) => ({
  type: "setPermissions" as const,
  resp,
});

export const updateUserProfile = (user: Partial<UserProps>) => ({
  type: "updateUserProfile" as const,
  user,
});

import type { AuthResponse, RefreshTokenResponse } from "@initia/shared/types/auth";

export const login = (resp: AuthResponse) => ({
  type: "login" as const,
  resp: {
    accessToken: resp.token,
    refreshToken: resp.refreshToken,
    user: resp.user || {
      id: "1",
      name: "Suhaib Ahmad",
      email: "SuhaibAhmadAi@hotmail.com",
    },
  },
});

export const refreshToken = (resp: RefreshTokenResponse) => ({
  type: "refreshToken" as const,
  resp: {
    accessToken: resp.accessToken,
    refreshToken: resp.refreshToken,
  },
});

export const logout = (resp?: string) => ({
  type: "logout" as const,
  resp,
});

export const updateUserStatus = () => ({
  type: "updateUserStatus" as const,
});

export interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  status?: string;
  role: string;
  avatar?: string;
  image?: string;
  // [key: string]: any;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProps;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = (resp: AuthResponse) => ({
  type: "login" as const,
  resp: {
    accessToken: resp.accessToken,
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

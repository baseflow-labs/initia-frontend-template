export interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  // [key: string]: any;
}

export interface AuthResponse {
  token: string;
  user: UserProps;
}

export const login = (resp: AuthResponse) => ({
  type: "login" as const,
  resp: {
    jwt: resp.token,
    refreshToken: "thisIsFakeRefreshToken",
    user: resp.user || {
      id: "1",
      name: "Suhaib Ahmad",
      email: "SuhaibAhmadAi@hotmail.com",
    },
  },
});

export const logout = () => ({
  type: "logout" as const,
});

export interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  // [key: string]: any;
}

export interface AuthResponse {
  jwt: string;
  refreshToken: string;
  user: UserProps;
}

export const login = (resp: AuthResponse) => ({
  type: "login" as const,
  resp,
});

export const logout = () => ({
  type: "logout" as const,
});

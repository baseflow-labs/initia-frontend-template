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
  token: string;
  refreshToken: string;
  user: UserProps;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

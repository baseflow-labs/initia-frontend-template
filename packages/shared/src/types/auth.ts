// ===== USER TYPES =====
export interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  status?: string;
  role: string;
  avatar?: string;
  image?: string;
}

// ===== AUTH RESPONSE TYPES =====
export interface AuthResponse {
  token: string;
  user: UserProps;
  refreshToken?: string; // Optional for backward compatibility
}

export interface LoginResponse {
  status: number;
  message: string;
  payload: {
    token: string;
    user: UserProps;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  status: number;
  message: string;
  payload: Record<string, unknown>;
}

// ===== AUTH REQUEST TYPES =====
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  email: string;
  newPassword: string;
  token: string;
}

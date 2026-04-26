import api, { EnvelopeResponse } from "../";
import type { AuthResponse } from "../../types/auth";

export interface loginCredentials {
  email: string;
  password: string;
}

export type OAuthProvider = "google" | "apple" | "microsoft";

export interface OAuthLoginPayload {
  provider: OAuthProvider;
  idToken?: string;
  accessToken?: string;
  emailHint?: string;
  nameHint?: string;
  avatarHint?: string;
}

export interface registerProps {
  email: string;
  username?: string;
  password: string;
  passwordConfirmation: string;
}

interface resetPasswordProps {
  email: string;
  newPassword: string;
  token: string;
}

const mainPath = "/auth";

const login = async (credentials: loginCredentials): Promise<EnvelopeResponse<AuthResponse>> => {
  return await api.post<AuthResponse>(mainPath + "/login", credentials);
};

const oauthLogin = async (payload: OAuthLoginPayload): Promise<EnvelopeResponse<AuthResponse>> => {
  return await api.post<AuthResponse>(mainPath + "/oauth/login", payload);
};

const logout = async (email: string) => {
  return await api.post(mainPath + "/logout", { email });
};

const requestPasswordReset = async (email: string) => {
  return await api.get(mainPath + "/passwordRequest", {
    params: { identifier: email },
  });
};

const resetPassword = async (resetPasswordData: resetPasswordProps) => {
  return await api.post(mainPath + "/passwordReset", resetPasswordData);
};

const resetMyPassword = async (resetPasswordData: object) => {
  return await api.post(mainPath + "/myPasswordReset", resetPasswordData);
};

const isAuthorized = async () => {
  return await api.get(mainPath + "/isAuth");
};

const register = async (userData: registerProps) => {
  return await api.post("/user", userData);
};

export {
  isAuthorized,
  login,
  oauthLogin,
  logout,
  register,
  requestPasswordReset,
  resetMyPassword,
  resetPassword,
};

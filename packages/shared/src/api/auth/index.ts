import api, { EnvelopeResponse, baseURL } from "../";
import type { AuthResponse } from "../../types/auth";

export interface loginCredentials {
  email: string;
  password: string;
}

export type OAuthProvider = "google" | "apple" | "microsoft";
export type AuthProvider = "email" | OAuthProvider;

export interface OAuthLoginPayload {
  provider: OAuthProvider;
  idToken?: string;
  accessToken?: string;
  emailHint?: string;
  nameHint?: string;
  avatarHint?: string;
}

export interface OAuthProviderState {
  provider: AuthProvider;
  enabled: boolean;
}

export interface OAuthProvidersConfigPayload {
  providers: OAuthProviderState[];
  enabledProviders: OAuthProvider[];
  emailLoginEnabled: boolean;
  registrationEnabled: boolean;
}

export interface OAuthPopupMessage {
  source: "initia-oauth";
  success: boolean;
  provider: OAuthProvider;
  payload?: AuthResponse;
  message?: string;
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

const getOAuthProvidersConfig = async (): Promise<
  EnvelopeResponse<OAuthProvidersConfigPayload>
> => {
  return await api.get<OAuthProvidersConfigPayload>(mainPath + "/oauth/providers");
};

const getOAuthAdminProvidersConfig = async (): Promise<EnvelopeResponse<OAuthProviderState[]>> => {
  return await api.get<OAuthProviderState[]>(mainPath + "/oauth/admin/providers");
};

const updateOAuthAdminProvidersConfig = async (
  providers: OAuthProviderState[],
  registrationEnabled?: boolean
): Promise<EnvelopeResponse<OAuthProviderState[]>> => {
  return await api.put<OAuthProviderState[]>(mainPath + "/oauth/admin/providers", {
    providers,
    registrationEnabled,
  });
};

const getOAuthPopupStartUrl = (provider: OAuthProvider, origin: string) => {
  const params = new URLSearchParams({ origin });
  return `${baseURL}${mainPath}/oauth/${provider}/start?${params.toString()}`;
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
  getOAuthProvidersConfig,
  getOAuthAdminProvidersConfig,
  updateOAuthAdminProvidersConfig,
  getOAuthPopupStartUrl,
  oauthLogin,
  logout,
  register,
  requestPasswordReset,
  resetMyPassword,
  resetPassword,
};

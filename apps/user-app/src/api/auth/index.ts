import type { AuthResponse } from "@initia/shared/types/auth";

import api, { EnvelopeResponse } from "../";

export interface loginCredentials {
  identifier: string;
  password: string;
}

export interface registerProps {
  identifier: string;
  username?: string;
  password: string;
  passwordConfirmation: string;
  code: string;
}

interface resetPasswordProps {
  identifier: string;
  password: string;
  passwordConfirmation: string;
  code: string;
}

const mainPath = "/auth";

const login = async (credentials: loginCredentials): Promise<EnvelopeResponse<AuthResponse>> => {
  return await api.post<AuthResponse>(mainPath + "/login", credentials);
};

// const logout = async () => {
//   return await api.post(mainPath + "/logout");
// };

const otpSend = async (identifier: string) => {
  return await api.post(mainPath + "/otp", { identifier });
};

const requestPasswordReset = async (identifier: string) => {
  return await api.get(mainPath + "/passwordRequest", {
    params: { identifier },
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
  otpSend,
  register,
  requestPasswordReset,
  //  logout,
  resetMyPassword,
  resetPassword,
};

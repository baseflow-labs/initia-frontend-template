import api from "../";

export interface loginCredentials {
  identifier: string;
  password: string;
}

interface registerProps {
  identifier: string;
  password: string;
}

interface resetPasswordProps {
  identifier: string;
  newPassword: string;
  newPasswordConfirmation: string;
  token: string;
}

const mainPath = "/auth";

const login = async (credentials: loginCredentials) => {
  return await api.post(mainPath + "/login", credentials);
};

// const logout = async () => {
//   return await api.post(mainPath + "/logout");
// };

const otpResend = async (identifier: string) => {
  return await api.post(mainPath + "/otp", identifier);
};

const requestPasswordReset = async (identifier: string) => {
  return await api.get(mainPath + "/passwordRequest", { params: identifier });
};

const resetPassword = async (resetPasswordData: resetPasswordProps) => {
  return await api.post(mainPath + "/passwordReset", resetPasswordData);
};

const isAuthorized = async () => {
  return await api.get(mainPath + "/isAuth");
};

const register = async (userData: registerProps) => {
  return await api.post("/user");
};

export {
  login,
  otpResend,
  requestPasswordReset,
  resetPassword,
  //  logout,
  isAuthorized,
  register,
};

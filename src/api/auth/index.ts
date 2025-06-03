import api from "../";

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

const login = async (credentials: loginCredentials) => {
  return await api.post(mainPath + "/login", credentials);
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

const isAuthorized = async () => {
  return await api.get(mainPath + "/isAuth");
};

const register = async (userData: registerProps) => {
  return await api.post("/user", userData);
};

export {
  login,
  otpSend,
  requestPasswordReset,
  resetPassword,
  //  logout,
  isAuthorized,
  register,
};

export const getPasswordResetSettingInputs = (t: Function) => [
  {
    type: "password",
    name: "oldPassword",
    minLength: 8,
    label: t("Public.ForgotPassword.ResetPassword.OldPassword"),
    required: true,
    fullWidth: true,
  },
  {
    type: "password",
    name: "password",
    minLength: 8,
    label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
    required: true,
    double: true
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
    required: true,
    double: true
  },
];
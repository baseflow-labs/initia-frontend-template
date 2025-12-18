export const formInputs = (t: Function) => [
  {
    type: "password",
    name: "password",
    label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
    required: true,
    fullWidth: true
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
    required: true,
    fullWidth: true
  },
];

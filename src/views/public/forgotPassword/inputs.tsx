export const forgotInputs = (t: Function) => [
  {
    type: "phoneNumber",
    name: "identifier",
    label: t("Public.Register.Labels.PhoneNo"),
    required: true,
    fullWidth: true
  },
];

export const resetInputs = (t: Function) => [
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

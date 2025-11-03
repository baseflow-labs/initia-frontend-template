export const forgotInputs = (t: Function) => [
  {
    type: "phoneNumber",
    name: "identifier",
    label: t("Public.Register.Labels.PhoneNo"),
    required: true,
  },
];

export const resetInputs = (t: Function) => [
  {
    type: "password",
    name: "password",
    label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
    required: true,
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
    required: true,
  },
];

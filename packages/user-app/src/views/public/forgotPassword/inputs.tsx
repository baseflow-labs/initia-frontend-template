import { TFunction } from "i18next";

export const forgotInputs = (t: TFunction) => [
  {
    type: "email",
    name: "identifier",
    label: t("Public.Register.Labels.Email"),
    required: true,
    fullWidth: true,
  },
];

export const resetInputs = (t: TFunction) => [
  {
    type: "password",
    name: "password",
    label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
    required: true,
    fullWidth: true,
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
    required: true,
    fullWidth: true,
  },
];

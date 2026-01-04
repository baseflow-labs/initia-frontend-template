import type { TFunction } from "i18next";

export const formInputs = (t: TFunction) => [
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

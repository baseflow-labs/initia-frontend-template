import { TFunction } from "i18next";

export const formInputs = (t: TFunction) => [
  {
    type: "email",
    name: "identifier",
    label: t("Public.Register.Labels.Email"),
    required: true,
    fullWidth: true,
  },
  {
    type: "password",
    name: "password",
    label: t("Public.Register.Labels.Password"),
    required: true,
    fullWidth: true,
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.Register.Labels.PasswordConfirmation"),
    required: true,
    fullWidth: true,
  },
  {
    type: "boolean",
    layout: "checkbox",
    name: "concent",
    label: t("Public.Register.Labels.Concent"),
    required: true,
    fullWidth: true,
  },
];

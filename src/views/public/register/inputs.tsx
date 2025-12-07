export const formInputs = (t: Function) => [
  {
    type: "phoneNumber",
    name: "identifier",
    label: t("Public.Register.Labels.PhoneNo"),
    required: true,
    fullWidth: true
  },
  {
    type: "password",
    name: "password",
    label: t("Public.Register.Labels.Password"),
    required: true,
    fullWidth: true
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.Register.Labels.PasswordConfirmation"),
    required: true,
    fullWidth: true
  },
];

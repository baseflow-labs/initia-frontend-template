export const getCommonSettingInputs = (t: Function) => [
  {
    type: "range",
    name: "fontSize",
    min: 10,
    max: 25,
    label: t("Auth.Settings.FontSize"),
    defaultValue: 15,
  },
];

export const getPasswordResetSettingInputs = (t: Function) => [
  {
    type: "password",
    name: "oldPassword",
    minLength: 8,
    label: t("Public.ForgotPassword.ResetPassword.OldPassword"),
    required: true,
  },
  {
    type: "password",
    name: "password",
    minLength: 8,
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

export const metadataSettingInputs = (t: Function) => {
  return [
    {
      type: "text",
      name: "name",
      label: t("Auth.Settings.SocietyName"),
      required: true,
    },
    {
      type: "file",
      fileSizeLimit: 2,
      name: "logo",
      label: t("Auth.Settings.SocietyLogo"),
    },
    {
      type: "phoneNumber",
      name: "phoneNumber",
      label: t("Auth.Settings.SocietyPhoneNumber"),
      required: true,
    },
  ];
};

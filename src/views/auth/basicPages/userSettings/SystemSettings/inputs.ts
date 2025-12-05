export const getCommonSettingInputs = (t: Function) => [
  {
    type: "range",
    name: "fontSize",
    min: 10,
    max: 25,
    label: t("Auth.Settings.FontSize"),
    defaultValue: 15,
    fullWidth: true
  },
];
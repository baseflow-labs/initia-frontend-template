import type { TFunction } from "i18next";

export const getCommonSettingInputs = (t: TFunction) => [
  {
    type: "range",
    name: "fontSize",
    min: 10,
    max: 25,
    label: t("Auth.Settings.FontSize"),
    defaultValue: 15,
    fullWidth: true,
  },
];

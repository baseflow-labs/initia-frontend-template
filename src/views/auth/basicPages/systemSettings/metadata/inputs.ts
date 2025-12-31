import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => () => [
  {
    name: "name",
    label: t("Auth.Settings.Admin.Metadata.Name"),
    type: "text",
    required: true,
    double: true,
  },
  {
    name: "logo",
    label: t("Auth.Settings.Admin.Metadata.Logo"),
    type: "file",
    required: true,
    double: true,
  },
  {
    name: "slogan",
    label: t("Auth.Settings.Admin.Metadata.Slogan"),
    type: "text",
    required: false,
    double: true,
  },
  {
    name: "phoneNumber",
    label: t("Auth.Settings.Admin.Metadata.PhoneNumber"),
    type: "numberText",
    required: false,
    double: true,
  },
  {
    name: "themeColor",
    label: t("Auth.Settings.Admin.Metadata.ThemeColor"),
    type: "color",
    required: false,
    double: true,
  },
];

import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
  {
    type: "text",
    name: "name",
    label: t("Auth.Settings.Admin.UserRoles.Name"),
    fullWidth: true,
  },
];

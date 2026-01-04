import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
  {
    type: "custom",
    name: "name",
    label: t("Auth.Users.Name"),
  },
  {
    type: "phoneNumber",
    name: "username",
    label: t("Global.Labels.PhoneNumber"),
  },
  {
    type: "email",
    name: "email",
    label: t("Global.Form.Labels.Email"),
  },
];

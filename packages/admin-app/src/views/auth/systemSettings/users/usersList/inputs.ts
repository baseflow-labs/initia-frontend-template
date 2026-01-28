import { SelectOption } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

export const inputs = (t: TFunction, roles: SelectOption[]) => [
  {
    name: "name",
    label: t("Auth.Settings.Admin.Users.Name"),
    type: "text",
  },
  {
    name: "role",
    label: t("Auth.Settings.Admin.Users.Role"),
    type: "select",
    options: roles,
  },
  {
    name: "email",
    label: t("Auth.Settings.Admin.Users.Email"),
    type: "email",
  },
];

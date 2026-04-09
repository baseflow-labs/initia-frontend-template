import { SelectOption } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

export const inputs = (t: TFunction, roles: SelectOption[]) => [
  {
    name: "username",
    label: t("Auth.Settings.Admin.Users.Username"),
    type: "text",
  },
  {
    name: "email",
    label: t("Auth.Settings.Admin.Users.Email"),
    type: "email",
  },
  {
    name: "role",
    label: t("Auth.Settings.Admin.Users.Role"),
    type: "select",
    options: roles,
  },
  {
    name: "isActive",
    label: t("Auth.Settings.Admin.Users.IsActive"),
    type: "boolean",
    booleanLabels: {
      trueLabel: t("Auth.Settings.Admin.Users.Active"),
      falseLabel: t("Auth.Settings.Admin.Users.Inactive"),
    },
  },
];

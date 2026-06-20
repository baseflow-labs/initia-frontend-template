import { SelectOption, TableColumn } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

export const inputs: (t: TFunction, roles: SelectOption[]) => TableColumn[] = (
  t: TFunction,
  roles: SelectOption[]
) => [
  {
    name: "username",
    label: t("Auth.Settings.Admin.Users.Username"),
    required: true,
    type: "text",
  },
  {
    name: "email",
    label: t("Auth.Settings.Admin.Users.Email"),
    required: true,
    type: "email",
  },
  {
    name: "role",
    label: t("Auth.Settings.Admin.Users.Role"),
    required: true,
    type: "select",
    options: roles,
  },
  {
    name: "isActive",
    label: t("Auth.Settings.Admin.Users.IsActive"),
    type: "boolean",
    defaultValue: "true",
    booleanLabels: {
      trueLabel: t("Auth.Settings.Admin.Users.Active"),
      falseLabel: t("Auth.Settings.Admin.Users.Inactive"),
    },
  },
  {
    name: "password",
    label: t("Auth.Settings.Admin.Users.Password"),
    type: "password",
    excludeInTable: true,
  },
  {
    name: "passwordConfirmation",
    label: t("Auth.Settings.Admin.Users.PasswordConfirmation"),
    type: "password",
    excludeInTable: true,
  },
];

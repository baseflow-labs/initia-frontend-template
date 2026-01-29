import { renderDataFromOptions } from "@initia/shared/utils/function";
import type { Row } from "@initia/shared/ui/components/table";

import type { TFunction } from "i18next";

export const getUserRoles = (t: TFunction) => [
  {
    value: "admin",
    label: t("Global.Labels.Roles.admin"),
  },
  {
    value: "ceo",
    label: t("Global.Labels.Roles.ceo"),
  },
  {
    value: "accountant",
    label: t("Global.Labels.Roles.accountant"),
  },
  {
    value: "hod",
    label: t("Global.Labels.Roles.hod"),
  },
  {
    value: "researcher",
    label: t("Global.Labels.Roles.researcher"),
  },
  {
    value: "user",
    label: t("Global.Labels.Roles.user"),
  },
  {
    value: "applicant",
    label: t("Global.Labels.Roles.applicant"),
  },
];

export const inputs = (t: TFunction) => [
  {
    type: "custom",
    name: "name",
    label: t("Auth.TABLE_PLURAL_UPPER_NAME.Name"),
  },
  {
    type: "phoneNumber",
    name: "username",
    label: t("Auth.TABLE_PLURAL_UPPER_NAME.PhoneNumber"),
  },
  {
    type: "email",
    name: "email",
    label: t("Auth.TABLE_PLURAL_UPPER_NAME.Labels.Email"),
  },
  {
    type: "custom",
    name: "role",
    label: t("Auth.Users.Role"),
    render: (row: Row) => renderDataFromOptions(String(row.role ?? ""), getUserRoles(t)),
  },
];

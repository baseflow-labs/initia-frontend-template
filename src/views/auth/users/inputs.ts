import { renderDataFromOptions } from "../../../utils/function";

export const getUserRoles = (t: Function) => [
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

export const inputs = (t: Function) => [
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
    label: t("Global.Form.Label.Email"),
  },
  {
    type: "custom",
    name: "role",
    label: t("Auth.Users.Role"),
    render: (row: any) => renderDataFromOptions(row.role, getUserRoles(t)),
  },
];

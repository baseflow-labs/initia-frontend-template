import { SelectOption } from "../../../../../../components/table";

export const inputs = (t: Function, roles: SelectOption[]) => [
  {
    name: "name",
    label: t("Auth.Settings.Admin.Users.Name"),
    type: "text",
  },
  {
    name: "role",
    label: t("Auth.Settings.Admin.Users.Role"),
    type: "select",
    options: roles
  },
  {
    name: "email",
    label: t("Auth.Settings.Admin.Users.Email"),
    type: "email",
  },
];

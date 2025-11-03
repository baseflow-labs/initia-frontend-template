import { renderDataFromOptions } from "../../../utils/function";
import { getUserRoles } from "../../../utils/optionDataLists/users";

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

import { getUserRoles } from "../optionDataLists/users";

export const getUserCrudInputs = (t: Function) => [
  {
    label: t("Auth.Users.Name"),
    name: "name",
    type: "text",
    required: true,
  },
  {
    label: t("Global.Form.Label.PhoneNumber"),
    name: "username",
    type: "phoneNumber",
    required: true,
  },
  {
    label: t("Auth.Users.Role"),
    name: "role",
    type: "select",
    options: getUserRoles(t).filter((r) => r.value !== "applicant"),
    required: true,
  },
  {
    label: t("Auth.MembershipRegistration.Form.IdNumber"),
    labelNote: t("Auth.Users.AsPassword"),
    name: "idNumber",
    type: "numberText",
    minLength: 10,
    maxLength: 10,
    required: false,
  },
  {
    label: t("Global.Form.Label.Email"),
    name: "email",
    type: "email",
    required: false,
  },
];

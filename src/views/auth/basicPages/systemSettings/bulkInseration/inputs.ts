export const inputs = (t: Function) => () => [
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

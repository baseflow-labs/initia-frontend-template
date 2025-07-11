export const getStaffCrudInputs = (t: Function) => [
  {
    label: t("Auth.Researchers.ResearcherName"),
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
    label: t("Auth.MembershipRegistration.Form.IdNumber"),
    name: "idNumber",
    type: "numberText",
    minLength: 10,
    maxLength: 10,
    required: true,
  },
  {
    label: t("Global.Form.Label.Email"),
    name: "email",
    type: "email",
    required: true,
  },
  // {
  //   label: t("Auth.Researchers.AddProfilePhoto"),
  //   name: "photo",
  //   type: "file",
  //   required: false,
  // },
];

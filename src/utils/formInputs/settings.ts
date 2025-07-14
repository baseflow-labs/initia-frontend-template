export const getCommonSettingInputs = (t: Function) => [
  {
    type: "range",
    name: "fontSize",
    min: 10,
    max: 25,
    label: t("Auth.Settings.FontSize"),
    defaultValue: 15,
  },
];

export const getPasswordResetSettingInputs = (t: Function) => [
  {
    type: "password",
    name: "password",
    minLength: 8,
    label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
    required: true,
  },
  {
    type: "password",
    name: "passwordConfirmation",
    label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
    required: true,
  },
];

export const metadataSettingInputs = (t: Function) => {
  const final = [
    {
      type: "text",
      name: "name",
      label: t("Auth.Settings.SocietyName"),
      required: true,
    },
    {
      type: "file",
      name: "logo",
      label: t("Auth.Settings.SocietyLogo"),
    },
    // {
    //   type: "selectMany",
    //   name: "provinces",
    //   options: [{ value: "All", label: t("Auth.Settings.AllProvinces") }, ... getProvinces(t)],
    //   label: t("Auth.Settings.SocietyProvinces"),
    // },
  ];

  // const allProvinces = formik?.values.provinces?.includes("All");
  // const allGovernorate = formik?.values.governorate?.includes("All");
  // const allCities = formik?.values.cities?.includes("All");

  // if (!allProvinces) {
  //   final.push({
  //     type: "selectMany",
  //     name: "governorate",
  //     options: [{ value: "All", label: t("Auth.Settings.AllGovernorate") }],
  //     label: t("Auth.Settings.SocietyGovernorate"),
  //   });
  // }

  // if (!allProvinces && !allGovernorate) {
  //   final.push({
  //     type: "selectMany",
  //     name: "cities",
  //     options: [{ value: "All", label: t("Auth.Settings.AllCities") }],
  //     label: t("Auth.Settings.SocietyCities"),
  //   });
  // }

  // if (!allProvinces && !allGovernorate && !allCities) {
  //   final.push({
  //     type: "selectMany",
  //     name: "districts",
  //     options: [{ value: "All", label: t("Auth.Settings.AllDistricts") }],
  //     label: t("Auth.Settings.SocietyDistricts"),
  //   });
  // }

  final.push({
    type: "phoneNumber",
    name: "phoneNumber",
    label: t("Auth.Settings.SocietyPhoneNumber"),
    required: true,
  });

  // final.push({
  //   type: "location",
  //   name: "location",
  //   label: t("Auth.Settings.SocietyLocation"),
  // });

  // final.push({
  //   type: "text",
  //   name: "address",
  //   label: t("Auth.Settings.SocietyAddress"),
  // });

  // final.push({
  //   type: "url",
  //   name: "website",
  //   label: t("Auth.Settings.SocietyWebsite"),
  // });

  return final;
};

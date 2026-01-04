import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
  {
    name: "fullName",
    label: t("Auth.Settings.User.Account.FullName"),
    type: "text",
    double: true,
  },
  {
    name: "username",
    label: t("Auth.Settings.User.Account.Username"),
    type: "text",
    double: true,
  },
  {
    name: "email",
    label: t("Auth.Settings.User.Account.Email"),
    type: "email",
    double: true,
  },
  {
    name: "phone",
    label: t("Auth.Settings.User.Account.Phone"),
    type: "text",
    double: true,
  },
  {
    name: "company",
    label: t("Auth.Settings.User.Account.Company"),
    type: "text",
    double: true,
  },
  {
    name: "jobTitle",
    label: t("Auth.Settings.User.Account.JobTitle"),
    type: "text",
    double: true,
  },
  {
    name: "country",
    label: t("Auth.Settings.User.Account.Country"),
    type: "text",
    double: true,
  },
  {
    name: "language",
    label: t("Auth.Settings.User.Account.Language"),
    type: "select",
    double: true,
    options: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
    ],
  },
];

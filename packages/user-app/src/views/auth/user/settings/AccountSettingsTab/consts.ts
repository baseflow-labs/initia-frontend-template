import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
  {
    name: "fullName",
    label: t("Auth.Settings.User.Account.FullName"),
    type: "text",
  },
  {
    name: "username",
    label: t("Auth.Settings.User.Account.Username"),
    type: "text",
  },
  {
    name: "email",
    label: t("Auth.Settings.User.Account.Email"),
    type: "email",
  },
  {
    name: "phone",
    label: t("Auth.Settings.User.Account.Phone"),
    type: "text",
  },
  {
    name: "company",
    label: t("Auth.Settings.User.Account.Company"),
    type: "text",
  },
  {
    name: "jobTitle",
    label: t("Auth.Settings.User.Account.JobTitle"),
    type: "text",
  },
  {
    name: "country",
    label: t("Auth.Settings.User.Account.Country"),
    type: "text",
  },
  {
    name: "language",
    label: t("Auth.Settings.User.Account.Language"),
    type: "select",
    options: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
    ],
  },
];

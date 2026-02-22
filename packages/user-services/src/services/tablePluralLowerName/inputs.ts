import type { TFunction } from "i18next";

type Row = Record<string, unknown>;

const renderDataFromOptions = (data: string, options: { label?: string; value: string }[]) => {
  const option = options.find(({ value }) => value === data);
  return option?.label || option?.value || "";
};

export const getUserRoles = (t: TFunction) => [
  {
    value: "admin",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.admin"),
  },
  {
    value: "ceo",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.ceo"),
  },
  {
    value: "accountant",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.accountant"),
  },
  {
    value: "hod",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.hod"),
  },
  {
    value: "researcher",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.researcher"),
  },
  {
    value: "user",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.user"),
  },
  {
    value: "applicant",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Roles.applicant"),
  },
];

export const getTablePluralLowerNameInputs = (t: TFunction) => [
  {
    type: "custom",
    name: "name",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Fields.Name"),
  },
  {
    type: "phoneNumber",
    name: "username",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Fields.PhoneNumber"),
  },
  {
    type: "email",
    name: "email",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Fields.Email"),
  },
  {
    type: "custom",
    name: "role",
    label: t("UserServices.TABLE_PLURAL_UPPER_NAME.Fields.Role"),
    render: (row: Row) => renderDataFromOptions(String(row.role ?? ""), getUserRoles(t)),
  },
];

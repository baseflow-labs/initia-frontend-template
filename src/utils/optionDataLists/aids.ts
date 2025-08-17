export const getAidProgramTypes = (t: Function) => [
  {
    value: "Cash",
    label: t("Auth.Aids.Cash"),
  },
  {
    value: "In-Kind",
    label: t("Auth.Aids.In-Kind"),
  },
];

export const getAidStatuses = (t: Function) => [
  {
    value: "Pending",
    label: t("Auth.Aids.Statuses.Pending"),
  },
  {
    value: "Granted",
    label: t("Auth.Aids.Statuses.Granted"),
  },
  {
    value: "Rejected",
    label: t("Auth.MembershipRegistration.Statuses.Rejected"),
  },
];

export const getAidProgramStatuses = (t: Function) => [
  {
    value: "Pending",
    label: t("Auth.Aids.Statuses.Pending"),
  },
  {
    value: "Granted",
    label: t("Auth.Aids.Statuses.Granted"),
  },
  {
    value: "Rejected",
    label: t("Auth.MembershipRegistration.Statuses.Rejected"),
  },
];

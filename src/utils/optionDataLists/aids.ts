export const getAidCategoryTypes = (t: Function) => [
  {
    value: "Cash",
    label: t("Auth.AidCategories.Cash"),
  },
  {
    value: "In-Kind",
    label: t("Auth.AidCategories.In-Kind"),
  },
];

export const getAidCategoryReapplyPeriods = (t: Function) => [
  {
    value: "Once",
    label: t("Auth.AidCategories.ReapplyPeriods.Once"),
  },
  {
    value: "Multiple",
    label: t("Auth.AidCategories.ReapplyPeriods.Multiple"),
  },
  {
    value: "Every Week",
    label: t("Auth.AidCategories.ReapplyPeriods.EveryWeek"),
  },
  {
    value: "Every Month",
    label: t("Auth.AidCategories.ReapplyPeriods.EveryMonth"),
  },
  {
    value: "Every Year",
    label: t("Auth.AidCategories.ReapplyPeriods.EveryYear"),
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
    value: "Opened",
    label: t("Auth.AidPrograms.Statuses.Opened"),
  },
  {
    value: "Closed",
    label: t("Auth.AidPrograms.Statuses.Closed"),
  },
];

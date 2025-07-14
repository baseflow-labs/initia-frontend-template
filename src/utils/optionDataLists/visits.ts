export const getVisitStatuses = (t: Function) => [
  {
    value: "Pending",
    label: t("Auth.Visits.Statuses.Pending"),
  },
  {
    value: "Approved",
    label: t("Auth.Visits.Statuses.Approved"),
  },
  {
    value: "Delayed",
    label: t("Auth.Visits.Statuses.Delayed"),
  },
  {
    value: "Done",
    label: t("Auth.Visits.Statuses.Done"),
  },
  {
    value: "Cancelled",
    label: t("Auth.Visits.Statuses.Cancelled"),
  },
];

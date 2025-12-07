export const inputs = (t: Function) => [
  {
    name: "level",
    label: t("Auth.Settings.Admin.Logger.Level"),
  },
  {
    name: "message",
    label: t("Auth.Settings.Admin.Logger.Message"),
  },
  {
    name: "context",
    label: t("Auth.Settings.Admin.Logger.Context"),
  },
  {
    name: "stack",
    label: t("Auth.Settings.Admin.Logger.Stack"),
  },
  {
    name: "meta",
    label: t("Auth.Settings.Admin.Logger.Metadata"),
  },
  {
    name: "createdAt",
    label: t("Auth.Settings.Admin.Logger.Timestamp"),
    type: "date"
  },
];

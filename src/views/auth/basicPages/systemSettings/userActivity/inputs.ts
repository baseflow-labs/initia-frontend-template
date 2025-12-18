export const inputs = (t: Function) => [
  {
    name: "actorId",
    label: t("Auth.Settings.Admin.UserActivity.UserId"),
    defaultHide: true,
  },
  {
    name: "actorType",
    label: t("Auth.Settings.Admin.UserActivity.UserType"),
  },
  {
    name: "action",
    label: t("Auth.Settings.Admin.UserActivity.Action"),
  },
  {
    name: "resourceType",
    label: t("Auth.Settings.Admin.UserActivity.DataType"),
  },
  {
    name: "resourceId",
    label: t("Auth.Settings.Admin.UserActivity.DataId"),
    defaultHide: true,
  },
  {
    name: "success",
    label: t("Auth.Settings.Admin.UserActivity.Success"),
    type: "boolean"
  },
  {
    name: "statusCode",
    label: t("Auth.Settings.Admin.UserActivity.StatusCode"),
    defaultHide: true,
  },
  {
    name: "errorMessage",
    label: t("Auth.Settings.Admin.UserActivity.ErrorMessage"),
    defaultHide: true,
  },
  {
    name: "requestId",
    label: t("Auth.Settings.Admin.UserActivity.RequestId"),
    defaultHide: true,
  },
  {
    name: "sessionId",
    label: t("Auth.Settings.Admin.UserActivity.SessionId"),
    defaultHide: true,
  },
  {
    name: "ip",
    label: t("Auth.Settings.Admin.UserActivity.Ip"),
    defaultHide: true,
  },
  {
    name: "userAgent",
    label: t("Auth.Settings.Admin.UserActivity.UserAgent"),
    defaultHide: true,
  },
  {
    name: "method",
    label: t("Auth.Settings.Admin.UserActivity.Method"),
    defaultHide: true,
  },
  {
    name: "path",
    label: t("Auth.Settings.Admin.UserActivity.Path"),
  },
  {
    name: "source",
    label: t("Auth.Settings.Admin.UserActivity.Source"),
    defaultHide: true,
  },
  {
    name: "before",
    label: t("Auth.Settings.Admin.UserActivity.Before"),
    defaultHide: true,
  },
  {
    name: "after",
    label: t("Auth.Settings.Admin.UserActivity.After"),
    defaultHide: true,
  },
  {
    name: "diff",
    label: t("Auth.Settings.Admin.UserActivity.Difference"),
    defaultHide: true,
  },
  {
    name: "createdAt",
    label: t("Auth.Settings.Admin.UserActivity.Timestamp"),
    defaultHide: true,
  },
];

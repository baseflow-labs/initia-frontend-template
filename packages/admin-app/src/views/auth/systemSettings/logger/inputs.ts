import { Row } from "@initia/shared/ui/components/table";

import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
  {
    name: "level",
    label: t("Auth.Settings.Admin.Logger.Level.Title"),
    type: "select",
    options: [
      { label: t("Auth.Settings.Admin.Logger.Level.Error"), value: "error", color: "danger" },
      { label: t("Auth.Settings.Admin.Logger.Level.Warn"), value: "warn", color: "warning" },
      { label: t("Auth.Settings.Admin.Logger.Level.Info"), value: "info", color: "info" },
      { label: t("Auth.Settings.Admin.Logger.Level.Http"), value: "http", color: "info" },
      { label: t("Auth.Settings.Admin.Logger.Level.Verbose"), value: "verbose", color: "info" },
      { label: t("Auth.Settings.Admin.Logger.Level.Debug"), value: "debug", color: "warning" },
      { label: t("Auth.Settings.Admin.Logger.Level.Silly"), value: "silly", color: "info" },
    ],
  },
  {
    name: "message",
    label: t("Auth.Settings.Admin.Logger.Message"),
    type: "custom",
    render: (values: Row) => (values.message ? String(values.message).slice(0, 10) + "..." : ""),
  },
  {
    name: "context",
    label: t("Auth.Settings.Admin.Logger.Context"),
  },
  {
    name: "stack",
    label: t("Auth.Settings.Admin.Logger.Stack"),
    type: "custom",
    render: (values: Row) => (values.stack ? String(values.stack).slice(0, 10) + "..." : ""),
  },
  // {
  //   name: "meta",
  //   label: t("Auth.Settings.Admin.Logger.Metadata"),
  // },
  {
    name: "createdAt",
    label: t("Auth.Settings.Admin.Logger.Timestamp"),
    type: "date",
  },
];

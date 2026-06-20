import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
  {
    name: "enabled",
    label: t("Auth.Settings.Admin.Backup.AutoSettings.Enabled"),
    type: "boolean",
    layout: "switch",
    fullWidth: true,
  },
  {
    name: "period",
    label: t("Auth.Settings.Admin.Backup.AutoSettings.Period"),
    type: "number",
    min: 1,
    required: true,
    double: true,
  },
  {
    name: "unit",
    label: t("Auth.Settings.Admin.Backup.AutoSettings.Unit.Title"),
    type: "select",
    options: [
      { label: t("Auth.Settings.Admin.Backup.AutoSettings.Unit.Days"), value: "days" },
      { label: t("Auth.Settings.Admin.Backup.AutoSettings.Unit.Weeks"), value: "weeks" },
      { label: t("Auth.Settings.Admin.Backup.AutoSettings.Unit.Months"), value: "months" },
    ],
    defaultValue: "days",
    required: true,
    double: true,
  },
  {
    name: "keptBackups",
    label: t("Auth.Settings.Admin.Backup.AutoSettings.KeptBackups"),
    type: "number",
    min: 1,
    max: 30,
    required: true,
    fullWidth: true,
  },
];

export const renderBackupTimestamp = (label: string) => {
  const fromFilename = label.replace("backup_", "").replace(".sql", "").replace(".zip", "");

  const matched = fromFilename.match(/^(\d{4}-\d{2}-\d{2}T\d{2})-(\d{2})-(\d{2})$/);
  const normalized = matched
    ? `${matched[1]}:${matched[2]}:${matched[3]}`
    : fromFilename.replace(/_/g, " ");

  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? label : date.toLocaleString();
};

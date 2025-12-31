import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => [
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
  const date = new Date(label.replace("backup_", "").replace(/_/g, " ").replace(".zip", ""));
  return date.toLocaleString();
};

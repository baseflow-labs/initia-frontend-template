import type { TFunction } from "i18next";

export const inputs = (t: TFunction) => () => [
  {
    name: "googleAnalyticsMeasurementId",
    label: t(
      "Auth.Settings.Admin.AnalyticsIntegrations.GA.MeasurementId",
      "Google Analytics Measurement ID"
    ),
    type: "text",
    required: false,
    double: true,
  },
  {
    name: "googleAnalyticsDashboardUrl",
    label: t(
      "Auth.Settings.Admin.AnalyticsIntegrations.GA.DashboardUrl",
      "Google Analytics Dashboard URL"
    ),
    type: "text",
    required: false,
    double: true,
  },
  {
    name: "microsoftClarityProjectId",
    label: t(
      "Auth.Settings.Admin.AnalyticsIntegrations.Clarity.ProjectId",
      "Microsoft Clarity Project ID"
    ),
    type: "text",
    required: false,
    double: true,
  },
  {
    name: "microsoftClarityDashboardUrl",
    label: t(
      "Auth.Settings.Admin.AnalyticsIntegrations.Clarity.DashboardUrl",
      "Microsoft Clarity Dashboard URL"
    ),
    type: "text",
    required: false,
    double: true,
  },
];

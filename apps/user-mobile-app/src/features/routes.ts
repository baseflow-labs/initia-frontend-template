import { USER_FEATURES, type UserFeatureDefinition } from "@initia/core";

export type MobileFeatureRoute = {
  key: string;
  name: string;
  description: string;
};

const FRIENDLY_NAMES: Record<string, string> = {
  "Auth.Dashboard.Title": "Dashboard",
  "Auth.Profile.Title": "Profile",
  "Auth.Messaging.Title": "Messaging",
  "Auth.Notifications.Title": "Notifications",
  "Auth.UserSettings.Title": "Settings",
  "Auth.SupportCenter.Title": "Support Center",
  "Auth.SupportCenter.Faq.Title": "Support FAQ",
  "Auth.SupportCenter.ContactUs.Title": "Contact Us",
  "Auth.SupportCenter.Tickets.Title": "Support Tickets",
  "Auth.SupportCenter.UserManual.Title": "User Manual",
  "Auth.TemplateExamples.DataView.Title": "Template Data View",
  "Auth.TemplateExamples.DataTable.Title": "Template Data Table",
  "Auth.TemplateExamples.Forms.Title": "Template Forms",
};

export const MOBILE_FEATURE_ROUTES: MobileFeatureRoute[] = USER_FEATURES.map(
  (feature: UserFeatureDefinition) => ({
    key: feature.key,
    name: FRIENDLY_NAMES[feature.titleKey] || feature.key,
    description: `Feature route: ${feature.path}`,
  })
);

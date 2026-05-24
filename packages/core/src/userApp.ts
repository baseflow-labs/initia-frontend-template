export type UserPermission = {
  table: string;
  action: string;
};

export type UserFeatureDefinition = {
  key: string;
  path: string;
  titleKey: string;
  showInNav?: boolean;
  fixed?: boolean;
  permission?: UserPermission;
};

export const USER_FEATURES: UserFeatureDefinition[] = [
  { key: "dashboard", path: "/dashboard", titleKey: "Auth.Dashboard.Title", showInNav: true },
  { key: "profile", path: "/profile", titleKey: "Auth.Profile.Title", fixed: true },
  { key: "messaging", path: "/messaging", titleKey: "Auth.Messaging.Title", fixed: true },
  {
    key: "notifications",
    path: "/notifications",
    titleKey: "Auth.Notifications.Title",
    fixed: true,
  },
  { key: "settings", path: "/settings", titleKey: "Auth.UserSettings.Title", fixed: true },
  {
    key: "support-center",
    path: "/support-center",
    titleKey: "Auth.SupportCenter.Title",
    fixed: true,
  },
  {
    key: "support-center-faq",
    path: "/support-center/faq",
    titleKey: "Auth.SupportCenter.Faq.Title",
    fixed: true,
  },
  {
    key: "support-center-contact-us",
    path: "/support-center/contact-us",
    titleKey: "Auth.SupportCenter.ContactUs.Title",
    fixed: true,
  },
  {
    key: "support-center-tickets",
    path: "/support-center/tickets",
    titleKey: "Auth.SupportCenter.Tickets.Title",
    fixed: true,
  },
  {
    key: "support-center-user-manual",
    path: "/support-center/user-manual",
    titleKey: "Auth.SupportCenter.UserManual.Title",
    fixed: true,
  },
  {
    key: "template-examples-data-view",
    path: "/template-examples/data-view",
    titleKey: "Auth.TemplateExamples.DataView.Title",
    showInNav: true,
    fixed: true,
  },
  {
    key: "template-examples-data-table",
    path: "/template-examples/data-table",
    titleKey: "Auth.TemplateExamples.DataTable.Title",
    showInNav: true,
    fixed: true,
  },
  {
    key: "template-examples-data-table-new",
    path: "/template-examples/data-table/new",
    titleKey: "Auth.TemplateExamples.DataTable.Title",
    fixed: true,
  },
  {
    key: "template-examples-data-table-id",
    path: "/template-examples/data-table/:id",
    titleKey: "Auth.TemplateExamples.DataTable.Title",
    fixed: true,
  },
  {
    key: "template-examples-forms",
    path: "/template-examples/forms",
    titleKey: "Auth.TemplateExamples.Forms.Title",
    showInNav: true,
    fixed: true,
  },
  {
    key: "template-examples-form-of-forms",
    path: "/template-examples/form-of-forms",
    titleKey: "Auth.TemplateExamples.FormsOfForms.Title",
    showInNav: true,
    fixed: true,
  },
];

export const canAccessUserFeature = (
  feature: Pick<UserFeatureDefinition, "permission">,
  permissions: UserPermission[],
  isAdmin: boolean
) => {
  if (!feature.permission) return true;
  if (isAdmin) return true;
  return permissions.some(
    (p) => p.table === feature.permission?.table && p.action === feature.permission?.action
  );
};

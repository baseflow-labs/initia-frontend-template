import type { TFunction } from "i18next";

export const ticketTableColumns = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Id", "Ticket ID"),
    sortable: true,
    excludeInForm: true,
  },
  {
    name: "type",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Type", "Type"),
    sortable: true,
    type: "select",
    options: [
      {
        value: "bug",
        label: t("Auth.SupportCenter.Admin.Tickets.Type.Bug", "Bug Report"),
      },
      {
        value: "feature",
        label: t("Auth.SupportCenter.Admin.Tickets.Type.Feature", "Feature Request"),
      },
      {
        value: "general",
        label: t("Auth.SupportCenter.Admin.Tickets.Type.General", "General Inquiry"),
      },
    ],
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Title", "Title"),
    sortable: true,
  },
  {
    name: "urgent",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Urgent", "Urgent"),
    sortable: true,
    type: "checkbox",
  },
  {
    name: "status",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Status", "Status"),
    sortable: true,
    type: "select",
    options: [
      {
        value: "open",
        label: t("Auth.SupportCenter.Admin.Tickets.Status.Open", "Open"),
      },
      {
        value: "in-progress",
        label: t("Auth.SupportCenter.Admin.Tickets.Status.InProgress", "In Progress"),
      },
      {
        value: "resolved",
        label: t("Auth.SupportCenter.Admin.Tickets.Status.Resolved", "Resolved"),
      },
      {
        value: "closed",
        label: t("Auth.SupportCenter.Admin.Tickets.Status.Closed", "Closed"),
      },
    ],
  },
  {
    name: "content",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Content", "Description"),
    type: "textarea",
    fullWidth: true,
  },
  {
    name: "adminNotes",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.AdminNotes", "Admin Notes"),
    type: "textarea",
    fullWidth: true,
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
];

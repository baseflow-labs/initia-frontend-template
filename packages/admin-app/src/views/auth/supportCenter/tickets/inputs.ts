import type { TFunction } from "i18next";

export const ticketTableColumns = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Id", "Ticket ID"),
    sortable: true,
  },
  {
    name: "subject",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Subject", "Subject"),
    sortable: true,
  },
  {
    name: "category",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Category", "Category"),
    sortable: true,
    type: "select",
    options: [
      {
        value: "technical",
        label: t("Auth.SupportCenter.Admin.Tickets.Category.Technical", "Technical Issue"),
      },
      {
        value: "billing",
        label: t("Auth.SupportCenter.Admin.Tickets.Category.Billing", "Billing"),
      },
      {
        value: "feature",
        label: t("Auth.SupportCenter.Admin.Tickets.Category.Feature", "Feature Request"),
      },
      {
        value: "other",
        label: t("Auth.SupportCenter.Admin.Tickets.Category.Other", "Other"),
      },
    ],
  },
  {
    name: "priority",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Priority", "Priority"),
    sortable: true,
    type: "select",
    options: [
      {
        value: "low",
        label: t("Auth.SupportCenter.Admin.Tickets.Priority.Low", "Low"),
      },
      {
        value: "medium",
        label: t("Auth.SupportCenter.Admin.Tickets.Priority.Medium", "Medium"),
      },
      {
        value: "high",
        label: t("Auth.SupportCenter.Admin.Tickets.Priority.High", "High"),
      },
      {
        value: "urgent",
        label: t("Auth.SupportCenter.Admin.Tickets.Priority.Urgent", "Urgent"),
      },
    ],
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
    name: "userName",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.UserName", "User Name"),
    sortable: true,
  },
  {
    name: "userEmail",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.UserEmail", "User Email"),
    sortable: true,
  },
  {
    name: "description",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.Description", "Description"),
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
    name: "assignedTo",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.AssignedTo", "Assigned To"),
    type: "text",
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.Tickets.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
  },
];

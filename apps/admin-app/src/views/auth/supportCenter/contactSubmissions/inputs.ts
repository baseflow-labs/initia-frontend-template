import { TableColumn } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

export const contactSubmissionColumns: (t: TFunction) => TableColumn[] = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Id", "ID"),
    sortable: true,
    excludeInForm: true,
  },
  {
    name: "name",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Name", "Name"),
    sortable: true,
    excludeInForm: true, // submitted by user, don't edit
  },
  {
    name: "email",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Email", "Email"),
    sortable: true,
    excludeInForm: true, // submitted by user, don't edit
  },
  {
    name: "phone",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Phone", "Phone"),
    sortable: true,
    excludeInForm: true, // submitted by user, don't edit
  },
  {
    name: "subject",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Subject", "Subject"),
    sortable: true,
    excludeInForm: true, // submitted by user, don't edit
  },
  {
    name: "message",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Message", "Message"),
    type: "textarea",
    fullWidth: true,
    excludeInForm: true, // submitted by user, don't edit
  },
  {
    name: "status",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.Status", "Status"),
    sortable: true,
    type: "select",
    options: [
      {
        value: "new",
        label: t("Auth.SupportCenter.Admin.ContactSubmissions.Status.New", "New"),
      },
      {
        value: "read",
        label: t("Auth.SupportCenter.Admin.ContactSubmissions.Status.Read", "Read"),
      },
      {
        value: "responded",
        label: t("Auth.SupportCenter.Admin.ContactSubmissions.Status.Responded", "Responded"),
      },
      {
        value: "archived",
        label: t("Auth.SupportCenter.Admin.ContactSubmissions.Status.Archived", "Archived"),
      },
    ],
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.ContactSubmissions.Columns.CreatedAt", "Submitted At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
];

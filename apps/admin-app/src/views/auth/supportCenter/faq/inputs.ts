import { TableColumn } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

export const faqTableColumns: (t: TFunction) => TableColumn[] = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Id", "ID"),
    sortable: true,
    excludeInForm: true,
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Title", "Title"),
    sortable: true,
    type: "text",
    required: true,
  },
  {
    name: "content",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Content", "Content"),
    type: "textarea",
    required: true,
    fullWidth: true,
  },
  {
    name: "link",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Link", "Link"),
    type: "text",
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "datetime",
    excludeInForm: true,
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "datetime",
    excludeInForm: true,
  },
];

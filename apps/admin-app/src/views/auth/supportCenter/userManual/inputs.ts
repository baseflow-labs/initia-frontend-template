import { TableColumn } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

// Sections Management
export const sectionTableColumns: (t: TFunction) => TableColumn[] = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Id", "ID"),
    sortable: true,
    excludeInForm: true,
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Title", "Title"),
    sortable: true,
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Description", "Description"),
    type: "textarea",
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
];

// Subsections Management
export const subsectionTableColumns: (t: TFunction) => TableColumn[] = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.Id", "ID"),
    sortable: true,
    excludeInForm: true,
  },
  {
    name: "sectionId",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.SectionId", "Section ID"),
    type: "text",
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.Title", "Title"),
    sortable: true,
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.Description", "Description"),
    type: "textarea",
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
];

// Contents Management
export const contentTableColumns: (t: TFunction) => TableColumn[] = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.Id", "ID"),
    sortable: true,
    excludeInForm: true,
  },
  {
    name: "subsectionId",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.SubsectionId", "Subsection ID"),
    type: "text",
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.Title", "Title"),
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: t(
      "Auth.SupportCenter.Admin.UserManual.Contents.Columns.Description",
      "Description (HTML)"
    ),
    type: "textarea",
    fullWidth: true,
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
    excludeInForm: true,
  },
];

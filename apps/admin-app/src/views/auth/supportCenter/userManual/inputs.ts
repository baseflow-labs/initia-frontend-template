import type { TFunction } from "i18next";

// Sections Management
export const sectionTableColumns = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Id", "ID"),
    sortable: true,
  },
  {
    name: "sectionId",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.SectionId", "Section ID"),
    type: "text",
    required: true,
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Title", "Title"),
    sortable: true,
    type: "text",
    required: true,
  },
  {
    name: "icon",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Icon", "Icon (FontAwesome)"),
    type: "text",
  },
  {
    name: "order",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.Order", "Display Order"),
    type: "number",
    sortable: true,
  },
  {
    name: "isPublished",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.IsPublished", "Published"),
    type: "checkbox",
    sortable: true,
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Sections.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
  },
];

// Subsections Management
export const subsectionTableColumns = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.Id", "ID"),
    sortable: true,
  },
  {
    name: "sectionId",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.SectionId", "Section ID"),
    type: "text",
    required: true,
  },
  {
    name: "subsectionId",
    label: t(
      "Auth.SupportCenter.Admin.UserManual.Subsections.Columns.SubsectionId",
      "Subsection ID"
    ),
    type: "text",
    required: true,
  },
  {
    name: "title",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.Title", "Title"),
    sortable: true,
    type: "text",
    required: true,
  },
  {
    name: "contentType",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.ContentType", "Content Type"),
    type: "select",
    options: [
      {
        value: "article",
        label: t("Auth.SupportCenter.Admin.UserManual.ContentType.Article", "Article"),
      },
      {
        value: "video",
        label: t("Auth.SupportCenter.Admin.UserManual.ContentType.Video", "Video"),
      },
      {
        value: "tutorial",
        label: t("Auth.SupportCenter.Admin.UserManual.ContentType.Tutorial", "Tutorial"),
      },
    ],
  },
  {
    name: "order",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.Order", "Display Order"),
    type: "number",
    sortable: true,
  },
  {
    name: "isPublished",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.IsPublished", "Published"),
    type: "checkbox",
    sortable: true,
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Subsections.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
  },
];

// Contents Management
export const contentTableColumns = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.Id", "ID"),
    sortable: true,
  },
  {
    name: "subsectionId",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.SubsectionId", "Subsection ID"),
    type: "text",
    required: true,
  },
  {
    name: "content",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.Content", "Content (HTML)"),
    type: "textarea",
    required: true,
    fullWidth: true,
  },
  {
    name: "videoUrl",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.VideoUrl", "Video URL"),
    type: "text",
  },
  {
    name: "attachments",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.Attachments", "Attachments"),
    type: "text",
  },
  {
    name: "isPublished",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.IsPublished", "Published"),
    type: "checkbox",
    sortable: true,
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.UserManual.Contents.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
  },
];

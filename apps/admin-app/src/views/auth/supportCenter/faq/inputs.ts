import type { TFunction } from "i18next";

export const faqTableColumns = (t: TFunction) => [
  {
    name: "id",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Id", "ID"),
    sortable: true,
  },
  {
    name: "category",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Category", "Category"),
    sortable: true,
    type: "select",
    required: true,
    options: [
      {
        value: "getting-started",
        label: t("Auth.SupportCenter.Admin.Faq.Categories.GettingStarted", "Getting Started"),
      },
      {
        value: "account-security",
        label: t("Auth.SupportCenter.Admin.Faq.Categories.AccountSecurity", "Account & Security"),
      },
      {
        value: "billing-payments",
        label: t("Auth.SupportCenter.Admin.Faq.Categories.BillingPayments", "Billing & Payments"),
      },
      {
        value: "features",
        label: t("Auth.SupportCenter.Admin.Faq.Categories.Features", "Features"),
      },
      {
        value: "troubleshooting",
        label: t("Auth.SupportCenter.Admin.Faq.Categories.Troubleshooting", "Troubleshooting"),
      },
      {
        value: "other",
        label: t("Auth.SupportCenter.Admin.Faq.Categories.Other", "Other"),
      },
    ],
  },
  {
    name: "question",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Question", "Question"),
    sortable: true,
    type: "textarea",
    required: true,
    fullWidth: true,
  },
  {
    name: "answer",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Answer", "Answer"),
    type: "textarea",
    required: true,
    fullWidth: true,
  },
  {
    name: "order",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Order", "Display Order"),
    type: "number",
    sortable: true,
  },
  {
    name: "isPublished",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.IsPublished", "Published"),
    type: "checkbox",
    sortable: true,
  },
  {
    name: "tags",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.Tags", "Tags"),
    type: "text",
  },
  {
    name: "createdAt",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.CreatedAt", "Created At"),
    sortable: true,
    type: "date",
  },
  {
    name: "updatedAt",
    label: t("Auth.SupportCenter.Admin.Faq.Columns.UpdatedAt", "Updated At"),
    sortable: true,
    type: "date",
  },
];

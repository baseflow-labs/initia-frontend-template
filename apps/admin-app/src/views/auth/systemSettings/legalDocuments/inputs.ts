import { Row } from "@initia/shared/ui/components/table";
import type { TFunction } from "i18next";

const typeLabel = (value?: string) => {
  if (value === "terms-and-conditions") return "Terms & Conditions";
  if (value === "privacy-policy") return "Privacy Policy";
  return value || "";
};

export const inputs = (t: TFunction) => [
  {
    name: "documentType",
    label: t("Auth.Settings.Admin.LegalDocuments.DocumentType"),
    type: "select",
    options: [
      {
        label: t("Auth.Settings.Admin.LegalDocuments.TermsAndConditions"),
        value: "terms-and-conditions",
      },
      {
        label: t("Auth.Settings.Admin.LegalDocuments.PrivacyPolicy"),
        value: "privacy-policy",
      },
    ],
    render: (values: Row) => typeLabel(values.documentType?.toString()),
  },
  {
    name: "locale",
    label: t("Auth.Settings.Admin.LegalDocuments.Locale"),
    placeholder: "en",
  },
  {
    name: "title",
    label: t("Auth.Settings.Admin.LegalDocuments.TitleField"),
    required: true,
  },
  {
    name: "summary",
    label: t("Auth.Settings.Admin.LegalDocuments.Summary"),
    type: "textarea",
    defaultHide: true,
  },
  {
    name: "content",
    label: t("Auth.Settings.Admin.LegalDocuments.Content"),
    type: "textarea",
    required: true,
    defaultHide: true,
  },
  {
    name: "isPublished",
    label: t("Auth.Settings.Admin.LegalDocuments.IsPublished"),
    type: "boolean",
  },
  {
    name: "version",
    label: t("Auth.Settings.Admin.LegalDocuments.Version"),
    defaultHide: true,
  },
  {
    name: "createdAt",
    label: t("Auth.Settings.Admin.LegalDocuments.CreatedAt"),
  },
];

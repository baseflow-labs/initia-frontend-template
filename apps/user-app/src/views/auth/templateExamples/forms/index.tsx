import Form from "@initia/shared/ui/components/form";
import SchemaDrivenForm from "@initia/shared/ui/components/form/schemaRenderer";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import { inputs, schemaInputs } from "./inputs";

const TemplateFormExamplesView = () => {
  const { t } = useTranslation();

  const pageBreadcrumbs = [{ label: t("Auth.Dashboard.Title"), path: "/dashboard" }];

  return (
    <PageTemplate title={t("Auth.TemplateExamples.Forms.Title")} breadcrumbs={pageBreadcrumbs}>
      <h5 className="mb-3">{t("Auth.TemplateExamples.Forms.LibraryTitle")}</h5>
      <Form inputs={() => inputs(t)} enableDraft draftKey="template-form-v2" />
      <hr className="my-5" />
      <h5 className="mb-2">{t("Auth.TemplateExamples.Forms.SchemaTitle")}</h5>
      <p className="text-muted">{t("Auth.TemplateExamples.Forms.SchemaDescription")}</p>
      <SchemaDrivenForm schema={schemaInputs(t)} />
    </PageTemplate>
  );
};

export default TemplateFormExamplesView;

import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const TemplateFormExamplesView = () => {
  const { t } = useTranslation();

  const pageBreadcrumbs = [{ label: t("Auth.Dashboard.Title"), path: "/dashboard" }];

  return (
    <PageTemplate title={t("Auth.TemplateExamples.Forms.Title")} breadcrumbs={pageBreadcrumbs}>
      <Form inputs={() => inputs(t)} />
    </PageTemplate>
  );
};

export default TemplateFormExamplesView;

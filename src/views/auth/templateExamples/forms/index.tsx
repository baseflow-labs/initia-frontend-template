import Form from "@/components/form";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";
import { inputs } from "./inputs";

const TemplateFormExamplesView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.TemplateExamples.Forms.Title")}>
      <Form inputs={() => inputs(t)} />
    </PageTemplate>
  );
};

export default TemplateFormExamplesView;

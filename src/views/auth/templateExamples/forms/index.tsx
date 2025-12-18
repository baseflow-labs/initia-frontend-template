import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Form from "@/components/form";
import { inputs } from "./inputs";

const TemplateFormExamplesView = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Form inputs={() => inputs(t)} />
    </Fragment>
  );
};

export default TemplateFormExamplesView;

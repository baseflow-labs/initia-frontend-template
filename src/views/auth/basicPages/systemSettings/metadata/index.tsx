import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import PageTemplate from "../../../../../layouts/auth/pages/pageTemplate";
import Form from "../../../../../components/form";
import { inputs } from "./inputs";

const SystemMetadataSettingsView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title="Metadata Settings">
      <Form inputs={inputs(t)} />
    </PageTemplate>
  );
};

export default SystemMetadataSettingsView;

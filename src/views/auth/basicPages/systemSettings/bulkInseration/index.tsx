import { useTranslation } from "react-i18next";
import Form from "../../../../../components/form";
import PageTemplate from "../../../../../layouts/auth/pages/pageTemplate";
import { inputs } from "./inputs";

const SystemDataBulkInsertionView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title="Bulk Data Insertion">
      <Form inputs={inputs(t)} />
    </PageTemplate>
  );
};

export default SystemDataBulkInsertionView;

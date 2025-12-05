import { useTranslation } from "react-i18next";
import Form from "../../../../../components/form";
import { inputs } from "./inputs";

const SystemDataBulkInsertionView = () => {
  const { t } = useTranslation();

  return (
    <Form inputs={inputs(t)} />
  );
};

export default SystemDataBulkInsertionView;

import { useTranslation } from "react-i18next";
import ApiDataTable from "../../../../../components/table/apiDatatable";
import { inputs } from "./inputs";

const SystemLoggerView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/logger"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.Logger.Title")}
      includeView
    />
  );
};

export default SystemLoggerView;

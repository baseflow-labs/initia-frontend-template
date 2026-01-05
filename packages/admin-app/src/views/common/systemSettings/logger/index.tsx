import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const SystemLoggerView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/logging"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.Logger.Title")}
      includeView
    />
  );
};

export default SystemLoggerView;

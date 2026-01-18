import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const SystemLoggerView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Logger.Title")}>
      <ApiDataTable
        dataApiEndpoint="/logging"
        inputs={inputs(t)}
        singleItem={t("Auth.Settings.Admin.Logger.Title")}
        includeView
      />
    </PageTemplate>
  );
};

export default SystemLoggerView;

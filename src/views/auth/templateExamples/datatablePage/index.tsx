import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";
import ApiDataTable from "../../../../components/table/apiDatatable";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";

const TemplateDataTableExampleView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.TemplateExamples.DataTable.Title")}>
      <ApiDataTable
        dataApiEndpoint="/support/users"
        inputs={inputs(t)}
        singleItem={t("Auth.Settings.Admin.Users.User")}
        includeCreate
        includeView
        includeUpdate
        includeDelete
      />
    </PageTemplate>
  );
};

export default TemplateDataTableExampleView;

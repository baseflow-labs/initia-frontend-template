import ApiDataTable from "@/components/table/apiDatatable";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const TemplateDataTableExampleView = () => {
  const { t } = useTranslation();

  const pageBreadcrumbs = [{ label: t("Auth.Dashboard.Title"), path: "/dashboard" }];

  return (
    <PageTemplate title={t("Auth.TemplateExamples.DataTable.Title")} breadcrumbs={pageBreadcrumbs}>
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

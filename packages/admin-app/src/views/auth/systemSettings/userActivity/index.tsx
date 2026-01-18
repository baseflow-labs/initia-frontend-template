import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const UserActivityView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.Settings.Admin.UserActivity.Title")}>
      <ApiDataTable
        dataApiEndpoint="/audit"
        inputs={inputs(t)}
        singleItem={t("Auth.Settings.Admin.UserActivity.UserActivity")}
        includeView
      />
    </PageTemplate>
  );
};

export default UserActivityView;

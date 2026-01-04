import ApiDataTable from "@/components/table/apiDatatable";
import { useTranslation } from "react-i18next";

import { inputs } from "./inputs";

const UserActivityView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/audit"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.UserActivity.UserActivity")}
      includeView
    />
  );
};

export default UserActivityView;

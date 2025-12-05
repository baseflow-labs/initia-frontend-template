import { useTranslation } from "react-i18next";
import ApiDataTable from "../../../../../components/table/apiDatatable";
import { inputs } from "./inputs";

const UserActivityView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/userActivity"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.UserActivity.UserActivity")}
      includeView
    />
  );
};

export default UserActivityView;

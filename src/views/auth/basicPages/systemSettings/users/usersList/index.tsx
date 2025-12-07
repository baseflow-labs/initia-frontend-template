import { useTranslation } from "react-i18next";

import ApiDataTable from "../../../../../../components/table/apiDatatable";
import { inputs } from "./inputs";

const UsersView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/users"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.Users.User")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default UsersView;

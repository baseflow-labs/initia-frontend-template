import { useTranslation } from "react-i18next";
import ApiDataTable from "@/components/table/apiDatatable";
import { inputs } from "./inputs";

const UserRolesView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/userRoles"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.UserRoles.UserRole")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default UserRolesView;

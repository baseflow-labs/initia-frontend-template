import { useTranslation } from "react-i18next";
import ApiDataTable from "../../../../../../components/table/apiDatatable";
import { inputs } from "./inputs";

const UserRolePermissionsView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/rolePermissions"
      inputs={inputs(t)}
      singleItem={t("Auth.Settings.Admin.RolePermissions")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default UserRolePermissionsView;

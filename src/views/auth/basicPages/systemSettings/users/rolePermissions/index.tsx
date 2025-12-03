import { useTranslation } from "react-i18next";
import TablePage from "../../../../../../layouts/auth/pages/tablePage";
import { inputs } from "./inputs";

const UserRolePermissionsView = () => {
  const { t } = useTranslation();

  return (
    <TablePage
      title="User Role Permissions"
      // actionButtons={actionButtons}
      columns={inputs(t)}
      // searchProp="name"
      // searchPlaceholder={t("Auth.Users.SearchBarPlaceholder")}
      // tableExtraActions={(id?: string) => [
      //   {
      //     label: t("Common.Edit"),
      //     icon: faEdit
      //   },
      // ]}
      dataApiEndpoint="users"
    />
  );
};

export default UserRolePermissionsView;

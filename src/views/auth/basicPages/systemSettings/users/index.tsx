import { useTranslation } from "react-i18next";

import TabsComp from "../../../../../components/tab";
import UserRolePermissionsView from "./rolePermissions";
import UserRolesView from "./userRoles";
import UsersView from "./usersList";

const AdminUserSettingsPage = () => {
  const { t } = useTranslation();


  const tabs = [
    {
      title: t("Auth.Settings.UsersView.Title"),
      body: <UsersView />,
    },
    {
      title: t("Auth.Settings.UserRoles.Title"),
      body: <UserRolesView />
    },
    {
      title: t("Auth.Settings.UserRolePermissions.Title"),
      body: <UserRolePermissionsView />
    },
  ];

  return (
      <TabsComp tabs={tabs.map((tab, idx) => ({ ...tab, body: <div className="mt-5 card shadow-sm"><div className="card-body p-5">{tab.body}</div></div>, id: String(idx) }))} />
  );
};

export default AdminUserSettingsPage;
import TabsComp from "@initia/shared/ui/components/tab";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import UserRolePermissionsView from "./rolePermissions";
import UserRolesView from "./userRoles";
import UsersView from "./usersList";

const AdminUserSettingsPage = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      title: t("Auth.Settings.Admin.UsersView.Title"),
      content: <UsersView />,
    },
    {
      title: t("Auth.Settings.Admin.UserRoles.Title"),
      content: <UserRolesView />,
    },
    {
      title: t("Auth.Settings.Admin.UserRolePermissions.Title"),
      content: <UserRolePermissionsView />,
    },
  ];

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Users.Title")}>
      <TabsComp
        items={tabs.map((tab, idx) => ({
          ...tab,
          content: (
            <div className="mt-5 card shadow-sm">
              <div className="card-body p-5">{tab.content}</div>
            </div>
          ),
          id: String(idx),
        }))}
      />
    </PageTemplate>
  );
};

export default AdminUserSettingsPage;

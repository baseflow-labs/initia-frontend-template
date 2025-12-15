import { useTranslation } from "react-i18next";
import { tablesList } from "@/api/demoData";

const UserRolePermissionsView = () => {
  const { t } = useTranslation();
  const actions = [
    {
      label: t("Auth.Settings.Admin.RolePermissions.Actions.GetAll"),
      value: "get_all",
    },
    {
      label: t("Auth.Settings.Admin.RolePermissions.Actions.GetOne"),
      value: "get_one",
    },
    {
      label: t("Auth.Settings.Admin.RolePermissions.Actions.Create"),
      value: "create",
    },
    {
      label: t("Auth.Settings.Admin.RolePermissions.Actions.Update"),
      value: "update",
    },
    {
      label: t("Auth.Settings.Admin.RolePermissions.Actions.Delete"),
      value: "delete",
    },
  ];

  const roles = [{ value: "admin" }, { value: "editor" }, { value: "viewer" }];

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>{t("Auth.Settings.Admin.UserRoles.Title")}</th>
          {roles.map((role) => (
            <th colSpan={actions.length} key={role.value}>
              {role.value}
            </th>
          ))}
        </tr>

        <tr>
          <th>{t("Auth.Settings.Admin.RolePermissions.Actions.Title")}</th>
          {roles.map((_) =>
            actions.map((action) => <th key={action.value}>{action.label}</th>)
          )}
        </tr>
      </thead>

      <tbody>
        {tablesList.map((table) => (
          <tr key={table}>
            <td>{table}</td>
            {roles.map((_) =>
              actions.map((action) => (
                <td key={action.value}>
                  <input type="checkbox" />
                </td>
              ))
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserRolePermissionsView;

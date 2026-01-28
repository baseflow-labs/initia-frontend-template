import * as PermissionsApi from "@initia/shared/api/users/permissions";
import Button from "@initia/shared/ui/components/core/button";
import { capitalizeSentence, covertCamelCaseToSentence } from "@initia/shared/utils/function";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Factors {
  actions: string[];
  roles: { name: string }[];
  tables: string[];
}

interface Permission {
  action: string;
  role: { name: string };
  table: string;
  description: string;
}

const UserRolePermissionsView = () => {
  const { t } = useTranslation();
  const [factors, setFactors] = useState<Factors>({ actions: [], roles: [], tables: [] });
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useLayoutEffect(() => {
    PermissionsApi.getAll().then((res: Record<string, unknown>) =>
      setPermissions(res?.payload as Permission[])
    );

    PermissionsApi.getFactors().then((res: Record<string, unknown>) =>
      setFactors(res?.payload as Factors)
    );
  }, []);

  return (
    <Fragment>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{t("Auth.Settings.Admin.UserRoles.Title")}</th>
            {factors.roles.map((role) => (
              <th colSpan={factors.actions.length} key={role.name}>
                {capitalizeSentence(role.name)}
              </th>
            ))}
          </tr>

          <tr>
            <th>{t("Auth.Settings.Admin.RolePermissions.Actions.Title")}</th>
            {factors.roles.map((_) =>
              factors.actions.map((action) => <th key={action}>{action}</th>)
            )}
          </tr>
        </thead>

        <tbody>
          {factors.tables.map((table) => (
            <tr key={table}>
              <td>{covertCamelCaseToSentence(table)}</td>

              {factors.roles.map((_) =>
                factors.actions.map((action) => (
                  <td key={action}>
                    <input
                      type="checkbox"
                      checked={permissions.some(
                        (p) => p.action === action && p.table === table && p.role.name === _.name
                      )}
                      onChange={() => {
                        setPermissions((prev) => {
                          const exists = prev.some(
                            (p) =>
                              p.action === action && p.table === table && p.role.name === _.name
                          );

                          if (exists) {
                            return prev.filter(
                              (p) =>
                                !(
                                  p.action === action &&
                                  p.table === table &&
                                  p.role.name === _.name
                                )
                            );
                          } else {
                            return [
                              ...prev,
                              {
                                action,
                                table,
                                role: { name: _.name },
                                description: "",
                              },
                            ];
                          }
                        });
                      }}
                    />
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end mt-4">
        <Button
        // onClick={async () => {
        //   await PermissionsApi.updateAll({ permissions });
        //   alert(t("Auth.Settings.Admin.RolePermissions.Updated"));
        // }}
        >
          {t("Global.Form.Labels.Save")}
        </Button>
      </div>
    </Fragment>
  );
};

export default UserRolePermissionsView;

import * as PermissionsApi from "@initia/shared/api/users/permissions";
import Button from "@initia/shared/ui/components/core/button";
import { capitalizeSentence, covertCamelCaseToSentence } from "@initia/shared/utils/function";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Role {
  id: string;
  name: string;
}

interface Factors {
  actions: string[];
  roles: Role[];
  tables: string[];
}

interface Permission {
  id?: string;
  action: string;
  role: { name: string };
  table: string;
  description: string;
}

const UserRolePermissionsView = () => {
  const { t } = useTranslation();
  const [factors, setFactors] = useState<Factors>({ actions: [], roles: [], tables: [] });
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [originalPermissions, setOriginalPermissions] = useState<Permission[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useLayoutEffect(() => {
    PermissionsApi.getAll().then((res: Record<string, unknown>) => {
      const fetched = (res?.payload as Permission[]) ?? [];
      setPermissions(fetched);
      setOriginalPermissions(fetched);
    });

    PermissionsApi.getFactors().then((res: Record<string, unknown>) =>
      setFactors(res?.payload as Factors)
    );
  }, []);

  const onSave = async () => {
    setIsSaving(true);
    try {
      const added = permissions.filter(
        (p) =>
          !originalPermissions.some(
            (op) => op.action === p.action && op.table === p.table && op.role.name === p.role.name
          )
      );

      const removed = originalPermissions.filter(
        (op) =>
          !permissions.some(
            (p) => p.action === op.action && p.table === op.table && p.role.name === op.role.name
          )
      );

      await Promise.all([
        ...added.map((p) => {
          const role = factors.roles.find((r) => r.name === p.role.name);
          return PermissionsApi.create({ action: p.action, table: p.table, role: role!.id });
        }),
        ...removed.map((p) => p.id && PermissionsApi.remove(p.id)),
      ]);

      // re-fetch fresh permissions after saving so IDs are up to date
      const res = await PermissionsApi.getAll();
      const fresh = ((res as Record<string, unknown>)?.payload as Permission[]) ?? [];
      setPermissions(fresh);
      setOriginalPermissions(fresh);
    } finally {
      setIsSaving(false);
    }
  };

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
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? t("Global.Labels.Saving", "Saving…") : t("Global.Form.Labels.Save")}
        </Button>
      </div>
    </Fragment>
  );
};

export default UserRolePermissionsView;

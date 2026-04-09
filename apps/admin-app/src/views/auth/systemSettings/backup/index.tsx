import { faHistory, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@initia/shared/ui/components/core/button";
import Form, { LabelView } from "@initia/shared/ui/components/form";
import SelectInput from "@initia/shared/ui/components/form/inputs/select";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BackupApi from "../../../../api/backup";
import { addNotification } from "../../../../store/actions/notifications";

import { inputs, renderBackupTimestamp } from "./inputs";

const BackupSettingsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [settings, setSettings] = useState<Partial<BackupApi.BackupSettings>>({});
  const [backups, setBackups] = useState<BackupApi.BackupRecord[]>([]);
  const [selectedBackup, setSelectedBackup] = useState<string | undefined>(undefined);
  const [busyAction, setBusyAction] = useState<"create" | "restore" | "delete" | null>(null);

  const currentBackups = useMemo(
    () =>
      backups.map((record) => ({
        value: record.id,
        label: renderBackupTimestamp(record.filename || record.createdAt),
      })),
    [backups]
  );

  const loadData = async () => {
    const [settingsRes, backupsRes] = await Promise.all([
      BackupApi.getSettings(),
      BackupApi.listBackups(),
    ]);

    setSettings(settingsRes.payload || {});
    setBackups(backupsRes.payload || []);
  };

  useEffect(() => {
    loadData().catch(() => {
      dispatch(addNotification("err", "Failed to load backup settings"));
    });
  }, []);

  const onSettingsSubmit = async (values?: Record<string, unknown>) => {
    if (!values) return;

    const dto: BackupApi.UpdateBackupSettingsDto = {
      period: Number(values.period),
      unit: values.unit as BackupApi.BackupUnit,
      keptBackups: Number(values.keptBackups),
    };

    try {
      await BackupApi.updateSettings(dto);
      await loadData();
    } catch {
      dispatch(addNotification("err", "Failed to update backup settings"));
    }
  };

  const handleCreateBackup = async () => {
    try {
      setBusyAction("create");
      await BackupApi.createBackup();
      await loadData();
    } catch {
      dispatch(addNotification("err", "Failed to create backup"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedBackup) return;

    const confirmed = window.confirm(
      "Are you sure you want to restore the selected backup? This will overwrite current data."
    );
    if (!confirmed) return;

    try {
      setBusyAction("restore");
      await BackupApi.restoreBackup(selectedBackup);
    } catch {
      dispatch(addNotification("err", "Failed to restore backup"));
    } finally {
      setBusyAction(null);
    }
  };

  const handleDeleteBackup = async () => {
    if (!selectedBackup) return;

    const confirmed = window.confirm("Are you sure you want to delete the selected backup?");
    if (!confirmed) return;

    try {
      setBusyAction("delete");
      await BackupApi.deleteBackup(selectedBackup);
      setSelectedBackup(undefined);
      await loadData();
    } catch {
      dispatch(addNotification("err", "Failed to delete backup"));
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Backup.Title")}>
      <div className="row">
        <div className="col-md-6">
          <h4 className="mb-3">{t("Auth.Settings.Admin.Backup.AutoSettings.Title")}</h4>

          <Form initialValues={settings} inputs={() => inputs(t)} onFormSubmit={onSettingsSubmit} />
        </div>

        <div className="col-md-6">
          <h4 className="mb-3">{t("Auth.Settings.Admin.Backup.BackupsManagement.Title")}</h4>

          <LabelView label={t("Auth.Settings.Admin.Backup.BackupsManagement.CurrentBackups")} />

          <SelectInput
            name="currentBackups"
            value={selectedBackup}
            onChange={(e) => setSelectedBackup(e.target.value)}
            options={currentBackups}
          />

          <div className="row mt-3">
            <div className="col-12 mb-3">
              <Button
                color="success"
                className="w-100"
                onClick={handleCreateBackup}
                disabled={busyAction !== null}
              >
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                {t("Auth.Settings.Admin.Backup.BackupsManagement.CreateNewBackupNow")}
              </Button>
            </div>

            <div className="col-md-6">
              <Button
                className="w-100"
                disabled={!selectedBackup || busyAction !== null}
                color="warning"
                onClick={handleRestoreBackup}
              >
                <FontAwesomeIcon icon={faHistory} className="me-1" />
                {t("Auth.Settings.Admin.Backup.BackupsManagement.RestoreSystemToSelectedBackup")}
              </Button>
            </div>

            <div className="col-md-6">
              <Button
                disabled={!selectedBackup || busyAction !== null}
                className="w-100"
                color="danger"
                onClick={handleDeleteBackup}
              >
                <FontAwesomeIcon icon={faTrash} className="me-1" />
                {t("Auth.Settings.Admin.Backup.BackupsManagement.RemoveSelectedBackup")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default BackupSettingsView;

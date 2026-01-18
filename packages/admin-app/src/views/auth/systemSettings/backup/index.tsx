import { faHistory, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@initia/shared/ui/components/core/button";
import Form, { LabelView } from "@initia/shared/ui/components/form";
import SelectInput from "@initia/shared/ui/components/form/inputs/select";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { inputs, renderBackupTimestamp } from "./inputs";

const BackupSettingsView = () => {
  const { t } = useTranslation();

  const currentBackups = [
    {
      value: "backup_2024_01_01_15:12.zip",
      label: renderBackupTimestamp("backup_2024_01_01_15:12.zip"),
    },
  ];

  const [selectedBackup, setSelectedBackup] = useState<string | undefined>(undefined);

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Backup.Title")}>
      <div className="row">
        <div className="col-md-6">
          <h4 className="mb-3">{t("Auth.Settings.Admin.Backup.AutoSettings.Title")}</h4>

          <Form inputs={() => inputs(t)} onFormSubmit={() => ""} />
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
              <Button color="success" className="w-100">
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                {t("Auth.Settings.Admin.Backup.BackupsManagement.CreateNewBackupNow")}
              </Button>
            </div>

            <div className="col-md-6">
              <Button className="w-100" disabled={!selectedBackup} color="warning">
                <FontAwesomeIcon icon={faHistory} className="me-1" />
                {t("Auth.Settings.Admin.Backup.BackupsManagement.RestoreSystemToSelectedBackup")}
              </Button>
            </div>

            <div className="col-md-6">
              <Button disabled={!selectedBackup} className="w-100" color="danger">
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

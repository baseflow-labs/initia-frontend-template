import { useTranslation } from "react-i18next";

import TabsComp from "../../../../components/tab";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";
import SystemLoggerView from "./logger";
import UserActivityView from "./userActivity";
import UsersView from "./users";
import SystemMetadataSettingsView from "./metadata";
import SystemDataBulkInsertionView from "./bulkInseration";
import BackupSettingsView from "./backup";

const SystemSettingsView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      title: t("Auth.Settings.Admin.UserActivity.Title"),
      body: <UserActivityView />,
    },
    {
      title: t("Auth.Settings.Admin.SystemLogger.Title"),
      body: <SystemLoggerView />
    },
    {
      title: t("Auth.Settings.Admin.Users.Title"),
      body: <UsersView />
    },
    {
      title: t("Auth.Settings.Admin.Backup.Title"),
      body: <BackupSettingsView />
    },
    {
      title: t("Auth.Settings.Admin.Metadata.Title"),
      body: <SystemMetadataSettingsView />
    },
    {
      title: t("Auth.Settings.Admin.BulkDataInsertion.Title"),
      body: <SystemDataBulkInsertionView />
    },
  ];

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Title")}>
      <TabsComp
        tabs={tabs.map((tab, idx) =>
          ({
            ...tab,
            body: (
              <div className="mt-5 card shadow-sm">
                <div className="card-body p-5">
                  {tab.body}
                </div>
              </div>
            ),
            id: String(idx)
          })
        )}
      />
    </PageTemplate>
  );
};

export default SystemSettingsView;
import { useTranslation } from "react-i18next";

import TabsComp from "../../../../components/tab";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";
import SystemLoggerView from "./logger";
import UserActivityView from "./userActivity";

const AdminSettingsPage = () => {
  const { t } = useTranslation();


  const tabs = [
    {
      title: t("Auth.Settings.System.Title"),
      body: <UserActivityView />,
    },
    {
      title: t("Auth.Settings.PasswordReset.Title"),
      body: <SystemLoggerView />
    },
  ];

  return (
    <PageTemplate title={t("Auth.Settings.Title")}>
      <TabsComp tabs={tabs.map((tab, idx) => ({ ...tab, body: <div className="mt-5 card shadow-sm"><div className="card-body p-5">{tab.body}</div></div>, id: String(idx) }))} />
    </PageTemplate>
  );
};

export default AdminSettingsPage;
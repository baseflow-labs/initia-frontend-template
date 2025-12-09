import { useTranslation } from "react-i18next";

import {
  faBell,
  faDashboard,
  faHashtag,
  faShield,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import TabsComp from "../../../../components/tab";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";
import AccountSettingsTab from "./AccountSettingsTab";
import SystemSettingsTab from "./SystemSettings";
import BillingSettingsTab from "./BillingSettingsTab";
import ConnectionsSettingsTab from "./ConnectionsSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab";
import SecuritySettingsTab from "./SecuritySettingsTab";

const UserSettingsView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "account",
      title: t("Auth.Settings.User.Account.Title"),
      icon: faUser,
      content: <AccountSettingsTab />,
    },
    {
      id: "connections",
      title: t("Auth.Settings.User.Connections.Title"),
      icon: faHashtag,
      content: <ConnectionsSettingsTab />,
    },
    {
      id: "security",
      title: t("Auth.Settings.User.Security.Title"),
      icon: faShield,
      content: <SecuritySettingsTab />,
    },
    {
      id: "billing",
      title: t("Auth.Settings.User.Billing.Title"),
      icon: faWallet,
      content: <BillingSettingsTab />,
    },
    {
      id: "notifications",
      title: t("Auth.Settings.User.Notifications.Title"),
      icon: faBell,
      content: <NotificationsSettingsTab />,
    },
    {
      id: "system",
      title: t("Auth.Settings.User.System.Title"),
      icon: faDashboard,
      content: <SystemSettingsTab />,
    },
  ];

  return (
    <PageTemplate title={t("Auth.Settings.User.Title")}>
      <TabsComp
        items={tabs.map((tab) => ({
          ...tab,
          content: (
            <div className="card mt-4">
              <div className="card-body p-5">{tab.content}</div>
            </div>
          ),
        }))}
      />
    </PageTemplate>
  );
};

export default UserSettingsView;

import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../store/hooks";

import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";
import AccountSettingsTab from "./AccountSettingsTab";
import BillingSettingsTab from "./BillingSettingsTab";
import ConnectionsSettingsTab from "./ConnectionsSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab";
import SecuritySettingsTab from "./SecuritySettingsTab";

type SettingsTab = "account" | "security" | "billing" | "notifications" | "connections";

const UserSettingsView = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  return (
    <PageTemplate title={t("Auth.Settings.Title")}>
      <Fragment>
        <div className="row">
          {/* Tabs */}
          <div className="col-12 mb-4">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-pills flex-column flex-sm-row mb-0">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${activeTab === "account" ? "active" : ""}`}
                      onClick={() => setActiveTab("account")}
                    >
                      <i className="bx bx-user me-1" />
                      {t("Auth.Settings.Tabs.Account", { defaultValue: "Account" })}
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${activeTab === "security" ? "active" : ""}`}
                      onClick={() => setActiveTab("security")}
                    >
                      <i className="bx bx-lock-alt me-1" />
                      {t("Auth.Settings.Tabs.Security", { defaultValue: "Security" })}
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${activeTab === "billing" ? "active" : ""}`}
                      onClick={() => setActiveTab("billing")}
                    >
                      <i className="bx bx-detail me-1" />
                      {t("Auth.Settings.Tabs.Billing", { defaultValue: "Billing & Plans" })}
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${
                        activeTab === "notifications" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <i className="bx bx-bell me-1" />
                      {t("Auth.Settings.Tabs.Notifications", { defaultValue: "Notifications" })}
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className={`nav-link ${
                        activeTab === "connections" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("connections")}
                    >
                      <i className="bx bx-link-alt me-1" />
                      {t("Auth.Settings.Tabs.Connections", { defaultValue: "Connections" })}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "account" && (
            <div className="col-12">
              <AccountSettingsTab />
            </div>
          )}

          {activeTab === "security" && (
            <div className="col-12">
              <SecuritySettingsTab />
            </div>
          )}

          {activeTab === "billing" && (
            <div className="col-12">
              <BillingSettingsTab />
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="col-12">
              <NotificationsSettingsTab />
            </div>
          )}

          {activeTab === "connections" && (
            <div className="col-12">
              <ConnectionsSettingsTab />
            </div>
          )}
        </div>
      </Fragment>
    </PageTemplate>
  );
};

export default UserSettingsView;

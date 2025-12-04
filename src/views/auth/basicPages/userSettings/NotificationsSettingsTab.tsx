import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../../store/actions/notifications";

const NotificationsSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [prefs, setPrefs] = useState({
    emailAnnouncements: true,
    emailSecurity: true,
    emailProductUpdates: false,
    inAppReminders: true,
    inAppMentions: true,
    inAppSystem: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSave = () => {
    // later you call API here
    dispatch(
      addNotification({
        msg: t("Global.Form.SuccessMsg", {
          action: t("Global.Form.Labels.Update"),
          data: t("Auth.Settings.Notifications.Title", {
            defaultValue: "Notifications",
          }),
        }),
      })
    );
  };

  return (
    <div className="card">
      <div className="card-header border-bottom">
        <h5 className="card-title mb-0">
          {t("Auth.Settings.Notifications.Title", {
            defaultValue: "Notifications",
          })}
        </h5>
      </div>
      <div className="card-body">
        <p className="text-muted mb-4">
          {t("Auth.Settings.Notifications.Description", {
            defaultValue:
              "Choose which types of notifications you want to receive.",
          })}
        </p>

        <h6 className="mb-2">
          {t("Auth.Settings.Notifications.EmailTitle", {
            defaultValue: "Email notifications",
          })}
        </h6>
        <ul className="list-unstyled mb-4">
          <li className="mb-2 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notif-email-announcements"
              checked={prefs.emailAnnouncements}
              onChange={() => toggle("emailAnnouncements")}
            />
            <label
              className="form-check-label"
              htmlFor="notif-email-announcements"
            >
              {t("Auth.Settings.Notifications.EmailAnnouncements", {
                defaultValue: "Announcements & tips",
              })}
            </label>
          </li>
          <li className="mb-2 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notif-email-security"
              checked={prefs.emailSecurity}
              onChange={() => toggle("emailSecurity")}
            />
            <label
              className="form-check-label"
              htmlFor="notif-email-security"
            >
              {t("Auth.Settings.Notifications.EmailSecurity", {
                defaultValue: "Security alerts & login notifications",
              })}
            </label>
          </li>
          <li className="mb-2 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notif-email-updates"
              checked={prefs.emailProductUpdates}
              onChange={() => toggle("emailProductUpdates")}
            />
            <label
              className="form-check-label"
              htmlFor="notif-email-updates"
            >
              {t("Auth.Settings.Notifications.EmailProductUpdates", {
                defaultValue: "Product updates & changelog",
              })}
            </label>
          </li>
        </ul>

        <h6 className="mb-2">
          {t("Auth.Settings.Notifications.InAppTitle", {
            defaultValue: "In-app notifications",
          })}
        </h6>
        <ul className="list-unstyled mb-4">
          <li className="mb-2 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notif-inapp-reminders"
              checked={prefs.inAppReminders}
              onChange={() => toggle("inAppReminders")}
            />
            <label
              className="form-check-label"
              htmlFor="notif-inapp-reminders"
            >
              {t("Auth.Settings.Notifications.InAppReminders", {
                defaultValue: "Reminders & tasks",
              })}
            </label>
          </li>
          <li className="mb-2 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notif-inapp-mentions"
              checked={prefs.inAppMentions}
              onChange={() => toggle("inAppMentions")}
            />
            <label
              className="form-check-label"
              htmlFor="notif-inapp-mentions"
            >
              {t("Auth.Settings.Notifications.InAppMentions", {
                defaultValue: "Mentions & comments",
              })}
            </label>
          </li>
          <li className="mb-2 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="notif-inapp-system"
              checked={prefs.inAppSystem}
              onChange={() => toggle("inAppSystem")}
            />
            <label
              className="form-check-label"
              htmlFor="notif-inapp-system"
            >
              {t("Auth.Settings.Notifications.InAppSystem", {
                defaultValue: "System & billing alerts",
              })}
            </label>
          </li>
        </ul>

        <button type="button" className="btn btn-primary" onClick={onSave}>
          {t("Global.Form.Labels.Save")}
        </button>
      </div>
    </div>
  );
};

export default NotificationsSettingsTab;

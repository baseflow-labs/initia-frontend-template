import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../../../store/actions/notifications";

type ChannelKey = "email" | "inApp";

type NotificationTypeKey =
  | "announcements"
  | "security"
  | "productUpdates"
  | "reminders"
  | "mentions"
  | "system";

// horizontal axis
const NOTIFICATION_CHANNELS: {
  key: ChannelKey;
  labelKey: string;
  defaultLabel: string;
}[] = [
  {
    key: "email",
    labelKey: "Auth.Settings.User.Notifications.Channels.Email",
    defaultLabel: "Email notifications",
  },
  {
    key: "inApp",
    labelKey: "Auth.Settings.User.Notifications.Channels.InApp",
    defaultLabel: "In-app notifications",
  },
];

// vertical axis
const NOTIFICATION_TYPES: {
  key: NotificationTypeKey;
  labelKey: string;
  defaultLabel: string;
}[] = [
  {
    key: "announcements",
    // reuse text for announcements
    labelKey: "Auth.Settings.User.Notifications.EmailAnnouncements",
    defaultLabel: "Announcements & tips",
  },
  {
    key: "security",
    labelKey: "Auth.Settings.User.Notifications.EmailSecurity",
    defaultLabel: "Security alerts & login notifications",
  },
  {
    key: "productUpdates",
    labelKey: "Auth.Settings.User.Notifications.EmailProductUpdates",
    defaultLabel: "Product updates & changelog",
  },
  {
    key: "reminders",
    labelKey: "Auth.Settings.User.Notifications.InAppReminders",
    defaultLabel: "Reminders & tasks",
  },
  {
    key: "mentions",
    labelKey: "Auth.Settings.User.Notifications.InAppMentions",
    defaultLabel: "Mentions & comments",
  },
  {
    key: "system",
    labelKey: "Auth.Settings.User.Notifications.InAppSystem",
    defaultLabel: "System & billing alerts",
  },
];

// nested state: prefs[channel][type] = boolean
type PrefsState = Record<ChannelKey, Record<NotificationTypeKey, boolean>>;

const NotificationsSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [prefs, setPrefs] = useState<PrefsState>({
    email: {
      announcements: true,
      security: true,
      productUpdates: false,
      reminders: false, // not in original email prefs
      mentions: false,
      system: false,
    },
    inApp: {
      announcements: false,
      security: false,
      productUpdates: false,
      reminders: true,
      mentions: true,
      system: true,
    },
  });

  const toggle = (channel: ChannelKey, type: NotificationTypeKey) => {
    setPrefs((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type],
      },
    }));
  };

  const onSave = () => {
    // later: send `prefs` to API
    // e.g. NotificationsApi.updateUserPrefs(prefs)

    dispatch(
      addNotification({
        msg: t("Global.Form.SuccessMsg", {
          action: t("Global.Form.Labels.Update"),
          data: t("Auth.Settings.User.Notifications.Title", {
            defaultValue: "Notifications",
          }),
        }),
      })
    );
  };

  return (
    <div>
      <p className="text-muted mb-4">
        {t("Auth.Settings.User.Notifications.Description", {
          defaultValue:
            "Choose which types of notifications you want to receive.",
        })}
      </p>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th className="text-start">
                {t("Auth.Settings.User.Notifications.TypeHeader", {
                  defaultValue: "Notification type",
                })}
              </th>

              {NOTIFICATION_CHANNELS.map((channel) => (
                <th key={channel.key} className="text-center">
                  {t(channel.labelKey, {
                    defaultValue: channel.defaultLabel,
                  })}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {NOTIFICATION_TYPES.map((type) => (
              <tr key={type.key}>
                <td className="text-start">
                  {t(type.labelKey, {
                    defaultValue: type.defaultLabel,
                  })}
                </td>

                {NOTIFICATION_CHANNELS.map((channel) => {
                  const id = `notif-${channel.key}-${type.key}`;

                  return (
                    <td key={channel.key} className="text-center">
                      <div className="form-check form-switch d-inline-flex align-items-center justify-content-center mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={id}
                          checked={prefs[channel.key][type.key]}
                          onChange={() => toggle(channel.key, type.key)}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" className="btn btn-primary" onClick={onSave}>
        {t("Global.Form.Labels.Save")}
      </button>
    </div>
  );
};

export default NotificationsSettingsTab;

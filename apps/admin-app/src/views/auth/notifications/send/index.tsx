import * as NotificationApi from "@initia/shared/api/notifications";
import type { SendNotificationPayload } from "@initia/shared/types/notifications";
import Button from "@initia/shared/ui/components/core/button";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

const initialForm: SendNotificationPayload = {
  title: "",
  message: "",
  service: "dashboard",
  channel: "In App",
  important: false,
  targetType: "all",
};

const SendNotificationsView = () => {
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [sentCount, setSentCount] = useState<number | null>(null);
  const [form, setForm] = useState<SendNotificationPayload>(initialForm);

  const update = <K extends keyof SendNotificationPayload>(
    key: K,
    value: SendNotificationPayload[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.title.trim() || !form.message.trim()) return;

    setIsSaving(true);
    setSentCount(null);

    try {
      const response = await NotificationApi.send(form);
      setSentCount(response.payload?.length || 0);
      setForm(initialForm);
    } catch (error) {
      apiCatchGlobalHandler(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageTemplate title={t("Auth.Notifications.SendTitle", "Send Notification")}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">{t("Auth.Notifications.Fields.Title", "Title")}</label>
              <input
                className="form-control"
                value={form.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => update("title", e.target.value)}
                placeholder={t(
                  "Auth.Notifications.Fields.TitlePlaceholder",
                  "Enter notification title"
                )}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">
                {t("Auth.Notifications.Fields.Service", "Service")}
              </label>
              <select
                className="form-select"
                value={form.service}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => update("service", e.target.value)}
              >
                <option value="dashboard">Dashboard</option>
                <option value="support">Support</option>
                <option value="messaging">Messaging</option>
                <option value="notifications">Notifications</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">
                {t("Auth.Notifications.Fields.Message", "Message")}
              </label>
              <textarea
                className="form-control"
                value={form.message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  update("message", e.target.value)
                }
                rows={5}
                placeholder={t("Auth.Notifications.Fields.MessagePlaceholder", "Type your message")}
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label">
                {t("Auth.Notifications.Fields.TargetType", "Target")}
              </label>
              <select
                className="form-select"
                value={form.targetType || "all"}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  update("targetType", e.target.value as SendNotificationPayload["targetType"])
                }
              >
                <option value="all">All Users</option>
                <option value="role">Role</option>
                <option value="user">Single User</option>
              </select>
            </div>

            {form.targetType === "role" && (
              <div className="col-12 col-md-4">
                <label className="form-label">
                  {t("Auth.Notifications.Fields.TargetRole", "Target Role")}
                </label>
                <input
                  className="form-control"
                  value={form.targetRole || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    update("targetRole", e.target.value)
                  }
                  placeholder="admin"
                />
              </div>
            )}

            {form.targetType === "user" && (
              <div className="col-12 col-md-4">
                <label className="form-label">
                  {t("Auth.Notifications.Fields.TargetUser", "Target User ID")}
                </label>
                <input
                  className="form-control"
                  value={form.targetUserId || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    update("targetUserId", e.target.value)
                  }
                  placeholder="UUID"
                />
              </div>
            )}

            <div className="col-12 col-md-4 d-flex align-items-end">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="important-notification"
                  checked={!!form.important}
                  onChange={(e) => update("important", e.target.checked)}
                />
                <label className="form-check-label" htmlFor="important-notification">
                  {t("Auth.Notifications.Fields.Important", "Mark as important")}
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mt-4">
            <Button color="primary" disabled={isSaving} onClick={submit}>
              {isSaving
                ? t("Global.Labels.Sending", "Sending...")
                : t("Global.Labels.Send", "Send")}
            </Button>

            {sentCount !== null && (
              <small className="text-success">
                {t("Auth.Notifications.SentCount", "Notification sent to {{count}} user(s)", {
                  count: sentCount,
                })}
              </small>
            )}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SendNotificationsView;

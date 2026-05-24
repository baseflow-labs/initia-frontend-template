import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { addNotification } from "../../../../store/actions/notifications";
import { sendGenericEmail } from "../../../../api/mailing";

const MailingSettingsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async (values?: Record<string, unknown>) => {
    const to = String(values?.to || "").trim();
    const title = String(values?.title || "").trim();
    const content = String(values?.content || "").trim();

    await sendGenericEmail({ to, title, content });

    dispatch(
      addNotification({
        type: "warning",
        msg: t("Auth.Settings.Admin.Mailing.Success", "Email sent successfully"),
      })
    );
  };

  return (
    <PageTemplate title={t("Auth.Settings.Admin.Mailing.Title", "Mailing Service")}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            {t(
              "Auth.Settings.Admin.Mailing.Description",
              "Send a test or announcement email through the backend mailer service."
            )}
          </p>
          <Form
            onFormSubmit={onSubmit}
            inputs={() => [
              {
                name: "to",
                label: t("Auth.Settings.Admin.Mailing.To", "Recipient Email"),
                type: "email",
                required: true,
                fullWidth: true,
              },
              {
                name: "title",
                label: t("Auth.Settings.Admin.Mailing.Subject", "Subject"),
                type: "text",
                required: true,
                fullWidth: true,
              },
              {
                name: "content",
                label: t("Auth.Settings.Admin.Mailing.Content", "Email Content"),
                type: "textarea",
                required: true,
                rows: 8,
                fullWidth: true,
              },
            ]}
          />
        </div>
      </div>
    </PageTemplate>
  );
};

export default MailingSettingsView;

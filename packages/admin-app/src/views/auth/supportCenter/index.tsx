import TabsComp from "@initia/shared/ui/components/tab";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import ContactSubmissionsView from "./contactSubmissions";
import FaqManagementView from "./faq";
import SupportTicketsManagementView from "./tickets";
import UserManualManagementView from "./userManual";

const SupportCenterManagementView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      title: t("Auth.SupportCenter.Admin.Tickets.Title", "Support Tickets"),
      content: <SupportTicketsManagementView />,
    },
    {
      title: t("Auth.SupportCenter.Admin.ContactSubmissions.Title", "Contact Submissions"),
      content: <ContactSubmissionsView />,
    },
    {
      title: t("Auth.SupportCenter.Admin.Faq.Title", "FAQ Management"),
      content: <FaqManagementView />,
    },
    {
      title: t("Auth.SupportCenter.Admin.UserManual.Title", "User Manual Management"),
      content: <UserManualManagementView />,
    },
  ];

  return (
    <PageTemplate title={t("Auth.SupportCenter.Admin.Title", "Support Center Management")}>
      <TabsComp
        items={tabs.map((tab, idx) => ({
          ...tab,
          content: (
            <div className="mt-5 card shadow-sm">
              <div className="card-body p-5">{tab.content}</div>
            </div>
          ),
          id: String(idx),
        }))}
      />
    </PageTemplate>
  );
};

export default SupportCenterManagementView;

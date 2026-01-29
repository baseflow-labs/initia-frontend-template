import TabsComp from "@initia/shared/ui/components/tab";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useTranslation } from "react-i18next";

import SupportTicketsSubmissionView from "./SubmitTicket";
import SupportTicketsListingView from "./Tickets";

const SupportTicketsView = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "submit",
      title: t("Auth.SupportCenter.Tickets.SubmitNewTicket.Title"),
      content: <SupportTicketsSubmissionView />,
    },
    {
      id: "view",
      title: t("Auth.SupportCenter.Tickets.MyTickets.Title"),
      content: <SupportTicketsListingView />,
    },
  ];

  const pageBreadcrumbs = [{ label: t("Auth.SupportCenter.Title"), path: "/support-center" }];

  return (
    <PageTemplate title={t("Auth.SupportCenter.Tickets.Title")} breadcrumbs={pageBreadcrumbs}>
      <div className="container mb-5">
        <TabsComp
          items={tabs.map((tab) => ({
            ...tab,
            content: <div className="mt-4">{tab.content}</div>,
          }))}
        />
      </div>
    </PageTemplate>
  );
};

export default SupportTicketsView;

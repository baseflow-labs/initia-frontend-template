import TabsComp from "@/components/tab";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
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

  return (
    <PageTemplate title={t("Auth.SupportCenter.Tickets.Title")}>
      <div className="container mb-5">
        <TabsComp
          items={tabs.map((tab) => ({
            ...tab,
            content: <div className="mt-4">{tab.content}</div>,
          }))}
          color="danger"
        />
      </div>
    </PageTemplate>
  );
};

export default SupportTicketsView;

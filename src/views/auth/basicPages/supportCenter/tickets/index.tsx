import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import TabsComp from "@/components/tab";
import BackToSupportCenterButton from "../BackButton";
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
    <Fragment>
      <div className="bg-danger py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <BackToSupportCenterButton />

              <h1 className="mb-3 text-center text-white">
                {t("Auth.SupportCenter.Tickets.Title")}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <TabsComp items={tabs} color="danger" />
      </div>
    </Fragment>
  );
};

export default SupportTicketsView;

import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import { ticketTableColumns } from "./consts";

const SupportTicketsListingView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/tickets"
      inputs={ticketTableColumns(t)}
      singleItem={t("Auth.SupportCenter.Tickets.Ticket")}
      includeCreate
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default SupportTicketsListingView;

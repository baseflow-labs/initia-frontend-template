import { useTranslation } from "react-i18next";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";

import { ticketTableColumns } from "./inputs";

const SupportTicketsManagementView = () => {
  const { t } = useTranslation();

  return (
    <ApiDataTable
      dataApiEndpoint="/support/tickets"
      inputs={ticketTableColumns(t)}
      singleItem={t("Auth.SupportCenter.Admin.Tickets.Ticket", "Ticket")}
      includeView
      includeUpdate
      includeDelete
    />
  );
};

export default SupportTicketsManagementView;

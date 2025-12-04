import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import DynamicTable from "../../../../../components/table";
import { ticketTableColumns } from "./consts";

const SupportTicketsListingView = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-end">
        <button
          className="btn btn-warning btn-sm"
          // onClick={() => setActiveTab("submit")}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          {t("Auth.SupportCenter.Tickets.SubmitNewTicket.Title")}
        </button>
      </div>

      <div>
        <DynamicTable
          dataApiEndpoint="users"
          columns={ticketTableColumns(t)}
        />
      </div>
    </div>
  );
};

export default SupportTicketsListingView;

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import DynamicTable from "../../../../../components/table";
import { ticketTableColumns } from "./consts";

const SupportTicketsListingView = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <button
          className="btn btn-warning btn-sm float-end"
          // onClick={() => setActiveTab("submit")}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          {t("Auth.SupportCenter.Tickets.SubmitNewTicket")}
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

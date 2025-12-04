import { faCheckCircle, faClock, faExclamationCircle, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created: string;
  lastUpdate: string;
}

const SupportTicketsListingView = () => {
  const { t } = useTranslation();

  const myTickets: Ticket[] = [
    {
      id: "TKT-2024-001",
      subject: "Unable to reset password",
      category: "Account Access",
      status: "in-progress",
      priority: "high",
      created: "2024-12-01",
      lastUpdate: "2024-12-02",
    },
    {
      id: "TKT-2024-002",
      subject: "Billing discrepancy on last invoice",
      category: "Billing Question",
      status: "open",
      priority: "medium",
      created: "2024-11-28",
      lastUpdate: "2024-11-29",
    },
    {
      id: "TKT-2024-003",
      subject: "Feature request: Dark mode",
      category: "Feature Request",
      status: "resolved",
      priority: "low",
      created: "2024-11-25",
      lastUpdate: "2024-11-30",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { color: "primary", icon: faExclamationCircle },
      "in-progress": { color: "warning", icon: faClock },
      resolved: { color: "dark", icon: faCheckCircle },
      closed: { color: "secondary", icon: faCheckCircle },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`badge bg-${config.color}`}>
        <FontAwesomeIcon icon={config.icon} className="me-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: "primary",
      medium: "warning",
      high: "danger",
      urgent: "dark",
    };
    return (
      <span
        className={`badge bg-${priorityConfig[priority as keyof typeof priorityConfig]}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{t("Auth.SupportCenter.Tickets.MyTickets.Title")}</h5>
        <button
          className="btn btn-warning btn-sm"
          // onClick={() => setActiveTab("submit")}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New Ticket
        </button>
      </div>
      
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <code className="text-primary">{ticket.id}</code>
                  </td>
                  <td className="fw-semibold">{ticket.subject}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {ticket.category}
                    </span>
                  </td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td className="text-muted small">{ticket.created}</td>
                  <td className="text-muted small">{ticket.lastUpdate}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketsListingView;

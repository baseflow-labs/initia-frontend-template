import { faArrowLeft, faCheckCircle, faClock, faExclamationCircle, faEye, faPaperPlane, faPlus, faSearch, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  created: string;
  lastUpdate: string;
}

const SupportTicketsView = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"submit" | "view">("submit");
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    attachment: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachment: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        subject: "",
        category: "",
        priority: "",
        description: "",
        attachment: null,
      });
      setSubmitted(false);
      setActiveTab("view");
    }, 2000);
  };

  const categories = [
    "Technical Issue",
    "Billing Question",
    "Account Access",
    "Feature Request",
    "Bug Report",
    "Performance Issue",
    "Security Concern",
    "Other",
  ];

  const priorities = [
    { value: "low", label: "Low", color: "primary" },
    { value: "medium", label: "Medium", color: "warning" },
    { value: "high", label: "High", color: "danger" },
    { value: "urgent", label: "Urgent", color: "dark" },
  ];

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
    <Fragment>
      {/* Header */}
      <div className="bg-warning text-dark py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link
                to="/support-center"
                className="text-dark text-decoration-none d-inline-block mb-3"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Back to Support Center
              </Link>
              <h1 className="display-5 mb-3">Support Tickets</h1>
              <p className="lead">
                Submit a new ticket or track your existing support requests
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "submit" ? "active" : ""}`}
              onClick={() => setActiveTab("submit")}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Submit New Ticket
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "view" ? "active" : ""}`}
              onClick={() => setActiveTab("view")}
            >
              <FontAwesomeIcon icon={faEye} className="me-2" />
              My Tickets
              <span className="badge bg-danger ms-2">
                {myTickets.filter((t) => t.status !== "closed").length}
              </span>
            </button>
          </li>
        </ul>

        {/* Submit Ticket Tab */}
        {activeTab === "submit" && (
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark">
                  <h4 className="mb-0">
                    <FontAwesomeIcon icon={faTicket} className="me-2" />
                    Create New Support Ticket
                  </h4>
                </div>
                <div className="card-body p-4">
                  {submitted && (
                    <div className="alert alert-dark alert-dismissible fade show">
                      <strong>Ticket Created!</strong> Your support ticket has been
                      submitted darkfully. Ticket ID: TKT-2024-
                      {Math.floor(Math.random() * 1000)}
                    </div>
                  )}

                  <div className="alert alert-primary mb-4">
                    <strong>Before submitting a ticket:</strong>
                    <ul className="mb-0 mt-2">
                      <li>
                        Check our <Link to="/support-center/faq">FAQ</Link> for quick
                        answers
                      </li>
                      <li>
                        Review the{" "}
                        <Link to="/support-center/user-manual">User Manual</Link> for
                        detailed guides
                      </li>
                      <li>Provide as much detail as possible for faster resolution</li>
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label fw-semibold">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of the issue"
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label fw-semibold">
                          Category <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a category...</option>
                          {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="priority" className="form-label fw-semibold">
                          Priority <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select priority...</option>
                          {priorities.map((priority, index) => (
                            <option key={index} value={priority.value}>
                              {priority.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="form-label fw-semibold"
                      >
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows={6}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Please provide a detailed description of your issue, including steps to reproduce if applicable..."
                        required
                      ></textarea>
                      <div className="form-text">
                        Minimum 50 characters ({formData.description.length}/50)
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="attachment" className="form-label fw-semibold">
                        Attachment (Optional)
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="attachment"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      />
                      <div className="form-text">
                        Accepted formats: JPG, PNG, PDF, DOC, DOCX (Max 5MB)
                      </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex">
                      <button
                        type="submit"
                        className="btn btn-warning text-dark px-4"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                        Submit Ticket
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setFormData({
                            subject: "",
                            category: "",
                            priority: "",
                            description: "",
                            attachment: null,
                          })
                        }
                      >
                        Clear Form
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Help Card */}
              <div className="card bg-light shadow-sm mt-4">
                <div className="card-body">
                  <h5 className="card-title">Need Immediate Help?</h5>
                  <p className="text-muted mb-3">
                    For urgent issues, you can also reach us through:
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/support-center/contact-us" className="btn btn-sm btn-outline-warning">
                      Live Chat
                    </Link>
                    <a href="tel:+15551234567" className="btn btn-sm btn-outline-warning">
                      Call Support
                    </a>
                    <Link to="/support-center/contact-us" className="btn btn-sm btn-outline-warning">
                      Email Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Tickets Tab */}
        {activeTab === "view" && (
          <div className="row">
            <div className="col-12">
              {/* Search and Filter */}
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search tickets..."
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <select className="form-select">
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select className="form-select">
                        <option value="">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tickets List */}
              <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">My Support Tickets</h5>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setActiveTab("submit")}
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

              {/* Statistics */}
              <div className="row mt-4">
                <div className="col-md-3 mb-3">
                  <div className="card bg-primary text-white shadow-sm">
                    <div className="card-body text-center">
                      <h3 className="mb-0">{myTickets.length}</h3>
                      <small>Total Tickets</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-warning text-dark shadow-sm">
                    <div className="card-body text-center">
                      <h3 className="mb-0">
                        {myTickets.filter((t) => t.status === "in-progress").length}
                      </h3>
                      <small>In Progress</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-dark text-white shadow-sm">
                    <div className="card-body text-center">
                      <h3 className="mb-0">
                        {myTickets.filter((t) => t.status === "resolved").length}
                      </h3>
                      <small>Resolved</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card bg-primary text-white shadow-sm">
                    <div className="card-body text-center">
                      <h3 className="mb-0">24h</h3>
                      <small>Avg Response Time</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SupportTicketsView;

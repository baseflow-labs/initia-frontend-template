import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import NotificationsHeaderView from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen, faTrash } from "@fortawesome/free-solid-svg-icons";

const NotificationsView = () => {
  const { t } = useTranslation();

  // Dummy data just to show layout – replace with real data / props / API.
  const notifications = [
    {
      id: 1,
      title: "Your order has been shipped",
      body: "Order #12345 has been shipped and is on its way to you.",
      type: "primary", // primary | dark | warning | danger
      isRead: false,
      time: "5 min ago",
    },
    {
      id: 2,
      title: "Payment received",
      body: "We’ve darkfully received your last payment.",
      type: "dark",
      isRead: true,
      time: "2 hours ago",
    },
    {
      id: 3,
      title: "Password changed",
      body: "Your account password was changed recently.",
      type: "warning",
      isRead: false,
      time: "Yesterday",
    },
  ];

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "dark":
        return "badge bg-dark-subtle text-dark border border-dark-subtle";
      case "warning":
        return "badge bg-warning-subtle text-dark border border-warning-subtle";
      case "danger":
        return "badge bg-danger-subtle text-danger border border-danger-subtle";
      default:
        return "badge bg-primary-subtle text-primary border border-primary-subtle";
    }
  };

  const actionButtons = [
    {
      label: t("Auth.Notifications.MarkAllRead", "Mark all as read"),
    },
    {
      label: t("Auth.Notifications.Refresh", "Refresh"),
    },
  ];

  return (
    <PageTemplate
      title={t("Auth.Notifications.Title", "Notifications")}
      actionButtons={actionButtons}
    >
      <div className="w-100 mb-3">
        <NotificationsHeaderView />
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-2">
            <span className="badge bg-light text-muted rounded-pill px-3 py-2">
              {t("Auth.Notifications.Empty.Badge", "No notifications")}
            </span>
          </div>
          <h2 className="h5 mb-1">
            {t("Auth.Notifications.Empty.Title", "You're all caught up!")}
          </h2>
          <p className="text-muted mb-0">
            {t(
              "Auth.Notifications.Empty.Body",
              "We’ll let you know when there’s something new."
            )}
          </p>
        </div>
      )}

      {/* List of notifications */}
      {notifications.length > 0 && (
        <ul className="list-group list-group-flush">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={
                "list-group-item px-0 d-flex gap-3 align-items-start border-0 border-bottom" +
                (n.isRead ? " bg-white" : " bg-light-subtle")
              }
            >
              {/* Status dot */}
              <div className="pt-1">
                <span
                  className={
                    "d-inline-block rounded-circle me-1 " +
                    (n.isRead ? "bg-secondary-subtle" : "bg-primary")
                  }
                  style={{ width: 10, height: 10 }}
                />
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h3 className="h6 mb-0">{n.title}</h3>
                  <span className="text-muted small ms-3">{n.time}</span>
                </div>

                <p className="mb-1 small text-muted">{n.body}</p>

                <div className="d-flex flex-wrap gap-2 align-items-center mt-1">
                  <span className={getTypeBadgeClass(n.type)}>
                    {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                  </span>

                  {!n.isRead && (
                    <span className="badge bg-primary text-white">
                      {t("Auth.Notifications.Unread", "New")}
                    </span>
                  )}
                </div>
              </div>

              <div className="d-flex flex-column align-items-end gap-1">
                <button
                  type="button"
                  className="btn btn-link btn-sm text-decoration-none px-0"
                >
                  <FontAwesomeIcon icon={faEnvelopeOpen} />
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-sm text-danger text-decoration-none px-0"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Optional footer */}
      <div className="text-center mt-3">
        <button type="button" className="btn btn-outline-secondary btn-sm">
          {t("Auth.Notifications.LoadMore", "Load more")}
        </button>
      </div>
    </PageTemplate>
  );
};

export default NotificationsView;

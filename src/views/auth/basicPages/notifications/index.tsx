import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import PageTemplate from "../../../../layouts/auth/pages/pageTemplate";

const NotificationsView = () => {
  const { t } = useTranslation();

  // Dummy data just to show layout – replace with real data / props / API.
  const notifications = [
    {
      id: 1,
      title: t("notifications.items.orderShippedTitle", "Your order has been shipped"),
      body: t(
        "notifications.items.orderShippedBody",
        "Order #12345 has been shipped and is on its way to you."
      ),
      type: "primary", // primary | dark | warning | danger
      isRead: false,
      time: "5 min ago",
    },
    {
      id: 2,
      title: t("notifications.items.paymentReceivedTitle", "Payment received"),
      body: t(
        "notifications.items.paymentReceivedBody",
        "We’ve darkfully received your last payment."
      ),
      type: "dark",
      isRead: true,
      time: "2 hours ago",
    },
    {
      id: 3,
      title: t("notifications.items.passwordChangedTitle", "Password changed"),
      body: t(
        "notifications.items.passwordChangedBody",
        "Your account password was changed recently."
      ),
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
      label: t("notifications.actions.markAllRead", "Mark all as read")
    },
    {
      label: t("notifications.actions.refresh", "Refresh")
    }
  ]

  return (
    <PageTemplate title={t("notifications.title", "Notifications")} actionButtons={actionButtons}>
      <div className="card shadow-sm border-0">
        {/* Card header with filters/search */}
        <div className="card-header bg-white border-0 pb-0">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary active"
              >
                {t("notifications.filters.all", "All")}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                {t("notifications.filters.unread", "Unread")}
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                {t("notifications.filters.important", "Important")}
              </button>
            </div>

            <div className="input-group input-group-sm" style={{ maxWidth: 260 }}>
              <span className="input-group-text bg-light border-end-0">
                <span className="bi bi-search" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder={t(
                  "notifications.search.placeholder",
                  "Search notifications…"
                )}
              />
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* Empty state */}
          {notifications.length === 0 && (
            <div className="text-center py-5">
              <div className="mb-2">
                <span className="badge bg-light text-muted rounded-pill px-3 py-2">
                  {t("notifications.empty.badge", "No notifications")}
                </span>
              </div>
              <h2 className="h5 mb-1">
                {t("notifications.empty.title", "You're all caught up!")}
              </h2>
              <p className="text-muted mb-0">
                {t(
                  "notifications.empty.body",
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

                  {/* Main content */}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h3 className="h6 mb-0">{n.title}</h3>
                      <span className="text-muted small ms-3">
                        {n.time}
                      </span>
                    </div>

                    <p className="mb-1 small text-muted">{n.body}</p>

                    <div className="d-flex flex-wrap gap-2 align-items-center mt-1">
                      <span className={getTypeBadgeClass(n.type)}>
                        {t(
                          `notifications.type.${n.type}`,
                          n.type.charAt(0).toUpperCase() + n.type.slice(1)
                        )}
                      </span>
                      {!n.isRead && (
                        <span className="badge bg-primary text-white">
                          {t("notifications.badges.unread", "New")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="d-flex flex-column align-items-end gap-1">
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-decoration-none px-0"
                    >
                      {t(
                        "notifications.actions.markRead",
                        n.isRead ? "Mark as unread" : "Mark as read"
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-danger text-decoration-none px-0"
                    >
                      {t("notifications.actions.delete", "Delete")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Optional footer */}
        <div className="card-footer bg-white border-0 text-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
          >
            {t("notifications.actions.loadMore", "Load more")}
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NotificationsView;

import * as NotificationApi from "@/api/notifications";
import Button from "@/components/core/button";
import { Notification } from "@/layouts/auth/navs/navbar";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { viewDayDateFormat, viewTimeFormat } from "@/utils/consts";
import { apiCatchGlobalHandler } from "@/utils/function";
import { faCircle, faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import NotificationsHeaderView from "./Header";

const NotificationsView = () => {
  const { t } = useTranslation();

  const [notifications, setNotification] = useState<Notification[]>([]);
  const [filter, setFiler] = useState<string>("all");

  const getData = (params?: object) => {
    NotificationApi.get(params)
      .then((res) => {
        setNotification(
          res.data.sort((a: Notification, b: Notification) =>
            a.createdAt > b.createdAt ? -1 : 1
          ) || []
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useLayoutEffect(() => {
    getData();
  }, [filter]);

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
      label: t("Auth.Notifications.MarkAllRead"),
      onClick: () => {
        NotificationApi.markAllAsRead(notifications);
      },
    },
    {
      label: t("Auth.Notifications.Refresh"),
      onClick: () => getData(),
    },
  ];

  const markAsRead = (notification: Notification) => {
    NotificationApi.markAsRead(notification)
      .then(() => {
        setNotification((current) =>
          current.map((n) =>
            n.id === notification.id
              ? {
                  ...n,
                  isRead: true,
                }
              : n
          )
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <PageTemplate
      title={t("Auth.Notifications.Title", "Notifications")}
      actionButtons={actionButtons}
    >
      <div className="w-100 mb-3">
        <NotificationsHeaderView filter={filter} setFilter={setFiler} />
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
            {t("Auth.Notifications.Empty.Body", "We’ll let you know when there’s something new.")}
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
                (n.isRead ? " bg-white" : " bg-light")
              }
            >
              {/* Status dot */}
              <div className="pt-1">
                <FontAwesomeIcon
                  icon={faCircle}
                  className={"ms-2 " + (n.isRead ? "text-white" : "text-primary")}
                />
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h3 className="h6 mb-0">{n.title}</h3>
                  <span className="text-muted small ms-3">
                    {moment(n.createdAt).format(viewTimeFormat + " @ " + viewDayDateFormat)}
                  </span>
                </div>

                <p className="mb-1 small text-muted">{n.message}</p>

                <div className="d-flex flex-wrap gap-2 align-items-center mt-1">
                  {n.important && <span className={getTypeBadgeClass("danger")}>Important</span>}

                  <span className={getTypeBadgeClass(n.service)}>
                    {n.service.charAt(0).toUpperCase() + n.service.slice(1)}
                  </span>
                </div>
              </div>

              <div className="d-flex flex-column align-items-end gap-1">
                <div className="pe-2 my-auto">
                  <FontAwesomeIcon
                    icon={n.isRead ? faEnvelopeOpen : faEnvelope}
                    onClick={() => (!n.isRead ? markAsRead(n) : null)}
                    className={!n.isRead ? "text-primary" : ""}
                    role={!n.isRead ? "button" : undefined}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Optional footer */}
      <div className="text-center mt-3">
        <Button outline color="secondary" size="sm">
          {t("Auth.Notifications.LoadMore", "Load more")}
        </Button>
      </div>
    </PageTemplate>
  );
};

export default NotificationsView;

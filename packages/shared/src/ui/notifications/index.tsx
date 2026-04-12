import { faCircle, faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import * as NotificationApi from "../../api/notifications";
import Button from "../../ui/components/core/button";
import PageTemplate from "../../ui/layouts/auth/pages/pageTemplate";
import { viewDayDateFormat, viewTimeFormat } from "../../utils/consts";
import { apiCatchGlobalHandler } from "../../utils/function";
import type { Notification } from "../../types/notifications";
import {
  connectNotificationsSocket,
  onNotificationReceived,
  onNotificationReconnect,
} from "../../socket/notifications";

import NotificationsHeaderView from "./Header";

const NotificationsView = () => {
  const { t } = useTranslation();

  const [notifications, setNotification] = useState<Notification[]>([]);
  const [filter, setFiler] = useState<string>("all");

  const accessToken = localStorage.getItem("accessToken");

  const getData = () => {
    NotificationApi.getMy()
      .then((res) => {
        setNotification(
          res.payload.sort((a: Notification, b: Notification) =>
            a.createdAt > b.createdAt ? -1 : 1
          ) || []
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!accessToken || ["null", "undefined", ""].includes(accessToken)) return;

    connectNotificationsSocket(accessToken);

    const offNew = onNotificationReceived((notification) => {
      setNotification((prev) => {
        if (prev.some((n) => n.id === notification.id)) return prev;
        return [notification, ...prev].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      });
    });

    const offReconnect = onNotificationReconnect(() => {
      getData();
    });

    return () => {
      offNew();
      offReconnect();
    };
  }, [accessToken]);

  const visibleNotifications = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => !n.isRead);
    if (filter === "important") return notifications.filter((n) => n.important);
    return notifications;
  }, [filter, notifications]);

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
        NotificationApi.markAllAsRead(notifications)
          .then(() => {
            setNotification((current) => current.map((n) => ({ ...n, isRead: true })));
          })
          .catch(apiCatchGlobalHandler);
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

      {visibleNotifications.length === 0 && (
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
      {visibleNotifications.length > 0 && (
        <ul className="list-group list-group-flush">
          {visibleNotifications.map((n) => (
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

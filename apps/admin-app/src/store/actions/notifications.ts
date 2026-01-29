import { NotificationProps } from "@initia/shared/types/notifications.js";

export const addNotification = (
  notificationOrType: NotificationProps | "err" | "warning",
  msg?: string
): { type: "addNotification"; notification: NotificationProps } => {
  let notification: NotificationProps;

  if (typeof notificationOrType === "string") {
    // Called as addNotification("err", "message")
    notification = { type: notificationOrType, msg: msg!, id: Date.now() };
  } else {
    // Called as addNotification({ msg: "message", type: "err" })
    notification = { ...notificationOrType, id: notificationOrType.id || Date.now() };
  }

  return {
    type: "addNotification",
    notification,
  };
};

export const removeNotification = (id: number) => {
  return {
    type: "removeNotification",
    id,
  };
};

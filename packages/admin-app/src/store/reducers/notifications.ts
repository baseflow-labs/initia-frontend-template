import { NotificationProps } from "@initia/shared/types/notifications.js";

export interface NotificationsState {
  notifications: NotificationProps[];
}

export type NotificationsAction =
  | { type: "addNotification"; notification: NotificationProps }
  | { type: "removeNotification"; id: number };

const initialState: NotificationsState = {
  notifications: [],
};

const notifications = (
  state: NotificationsState = initialState,
  action: NotificationsAction
): NotificationsState => {
  switch (action.type) {
    case "addNotification":
      return {
        notifications: [...state.notifications, { ...action.notification, id: new Date() }],
      };

    case "removeNotification":
      return {
        notifications: state.notifications.filter((notification) => notification.id !== action.id),
      };

    default:
      return state;
  }
};

export default notifications;

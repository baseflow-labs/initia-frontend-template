import { NotificationsState } from "../types";

export type NotificationsAction<T = { id?: number | Date }> =
  | { type: "addNotification"; notification: T }
  | { type: "removeNotification"; id: number };

export const notificationsReducer = <T extends { id?: number | Date }>(
  state: NotificationsState<T> = { notifications: [] },
  action: NotificationsAction<T>
): NotificationsState<T> => {
  switch (action.type) {
    case "addNotification":
      return {
        notifications: [
          ...state.notifications,
          { ...action.notification, id: Date.now() as never },
        ],
      };
    case "removeNotification":
      return {
        notifications: state.notifications.filter((n) => Number(n.id) !== action.id),
      };
    default:
      return state;
  }
};

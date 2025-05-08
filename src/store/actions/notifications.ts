export interface NotificationProps {
  id: number;
  message: string;
  type?: string;
  [key: string]: any;
}

export const addNotification = (notification: Notification) => ({
  type: "addNotification" as const,
  notification,
});

export const removeNotification = (id: number) => ({
  type: "removeNotification" as const,
  id,
});

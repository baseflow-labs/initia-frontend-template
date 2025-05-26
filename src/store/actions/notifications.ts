export interface NotificationProps {
  msg: string;
  type?: string;
  [key: string]: any;
}

export const addNotification = (notification: NotificationProps) => ({
  type: "addNotification" as const,
  notification,
});

export const removeNotification = (id: number) => ({
  type: "removeNotification" as const,
  id,
});

export interface NotificationProps {
  msg: string;
  type?: "err" | "warning";
  [key: string]: unknown;
}

export const addNotification = (notification: NotificationProps) => ({
  type: "addNotification" as const,
  notification,
});

export const removeNotification = (id: number) => ({
  type: "removeNotification" as const,
  id,
});

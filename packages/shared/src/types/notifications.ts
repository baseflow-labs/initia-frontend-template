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

export interface Notification {
  id: string;
  title: string;
  message: string;
  service: string;
  channel?: string;
  important?: boolean;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SendNotificationPayload {
  title: string;
  message: string;
  service: string;
  channel: string;
  important?: boolean;
  targetType?: "user" | "role" | "all";
  targetUserId?: string;
  targetRole?: string;
}

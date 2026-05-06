export const addNotification = (notification: { msg: string; type?: string; id?: number }) => ({
  type: "addNotification" as const,
  notification: { ...notification, id: notification.id ?? Date.now() },
});

export const removeNotification = (id: number) => ({ type: "removeNotification" as const, id });

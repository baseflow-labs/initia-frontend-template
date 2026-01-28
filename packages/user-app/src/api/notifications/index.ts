import type { Notification } from "@initia/shared/types/notifications";
import api, { EnvelopeResponse } from "..";

const mainPath = "/notification";

const get = async (params?: object): Promise<EnvelopeResponse<Notification[]>> => {
  return await api.get<Notification[]>(mainPath, params);
};

const markAsRead = async (notification: Notification) => {
  const { id, createdAt: _, updatedAt: __, ...rest } = notification;
  return await api.patch(mainPath + "/" + id, { ...rest, isRead: true });
};

const markAllAsRead = async (notifications: Notification[]) => {
  return await api.patch(mainPath + "/bulk", {
    data: notifications.map((n) => {
      const { createdAt: _, updatedAt: __, ...rest } = n;
      return { ...rest, isRead: true };
    }),
  });
};

export { get, markAsRead, markAllAsRead };

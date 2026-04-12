// import type { Notification } from "src/ui/layouts/auth/navs/navbar";
import type { Notification, SendNotificationPayload } from "../../types/notifications";
import api, { EnvelopeResponse } from "..";

const mainPath = "/notification";

const get = async (params?: object): Promise<EnvelopeResponse<Notification[]>> => {
  return await api.get<Notification[]>(mainPath, params);
};

const getMy = async (): Promise<EnvelopeResponse<Notification[]>> => {
  return await api.get<Notification[]>(`${mainPath}/my`);
};

const getUnreadTop = async (limit = 3): Promise<EnvelopeResponse<Notification[]>> => {
  const res = await getMy();
  const payload = (res.payload || [])
    .filter((n) => !n.isRead)
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    .slice(0, limit);
  return { ...res, payload };
};

const markAsRead = async (notification: Notification) => {
  const { id, createdAt: _, updatedAt: __, ...rest } = notification;
  return await api.patch(mainPath + "/" + id, { ...rest, isRead: true });
};

const markAllAsRead = async (notifications: Notification[]) => {
  return await api.patch(mainPath + "/bulk", {
    updates: notifications.map((n) => {
      const { createdAt: _, updatedAt: __, ...rest } = n;
      return {
        id: n.id,
        data: { ...rest, isRead: true },
      };
    }),
  });
};

const send = async (payload: SendNotificationPayload) => {
  return await api.post<Notification[]>(`${mainPath}/send`, payload);
};

export { get, getMy, getUnreadTop, markAsRead, markAllAsRead, send };

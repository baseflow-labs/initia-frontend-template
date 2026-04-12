import { io, Socket } from "socket.io-client";

import { baseURL } from "../api";
import type { Notification } from "../types/notifications";

let socket: Socket | null = null;

const resolveSocketBaseUrl = () => baseURL.replace(/\/api\/?$/, "");

export const connectNotificationsSocket = (token: string) => {
  if (socket?.connected) return socket;

  socket = io(`${resolveSocketBaseUrl()}/notifications`, {
    transports: ["websocket"],
    auth: { token },
    autoConnect: true,
    reconnection: true,
  });

  return socket;
};

export const disconnectNotificationsSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const onNotificationReceived = (cb: (notification: Notification) => void) => {
  if (!socket) return () => {};

  socket.on("new_notification", cb);
  return () => socket?.off("new_notification", cb);
};

export const onNotificationReconnect = (cb: () => void) => {
  if (!socket) return () => {};

  socket.on("connect", cb);
  return () => socket?.off("connect", cb);
};

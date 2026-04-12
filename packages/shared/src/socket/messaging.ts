import { io, Socket } from "socket.io-client";

import { baseURL } from "../api";
import type { ConversationMessage } from "../types/messaging";

let socket: Socket | null = null;

const resolveSocketBaseUrl = () => baseURL.replace(/\/api\/?$/, "");

export const connectMessagingSocket = (token: string) => {
  if (socket?.connected) return socket;

  socket = io(`${resolveSocketBaseUrl()}/messaging`, {
    transports: ["websocket"],
    auth: { token },
    autoConnect: true,
    reconnection: true,
  });

  return socket;
};

export const disconnectMessagingSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToConversation = (convId: string) => {
  socket?.emit("subscribe_conversation", convId);
};

export const unsubscribeFromConversation = (convId: string) => {
  socket?.emit("unsubscribe_conversation", convId);
};

export const onNewMessage = (cb: (message: ConversationMessage) => void) => {
  if (!socket) return () => {};

  socket.on("new_message", cb);
  return () => socket?.off("new_message", cb);
};

export const onMessagingReconnect = (cb: () => void) => {
  if (!socket) return () => {};

  socket.on("connect", cb);
  return () => socket?.off("connect", cb);
};

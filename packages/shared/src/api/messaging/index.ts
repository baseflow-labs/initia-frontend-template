import type { Conversation, ConversationMessage } from "../../types/messaging";
import api, { EnvelopeResponse } from "..";

const mainPath = "/userMessaging";

const getConversations = async (
  userId: string,
  cursor?: string
): Promise<EnvelopeResponse<{ items: Conversation[]; nextCursor?: string }>> => {
  return await api.get<{ items: Conversation[]; nextCursor?: string }>(mainPath, {
    params: { userId, ...(cursor ? { cursor } : {}) },
  });
};

const createDirect = async (participantIds: string[]): Promise<EnvelopeResponse<Conversation>> => {
  return await api.post<Conversation>(mainPath + "/direct", { participantIds });
};

const getMessages = async (
  conversationId: string,
  cursor?: string
): Promise<EnvelopeResponse<{ items: ConversationMessage[]; nextCursor?: string }>> => {
  return await api.get<{ items: ConversationMessage[]; nextCursor?: string }>(
    `${mainPath}/${conversationId}/messages`,
    cursor ? { params: { cursor } } : undefined
  );
};

const sendMessage = async (
  conversationId: string,
  messageData: { senderId: string; text: string; parentMessageId?: string }
): Promise<EnvelopeResponse<ConversationMessage>> => {
  return await api.post<ConversationMessage>(`${mainPath}/${conversationId}/messages`, messageData);
};

const markRead = async (
  conversationId: string,
  userId: string,
  upToMessageId: string
): Promise<EnvelopeResponse<null>> => {
  return await api.post<null>(`${mainPath}/${conversationId}/read`, {
    userId,
    upToMessageId,
  });
};

const getUnreadCount = async (
  conversationId: string,
  userId: string
): Promise<EnvelopeResponse<{ count: number }>> => {
  return await api.get<{ count: number }>(`${mainPath}/${conversationId}/unread-count`, {
    params: { userId },
  });
};

export { getConversations, createDirect, getMessages, sendMessage, markRead, getUnreadCount };

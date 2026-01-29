import api, { EnvelopeResponse } from "..";

const mainPath = "/userMessaging";

const getConversations = async <TPayload>(params: object): Promise<EnvelopeResponse<TPayload>> => {
  return await api.get<TPayload>(mainPath, params);
};

const createChannel = async <TPayload>(
  participantIds: string[]
): Promise<EnvelopeResponse<TPayload>> => {
  return await api.post<TPayload>(mainPath + "/direct", { participantIds });
};

const getMessages = async <TPayload>(
  conversationId: string
): Promise<EnvelopeResponse<TPayload>> => {
  return await api.get<TPayload>(`${mainPath}/${conversationId}/messages`);
};

const sendMessage = async <TPayload>(
  id: string,
  messageData: object
): Promise<EnvelopeResponse<TPayload>> => {
  return await api.post<TPayload>(`${mainPath}/${id}/message`, messageData);
};

export { createChannel, getConversations, getMessages, sendMessage };

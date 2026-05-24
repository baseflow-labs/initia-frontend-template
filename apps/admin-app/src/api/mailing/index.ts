import api from "..";

export interface SendGenericEmailPayload {
  to: string;
  title: string;
  content: string;
}

export const sendGenericEmail = async (payload: SendGenericEmailPayload) => {
  return api.post("/auth/mail/send", payload);
};

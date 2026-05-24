import api from "..";

export const getFlows = () => api.get("/chatbot/flows");
export const startSession = (flowId: string, userId?: string) =>
  api.post("/chatbot/sessions/start", { flowId, userId });
export const answerSession = (payload: Record<string, unknown>) =>
  api.post("/chatbot/sessions/answer", payload);

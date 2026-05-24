import api from "..";

export const getFlows = () => api.get("/chatbot/flows");
export const createFlow = (data: Record<string, unknown>) => api.post("/chatbot/flows", data);
export const updateFlow = (id: string, data: Record<string, unknown>) =>
  api.put(`/chatbot/flows/${id}`, data);
export const deleteFlow = (id: string) => api.delete(`/chatbot/flows/${id}`);
export const addNode = (flowId: string, data: Record<string, unknown>) =>
  api.post(`/chatbot/flows/${flowId}/nodes`, data);
export const updateNode = (nodeId: string, data: Record<string, unknown>) =>
  api.put(`/chatbot/nodes/${nodeId}`, data);
export const deleteNode = (nodeId: string) => api.delete(`/chatbot/nodes/${nodeId}`);
export const addOption = (nodeId: string, data: Record<string, unknown>) =>
  api.post(`/chatbot/nodes/${nodeId}/options`, data);
export const updateOption = (optionId: string, data: Record<string, unknown>) =>
  api.put(`/chatbot/options/${optionId}`, data);
export const deleteOption = (optionId: string) => api.delete(`/chatbot/options/${optionId}`);
export const startSession = (flowId: string, userId?: string) =>
  api.post("/chatbot/sessions/start", { flowId, userId });
export const answerSession = (payload: Record<string, unknown>) =>
  api.post("/chatbot/sessions/answer", payload);

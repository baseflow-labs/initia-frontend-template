import api, { EnvelopeResponse } from "..";

const mainPath = "/form";

export interface DynamicForm {
  id: string;
  title: string;
  description?: string;
}

export const getForms = async (): Promise<EnvelopeResponse<DynamicForm[]>> => {
  return api.get<DynamicForm[]>(mainPath);
};

export const submitFormAnswer = async (data: Record<string, unknown>) => {
  return api.post(`${mainPath}/answers`, data);
};

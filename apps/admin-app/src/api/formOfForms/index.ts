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

export const createForm = async (data: Partial<DynamicForm>) => {
  return api.post<DynamicForm>(mainPath, data);
};

export const updateForm = async (id: string, data: Partial<DynamicForm>) => {
  return api.patch<DynamicForm>(`${mainPath}/${id}`, data);
};

export const deleteForm = async (id: string, wipe = false) => {
  return api.delete(`${mainPath}?id=${id}&wipe=${String(wipe)}`);
};

import store, { RootState } from "@/store/store";
import api, { formatGetFilters, GetDataProps, EnvelopeResponse } from "..";

const mainPath = "/user";

const getAll = async ({ filters, page, capacity, customFilters }: GetDataProps) => {
  return await api.get(mainPath, {
    params: { ...formatGetFilters(filters, customFilters), page, capacity },
  });
};

const getById = async (id: string) => {
  return await api.get(mainPath + "/" + id);
};

const create = async (data: object) => {
  return await api.post(mainPath, data);
};

export interface UserProfileResp {
  user: { fullName: string };
}

const getByUserId = async (id?: string): Promise<EnvelopeResponse<UserProfileResp>> => {
  const { user } = (store.getState() as RootState).auth;

  return await api.get<UserProfileResp>(mainPath + "/by-user/" + (id || user.id));
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

const removeAllUsers = async () => {
  return await api.delete(mainPath + "/all-users");
};

export { create, getAll, getById, getByUserId, remove, removeAllUsers };

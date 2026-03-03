import api, { EnvelopeResponse } from "..";

import store, { RootState } from "@/store/store";

const mainPath = "/user";

const getById = async (id: string) => {
  return await api.get(mainPath + "/" + id);
};

const get = async (params?: Record<string, string | number | boolean | undefined>) => {
  return await api.get(mainPath, { params });
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

export { create, get, getById, getByUserId, remove, removeAllUsers };

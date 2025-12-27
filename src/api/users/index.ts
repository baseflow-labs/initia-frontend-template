import store, { RootState } from "@/store/store";
import api, { formatGetFilters, GetDataProps } from "..";

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

const getByUserId = async (id?: string) => {
  const { user } = (store.getState() as RootState).auth;

  return await api.get(mainPath + "/by-user/" + (id || user.id));
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

const removeAllUsers = async () => {
  return await api.delete(mainPath + "/all-users");
};

export { create, getAll, getById, getByUserId, remove, removeAllUsers };

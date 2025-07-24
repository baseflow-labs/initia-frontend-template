import api, { formatGetFilters, GetDataProps } from "..";
import store, { RootState } from "../../store/store";

interface Props {
  id?: string;
}

const mainPath = "/staff";

const getAll = async ({ filters, customFilters }: GetDataProps) => {
  const res = await api.get(mainPath, {
    params: { ...formatGetFilters(filters, customFilters) },
  });
  return res;
};

const getById = async (id: string) => {
  const res = await api.get(mainPath + "/" + id);
  return res;
};

const create = async (data: object) => {
  const res = await api.post("/user", data);
  return res;
};

const getByUserId = async (id?: string) => {
  const { user } = (store.getState() as RootState).auth;

  const res = await api.get(mainPath + "/by-user/" + (id || user.id));
  return res;
};

const update = async (data: Props) => {
  return await api.patch(mainPath + "/" + data.id, data);
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "?id=" + id);
};

const removeByUser = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

export { getAll, create, getById, getByUserId, update, remove, removeByUser };

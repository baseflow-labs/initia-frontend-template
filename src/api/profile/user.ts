import api, { formatGetFilters, GetDataProps } from "..";
import store, { RootState } from "../../store/store";

const mainPath = "/user";

const getAll = async ({
  filters,
  page,
  capacity,
  customFilters,
}: GetDataProps) => {
  const res = await api.get(mainPath, {
    params: { ...formatGetFilters(filters, customFilters), page, capacity },
  });
  return res;
};

const getById = async (id: string) => {
  const res = await api.get(mainPath + "/" + id);
  return res;
};

const create = async (data: object) => {
  const res = await api.post(mainPath, data);
  return res;
};

const getByUserId = async (id?: string) => {
  const { user } = (store.getState() as RootState).auth;

  const res = await api.get(mainPath + "/by-user/" + (id || user.id));
  return res;
};

export { getAll, create, getById, getByUserId };

import api, { demoStatus, formatGetFilters, GetDataProps } from "..";
import store, { RootState } from "@/store/store";

const mainPath = "/user";

const getAll = async ({
  filters,
  page,
  capacity,
  customFilters,
}: GetDataProps) => {
  if (demoStatus) {
    return {
      payload: [
        {
          id: "1",
          fullName: "Demo Admin User",
          email: "demo.admin@appnest.com",
        },
        {
          id: "2",
          fullName: "Demo User",
          email: "demo.user@appnest.com",
        },
      ],
    };
  }
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
  if (demoStatus) {
    return {
      payload: {
        fullName: "Demo User",
        email: "demo.user@appnest.com",
      },
    };
  }
  const { user } = (store.getState() as RootState).auth;

  const res = await api.get(mainPath + "/by-user/" + (id || user.id));
  return res;
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

const removeAllUsers = async () => {
  return await api.delete(mainPath + "/all-users");
};

export { getAll, create, getById, getByUserId, remove, removeAllUsers };

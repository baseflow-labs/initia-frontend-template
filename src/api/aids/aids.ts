import api, { formatGetFilters, GetDataProps } from "..";
import store, { RootState } from "../../store/store";

const mainPath = "/aid";
const { user } = (store.getState() as RootState).auth;

const getAll = async (
  filters: GetDataProps,
  page?: number,
  capacity?: number
) => {
  const res = await api.get(mainPath, {
    params: { ...formatGetFilters(filters), page, capacity },
  });
  return res;
};

const create = async (data: object) => {
  const res = await api.post(
    mainPath,
    { beneficiary: user.id, ...data },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};

const updateStatus = async (id: string, status: string) => {
  const res = await api.patch(mainPath + "/update-status/" + id, {
    status,
    aid: id,
  });
  return res;
};

const grant = async (data: object) => {
  const res = await api.post(mainPath + "/grant", data);
  return res;
};

export { updateStatus, create, getAll, grant };

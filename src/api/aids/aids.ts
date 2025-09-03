import api, { formatGetFilters, GetDataProps } from "..";
import store, { RootState } from "../../store/store";

const mainPath = "/aid";

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

const getDetails = async (id: string) => {
  const res = await api.get(mainPath + "/" + id);
  return res;
};

const create = async (data: object) => {
  const { user } = (store.getState() as RootState).auth;

  const res = await api.post(mainPath, { beneficiary: user.id, ...data });
  return res;
};

const updateStatus = async (
  id: string,
  status: string,
  note?: string,
  collectionDate?: string,
  value?: number,
  aidProgram?: string
) => {
  const { user } = (store.getState() as RootState).auth;

  const res = await api.patch(mainPath + "/update-status", {
    status,
    aid: id,
    note,
    collectionDate,
    value,
    aidProgram,
    staff: user,
  });
  return res;
};

const grant = async (data: object) => {
  const { user } = (store.getState() as RootState).auth;

  const res = await api.post(mainPath + "/grant", { ...data, staff: user });
  return res;
};

export { updateStatus, getDetails, create, getAll, grant };

import api, { formatGetFilters, GetDataProps } from "..";
import store, { RootState } from "../../store/store";

interface Props {
  user?: string;
  socialStatus: string;
  category: string;
  fullName: string;
  nationality: string;
  dob: string;
  idExpiryDate: string;
  idNumber: string;
  familyRecordPhoto: string;
  guardianIdPhoto: string;
  gender: string;
  healthStatus: string;
  diseases: string;
  incurableDisease?: string[];
  healthStatementPhoto: string;
  nationalRecord: string;
  housing: string;
  income: string;
  contactsBank: string;
}

const mainPath = "/beneficiary";

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

const createOrUpdate = async (data: Props) => {
  const { user } = (store.getState() as RootState).auth;

  return await api.post(mainPath + "/create-update", {
    ...data,
    user: data.user || user.id,
  });
};

const assignResearcher = async (data: object) => {
  return await api.patch(mainPath + "/assign-researcher", data);
};

const requestHelp = async (id: string) => {
  return await api.get(mainPath + "/request-help/" + id);
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "?id=" + id);
};

const downloadProfile = async (id: string, type: string) => {
  return await api.get(mainPath + "/" + id + "/" + type);
};

const reject = async (id: string, data: object) => {
  return await api.post(mainPath + "/reject/" + id, data);
};

const accept = async (id: string) => {
  return await api.get(mainPath + "/accept/" + id);
};

const cancel = async (id: string, data: object) => {
  return await api.post(mainPath + "/cancel/" + id, data);
};

export {
  getAll,
  create,
  getById,
  getByUserId,
  createOrUpdate,
  assignResearcher,
  requestHelp,
  remove,
  downloadProfile,
  reject,
  accept,
  cancel,
};

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

const mainPath = "/staff";
const { user } = (store.getState() as RootState).auth;

const getAll = async (filters: GetDataProps) => {
  const res = await api.get(mainPath, {
    params: { ...formatGetFilters(filters) },
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
  const res = await api.get(mainPath + "/by-user/" + (id || user.id));
  return res;
};

const update = async (data: Props) => {
  return await api.patch(
    mainPath + "/create-update",
    { ...data, user: data.user || user.id },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "?id=" + id);
};

const removeByUser = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

export { getAll, create, getById, getByUserId, update, remove, removeByUser };

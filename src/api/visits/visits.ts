import api from "..";
import store, { RootState } from "../../store/store";

interface Props {
  socialStatus: string;
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

const mainPath = "/visitSchedule";
const { user } = (store.getState() as RootState).auth;

const getAll = async () => {
  const res = await api.get(mainPath);
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

const update = async (data: { id: "" }) => {
  const res = await api.patch(mainPath + "/" + data.id, data);
  return res;
};

const cancel = async (id: string) => {
  const res = await api.patch(mainPath + "/cancel/" + id);
  return res;
};

const getByUserId = async () => {
  const res = await api.get(mainPath + "/by-user/" + user.id);
  return res;
};

const createOrUpdate = async (data: Props) => {
  return await api.post(
    mainPath + "/create-update",
    { user: user.id, ...data },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export { getAll, create, update, cancel, getById, getByUserId, createOrUpdate };

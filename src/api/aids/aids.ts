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

const mainPath = "/aid";
const { user } = (store.getState() as RootState).auth;

const getAll = async () => {
  const res = await api.get(mainPath);
  return res;
};

const create = async (data: object) => {
  const res = await api.post(mainPath, { beneficiary: user.id, ...data });
  return res;
};

const updateStatus = async (id: string, status: string) => {
  const res = await api.patch(mainPath + "/update-status/" + id, { status });
  return res;
};

const grant = async (data: object) => {
  const res = await api.post(mainPath + "/grant", data);
  return res;
};

export { updateStatus, create, getAll, grant };

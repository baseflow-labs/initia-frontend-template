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

const mainPath = "/beneficiary";
const { user } = (store.getState() as RootState).auth;

const getAll = async () => {
  const res = await api.get(mainPath);
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

export { getAll, getByUserId, createOrUpdate };

import api from "..";

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

const mainPath = "/contactsBank";

const get = async () => {
  return await api.get(mainPath);
};

const getById = async (id: string) => {
  return await api.get(mainPath + "/" + id);
};

const createOrUpdate = async (data: Props) => {
  return await api.post(mainPath, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { get, getById, createOrUpdate };

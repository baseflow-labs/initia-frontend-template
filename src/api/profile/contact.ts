import api from "..";

interface Props {
  beneficiaryMobile: string;
  secondaryMobile: string;
  backupMobile: string;
  email: string;
  bankAccountNumber: string;
  ibanPhoto: string;
}

const mainPath = "/contactsBank";

const createOrUpdate = async (data: Props) => {
  return await api.post(mainPath + "/create-update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { createOrUpdate };

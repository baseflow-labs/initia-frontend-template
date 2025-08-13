import api from "..";

interface Props {
  beneficiaryMobile: string;
  secondaryMobile: string;
  backupMobile: string;
  email: string;
  bankAccountNumber: string;
  ibanPhoto: string;
}

const mainPath = "/housing";

const createOrUpdate = async (data: Props) => {
  return await api.post(mainPath + "/create-update", data);
};

export { createOrUpdate };

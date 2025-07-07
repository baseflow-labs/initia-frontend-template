import api from "..";

const mainPath = "/overview";

const forBeneficiary = async () => {
  const res = await api.get(mainPath + "/beneficiary");
  return res;
};

export { forBeneficiary };

import api from "..";

const mainPath = "/overview";

const forBeneficiary = async () => {
  const res = await api.get(mainPath + "/beneficiary");
  return res;
};

const forResearcher = async () => {
  const res = await api.get(mainPath + "/researcher");
  return res;
};

export { forBeneficiary, forResearcher };

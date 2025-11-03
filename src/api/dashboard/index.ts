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

const forSupervisor = async () => {
  const res = await api.get(mainPath + "/supervisor");
  return res;
};

const forAccountant = async () => {
  const res = await api.get(mainPath + "/accountant");
  return res;
};

export { forBeneficiary, forResearcher, forSupervisor, forAccountant };

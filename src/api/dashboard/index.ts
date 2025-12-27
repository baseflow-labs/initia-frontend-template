import api from "..";

const mainPath = "/overview";

const forUser = async () => {
  return await api.get(mainPath + "/user");
};

const forResearcher = async () => {
  return await api.get(mainPath + "/researcher");
};

const forSupervisor = async () => {
  return await api.get(mainPath + "/supervisor");
};

const forAccountant = async () => {
  return await api.get(mainPath + "/accountant");
};

export { forAccountant, forResearcher, forSupervisor, forUser };

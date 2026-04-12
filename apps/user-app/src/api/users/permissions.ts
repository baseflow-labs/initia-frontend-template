import api from "..";

const mainPath = "/permission";

const getAll = async () => {
  return await api.get(mainPath, {
    params: { page: 1, capacity: 1000 },
  });
};

const getFactors = async () => {
  return await api.get(mainPath + `/factors`);
};

const getMyRolePermissions = async () => {
  return await api.get(mainPath + "/my-role-permissions");
};

export { getAll, getFactors, getMyRolePermissions };

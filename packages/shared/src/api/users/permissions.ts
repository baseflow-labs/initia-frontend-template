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

const create = async (data: {
  action: string;
  table: string;
  role: string;
  description?: string;
}) => {
  return await api.post(mainPath, data);
};

const remove = async (id: string) => {
  return await api.delete(mainPath, { params: { id } });
};

export { getAll, getFactors, getMyRolePermissions, create, remove };

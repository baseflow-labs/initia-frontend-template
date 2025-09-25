import api from "..";

const mainPath = "/debt";

const create = async (data: {}) => {
  return await api.post(mainPath, data);
};

const update = async (data: { id: string }) => {
  return await api.patch(mainPath + "/" + data.id, data);
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

export { create, update, remove };

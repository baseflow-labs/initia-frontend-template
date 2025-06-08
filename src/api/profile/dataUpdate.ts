import api from "..";

const mainPath = "/dataUpdate";

const create = async (data: {}) => {
  return await api.post(mainPath, data);
};

export { create };

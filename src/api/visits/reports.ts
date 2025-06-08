import api from "..";

const mainPath = "/visitReport";

const createOrUpdate = async (data: {}) => {
  return await api.post(mainPath + "/create-update", data);
};

export { createOrUpdate };

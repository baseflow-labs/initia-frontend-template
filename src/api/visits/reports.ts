import api from "..";

const mainPath = "/visitSchedule";

const createOrUpdate = async (data: {}) => {
  return await api.post(mainPath + "/create-update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { createOrUpdate };

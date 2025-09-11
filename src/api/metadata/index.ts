import api from "..";

const mainPath = "/metadata";

const get = async () => {
  return await api.get(mainPath);
};

const update = async (data: object) => {
  return await api.put(mainPath, data);
};

const bulkDataInsert = async (data: object) => {
  return await api.post("/onBoarding", data);
};

export { get, update, bulkDataInsert };

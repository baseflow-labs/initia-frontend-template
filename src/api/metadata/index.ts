import api from "..";

const mainPath = "/metadata";

const get = async () => {
  return await api.get(mainPath);
};

const update = async (data: object) => {
  return await api.put(mainPath, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { get, update };

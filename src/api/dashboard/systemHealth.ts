import api from "..";

const mainPath = "/health-check";

const get = async () => {
  return await api.get(mainPath);
};

export { get };

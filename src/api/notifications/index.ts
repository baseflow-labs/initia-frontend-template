import api from "..";

const mainPath = "/notification";

const get = async () => {
  return await api.get(mainPath);
};

export { get };

import api from "..";

const mainPath = "/notification";

const get = async () => {
  return await api.get(mainPath);
};

const markAsRead = async (id: string) => {
  return await api.get(mainPath + "/" + id + "/read");
};

export { get, markAsRead };

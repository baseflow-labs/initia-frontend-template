import api from "..";

const mainPath = "/file";

const create = async (data: object) => {
  return await api.post(mainPath + "/upload/" + "file", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/delete/" + id);
};

export { create, remove };

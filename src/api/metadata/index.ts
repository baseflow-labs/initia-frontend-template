import api from "..";

const mainPath = "/metadata";

const get = async () => {
  return await api.get(mainPath);
};

const update = async (data: object) => {
  return await api.put(mainPath, data);
};

const bulkUsersDataInsert = async (file: File) => {
  const formData = new FormData();
  formData.append("usersFile", file);
  return await api.post("/onBoarding/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const bulkDependentsDataInsert = async (file: File) => {
  const formData = new FormData();
  formData.append("dependentsFile", file);
  return await api.post("/onBoarding/dependents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { bulkDependentsDataInsert, bulkUsersDataInsert, get, update };

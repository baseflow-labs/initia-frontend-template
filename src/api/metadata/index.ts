import api, { demoStatus } from "..";

const mainPath = "/metadata";

const get = async () => {
  if (demoStatus) {
    return {
      payload: {
        logo: [
          {
            path: "https://avatars.githubusercontent.com/u/168961512?s=400&u=4438fc74e073e1c13b9ef90fe68979667007e70d&v=4",
          },
        ],
        appName: "Initia Demo Application",
        version: "1.0.0-demo",
      },
    };
  }
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

export { get, update, bulkUsersDataInsert, bulkDependentsDataInsert };

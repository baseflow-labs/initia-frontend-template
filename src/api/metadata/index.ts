import api, { demoStatus } from "..";

const mainPath = "/metadata";

const get = async () => {
  if (demoStatus) {
    return {
      payload: {
        logoFull: [
          {
            path: "https://firebasestorage.googleapis.com/v0/b/initia-platform.firebasestorage.app/o/logo-full.png?alt=media&token=de1da191-53c3-4bb1-bad7-e0f1c9ec54fc",
          },
        ],
        logo: [
          {
            path: "https://firebasestorage.googleapis.com/v0/b/initia-platform.firebasestorage.app/o/logo.png?alt=media&token=88589714-a0a4-434f-b357-a6a317dffa3e",
          },
        ],
        appName: "Initia Demo Application",
        version: "1.0.0-demo",
      },
    };
  }
  const res = await api.get(mainPath);
  return { payload: res.data };
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

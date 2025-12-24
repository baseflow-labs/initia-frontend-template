import api, { demoStatus } from "..";

const mainPath = "/overview";

const forUser = async () => {
  if (demoStatus) {
    return {
      payload: {
        notifications: [
          {
            id: "1",
            title: "Welcome to Initia!",
            message: "Thank you for using Initia. We hope you have a great experience!",
            service: "System",
            important: false,
            isRead: false,
            createdAt: "2024-06-01T12:00:00Z",
          },
          {
            id: "2",
            title: "This is important!",
            message: "This is to test the important notification feature.",
            service: "System",
            important: true,
            isRead: false,
            createdAt: "2024-06-01T12:00:00Z",
          },
          {
            id: "3",
            title: "This is important!",
            message: "This is to test the important notification feature.",
            service: "System",
            important: true,
            isRead: false,
            createdAt: "2024-06-01T12:00:00Z",
          },
          {
            id: "4",
            title: "This is important!",
            message: "This is to test the important notification feature.",
            service: "System",
            important: true,
            isRead: false,
            createdAt: "2024-06-01T12:00:00Z",
          },
        ],
      },
    };
  }
  const res = await api.get(mainPath + "/user");
  return { payload: res.data };
};

const forResearcher = async () => {
  const res = await api.get(mainPath + "/researcher");
  return res;
};

const forSupervisor = async () => {
  const res = await api.get(mainPath + "/supervisor");
  return res;
};

const forAccountant = async () => {
  const res = await api.get(mainPath + "/accountant");
  return res;
};

export { forUser, forResearcher, forSupervisor, forAccountant };

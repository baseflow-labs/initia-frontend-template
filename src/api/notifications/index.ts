import api, { demoStatus } from "..";

const mainPath = "/notification";

const get = async () => {
  if (demoStatus) {
    return {
      payload: [
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
      ],
    };
  }
  return await api.get(mainPath);
};

const markAsRead = async (id: string) => {
  return await api.get(mainPath + "/" + id + "/read");
};

export { get, markAsRead };

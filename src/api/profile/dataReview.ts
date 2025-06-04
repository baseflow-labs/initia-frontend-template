import api from "..";

const mainPath = "/dataReview";

const getNonUpdatedDataReview = async (id: string) => {
  return await api.get(mainPath + "/by-user/" + id);
};

export { getNonUpdatedDataReview };

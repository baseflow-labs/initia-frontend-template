import api from "..";

const mainPath = "/dataReview";

const getBeneficiaryDataReview = async (id: string) => {
  return await api.get(mainPath + "/by-beneficiary/" + id);
};

const getNonUpdatedDataReview = async (id: string) => {
  return await api.get(mainPath + "/by-user/" + id);
};

const submitReview = async (id: string, data: object) => {
  return await api.post(mainPath + "/reviews/" + id, data);
};

export { getBeneficiaryDataReview, getNonUpdatedDataReview, submitReview };

import api from "..";

const mainPath = "/visitSchedule";

const getAll = async () => {
  const res = await api.get(mainPath);
  return res;
};

const getById = async (id: string) => {
  const res = await api.get(mainPath + "/" + id);
  return res;
};

const getReportByVisitId = async (id: string) => {
  const res = await api.get(mainPath + "/report/" + id);
  return res;
};

const create = async (data: object) => {
  const res = await api.post(mainPath, data);
  return res;
};

const update = async (data: { id: "" }) => {
  const res = await api.patch(mainPath + "/" + data.id, data);
  return res;
};

const cancel = async (id: string) => {
  const res = await api.patch(mainPath + "/cancel/" + id);
  return res;
};

export { cancel, create, getAll, getById, getReportByVisitId, update };

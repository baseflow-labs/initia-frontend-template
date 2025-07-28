import api, { formatGetFilters, GetDataProps } from "..";

const mainPath = "/visitSchedule";

const getAll = async ({
  filters,
  page,
  capacity,
  customFilters,
}: GetDataProps) => {
  const res = await api.get(mainPath, {
    params: { ...formatGetFilters(filters, customFilters), page, capacity },
  });
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

const accept = async (id: string) => {
  const res = await api.patch(mainPath + "/accept/" + id);
  return res;
};

const delay = async (id: string) => {
  const res = await api.patch(mainPath + "/delay/" + id);
  return res;
};

const cancel = async (id: string) => {
  const res = await api.patch(mainPath + "/cancel/" + id);
  return res;
};

export {
  cancel,
  create,
  getAll,
  getById,
  getReportByVisitId,
  accept,
  delay,
  update,
};

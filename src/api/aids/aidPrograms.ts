import api, { formatGetFilters, GetDataProps } from "..";

const mainPath = "/aidProgram";

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

const create = async (data: object) => {
  const res = await api.post(mainPath, { ...data, files: {} });
  return res;
};

const update = async (id: string, data: object) => {
  const res = await api.patch(mainPath + "/" + id, data);
  return res;
};

const updateStatus = async (id: string, status: string) => {
  const res = await api.patch(mainPath + "/" + id + "/update-status", {
    status,
  });
  return res;
};

export { create, getAll, update, updateStatus };

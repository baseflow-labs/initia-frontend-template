import api, { formatGetFilters, GetDataProps } from "..";

const mainPath = "/aidCategory";

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

const getAllOfProgram = async (program: string) => {
  const res = await api.get(mainPath + "/by-program/" + program, {
    params: { ...formatGetFilters(), capacity: 999 },
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

export { create, getAll, getAllOfProgram, update };

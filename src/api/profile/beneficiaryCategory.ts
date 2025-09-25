import api, { formatGetFilters, GetDataProps } from "..";

const mainPath = "/beneficiaryCategory";

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

const create = async (data: object) => {
  const res = await api.post(mainPath, data);
  return res;
};

const update = async (data: { id: String }) => {
  const res = await api.patch(mainPath + "/" + data.id, data);
  return res;
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "?id=" + id);
};
export { create, getAll, getById, remove, update };

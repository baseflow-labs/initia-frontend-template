import api, { EnvelopeResponse } from "..";

const mainPath = "/file";

export interface UploadedFileResp {
  id: string;
  path: string;
}

const create = async (data: object): Promise<EnvelopeResponse<UploadedFileResp>> => {
  return await api.post<UploadedFileResp>(mainPath + "/upload/" + "file", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/delete/" + id);
};

export { create, remove };

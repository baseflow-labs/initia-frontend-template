import api, { EnvelopeResponse } from "..";

const mainPath = "/metadata";

export interface Metadata {
  name: string;
  logo: string;
  logoFull: string;
  phoneNumber: string;
  slogan: string;
}

const get = async (): Promise<EnvelopeResponse<Metadata>> => {
  return await api.get<Metadata>(mainPath);
};

const update = async (data: object) => {
  return await api.put(mainPath, data);
};

export { get, update };

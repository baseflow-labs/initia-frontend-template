import api, { EnvelopeResponse } from "..";

const mainPath = "/metadata";

export interface Metadata {
  name: string;
  logo: string;
  logoFull: string;
  slogan: string;
  defaultThemeColor: string;
  phoneNumber?: string;
  websiteUrl?: string;
  contactEmail?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  socialTiktok?: string;
}

const get = async (): Promise<EnvelopeResponse<Metadata>> => {
  return await api.get<Metadata>(mainPath);
};

const update = async (data: object) => {
  return await api.put(mainPath, data);
};

export { get, update };

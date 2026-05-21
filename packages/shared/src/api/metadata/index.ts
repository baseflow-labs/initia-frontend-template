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
  googleAnalyticsMeasurementId?: string;
  googleAnalyticsDashboardUrl?: string;
  microsoftClarityProjectId?: string;
  microsoftClarityDashboardUrl?: string;
  passwordMinLength?: number;
  passwordRequireUppercase?: boolean;
  passwordRequireLowercase?: boolean;
  passwordRequireNumber?: boolean;
  passwordRequireSpecialChar?: boolean;
  sessionTimeoutMinutes?: number;
  loginAttemptsLimit?: number;
  fileUploadMaxSizeMb?: number;
  fileUploadMaxCount?: number;
}

const get = async (): Promise<EnvelopeResponse<Metadata>> => {
  return await api.get<Metadata>(mainPath);
};

const update = async (data: object) => {
  return await api.put(mainPath, data);
};

export { get, update };

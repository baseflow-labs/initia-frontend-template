import { fetchAPI } from "./client";

export interface SystemIdentity {
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

function unwrapPayload<TPayload>(data: unknown): TPayload {
  if (data && typeof data === "object" && "payload" in (data as Record<string, unknown>)) {
    return (data as { payload: TPayload }).payload;
  }
  return data as TPayload;
}

export async function getSystemIdentity(): Promise<SystemIdentity> {
  const response = await fetchAPI<SystemIdentity | { payload: SystemIdentity }>("/metadata");
  return unwrapPayload<SystemIdentity>(response);
}

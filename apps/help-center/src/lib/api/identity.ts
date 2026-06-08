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

export const DEFAULT_SYSTEM_IDENTITY: SystemIdentity = {
  name: "Initia",
  logo: "https://initia-landing.vercel.app/assets/logo-BOpxqQQO.png",
  logoFull: "https://initia-landing.vercel.app/assets/logo-full-Duc4IEH6.png",
  slogan: "Find answers and support for all your questions",
  defaultThemeColor: "#2563eb",
  contactEmail: "support@example.com",
};

const unwrapPayload = <TPayload>(data: unknown): TPayload => {
  if (data && typeof data === "object" && "payload" in (data as Record<string, unknown>)) {
    return (data as { payload: TPayload }).payload;
  }
  return data as TPayload;
};

export const getSystemIdentity = async (): Promise<SystemIdentity> => {
  try {
    const response = await fetchAPI<SystemIdentity | { payload: SystemIdentity }>("/metadata");
    const identity = unwrapPayload<SystemIdentity>(response);

    return {
      ...DEFAULT_SYSTEM_IDENTITY,
      ...identity,
      defaultThemeColor: identity.defaultThemeColor || DEFAULT_SYSTEM_IDENTITY.defaultThemeColor,
    };
  } catch (error) {
    console.error("Error fetching system identity:", error);
    return DEFAULT_SYSTEM_IDENTITY;
  }
};

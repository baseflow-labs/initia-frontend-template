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

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const DEFAULT_SYSTEM_IDENTITY: SystemIdentity = {
  name: 'Initia',
  logo: '',
  logoFull: '',
  slogan: 'Technical documentation and implementation guides',
  defaultThemeColor: '#3b82f6',
  contactEmail: 'support@example.com',
};

const unwrapPayload = <TPayload>(data: unknown): TPayload => {
  if (data && typeof data === 'object' && 'payload' in (data as Record<string, unknown>)) {
    return (data as { payload: TPayload }).payload;
  }

  return data as TPayload;
};

export const fetchSystemIdentity = async (): Promise<SystemIdentity> => {
  try {
    const response = await fetch(`${API_BASE_URL}/metadata`);
    if (!response.ok) return DEFAULT_SYSTEM_IDENTITY;

    const json = await response.json();
    const payload = unwrapPayload<SystemIdentity>(json);

    return {
      ...DEFAULT_SYSTEM_IDENTITY,
      ...payload,
      name: payload.name || DEFAULT_SYSTEM_IDENTITY.name,
      slogan: payload.slogan || DEFAULT_SYSTEM_IDENTITY.slogan,
      defaultThemeColor: payload.defaultThemeColor || DEFAULT_SYSTEM_IDENTITY.defaultThemeColor,
    };
  } catch {
    return DEFAULT_SYSTEM_IDENTITY;
  }
};

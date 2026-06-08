import axios from "axios";

import { getMockPages, getMockSystemMetadata } from "./dummyApiData";

import {
  LandingPagesResponse,
  LegalDocument,
  LegalDocumentType,
  Page,
  SystemMetadata,
} from "@/types/landing";

const DEFAULT_API_URL = "http://localhost:8000/api";
const API_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL).replace(
  /\/$/,
  ""
);
const API_ORIGIN = API_URL.replace(/\/api$/, "");
const DEFAULT_LOCALES = ["en", "ar"];
const apiClient = axios.create({
  timeout: 5000,
});

const hasRemoteApi = (): boolean => {
  return Boolean(API_URL);
};

type BackendFilePreview = {
  url?: unknown;
  path?: unknown;
};

type BackendSystemMetadata = Partial<SystemMetadata> &
  Record<string, unknown> & {
    socialLinks?: Partial<NonNullable<SystemMetadata["socialLinks"]>>;
  };

const firstString = (...values: unknown[]): string | undefined => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return undefined;
};

const toAbsoluteUrl = (value: string): string => {
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${API_ORIGIN}${value}`;
  }

  return value;
};

const assetUrl = (value: unknown): string | undefined => {
  if (typeof value === "string" && value.trim()) return toAbsoluteUrl(value.trim());

  if (Array.isArray(value)) {
    for (const item of value) {
      const url = assetUrl(item);
      if (url) return url;
    }
  }

  if (value && typeof value === "object") {
    const preview = value as BackendFilePreview;
    const url = firstString(preview.url, preview.path);
    return url ? toAbsoluteUrl(url) : undefined;
  }

  return undefined;
};

const normalizeSystemMetadata = (
  payload: BackendSystemMetadata,
  locale: string
): SystemMetadata => {
  const fallback = getMockSystemMetadata(locale);
  const logo = assetUrl(payload.logo);
  const logoFull = assetUrl(payload.logoFull);

  return {
    ...fallback,
    ...payload,
    name: firstString(payload.name) || fallback.name,
    logo: logo || "",
    logoFull: logoFull || logo || "",
    slogan: firstString(payload.slogan) || fallback.slogan,
    defaultThemeColor: firstString(payload.defaultThemeColor) || fallback.defaultThemeColor,
    phoneNumber: firstString(payload.phoneNumber),
    websiteUrl: firstString(payload.websiteUrl),
    contactEmail: firstString(payload.contactEmail),
    socialFacebook: firstString(payload.socialFacebook),
    socialInstagram: firstString(payload.socialInstagram),
    socialLinkedin: firstString(payload.socialLinkedin),
    socialTwitter: firstString(payload.socialTwitter),
    socialYoutube: firstString(payload.socialYoutube),
    socialTiktok: firstString(payload.socialTiktok),
    socialLinks: {
      twitter: firstString(payload.socialTwitter, payload.socialLinks?.twitter),
      linkedin: firstString(payload.socialLinkedin, payload.socialLinks?.linkedin),
      facebook: firstString(payload.socialFacebook, payload.socialLinks?.facebook),
      instagram: firstString(payload.socialInstagram, payload.socialLinks?.instagram),
      github: firstString(payload.socialLinks?.github),
    },
  };
};

export const landingApi = {
  unwrapPayload<TPayload>(data: unknown): TPayload {
    if (data && typeof data === "object" && "payload" in (data as Record<string, unknown>)) {
      return (data as { payload: TPayload }).payload;
    }
    return data as TPayload;
  },

  /**
   * Fetch available locales from backend
   */
  async getAvailableLocales(): Promise<string[]> {
    if (!hasRemoteApi()) {
      return DEFAULT_LOCALES;
    }

    try {
      const response = await apiClient.get<
        { locales: string[] } | { payload: { locales: string[] } }
      >(`${API_URL}/landing-content/locales`);
      const payload = this.unwrapPayload<{ locales: string[] }>(response.data);
      return payload.locales || DEFAULT_LOCALES;
    } catch {
      // Fallback to default locales if API fails
      return DEFAULT_LOCALES;
    }
  },

  /**
   * Fetch system metadata (name, logo, slogan, etc.)
   */
  async getSystemMetadata(locale: string = "en"): Promise<SystemMetadata> {
    if (!hasRemoteApi()) {
      return getMockSystemMetadata(locale);
    }

    try {
      const response = await apiClient.get<
        BackendSystemMetadata | { payload: BackendSystemMetadata }
      >(`${API_URL}/metadata`);

      const payload = this.unwrapPayload<BackendSystemMetadata>(response.data);

      return normalizeSystemMetadata(payload, locale);
    } catch {
      // Return mock data for development
      return getMockSystemMetadata(locale);
    }
  },

  /**
   * Fetch all landing pages with their sections
   */
  async getPages(locale: string = "en"): Promise<Page[]> {
    if (!hasRemoteApi()) {
      return getMockPages(locale);
    }

    try {
      const response = await apiClient.get<
        LandingPagesResponse | { payload: LandingPagesResponse }
      >(`${API_URL}/landing-content/pages`, {
        params: { locale },
      });
      const payload = this.unwrapPayload<LandingPagesResponse>(response.data);
      return payload.pages;
    } catch {
      // Return mock data for development
      return getMockPages(locale);
    }
  },

  /**
   * Fetch a single page by slug
   */
  async getPageBySlug(slug: string, locale: string = "en"): Promise<Page | null> {
    try {
      const pages = await this.getPages(locale);
      return pages.find((page) => page.slug === slug) || null;
    } catch {
      // Fallback: try to get from mock data
      const pages = getMockPages(locale);
      return pages.find((page) => page.slug === slug) || null;
    }
  },

  /**
   * Get all page slugs for static generation
   */
  async getPageSlugs(locale: string = "en"): Promise<string[]> {
    try {
      const pages = await this.getPages(locale);
      return pages.map((page) => page.slug);
    } catch {
      // Fallback: try to get from mock data
      const pages = getMockPages(locale);
      return pages.map((page) => page.slug);
    }
  },

  async getLatestLegalDocument(
    documentType: LegalDocumentType,
    locale: string = "en"
  ): Promise<LegalDocument | null> {
    if (!hasRemoteApi()) {
      return null;
    }

    try {
      const response = await apiClient.get<LegalDocument | { payload: LegalDocument }>(
        `${API_URL}/legalDocument/latest/${documentType}`,
        { params: { locale } }
      );

      return this.unwrapPayload<LegalDocument>(response.data);
    } catch {
      return null;
    }
  },
};

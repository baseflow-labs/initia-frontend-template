import { getAppBackendTarget } from "@initia/shared/api/backendTarget";
import { createPublicApiBridge } from "@initia/shared/api/publicBridge";

import { getMockPages, getMockSystemMetadata } from "./dummyApiData";

import {
  LandingPagesResponse,
  LegalDocument,
  LegalDocumentType,
  Page,
  SystemMetadata,
} from "@/types/landing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_LOCALES = ["en", "ar"];
const apiBridge = createPublicApiBridge({
  appId: "landing-page",
  appBaseUrl: API_URL || "http://localhost:8000/api",
  firebase: {
    realtimeDbUrl: process.env.NEXT_PUBLIC_FIREBASE_RTDB_URL || "",
    databaseSecret: process.env.FIREBASE_DATABASE_SECRET,
    permissionsCollection: process.env.NEXT_PUBLIC_FIREBASE_PERMISSIONS_COLLECTION || "permissions",
    dataRootPath: process.env.NEXT_PUBLIC_FIREBASE_DATA_ROOT || "api",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    storageAuthToken: process.env.FIREBASE_STORAGE_AUTH_TOKEN,
  },
});

function hasRemoteApi(): boolean {
  return Boolean(API_URL) || getAppBackendTarget("landing-page") === "firebase";
}

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
      const response = await apiBridge.request<
        { locales: string[] } | { payload: { locales: string[] } }
      >({
        endpoint: "/landing-content/locales",
      });
      const payload = this.unwrapPayload<{ locales: string[] }>(response);
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
      const response = await apiBridge.request<SystemMetadata | { payload: SystemMetadata }>({
        endpoint: "/metadata",
      });

      const payload = this.unwrapPayload<SystemMetadata>(response);

      return {
        ...payload,
        socialLinks: {
          twitter: payload.socialTwitter,
          linkedin: payload.socialLinkedin,
          facebook: payload.socialFacebook,
          instagram: payload.socialInstagram,
          github: payload.socialLinks?.github,
        },
      };
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
      const response = await apiBridge.request<
        LandingPagesResponse | { payload: LandingPagesResponse }
      >({
        endpoint: "/landing-content/pages",
        params: { locale },
      });
      const payload = this.unwrapPayload<LandingPagesResponse>(response);
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
      const response = await apiBridge.request<LegalDocument | { payload: LegalDocument }>({
        endpoint: `/legalDocument/latest/${documentType}`,
        params: { locale },
      });

      return this.unwrapPayload<LegalDocument>(response);
    } catch {
      return null;
    }
  },
};

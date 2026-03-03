import { LandingPagesResponse, Page, SystemMetadata } from "@/types/landing";
import axios from "axios";

import { getMockPages, getMockSystemMetadata } from "./dummyApiData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_LOCALES = ["en", "ar"];
const apiClient = axios.create({
  timeout: 5000,
});

function hasRemoteApi(): boolean {
  return Boolean(API_URL);
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
      const response = await apiClient.get<SystemMetadata | { payload: SystemMetadata }>(
        `${API_URL}/landing-content/system-metadata`,
        {
          params: { locale },
        }
      );
      return this.unwrapPayload<SystemMetadata>(response.data);
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
};

import axios from "axios";

import { getMockPages, getMockSystemMetadata } from "./dummyApiData";

import { LandingPagesResponse, Page, SystemMetadata } from "@/types/landing";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const DEFAULT_LOCALES = ["en", "ar"];

export const landingApi = {
  /**
   * Fetch available locales from backend
   */
  async getAvailableLocales(): Promise<string[]> {
    try {
      const response = await axios.get<{ locales: string[] }>(`${API_URL}/locales`);
      return response.data.locales || DEFAULT_LOCALES;
    } catch (error) {
      // Fallback to default locales if API fails
      return DEFAULT_LOCALES;
    }
  },

  /**
   * Fetch system metadata (name, logo, slogan, etc.)
   */
  async getSystemMetadata(locale: string = "en"): Promise<SystemMetadata> {
    try {
      const response = await axios.get<SystemMetadata>(`${API_URL}/system/metadata`, {
        params: { locale },
      });
      return response.data;
    } catch (error) {
      // Return mock data for development
      return getMockSystemMetadata(locale);
    }
  },

  /**
   * Fetch all landing pages with their sections
   */
  async getPages(locale: string = "en"): Promise<Page[]> {
    try {
      const response = await axios.get<LandingPagesResponse>(`${API_URL}/landing-pages`, {
        params: { locale },
      });
      return response.data.pages;
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      // Fallback: try to get from mock data
      const pages = getMockPages(locale);
      return pages.map((page) => page.slug);
    }
  },
};

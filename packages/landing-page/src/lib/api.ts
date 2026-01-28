import axios from "axios";
import { LandingPagesResponse, Page, SystemMetadata } from "@/types/landing";
import { getMockPages, getMockSystemMetadata } from "./dummyApiData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const landingApi = {
  /**
   * Fetch system metadata (name, logo, slogan, etc.)
   */
  async getSystemMetadata(): Promise<SystemMetadata> {
    try {
      const response = await axios.get<SystemMetadata>(`${API_URL}/system/metadata`);
      return response.data;
    } catch (error) {
      console.error("Error fetching system metadata:", error);
      // Return mock data for development
      return getMockSystemMetadata();
    }
  },

  /**
   * Fetch all landing pages with their sections
   */
  async getPages(): Promise<Page[]> {
    try {
      const response = await axios.get<LandingPagesResponse>(`${API_URL}/landing-pages`);
      return response.data.pages;
    } catch (error) {
      console.error("Error fetching landing pages:", error);
      // Return mock data for development
      return getMockPages();
    }
  },

  /**
   * Fetch a single page by slug
   */
  async getPageBySlug(slug: string): Promise<Page | null> {
    try {
      const pages = await this.getPages();
      return pages.find((page) => page.slug === slug) || null;
    } catch (error) {
      console.error(`Error fetching page with slug ${slug}:`, error);
      return null;
    }
  },

  /**
   * Get all page slugs for static generation
   */
  async getPageSlugs(): Promise<string[]> {
    try {
      const pages = await this.getPages();
      return pages.map((page) => page.slug);
    } catch (error) {
      console.error("Error fetching page slugs:", error);
      return [];
    }
  },
};

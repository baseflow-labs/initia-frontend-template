import { fetchAPI as _fetchAPI } from "./client";

import { Subsection } from "@/types/documentation";

// Mock data for development
const MOCK_SUBSECTIONS: Record<string, Subsection[]> = {
  "1": [
    // Getting Started
    {
      id: "1-1",
      slug: "quick-start",
      sectionId: "1",
      title: "Quick Start Guide",
      description: "Get started in 5 minutes",
      order: 1,
      articleCount: 3,
    },
    {
      id: "1-2",
      slug: "installation",
      sectionId: "1",
      title: "Installation",
      description: "How to install and set up",
      order: 2,
      articleCount: 2,
    },
  ],
  "2": [
    // Account Management
    {
      id: "2-1",
      slug: "profile-settings",
      sectionId: "2",
      title: "Profile Settings",
      description: "Manage your profile information",
      order: 1,
      articleCount: 4,
    },
    {
      id: "2-2",
      slug: "notifications",
      sectionId: "2",
      title: "Notifications",
      description: "Configure notification preferences",
      order: 2,
      articleCount: 4,
    },
  ],
  "3": [
    // Billing
    {
      id: "3-1",
      slug: "plans-pricing",
      sectionId: "3",
      title: "Plans & Pricing",
      description: "Understanding our pricing structure",
      order: 1,
      articleCount: 3,
    },
    {
      id: "3-2",
      slug: "payment-methods",
      sectionId: "3",
      title: "Payment Methods",
      description: "Managing payment methods",
      order: 2,
      articleCount: 3,
    },
  ],
};

export async function getSubsections(sectionId: string): Promise<Subsection[]> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Subsection[]>(`/help/sections/${sectionId}/subsections`)

    // For now, return mock data
    return Promise.resolve(MOCK_SUBSECTIONS[sectionId] || []);
  } catch (error) {
    console.error("Error fetching subsections:", error);
    return [];
  }
}

export async function getSubsection(sectionId: string, slug: string): Promise<Subsection | null> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Subsection>(`/help/sections/${sectionId}/subsections/${slug}`)

    // For now, return mock data
    const subsections = MOCK_SUBSECTIONS[sectionId] || [];
    const subsection = subsections.find((s) => s.slug === slug);
    return Promise.resolve(subsection || null);
  } catch (error) {
    console.error("Error fetching subsection:", error);
    return null;
  }
}

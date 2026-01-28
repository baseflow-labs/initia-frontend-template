import { fetchAPI as _fetchAPI } from "./client";
import { Section } from "@/types/documentation";

// Mock data for development - replace with actual API calls
const MOCK_SECTIONS: Section[] = [
  {
    id: "1",
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn the basics and get up and running quickly",
    icon: "🚀",
    order: 1,
    articleCount: 5,
  },
  {
    id: "2",
    slug: "account-management",
    title: "Account Management",
    description: "Manage your account settings and preferences",
    icon: "👤",
    order: 2,
    articleCount: 8,
  },
  {
    id: "3",
    slug: "billing",
    title: "Billing & Payments",
    description: "Information about billing, payments, and subscriptions",
    icon: "💳",
    order: 3,
    articleCount: 6,
  },
  {
    id: "4",
    slug: "features",
    title: "Features & Functionality",
    description: "Detailed guides on using product features",
    icon: "⚡",
    order: 4,
    articleCount: 12,
  },
  {
    id: "5",
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and how to resolve them",
    icon: "🔧",
    order: 5,
    articleCount: 10,
  },
  {
    id: "6",
    slug: "security",
    title: "Security & Privacy",
    description: "Information about security features and privacy",
    icon: "🔒",
    order: 6,
    articleCount: 7,
  },
];

export async function getSections(): Promise<Section[]> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Section[]>('/help/sections')

    // For now, return mock data
    return Promise.resolve(MOCK_SECTIONS);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return [];
  }
}

export async function getSection(slug: string): Promise<Section | null> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Section>(`/help/sections/${slug}`)

    // For now, return mock data
    const section = MOCK_SECTIONS.find((s) => s.slug === slug);
    return Promise.resolve(section || null);
  } catch (error) {
    console.error("Error fetching section:", error);
    return null;
  }
}

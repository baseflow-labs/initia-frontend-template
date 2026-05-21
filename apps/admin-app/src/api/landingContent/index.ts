import api from "..";

const base = "/landing-content";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionType =
  | "hero"
  | "features"
  | "pricing"
  | "faq"
  | "testimonials"
  | "blog"
  | "contact"
  | "clients"
  | "team"
  | "about"
  | "how_it_works"
  | "demo_request"
  | "careers"
  | "cta"
  | "privacy_policy"
  | "terms_of_service"
  | "footer"
  | "prompt_input"
  | "partners"
  | "text_blocks"
  | "carousel"
  | "image_blocks"
  | "video_blocks"
  | "social_links"
  | "accordion"
  | "chat_prompt"
  | "google_map"
  | "blog_single"
  | "blog_list"
  | "blog_carousel";

export interface LandingPageMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface LandingSection {
  id: string;
  title: string;
  subtitle?: string;
  type: SectionType;
  content: Record<string, unknown>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  locale: string;
  order: number;
  metadata: LandingPageMetadata | null;
  sections: LandingSection[];
  createdAt: string;
  updatedAt: string;
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export const getAllPages = async (): Promise<LandingPage[]> => {
  const res = await api.get(`${base}/admin/pages`);
  return (res as Record<string, unknown>)?.payload as LandingPage[];
};

export const getPageById = async (id: string): Promise<LandingPage> => {
  const res = await api.get(`${base}/admin/pages/${id}`);
  return (res as Record<string, unknown>)?.payload as LandingPage;
};

export const createPage = async (data: {
  title: string;
  slug: string;
  locale?: string;
  order?: number;
  metadata?: LandingPageMetadata;
}): Promise<LandingPage> => {
  const res = await api.post(`${base}/pages`, data);
  return (res as Record<string, unknown>)?.payload as LandingPage;
};

export const updatePage = async (
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    locale: string;
    order: number;
    metadata: LandingPageMetadata;
  }>
): Promise<LandingPage> => {
  const res = await api.patch(`${base}/pages/${id}`, data);
  return (res as Record<string, unknown>)?.payload as LandingPage;
};

export const deletePage = async (id: string): Promise<void> => {
  await api.delete(`${base}/pages/${id}`);
};

// ─── Sections ─────────────────────────────────────────────────────────────────

export const createSection = async (data: {
  title: string;
  subtitle?: string;
  type: SectionType;
  content: Record<string, unknown>;
  order?: number;
  pageId: string;
}): Promise<LandingSection> => {
  const res = await api.post(`${base}/sections`, data);
  return (res as Record<string, unknown>)?.payload as LandingSection;
};

export const updateSection = async (
  id: string,
  data: Partial<{
    title: string;
    subtitle: string;
    type: SectionType;
    content: Record<string, unknown>;
    order: number;
    pageId: string;
  }>
): Promise<LandingSection> => {
  const res = await api.patch(`${base}/sections/${id}`, data);
  return (res as Record<string, unknown>)?.payload as LandingSection;
};

export const reorderSections = async (pageId: string, orderedIds: string[]): Promise<void> => {
  await api.patch(`${base}/sections/reorder`, { pageId, orderedIds });
};

export const deleteSection = async (id: string): Promise<void> => {
  await api.delete(`${base}/sections/${id}`);
};

import { cache } from "react";

import { fetchAPI } from "./client";

interface ApiEnvelope<T> {
  payload?: T;
}

interface BackendSection {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BackendSubsection {
  id: string;
  title: string;
  description?: string;
  sectionId?: string;
  section?: {
    id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface BackendContent {
  id: string;
  title: string;
  description?: string;
  subsectionId?: string;
  subsection?: {
    id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ManualSection {
  id: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManualSubsection {
  id: string;
  slug: string;
  sectionId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManualArticle {
  id: string;
  slug: string;
  subsectionId: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManualTree {
  sections: ManualSection[];
  subsections: ManualSubsection[];
  articles: ManualArticle[];
}

const FALLBACK_DATE = "1970-01-01T00:00:00.000Z";

const slugify = (value: string): string => {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return base || "item";
};

const stripHtml = (value: string): string =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const unwrapPayload = <T>(response: ApiEnvelope<T> | T): T => {
  if (response && typeof response === "object" && "payload" in (response as ApiEnvelope<T>)) {
    return ((response as ApiEnvelope<T>).payload || []) as T;
  }

  return response as T;
};

const uniqueSlug = (map: Map<string, number>, title: string, id: string): string => {
  const base = slugify(title || id);
  const count = map.get(base) || 0;

  map.set(base, count + 1);

  if (count === 0) {
    return base;
  }

  return `${base}-${count + 1}`;
};

export const getManualTree = cache(async (): Promise<ManualTree> => {
  const [sectionsRes, subsectionsRes, contentsRes] = await Promise.all([
    fetchAPI<ApiEnvelope<BackendSection[]>>("/support/manual/sections"),
    fetchAPI<ApiEnvelope<BackendSubsection[]>>("/support/manual/subsections"),
    fetchAPI<ApiEnvelope<BackendContent[]>>("/support/manual/contents"),
  ]);

  const sectionsData = unwrapPayload<BackendSection[]>(sectionsRes) || [];
  const subsectionsData = unwrapPayload<BackendSubsection[]>(subsectionsRes) || [];
  const contentsData = unwrapPayload<BackendContent[]>(contentsRes) || [];

  const sectionSlugMap = new Map<string, number>();
  const subsectionSlugMap = new Map<string, number>();
  const articleSlugMap = new Map<string, number>();

  const sections: ManualSection[] = sectionsData.map((section) => ({
    id: section.id,
    slug: uniqueSlug(sectionSlugMap, section.title, section.id),
    title: section.title,
    description: section.description || "",
    createdAt: section.createdAt || FALLBACK_DATE,
    updatedAt: section.updatedAt || FALLBACK_DATE,
  }));

  const sectionIds = new Set(sections.map((section) => section.id));

  const subsections: ManualSubsection[] = subsectionsData
    .map((subsection) => {
      const sectionId = subsection.sectionId || subsection.section?.id || "";
      if (!sectionId || !sectionIds.has(sectionId)) {
        return null;
      }

      return {
        id: subsection.id,
        slug: uniqueSlug(subsectionSlugMap, subsection.title, subsection.id),
        sectionId,
        title: subsection.title,
        description: subsection.description || "",
        createdAt: subsection.createdAt || FALLBACK_DATE,
        updatedAt: subsection.updatedAt || FALLBACK_DATE,
      };
    })
    .filter((value): value is ManualSubsection => value !== null);

  const subsectionIds = new Set(subsections.map((subsection) => subsection.id));

  const articles: ManualArticle[] = contentsData
    .map((content) => {
      const subsectionId = content.subsectionId || content.subsection?.id || "";
      if (!subsectionId || !subsectionIds.has(subsectionId)) {
        return null;
      }

      const html = content.description || "";
      const text = stripHtml(html);

      return {
        id: content.id,
        slug: uniqueSlug(articleSlugMap, content.title, content.id),
        subsectionId,
        title: content.title,
        summary: text.slice(0, 220),
        content: html,
        createdAt: content.createdAt || FALLBACK_DATE,
        updatedAt: content.updatedAt || FALLBACK_DATE,
      };
    })
    .filter((value): value is ManualArticle => value !== null);

  return {
    sections,
    subsections,
    articles,
  };
});

export const searchManualArticles = (articles: ManualArticle[], query: string): ManualArticle[] => {
  const needle = query.toLowerCase().trim();
  if (!needle) {
    return [];
  }

  return articles.filter((article) => {
    const title = article.title.toLowerCase();
    const summary = article.summary.toLowerCase();
    const content = stripHtml(article.content).toLowerCase();

    return title.includes(needle) || summary.includes(needle) || content.includes(needle);
  });
};

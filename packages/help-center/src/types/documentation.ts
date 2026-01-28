export interface Section {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  articleCount?: number;
}

export interface Subsection {
  id: string;
  slug: string;
  sectionId: string;
  title: string;
  description: string;
  order: number;
  articleCount?: number;
}

export interface Article {
  id: string;
  slug: string;
  subsectionId: string;
  title: string;
  summary?: string;
  content: string;
  author?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
  helpful?: number;
  notHelpful?: number;
  tags?: string[];
}

export interface SearchResult {
  type: "section" | "subsection" | "article";
  id: string;
  title: string;
  description: string;
  url: string;
  highlights?: string[];
}

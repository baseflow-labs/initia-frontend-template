import api from "./index";

export interface KanbanItem {
  id: string;
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

export interface KanbanPayload {
  columns: KanbanColumn[];
}

export const getKanban = async () => {
  return api.get<KanbanPayload>("/data-view-options/kanban");
};

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export interface GalleryPayload {
  items: GalleryItem[];
}

export const getGallery = async () => {
  return api.get<GalleryPayload>("/data-view-options/gallery");
};

export interface StatCard {
  id: string;
  label: string;
  value: number;
  changePercent: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface AnalyticsPayload {
  stats: StatCard[];
  chart: {
    visitors: ChartPoint[];
  };
}

export const getAnalytics = async () => {
  return api.get<AnalyticsPayload>("/data-view-options/analytics");
};

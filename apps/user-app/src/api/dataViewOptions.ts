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

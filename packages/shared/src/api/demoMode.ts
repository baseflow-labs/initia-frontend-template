import api from "./index";

export interface DemoModeStatus {
  enabled: boolean;
  dailyRefreshEnabled: boolean;
  lastRefreshedAt: string | null;
  lastOperation: string | null;
}

export const getDemoModeStatus = async () => {
  return api.get<DemoModeStatus>("/demo-mode/status");
};

export const seedDemoData = async () => {
  return api.post<DemoModeStatus>("/demo-mode/seed");
};

export const refreshDemoData = async () => {
  return api.post<DemoModeStatus>("/demo-mode/refresh");
};

export const flushDemoData = async () => {
  return api.post<DemoModeStatus>("/demo-mode/flush", {
    confirm: "FLUSH_DEMO_DATABASE",
  });
};

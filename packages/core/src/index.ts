export type ModuleConfig = {
  id: string;
  title: string;
  apiEndpoint: string;
};

export const buildModuleConfig = (config: ModuleConfig) => config;
export * from "./userApp";

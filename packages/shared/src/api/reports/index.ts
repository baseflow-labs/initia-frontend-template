import api, { customFilterProps } from "../index";

export type ExportFileType = "csv" | "xlsx";

export interface ExportReportPayload {
  endpoint: string;
  fields: string[];
  fileType: ExportFileType;
  conditions?: customFilterProps[];
  sortBy?: string;
  reverse?: boolean;
  search?: string;
  searchField?: string;
}

export interface ExportContractPayload {
  endpoint: string;
  supportedFileTypes: ExportFileType[];
  required: string[];
  optional: string[];
  notes: Record<string, string>;
  samplePayload: ExportReportPayload;
}

export const getExportContract = async () => {
  return api.get<ExportContractPayload>("/reports/export-contract");
};

export const exportReport = async (payload: ExportReportPayload) => {
  return api.axios.post("/reports/export", payload, { responseType: "blob" });
};

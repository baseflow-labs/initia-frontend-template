import api, { EnvelopeResponse } from "..";

const mainPath = "/backup";

export type BackupUnit = "days" | "weeks" | "months";
export type BackupStatus = "success" | "failed";

export interface BackupSettings {
  id: number;
  period: number;
  unit: BackupUnit;
  keptBackups: number;
  enabled: boolean;
  lastBackupAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackupRecord {
  id: string;
  createdAt: string;
  filename: string;
  s3Key: string;
  sizeBytes: number;
  status: BackupStatus;
  errorMessage?: string;
}

export interface UpdateBackupSettingsDto {
  period?: number;
  unit?: BackupUnit;
  keptBackups?: number;
  enabled?: boolean;
}

const getSettings = async (): Promise<EnvelopeResponse<BackupSettings>> => {
  return await api.get<BackupSettings>(`${mainPath}/settings`);
};

const updateSettings = async (
  data: UpdateBackupSettingsDto
): Promise<EnvelopeResponse<BackupSettings>> => {
  return await api.put<BackupSettings>(`${mainPath}/settings`, data);
};

const listBackups = async (): Promise<EnvelopeResponse<BackupRecord[]>> => {
  return await api.get<BackupRecord[]>(mainPath);
};

const createBackup = async (): Promise<EnvelopeResponse<BackupRecord>> => {
  return await api.post<BackupRecord>(mainPath);
};

const restoreBackup = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.post<void>(`${mainPath}/${id}/restore`);
};

const deleteBackup = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete<void>(`${mainPath}/${id}`);
};

export { createBackup, deleteBackup, getSettings, listBackups, restoreBackup, updateSettings };

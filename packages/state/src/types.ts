export interface PermissionEntry {
  action: string;
  table: string;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    role: string;
    [key: string]: unknown;
  };
  permissions: PermissionEntry[];
}

export interface SettingsState {
  theme: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  defaultLanguage: string;
}

export interface LoadingState {
  loading: boolean[];
}

export interface NotificationsState<T = { id?: number | Date }> {
  notifications: T[];
}

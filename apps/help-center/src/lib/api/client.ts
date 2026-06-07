import { createPublicApiBridge } from "@initia/shared/api/publicBridge";

const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_SECRET_KEY = process.env.API_SECRET_KEY || "";

const apiBridge = createPublicApiBridge({
  appId: "help-center",
  appBaseUrl: API_BASE_URL,
  firebase: {
    realtimeDbUrl: process.env.NEXT_PUBLIC_FIREBASE_RTDB_URL || "",
    databaseSecret: process.env.FIREBASE_DATABASE_SECRET,
    permissionsCollection: process.env.NEXT_PUBLIC_FIREBASE_PERMISSIONS_COLLECTION || "permissions",
    dataRootPath: process.env.NEXT_PUBLIC_FIREBASE_DATA_ROOT || "api",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    storageAuthToken: process.env.FIREBASE_STORAGE_AUTH_TOKEN,
  },
});

interface FetchOptions extends RequestInit {
  useAuth?: boolean;
}

export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { useAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (useAuth && API_SECRET_KEY) {
    headers["Authorization"] = `Bearer ${API_SECRET_KEY}`;
  }

  return apiBridge.request<T>({
    endpoint,
    method: (fetchOptions.method || "GET") as "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers,
    body: fetchOptions.body ? JSON.parse(fetchOptions.body as string) : undefined,
  });
}

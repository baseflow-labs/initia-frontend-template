import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import type { FrontendAppId } from "./backendTarget";

import type { ApiEnvelope } from "./index";

export interface FirebaseMiddlewareConfig {
  realtimeDbUrl: string;
  databaseSecret?: string;
  permissionsCollection?: string;
  dataRootPath?: string;
  storageBucket?: string;
  storageAuthToken?: string;
}

interface FirebaseApiRequest {
  appId?: FrontendAppId;
  method: string;
  url: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: unknown;
  firebase: FirebaseMiddlewareConfig;
}

const PERMISSION_BYPASSES = new Set([
  "permission/my-role-permissions",
  "notification/my",
  "auth/me",
]);

const COLLECTIONS_WITHOUT_ID_SUFFIX = new Set([
  "support/tickets",
  "support/faqs",
  "support/contact-submissions",
  "support/manual/sections",
  "support/manual/subsections",
  "support/manual/contents",
  "landing-content/pages",
  "landing-content/locales",
]);

function normalizeDbUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function normalizePath(url: string): string {
  const beforeQuery = url.split("?")[0] || "";
  return beforeQuery.replace(/^\/+/, "").replace(/\/+$/, "");
}

function buildQuery(params?: Record<string, unknown>): URLSearchParams {
  const search = new URLSearchParams();
  if (!params) {
    return search;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    search.append(key, String(value));
  });

  return search;
}

function getHeaderValue(headers: unknown, key: string): string | undefined {
  if (!headers || typeof headers !== "object") {
    return undefined;
  }

  const maybeGet = (headers as { get?: (name: string) => string | null }).get;
  if (typeof maybeGet === "function") {
    const value = maybeGet(key);
    return value || undefined;
  }

  const normalized = key.toLowerCase();
  for (const [headerKey, value] of Object.entries(headers as Record<string, unknown>)) {
    if (headerKey.toLowerCase() === normalized && typeof value === "string") {
      return value;
    }
  }

  return undefined;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  const payloadSegment = parts[1]
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");

  try {
    const anyGlobal = globalThis as {
      atob?: (value: string) => string;
      Buffer?: {
        from: (value: string, encoding?: string) => { toString: (enc?: string) => string };
      };
    };

    let decoded = "";
    if (typeof anyGlobal.atob === "function") {
      decoded = anyGlobal.atob(payloadSegment);
    } else if (anyGlobal.Buffer) {
      decoded = anyGlobal.Buffer.from(payloadSegment, "base64").toString("utf-8");
    } else {
      return null;
    }

    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function resolveRole(authHeader?: string): string {
  if (!authHeader?.startsWith("Bearer ")) {
    return "public";
  }

  const payload = decodeJwtPayload(authHeader.replace("Bearer ", "").trim());
  const role = payload?.role;
  if (typeof role === "string") {
    return role;
  }

  return "public";
}

function resolveUserId(authHeader?: string): string | undefined {
  if (!authHeader?.startsWith("Bearer ")) {
    return undefined;
  }

  const payload = decodeJwtPayload(authHeader.replace("Bearer ", "").trim());
  const directSub = payload?.sub;
  if (typeof directSub === "string") {
    return directSub;
  }

  const directId = payload?.id;
  if (typeof directId === "string") {
    return directId;
  }

  return undefined;
}

function resolvePermissionTable(pathname: string): string {
  if (pathname.startsWith("support/")) {
    if (pathname.startsWith("support/faqs")) return "faq";
    if (pathname.startsWith("support/tickets")) return "supportTicket";
    if (pathname.startsWith("support/contact-submissions")) return "contactSubmission";
    if (pathname.startsWith("support/manual/sections")) return "userManualSection";
    if (pathname.startsWith("support/manual/subsections")) return "userManualSubsection";
    if (pathname.startsWith("support/manual/contents")) return "userManualContent";
    if (pathname.startsWith("support/app-evaluations")) return "appEvaluation";
  }

  const firstSegment = pathname.includes("/") ? pathname.slice(0, pathname.indexOf("/")) : pathname;
  return firstSegment;
}

function resolveAction(method: string, path: string): string {
  if (method === "POST") return "create";
  if (method === "PATCH" || method === "PUT") return "update";
  if (method === "DELETE") return "delete";
  if (method === "GET" && path.includes("/")) return "get_one";
  return "get_all";
}

function shouldBypassPermissions(
  path: string,
  method: string,
  action: string,
  table: string
): boolean {
  if ((table === "user" && action === "create") || table === "auth") {
    return true;
  }

  if (path === "support/contact-submissions" && action === "create") {
    return true;
  }

  if (PERMISSION_BYPASSES.has(path)) {
    return true;
  }

  if (table === "landing-content" && method === "GET" && path.startsWith("landing-content")) {
    return true;
  }

  return false;
}

function buildDbPath(firebase: FirebaseMiddlewareConfig, relativePath: string): string {
  const root = (firebase.dataRootPath || "api").replace(/^\/+|\/+$/g, "");
  const path = relativePath.replace(/^\/+/, "");
  return root ? `${root}/${path}` : path;
}

function dbUrl(firebase: FirebaseMiddlewareConfig, path: string, params?: URLSearchParams): string {
  const query = params ? params.toString() : "";
  const withSecret = new URLSearchParams(query);

  if (firebase.databaseSecret) {
    withSecret.set("auth", firebase.databaseSecret);
  }

  const q = withSecret.toString();
  const suffix = q ? `?${q}` : "";
  return `${normalizeDbUrl(firebase.realtimeDbUrl)}/${path}.json${suffix}`;
}

async function dbRead<T>(firebase: FirebaseMiddlewareConfig, path: string): Promise<T | null> {
  const response = await fetch(dbUrl(firebase, path));
  if (!response.ok) {
    throw new Error(`Firebase read failed (${response.status})`);
  }

  return (await response.json()) as T | null;
}

async function dbWrite(
  firebase: FirebaseMiddlewareConfig,
  path: string,
  method: string,
  data?: unknown
) {
  const response = await fetch(dbUrl(firebase, path), {
    method,
    headers: { "Content-Type": "application/json" },
    body: data === undefined ? undefined : JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Firebase write failed (${response.status})`);
  }

  return response.json();
}

function asCollectionArray<T extends Record<string, unknown>>(data: unknown): T[] {
  if (!data || typeof data !== "object") {
    return [];
  }

  return Object.entries(data as Record<string, unknown>).map(([id, value]) => {
    if (!value || typeof value !== "object") {
      return { id } as unknown as T;
    }

    return { id, ...(value as T) };
  });
}

function applyConditions(
  records: Record<string, unknown>[],
  params: URLSearchParams
): Record<string, unknown>[] {
  const rawConditions = params.get("conditions");
  if (!rawConditions) {
    return records;
  }

  try {
    const parsed = JSON.parse(rawConditions) as Array<{
      field: string;
      filteredTerm?: { value?: string | number | boolean };
      filterOperator?: string;
    }>;

    return records.filter((record) => {
      return parsed.every((condition) => {
        if (condition.filterOperator !== "stringEquals") {
          return true;
        }

        const dotPath = (condition.field || "").split(".");
        let current: unknown = record;
        dotPath.forEach((part) => {
          if (current && typeof current === "object") {
            current = (current as Record<string, unknown>)[part];
          } else {
            current = undefined;
          }
        });

        const expected = condition.filteredTerm?.value;
        if (expected === undefined) {
          return true;
        }

        return String(current ?? "") === String(expected);
      });
    });
  } catch {
    return records;
  }
}

function applyPaging(
  records: Record<string, unknown>[],
  params: URLSearchParams
): Record<string, unknown>[] {
  const page = Number(params.get("page") || "1");
  const capacity = Number(params.get("capacity") || records.length || 1);

  if (!Number.isFinite(page) || !Number.isFinite(capacity) || page < 1 || capacity < 1) {
    return records;
  }

  const start = (page - 1) * capacity;
  return records.slice(start, start + capacity);
}

function normalizeCollectionPath(path: string): { collectionPath: string; id?: string } {
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) {
    return { collectionPath: "" };
  }

  if (segments.length >= 2 && COLLECTIONS_WITHOUT_ID_SUFFIX.has(path)) {
    return { collectionPath: path };
  }

  const last = segments[segments.length - 1];
  const maybeId = /^[a-zA-Z0-9_-]{8,}$/.test(last) || /^\d+$/.test(last);

  if (maybeId && segments.length > 1) {
    return {
      collectionPath: segments.slice(0, -1).join("/"),
      id: last,
    };
  }

  return { collectionPath: path };
}

async function assertPermissionAllowed(
  firebase: FirebaseMiddlewareConfig,
  role: string,
  action: string,
  table: string
): Promise<void> {
  if (role === "admin") {
    return;
  }

  const permissionsCollection = firebase.permissionsCollection || "permissions";
  const raw = await dbRead<Record<string, unknown>>(firebase, permissionsCollection);
  const permissions = asCollectionArray<Record<string, unknown>>(raw);

  const hasPermission = permissions.some((permission) => {
    return (
      permission.action === action &&
      permission.table === table &&
      ((permission.role as string) || "public") === role
    );
  });

  if (!hasPermission) {
    throw new Error("You don't have permission to access this endpoint");
  }
}

function envelope<T>(payload: T, message = "Success", status = 200): ApiEnvelope<T> {
  return { message, payload, status, extra: {} };
}

function errorToAxios(config: InternalAxiosRequestConfig, status: number, message: string): never {
  const response: AxiosResponse<ApiEnvelope<unknown>> = {
    config,
    status,
    statusText: status >= 500 ? "Server Error" : "Error",
    headers: {},
    data: { status, message, payload: null, extra: {} },
  };

  throw new AxiosError(message, String(status), config, undefined, response);
}

async function uploadToStorage(
  firebase: FirebaseMiddlewareConfig,
  data: unknown
): Promise<{ id: string; path: string }> {
  if (!firebase.storageBucket) {
    throw new Error("Firebase storage bucket is not configured");
  }

  if (!(data instanceof FormData)) {
    throw new Error("Upload payload must be FormData");
  }

  const maybeFile = data.get("file");
  if (!(maybeFile instanceof File)) {
    throw new Error("FormData 'file' entry is missing");
  }

  const objectName = `${Date.now()}-${maybeFile.name}`;
  const encodedName = encodeURIComponent(objectName);
  const uploadUrl = new URL(
    `https://firebasestorage.googleapis.com/v0/b/${firebase.storageBucket}/o?name=${encodedName}`
  );

  if (firebase.storageAuthToken) {
    uploadUrl.searchParams.set("uploadType", "media");
  }

  const uploadResponse = await fetch(uploadUrl.toString(), {
    method: "POST",
    headers: {
      "Content-Type": maybeFile.type || "application/octet-stream",
      ...(firebase.storageAuthToken
        ? { Authorization: `Bearer ${firebase.storageAuthToken}` }
        : {}),
    },
    body: maybeFile,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Storage upload failed (${uploadResponse.status})`);
  }

  const uploadPayload = (await uploadResponse.json()) as {
    name?: string;
    downloadTokens?: string;
  };

  const token = uploadPayload.downloadTokens ? `&token=${uploadPayload.downloadTokens}` : "";
  const publicPath = `https://firebasestorage.googleapis.com/v0/b/${firebase.storageBucket}/o/${encodeURIComponent(
    uploadPayload.name || objectName
  )}?alt=media${token}`;

  return {
    id: crypto.randomUUID(),
    path: publicPath,
  };
}

export async function handleFirebaseApiRequest(
  request: FirebaseApiRequest
): Promise<ApiEnvelope<unknown>> {
  const { firebase } = request;

  if (!firebase.realtimeDbUrl) {
    throw new Error("Firebase realtime database URL is missing");
  }

  const path = normalizePath(request.url);
  const method = request.method.toUpperCase();
  const params = buildQuery(request.params as Record<string, unknown>);
  const authorization = getHeaderValue(request.headers, "Authorization");
  const role = resolveRole(authorization);
  const userId = resolveUserId(authorization);

  const table = resolvePermissionTable(path);
  const action = resolveAction(method, path);

  if (!shouldBypassPermissions(path, method, action, table)) {
    await assertPermissionAllowed(firebase, role, action, table);
  }

  if (method === "GET" && path === "health-check") {
    return envelope({ status: "ok" }, "Health check passed", 200);
  }

  if (method === "POST" && path === "logging") {
    const id = crypto.randomUUID();
    const dbPath = buildDbPath(firebase, `logging/${id}`);
    await dbWrite(firebase, dbPath, "PUT", request.data || {});
    return envelope({ id }, "Log saved", 201);
  }

  if (method === "GET" && path === "auth/me") {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const dbPath = buildDbPath(firebase, `user/${userId}`);
    const me = await dbRead<Record<string, unknown>>(firebase, dbPath);
    if (!me) {
      throw new Error("User not found");
    }

    return envelope({ id: userId, ...me }, "Authorized", 200);
  }

  if (method === "GET" && path === "permission/my-role-permissions") {
    const permissionsCollection = firebase.permissionsCollection || "permissions";
    const raw = await dbRead<Record<string, unknown>>(firebase, permissionsCollection);
    const permissions = asCollectionArray<Record<string, unknown>>(raw).filter((permission) => {
      return ((permission.role as string) || "public") === role;
    });

    return envelope(permissions, "Role permissions", 200);
  }

  if (method === "GET" && path === "notification/my") {
    const dbPath = buildDbPath(firebase, "notification");
    const raw = await dbRead<Record<string, unknown>>(firebase, dbPath);
    const notifications = asCollectionArray<Record<string, unknown>>(raw).filter((item) => {
      if (!userId) {
        return false;
      }
      return String(item.userId || "") === userId;
    });

    return envelope(notifications, "Notifications", 200);
  }

  if (method === "GET" && path === "landing-content/locales") {
    const dbPath = buildDbPath(firebase, "landing-content/pages");
    const raw = await dbRead<Record<string, unknown>>(firebase, dbPath);
    const pages = asCollectionArray<Record<string, unknown>>(raw);
    const locales = Array.from(
      new Set(
        pages
          .map((page) => page.locale)
          .filter((locale): locale is string => typeof locale === "string")
      )
    );

    return envelope({ locales: locales.length ? locales : ["en", "ar"] }, "Locales fetched", 200);
  }

  if (method === "GET" && path === "legalDocument/latest/terms") {
    const locale = params.get("locale") || "en";
    const dbPath = buildDbPath(firebase, "legalDocument");
    const raw = await dbRead<Record<string, unknown>>(firebase, dbPath);
    const docs = asCollectionArray<Record<string, unknown>>(raw)
      .filter((doc) => doc.documentType === "terms" && String(doc.locale || "en") === locale)
      .sort((a, b) => Number(b.version || 0) - Number(a.version || 0));

    return envelope(docs[0] || null, "Latest legal document", 200);
  }

  if (method === "POST" && path === "file/upload/file") {
    const uploaded = await uploadToStorage(firebase, request.data);
    const dbPath = buildDbPath(firebase, `file/${uploaded.id}`);
    await dbWrite(firebase, dbPath, "PUT", { path: uploaded.path });
    return envelope(uploaded, "File uploaded", 201);
  }

  if (method === "DELETE" && path.startsWith("file/delete/")) {
    const id = path.replace("file/delete/", "");
    const dbPath = buildDbPath(firebase, `file/${id}`);
    await dbWrite(firebase, dbPath, "DELETE");
    return envelope({ id }, "File deleted", 200);
  }

  const { collectionPath, id } = normalizeCollectionPath(path);
  if (!collectionPath) {
    return envelope(null, "No-op", 200);
  }

  const dbCollectionPath = buildDbPath(firebase, collectionPath);
  const dbRecordPath = id ? `${dbCollectionPath}/${id}` : dbCollectionPath;

  if (method === "GET") {
    const raw = await dbRead<Record<string, unknown> | unknown[]>(firebase, dbRecordPath);

    if (id) {
      return envelope(raw, "Record fetched", 200);
    }

    const list = asCollectionArray<Record<string, unknown>>(raw);
    const filtered = applyConditions(list, params);

    const locale = params.get("locale");
    const localeFiltered = locale
      ? filtered.filter((item) => String(item.locale || "") === locale)
      : filtered;

    return envelope(applyPaging(localeFiltered, params), "List fetched", 200);
  }

  if (method === "POST") {
    const newId = crypto.randomUUID();
    const payload = (
      request.data && typeof request.data === "object" ? request.data : {}
    ) as Record<string, unknown>;
    const createdAt = new Date().toISOString();
    await dbWrite(firebase, `${dbCollectionPath}/${newId}`, "PUT", {
      ...payload,
      id: newId,
      createdAt,
      updatedAt: createdAt,
    });

    return envelope({ id: newId, ...payload, createdAt, updatedAt: createdAt }, "Created", 201);
  }

  if (method === "PUT" || method === "PATCH") {
    if (!id) {
      throw new Error("Missing resource id for update");
    }

    const patchPayload = (
      request.data && typeof request.data === "object" ? request.data : {}
    ) as Record<string, unknown>;
    const existing = (await dbRead<Record<string, unknown>>(firebase, dbRecordPath)) || {};

    const nextRecord = {
      ...existing,
      ...patchPayload,
      id,
      updatedAt: new Date().toISOString(),
    };

    await dbWrite(firebase, dbRecordPath, "PUT", nextRecord);
    return envelope(nextRecord, "Updated", 200);
  }

  if (method === "DELETE") {
    if (!id) {
      throw new Error("Missing resource id for delete");
    }

    await dbWrite(firebase, dbRecordPath, "DELETE");
    return envelope({ id }, "Deleted", 200);
  }

  throw new Error("Endpoint is not implemented in Firebase middleware");
}

export async function toFirebaseAxiosResponse(
  config: InternalAxiosRequestConfig,
  request: FirebaseApiRequest
): Promise<AxiosResponse<ApiEnvelope<unknown>>> {
  try {
    const data = await handleFirebaseApiRequest(request);

    return {
      config,
      headers: {},
      status: data.status || 200,
      statusText: "OK",
      data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Firebase middleware error";

    if (message.toLowerCase().includes("permission") || message === "Unauthorized") {
      errorToAxios(config, 403, message);
    }

    if (message.toLowerCase().includes("not found")) {
      errorToAxios(config, 404, message);
    }

    if (message.toLowerCase().includes("missing")) {
      errorToAxios(config, 400, message);
    }

    errorToAxios(config, 500, message);
  }
}

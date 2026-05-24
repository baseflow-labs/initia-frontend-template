import { fetchAPI } from "./client";

interface HelpCenterTicket {
  id: string;
  type: string;
  title: string;
  urgent: boolean;
  content: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Unwrap the API response envelope to get the payload
 */
function unwrapPayload<T>(response: unknown): T[] {
  if (typeof response !== "object" || response === null) return [];

  const envelope = response as {
    payload?: unknown;
    data?: unknown;
    message?: unknown;
  };

  if (Array.isArray(envelope.payload)) return envelope.payload as T[];
  if (Array.isArray(envelope.data)) return envelope.data as T[];
  if (Array.isArray(envelope.message)) return envelope.message as T[];

  return [];
}

/**
 * Fetch all support tickets from the backend
 * Uses cache() to enable deduplication within SSR render
 */
export const getTickets = async (): Promise<HelpCenterTicket[]> => {
  const url = "/support/tickets";
  const response = await fetchAPI(url);
  return unwrapPayload<HelpCenterTicket>(response);
};

export type { HelpCenterTicket };

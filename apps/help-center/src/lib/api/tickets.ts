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
  if (!response.payload) {
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.message)) return response.message;
    return [];
  }
  return response.payload;
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

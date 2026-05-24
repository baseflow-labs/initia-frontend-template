import { fetchAPI } from "./client";

interface HelpCenterContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
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
 * Fetch all contact submissions from the backend
 * Uses cache() to enable deduplication within SSR render
 */
export const getContactSubmissions = async (): Promise<HelpCenterContact[]> => {
  const url = "/support/contact-submissions";
  const response = await fetchAPI(url);
  return unwrapPayload<HelpCenterContact>(response);
};

export type { HelpCenterContact };

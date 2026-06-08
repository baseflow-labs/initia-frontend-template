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
 * Fetch all contact submissions from the backend
 * Uses cache() to enable deduplication within SSR render
 */
export const getContactSubmissions = async (): Promise<HelpCenterContact[]> => {
  try {
    const url = "/support/contact-submissions";
    const response = await fetchAPI(url);
    return unwrapPayload<HelpCenterContact>(response);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }
};

export type { HelpCenterContact };

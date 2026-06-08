import { fetchAPI } from "./client";

interface ApiEnvelope<T> {
  payload?: T;
}

export interface HelpCenterFaq {
  id: string;
  title: string;
  content: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

const unwrapPayload = <T>(response: ApiEnvelope<T> | T): T => {
  if (response && typeof response === "object" && "payload" in (response as ApiEnvelope<T>)) {
    return ((response as ApiEnvelope<T>).payload || []) as T;
  }

  return response as T;
};

export const getFaqs = async (): Promise<HelpCenterFaq[]> => {
  try {
    const response = await fetchAPI<ApiEnvelope<HelpCenterFaq[]>>("/support/faqs");
    return unwrapPayload<HelpCenterFaq[]>(response) || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
};

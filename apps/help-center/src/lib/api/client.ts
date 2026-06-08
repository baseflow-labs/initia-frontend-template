const API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_SECRET_KEY = process.env.API_SECRET_KEY || "";

interface FetchOptions extends RequestInit {
  useAuth?: boolean;
}

export const fetchAPI = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const { useAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (useAuth && API_SECRET_KEY) {
    headers["Authorization"] = `Bearer ${API_SECRET_KEY}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
    // Next.js 15+ cache configuration
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: [endpoint.split("/")[1]], // Tag for revalidation
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    const details = body ? ` - ${body.slice(0, 300)}` : "";

    throw new Error(
      `API Error for ${endpoint}: ${response.status} ${response.statusText}${details}`
    );
  }

  return response.json();
};

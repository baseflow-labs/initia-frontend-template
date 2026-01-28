const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_SECRET_KEY = process.env.API_SECRET_KEY || "";

interface FetchOptions extends RequestInit {
  useAuth?: boolean;
}

export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { useAuth = false, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
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
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

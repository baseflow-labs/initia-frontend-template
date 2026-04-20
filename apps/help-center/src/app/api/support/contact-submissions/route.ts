import { NextRequest, NextResponse } from "next/server";

const RAW_API_BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/$/, "");

async function submitToBackend(
  body: unknown,
  headers: Record<string, string>,
  endpoint: string
): Promise<Response> {
  return fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const authorization = request.headers.get("authorization");
    const xRequestId = request.headers.get("x-request-id");
    const xTenantId = request.headers.get("x-tenant-id");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authorization) headers.Authorization = authorization;
    if (xRequestId) headers["x-request-id"] = xRequestId;
    if (xTenantId) headers["x-tenant-id"] = xTenantId;

    // Match user-app behavior first.
    let backendResponse = await submitToBackend(body, headers, "/support/contact-submissions");

    // Backward compatibility in case backend expects a different endpoint name.
    if (backendResponse.status === 404 || backendResponse.status === 405) {
      backendResponse = await submitToBackend(body, headers, "/support/contact");
    }

    const contentType = backendResponse.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (isJson) {
      const payload = await backendResponse.json();
      return NextResponse.json(payload, { status: backendResponse.status });
    }

    const text = await backendResponse.text();
    return new NextResponse(text, {
      status: backendResponse.status,
      headers: {
        "content-type": contentType || "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while submitting contact form";

    return NextResponse.json(
      {
        statusCode: 500,
        message,
      },
      { status: 500 }
    );
  }
}

// src/lib/api/api-response.ts

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function parseResponseBody(
  response: Response,
): Promise<unknown> {
  if (
    response.status === 204 ||
    response.status === 205
  ) {
    return null;
  }

  const rawBody = await response.text();

  if (!rawBody.trim()) {
    return null;
  }

  const contentType =
    response.headers.get("content-type") ?? "";

  if (contentType.includes("json")) {
    return JSON.parse(rawBody);
  }

  return rawBody;
}

export function getResponseErrorMessage(
  response: Response,
  data: unknown,
): string {
  if (isRecord(data)) {
    if (typeof data.message === "string") {
      return data.message;
    }

    if (typeof data.error === "string") {
      return data.error;
    }
  }

  const statusText = response.statusText
    ? ` ${response.statusText}`
    : "";

  return `Request gagal: ${response.status}${statusText}`;
}
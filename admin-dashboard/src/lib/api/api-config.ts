// src/lib/api/api-config.ts
const configuredBaseUrl =
  import.meta.env.VITE_API_BASE_URL;

if (!configuredBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL belum dikonfigurasi. Periksa file .env.local.",
  );
}

export const API_BASE_URL =
  configuredBaseUrl.replace(/\/+$/, "");

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${API_BASE_URL}${normalizedPath}`;
}

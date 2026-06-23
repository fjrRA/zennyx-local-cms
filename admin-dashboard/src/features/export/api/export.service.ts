// src/features/export/api/export.service.ts
import { apiClient } from "../../../lib/api";

import type {
  WebsiteExportResult,
  WebsiteExportStatus,
} from "../export.types";

export function getWebsiteExportStatus(
  signal?: AbortSignal,
): Promise<WebsiteExportStatus> {
  return apiClient.get<WebsiteExportStatus>(
    "/api/export/status",
    {
      signal,
    },
  );
}

export function exportWebsite(
  signal?: AbortSignal,
): Promise<WebsiteExportResult> {
  return apiClient.post<WebsiteExportResult>(
    "/api/export/website",
    undefined,
    {
      signal,
    },
  );
}
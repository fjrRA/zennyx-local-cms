// src/services/website-export/export-job.service.ts
import {
  exportAllContentToWebsite,
} from "./website-export.service";

let exportInProgress = false;

export class ExportAlreadyRunningError extends Error {
  constructor() {
    super("Proses export sedang berjalan");

    this.name = "ExportAlreadyRunningError";
  }
}

export function getWebsiteExportStatus() {
  return {
    isRunning: exportInProgress,
  };
}

export async function runWebsiteExportJob() {
  if (exportInProgress) {
    throw new ExportAlreadyRunningError();
  }

  exportInProgress = true;

  try {
    return await exportAllContentToWebsite();
  } finally {
    exportInProgress = false;
  }
}
// src/controllers/export.controller.ts
import type {
  Request,
  Response,
} from "express";

import {
  ExportAlreadyRunningError,
  getWebsiteExportStatus,
  runWebsiteExportJob,
} from "../services/website-export/export-job.service";

export function getExportStatusController(
  _req: Request,
  res: Response
) {
  const status = getWebsiteExportStatus();

  return res.json(status);
}

export async function exportWebsiteController(
  _req: Request,
  res: Response
) {
  try {
    const result = await runWebsiteExportJob();

    return res.status(200).json({
      message: "Website export completed",
      destination: result.destination,
      counts: result.counts,
    });
  } catch (error: unknown) {
    if (error instanceof ExportAlreadyRunningError) {
      return res.status(409).json({
        message: error.message,
      });
    }

    console.error("Website export API failed");
    console.error(error);

    return res.status(500).json({
      message: "Website export failed",
    });
  }
}
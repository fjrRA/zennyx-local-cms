// src/services/website-export/website-export.service.ts
import path from "node:path";
import { rm } from "node:fs/promises";

import {
  exportAllToDirectory,
} from "../../exporters";

import {
  getWebsiteRoot,
} from "../../lib/website-root";

import {
  EXPORT_STAGING_DIRECTORY,
} from "./constants";

import {
  copyStagedContentToWebsite,
} from "./copy-to-website";

import type {
  WebsiteExportSummary,
} from "./types";

import {
  validateStagedExport,
} from "./validate-staging";

export async function exportAllContentToWebsite():
  Promise<WebsiteExportSummary> {
  const websiteRoot = await getWebsiteRoot();

  const stagingRoot = path.resolve(
    EXPORT_STAGING_DIRECTORY
  );

  const stagedContentDirectory = path.join(
    stagingRoot,
    "content"
  );

  const websiteContentDirectory = path.join(
    websiteRoot,
    "content"
  );

  console.log(
    "Preparing website export staging..."
  );

  console.log(
    `Website root: ${websiteRoot}`
  );

  await clearStagingDirectory(stagingRoot);

  /*
   * Database diekspor ke staging terlebih dahulu.
   * Pada tahap ini content website belum disentuh.
   */
  const exportResult =
    await exportAllToDirectory(stagingRoot);

  console.log("Validating staged export...");

  await validateStagedExport(
    stagedContentDirectory,
    {
      games:
        exportResult.games.exportedCount,

      team:
        exportResult.team.exportedCount,

      devlogs:
        exportResult.devlogs.exportedCount,
    }
  );

  console.log("Staging validation passed");

  console.log(
    "Writing content to zennyx-website..."
  );

  await copyStagedContentToWebsite(
    stagedContentDirectory,
    websiteContentDirectory
  );

  /*
   * Staging hanya dibersihkan setelah seluruh
   * proses export dan copy berhasil.
   *
   * Jika terjadi error, staging tetap tersedia
   * untuk diperiksa.
   */
  await clearStagingDirectory(stagingRoot);

  return {
    destination: websiteContentDirectory,

    counts: {
      site:
        exportResult.site.exportedCount,

      games:
        exportResult.games.exportedCount,

      team:
        exportResult.team.exportedCount,

      socials:
        exportResult.socials.exportedCount,

      devlogs:
        exportResult.devlogs.exportedCount,
    },
  };
}

async function clearStagingDirectory(
  stagingRoot: string
): Promise<void> {
  await rm(stagingRoot, {
    recursive: true,
    force: true,
  });
}
// src/services/website-export/copy-to-website.ts
import path from "node:path";
import {
  copyFile,
  cp,
  mkdir,
  rm,
} from "node:fs/promises";

import {
  MANAGED_JSON_FILES,
} from "./constants";

export async function copyStagedContentToWebsite(
  stagedContentDirectory: string,
  websiteContentDirectory: string
): Promise<void> {
  await mkdir(websiteContentDirectory, {
    recursive: true,
  });

  await copyManagedJsonFiles(
    stagedContentDirectory,
    websiteContentDirectory
  );

  await replaceDevlogsDirectory(
    stagedContentDirectory,
    websiteContentDirectory
  );
}

async function copyManagedJsonFiles(
  stagedContentDirectory: string,
  websiteContentDirectory: string
): Promise<void> {
  for (const fileName of MANAGED_JSON_FILES) {
    const sourcePath = path.join(
      stagedContentDirectory,
      fileName
    );

    const destinationPath = path.join(
      websiteContentDirectory,
      fileName
    );

    await copyFile(
      sourcePath,
      destinationPath
    );
  }
}

async function replaceDevlogsDirectory(
  stagedContentDirectory: string,
  websiteContentDirectory: string
): Promise<void> {
  const sourceDirectory = path.join(
    stagedContentDirectory,
    "devlogs"
  );

  const destinationDirectory = path.join(
    websiteContentDirectory,
    "devlogs"
  );

  /*
   * Folder Devlog dihapus agar file yang sudah
   * dihapus dari database tidak tertinggal
   * di zennyx-website.
   */
  await rm(destinationDirectory, {
    recursive: true,
    force: true,
  });

  await cp(
    sourceDirectory,
    destinationDirectory,
    {
      recursive: true,
      force: true,
    }
  );
}
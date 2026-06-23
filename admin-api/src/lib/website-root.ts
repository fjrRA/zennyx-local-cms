// src/lib/website-root.ts
import path from "node:path";
import { access, stat } from "node:fs/promises";

export async function getWebsiteRoot(): Promise<string> {
  const configuredRoot =
    process.env.ZENNYX_WEBSITE_ROOT?.trim();

  if (!configuredRoot) {
    throw new Error(
      "ZENNYX_WEBSITE_ROOT belum diisi di file .env"
    );
  }

  const websiteRoot = path.resolve(configuredRoot);
  const packageJsonPath = path.join(
    websiteRoot,
    "package.json"
  );
  const contentDirectory = path.join(
    websiteRoot,
    "content"
  );

  try {
    await access(packageJsonPath);

    const contentStat = await stat(contentDirectory);

    if (!contentStat.isDirectory()) {
      throw new Error(
        "Folder content pada website bukan directory"
      );
    }
  } catch {
    throw new Error(
      [
        "ZENNYX_WEBSITE_ROOT tidak valid.",
        `Lokasi yang diperiksa: ${websiteRoot}`,
        "Pastikan folder tersebut merupakan root zennyx-website.",
      ].join("\n")
    );
  }

  return websiteRoot;
}
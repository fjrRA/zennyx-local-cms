// prisma/seeds/seed.utils.ts
import fs from "node:fs";
import path from "node:path";

export function getContentDirectory(): string {
  const websiteRoot = process.env.ZENNYX_WEBSITE_ROOT;

  if (!websiteRoot) {
    throw new Error("ZENNYX_WEBSITE_ROOT belum diisi di .env");
  }

  return path.join(websiteRoot, "content");
}

export function readJson<T>(filePath: string): T {
  const rawContent = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(rawContent) as T;
}

export function getMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"));
}

export function cleanLegacyDevlogContent(content: string): string {
  return content
    .replace(/^\s*-{10,}\s*(?:\r?\n)+/, "")
    .trim();
}
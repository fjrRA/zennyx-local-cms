// src/exporters/site.exporter.ts
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { prisma } from "../lib/prisma";

export async function exportSiteToDirectory(outputRoot: string) {
  const site = await prisma.siteConfig.findUnique({
    where: {
      id: 1,
    },
  });

  if (!site) {
    throw new Error(
      "SiteConfig dengan id 1 tidak ditemukan di database"
    );
  }

  const exportedSite = {
    siteName: site.siteName,
    shortName: site.shortName,
    type: site.type,
    stage: site.stage,
    country: site.country,
    language: site.language,
    siteUrl: site.siteUrl,

    tagline: site.tagline,
    positioning: site.positioning,
    description: site.description,
    coreMessage: site.coreMessage,

    studioPrinciples: site.studioPrinciples,
    toneOfVoice: site.toneOfVoice,

    home: site.home,
    about: site.about,
    footer: site.footer,
    seo: site.seo,
  };

  const contentDirectory = path.join(outputRoot, "content");
  const outputPath = path.join(contentDirectory, "site.json");

  await mkdir(contentDirectory, {
    recursive: true,
  });

  const jsonContent = `${JSON.stringify(
    exportedSite,
    null,
    2
  )}\n`;

  await writeFile(outputPath, jsonContent, "utf-8");

  return {
    outputPath,
    exportedCount: 1,
  };
}
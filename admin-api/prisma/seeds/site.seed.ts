// prisma/seeds/site.seed.ts
import path from "node:path";
import { prisma } from "../../src/lib/prisma";
import type { SiteJson } from "./seed.types";
import { readJson } from "./seed.utils";

export async function seedSiteConfig(
  contentDirectory: string
): Promise<void> {
  const filePath = path.join(contentDirectory, "site.json");
  const site = readJson<SiteJson>(filePath);

  const siteData = {
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

  await prisma.siteConfig.upsert({
    where: {
      id: 1,
    },
    update: siteData,
    create: {
      id: 1,
      ...siteData,
    },
  });

  console.log("Seeded SiteConfig");
}
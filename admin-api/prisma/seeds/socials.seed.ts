// prisma/seeds/socials.seed.ts
import path from "node:path";
import { prisma } from "../../src/lib/prisma";
import type { SocialsJson } from "./seed.types";
import { readJson } from "./seed.utils";

export async function seedSocialConfig(
  contentDirectory: string
): Promise<void> {
  const filePath = path.join(contentDirectory, "socials.json");
  const socials = readJson<SocialsJson>(filePath);

  const socialData = {
    primaryContact: socials.primaryContact,
    contactMessage: socials.contactMessage,
    links: socials.links,
    cta: socials.cta,
  };

  await prisma.socialConfig.upsert({
    where: {
      id: 1,
    },
    update: socialData,
    create: {
      id: 1,
      ...socialData,
    },
  });

  console.log("Seeded SocialConfig");
}
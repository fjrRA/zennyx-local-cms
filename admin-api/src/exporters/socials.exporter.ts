// src/exporters/socials.exporter.ts
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { prisma } from "../lib/prisma";

export async function exportSocialsToDirectory(outputRoot: string) {
  const socials = await prisma.socialConfig.findUnique({
    where: {
      id: 1,
    },
  });

  if (!socials) {
    throw new Error(
      "SocialConfig dengan id 1 tidak ditemukan di database"
    );
  }

  const exportedSocials = {
    primaryContact: socials.primaryContact,
    contactMessage: socials.contactMessage,
    links: socials.links,
    cta: socials.cta,
  };

  const contentDirectory = path.join(outputRoot, "content");
  const outputPath = path.join(
    contentDirectory,
    "socials.json"
  );

  await mkdir(contentDirectory, {
    recursive: true,
  });

  const jsonContent = `${JSON.stringify(
    exportedSocials,
    null,
    2
  )}\n`;

  await writeFile(outputPath, jsonContent, "utf-8");

  return {
    outputPath,
    exportedCount: 1,
  };
}
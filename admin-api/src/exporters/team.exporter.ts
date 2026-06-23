// src/exporters/team.exporter.ts
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { prisma } from "../lib/prisma";

export async function exportTeamToDirectory(outputRoot: string) {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: {
      order: "asc",
    },
  });

  const exportedTeam = teamMembers.map((member) => ({
    name: member.name,
    slug: member.slug,
    role: member.role,
    displayRole: member.displayRole,

    ...(member.location !== null
      ? { location: member.location }
      : {}),

    ...(member.avatar !== null
      ? { avatar: member.avatar }
      : {}),

    shortBio: member.shortBio,
    bio: member.bio,

    responsibilities: member.responsibilities,
    socials: member.socials,

    isFounder: member.isFounder,
    isActive: member.isActive,
    order: member.order,
  }));

  const contentDirectory = path.join(outputRoot, "content");
  const outputPath = path.join(contentDirectory, "team.json");

  await mkdir(contentDirectory, {
    recursive: true,
  });

  const jsonContent = `${JSON.stringify(
    exportedTeam,
    null,
    2
  )}\n`;

  await writeFile(outputPath, jsonContent, "utf-8");

  return {
    outputPath,
    exportedCount: exportedTeam.length,
  };
}
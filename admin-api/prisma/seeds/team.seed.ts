// prisma/seeds/team.seed.ts
import path from "node:path";
import { prisma } from "../../src/lib/prisma";
import type { TeamJson } from "./seed.types";
import { readJson } from "./seed.utils";

export async function seedTeam(
  contentDirectory: string
): Promise<void> {
  const filePath = path.join(contentDirectory, "team.json");
  const team = readJson<TeamJson[]>(filePath);

  for (const member of team) {
    const memberData = {
      name: member.name,
      role: member.role,
      displayRole: member.displayRole,
      location: member.location ?? null,
      avatar: member.avatar ?? null,
      shortBio: member.shortBio,
      bio: member.bio,
      responsibilities: member.responsibilities,
      socials: member.socials,
      isFounder: member.isFounder,
      isActive: member.isActive,
      order: member.order,
    };

    await prisma.teamMember.upsert({
      where: {
        slug: member.slug,
      },
      update: memberData,
      create: {
        slug: member.slug,
        ...memberData,
      },
    });
  }

  console.log(`Seeded ${team.length} team members`);
}
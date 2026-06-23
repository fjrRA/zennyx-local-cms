// prisma/seeds/index.ts
import { seedDevlogs } from "./devlogs.seed";
import { seedGames } from "./games.seed";
import { seedSiteConfig } from "./site.seed";
import { seedSocialConfig } from "./socials.seed";
import { seedTeam } from "./team.seed";
import { getContentDirectory } from "./seed.utils";

export async function runSeeds(): Promise<void> {
  const contentDirectory = getContentDirectory();

  console.log(`Reading content from: ${contentDirectory}`);

  await seedSiteConfig(contentDirectory);
  await seedGames(contentDirectory);
  await seedTeam(contentDirectory);
  await seedSocialConfig(contentDirectory);
  await seedDevlogs(contentDirectory);

  console.log("Seed completed");
}
import { prisma } from "../src/lib/prisma";

async function main() {
  const siteCount = await prisma.siteConfig.count();
  const gameCount = await prisma.game.count();
  const devlogCount = await prisma.devlog.count();
  const teamCount = await prisma.teamMember.count();
  const socialCount = await prisma.socialConfig.count();

  console.log({
    siteCount,
    gameCount,
    devlogCount,
    teamCount,
    socialCount,
  });

  const games = await prisma.game.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      isPublic: true,
      isFeatured: true,
    },
  });

  console.log(games);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
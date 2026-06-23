// prisma/seeds/games.seed.ts
import path from "node:path";
import { prisma } from "../../src/lib/prisma";
import type { GameJson } from "./seed.types";
import { readJson } from "./seed.utils";

export async function seedGames(
  contentDirectory: string
): Promise<void> {
  const filePath = path.join(contentDirectory, "games.json");
  const games = readJson<GameJson[]>(filePath);

  for (const game of games) {
    const gameData = {
      title: game.title,
      status: game.status,
      productionType: game.productionType,
      isFeatured: game.isFeatured,
      isPublic: game.isPublic,
      order: game.order,
      summary: game.summary,
      shortDescription: game.shortDescription,
      description: game.description,
      genre: game.genre,
      theme: game.theme,
      setting: game.setting,
      platforms: game.platforms,
      targetBuild: game.targetBuild,
      targetRelease: game.targetRelease,
      developmentStage: game.developmentStage,
      gameplayFocus: game.gameplayFocus,
      prototypeScope: game.prototypeScope,
      deferredFeatures: game.deferredFeatures,
      media: game.media,
      links: game.links,
      relatedDevlogs: game.relatedDevlogs,
      seo: game.seo,
    };

    await prisma.game.upsert({
      where: {
        slug: game.slug,
      },
      update: gameData,
      create: {
        slug: game.slug,
        ...gameData,
      },
    });
  }

  console.log(`Seeded ${games.length} games`);
}
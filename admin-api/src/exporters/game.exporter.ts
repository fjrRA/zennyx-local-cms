// src/exporters/games.exporter.ts
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { prisma } from "../lib/prisma";

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string => typeof item === "string"
  );
}

function mergeRelatedDevlogs(
  storedRelatedDevlogs: unknown,
  relationalDevlogs: Array<{ slug: string }>
): string[] {
  const storedSlugs = getStringArray(storedRelatedDevlogs);
  const relationalSlugs = relationalDevlogs.map((devlog) => devlog.slug);

  return [...new Set([...storedSlugs, ...relationalSlugs])];
}

export async function exportGamesToDirectory(outputRoot: string) {
  const games = await prisma.game.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      devlogs: {
        orderBy: {
          date: "desc",
        },
        select: {
          slug: true,
        },
      },
    },
  });

  const exportedGames = games.map((game) => {
    return {
      title: game.title,
      slug: game.slug,
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

      relatedDevlogs: mergeRelatedDevlogs(
        game.relatedDevlogs,
        game.devlogs
      ),

      seo: game.seo,
    };
  });

  const contentDirectory = path.join(outputRoot, "content");
  const outputPath = path.join(contentDirectory, "games.json");

  await mkdir(contentDirectory, {
    recursive: true,
  });

  const jsonContent = `${JSON.stringify(exportedGames, null, 2)}\n`;

  await writeFile(outputPath, jsonContent, "utf-8");

  return {
    outputPath,
    exportedCount: exportedGames.length,
  };
}
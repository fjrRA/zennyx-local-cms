// src/services/game.service.ts
import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import type { CreateGameInput, UpdateGameInput } from "../schemas/game.schema";

export function parsePositiveId(value: string) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function toJsonInput(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

export async function getAllGames() {
  return prisma.game.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      devlogs: {
        orderBy: {
          date: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
          date: true,
          category: true,
          summary: true,
          isFeatured: true,
          isPublished: true,
        },
      },
    },
  });
}

export async function getGameBySlug(slug: string) {
  return prisma.game.findUnique({
    where: {
      slug,
    },
    include: {
      devlogs: {
        orderBy: {
          date: "desc",
        },
      },
      mediaAssets: true,
    },
  });
}

export async function getGameById(id: number) {
  return prisma.game.findUnique({
    where: {
      id,
    },
    include: {
      devlogs: {
        orderBy: {
          date: "desc",
        },
      },
      mediaAssets: true,
    },
  });
}

export async function createGame(input: CreateGameInput) {
  const data: Prisma.GameUncheckedCreateInput = {
    title: input.title,
    slug: input.slug,

    status: input.status,
    productionType: input.productionType,

    isFeatured: input.isFeatured,
    isPublic: input.isPublic,
    order: input.order,

    summary: input.summary,
    shortDescription: input.shortDescription,
    description: input.description,

    genre: toJsonInput(input.genre),
    theme: toJsonInput(input.theme),
    setting: toJsonInput(input.setting),
    platforms: toJsonInput(input.platforms),

    targetBuild: input.targetBuild,
    targetRelease: input.targetRelease,

    developmentStage: toJsonInput(input.developmentStage),
    gameplayFocus: toJsonInput(input.gameplayFocus),

    prototypeScope: toJsonInput(input.prototypeScope),
    deferredFeatures: toJsonInput(input.deferredFeatures),

    media: toJsonInput(input.media),
    links: toJsonInput(input.links),

    relatedDevlogs: toJsonInput(input.relatedDevlogs),
    seo: toJsonInput(input.seo),
  };

  return prisma.game.create({
    data,
  });
}

export async function updateGame(id: number, input: UpdateGameInput) {
  const data: Prisma.GameUncheckedUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.slug !== undefined) data.slug = input.slug;

  if (input.status !== undefined) data.status = input.status;
  if (input.productionType !== undefined) data.productionType = input.productionType;

  if (input.isFeatured !== undefined) data.isFeatured = input.isFeatured;
  if (input.isPublic !== undefined) data.isPublic = input.isPublic;
  if (input.order !== undefined) data.order = input.order;

  if (input.summary !== undefined) data.summary = input.summary;
  if (input.shortDescription !== undefined) {
    data.shortDescription = input.shortDescription;
  }
  if (input.description !== undefined) data.description = input.description;

  if (input.genre !== undefined) data.genre = toJsonInput(input.genre);
  if (input.theme !== undefined) data.theme = toJsonInput(input.theme);
  if (input.setting !== undefined) data.setting = toJsonInput(input.setting);
  if (input.platforms !== undefined) {
    data.platforms = toJsonInput(input.platforms);
  }

  if (input.targetBuild !== undefined) data.targetBuild = input.targetBuild;
  if (input.targetRelease !== undefined) data.targetRelease = input.targetRelease;

  if (input.developmentStage !== undefined) {
    data.developmentStage = toJsonInput(input.developmentStage);
  }

  if (input.gameplayFocus !== undefined) {
    data.gameplayFocus = toJsonInput(input.gameplayFocus);
  }

  if (input.prototypeScope !== undefined) {
    data.prototypeScope = toJsonInput(input.prototypeScope);
  }

  if (input.deferredFeatures !== undefined) {
    data.deferredFeatures = toJsonInput(input.deferredFeatures);
  }

  if (input.media !== undefined) data.media = toJsonInput(input.media);
  if (input.links !== undefined) data.links = toJsonInput(input.links);

  if (input.relatedDevlogs !== undefined) {
    data.relatedDevlogs = toJsonInput(input.relatedDevlogs);
  }

  if (input.seo !== undefined) data.seo = toJsonInput(input.seo);

  return prisma.game.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteGame(id: number) {
  return prisma.game.delete({
    where: {
      id,
    },
  });
}
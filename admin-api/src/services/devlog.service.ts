import type { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import type {
  CreateDevlogInput,
  UpdateDevlogInput,
} from "../schemas/devlog.schema";

export function parsePositiveId(value: string) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

async function resolveRelatedGame(input: {
  gameId?: number | null;
  relatedGame?: string | null;
}) {
  if (input.gameId) {
    const game = await prisma.game.findUnique({
      where: {
        id: input.gameId,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!game) {
      throw new Error("Selected game not found");
    }

    return {
      gameId: game.id,
      relatedGame: game.slug,
    };
  }

  if (input.relatedGame) {
    const game = await prisma.game.findUnique({
      where: {
        slug: input.relatedGame,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!game) {
      throw new Error("Related game slug not found");
    }

    return {
      gameId: game.id,
      relatedGame: game.slug,
    };
  }

  return {
    gameId: null,
    relatedGame: null,
  };
}

export async function getAllDevlogs() {
  return prisma.devlog.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      game: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
}

export async function getDevlogBySlug(slug: string) {
  return prisma.devlog.findUnique({
    where: {
      slug,
    },
    include: {
      game: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      mediaAssets: true,
    },
  });
}

export async function getDevlogById(id: number) {
  return prisma.devlog.findUnique({
    where: {
      id,
    },
    include: {
      game: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      mediaAssets: true,
    },
  });
}

export async function createDevlog(input: CreateDevlogInput) {
  const gameLink = await resolveRelatedGame({
    gameId: input.gameId,
    relatedGame: input.relatedGame,
  });

  const data: Prisma.DevlogUncheckedCreateInput = {
    title: input.title,
    slug: input.slug,
    date: input.date,
    category: input.category,
    summary: input.summary,
    relatedGame: gameLink.relatedGame,
    isFeatured: input.isFeatured,
    isPublished: input.isPublished,
    content: input.content,
    gameId: gameLink.gameId,
  };

  return prisma.devlog.create({
    data,
  });
}

export async function updateDevlog(id: number, input: UpdateDevlogInput) {
  const data: Prisma.DevlogUncheckedUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.slug !== undefined) data.slug = input.slug;
  if (input.date !== undefined) data.date = input.date;
  if (input.category !== undefined) data.category = input.category;
  if (input.summary !== undefined) data.summary = input.summary;
  if (input.isFeatured !== undefined) data.isFeatured = input.isFeatured;
  if (input.isPublished !== undefined) data.isPublished = input.isPublished;
  if (input.content !== undefined) data.content = input.content;

  const hasGameId = Object.prototype.hasOwnProperty.call(input, "gameId");
  const hasRelatedGame = Object.prototype.hasOwnProperty.call(
    input,
    "relatedGame"
  );

  if (hasGameId || hasRelatedGame) {
    const gameLink = await resolveRelatedGame({
      gameId: input.gameId,
      relatedGame: input.relatedGame,
    });

    data.gameId = gameLink.gameId;
    data.relatedGame = gameLink.relatedGame;
  }

  return prisma.devlog.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteDevlog(id: number) {
  return prisma.devlog.delete({
    where: {
      id,
    },
  });
}
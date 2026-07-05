// src/features/games/utils/
// game-created-navigation-state.ts

import type {
  GameRecord,
} from "../game.types";

export type CreatedGameNoticeData = Pick<
  GameRecord,
  "id" | "title" | "slug"
>;

export type GameCreatedNavigationState = {
  createdGame: CreatedGameNoticeData;
};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function createGameCreatedNavigationState(
  game: GameRecord,
): GameCreatedNavigationState {
  return {
    createdGame: {
      id: game.id,
      title: game.title,
      slug: game.slug,
    },
  };
}

export function readGameCreatedNavigationState(
  value: unknown,
): GameCreatedNavigationState | null {
  if (!isRecord(value)) {
    return null;
  }

  const createdGame = value.createdGame;

  if (!isRecord(createdGame)) {
    return null;
  }

  if (
    typeof createdGame.id !== "number" ||
    !Number.isInteger(createdGame.id) ||
    createdGame.id <= 0
  ) {
    return null;
  }

  if (
    typeof createdGame.title !== "string" ||
    !createdGame.title.trim()
  ) {
    return null;
  }

  if (
    typeof createdGame.slug !== "string" ||
    !createdGame.slug.trim()
  ) {
    return null;
  }

  return {
    createdGame: {
      id: createdGame.id,
      title: createdGame.title,
      slug: createdGame.slug,
    },
  };
}
// src/features/games/api/games.service.ts
import { apiClient } from "../../../lib/api";

import type {
  CreateGameInput,
  DeleteGameResult,
  GameDetail,
  GameListItem,
  GameRecord,
  UpdateGameInput,
} from "../game.types";

function assertPositiveGameId(
  id: number,
): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(
      "Game ID harus berupa bilangan bulat positif.",
    );
  }
}

export function getGames(
  signal?: AbortSignal,
): Promise<GameListItem[]> {
  return apiClient.get<GameListItem[]>(
    "/api/games",
    {
      signal,
    },
  );
}

export function getGameById(
  id: number,
  signal?: AbortSignal,
): Promise<GameDetail> {
  assertPositiveGameId(id);

  return apiClient.get<GameDetail>(
    `/api/games/id/${id}`,
    {
      signal,
    },
  );
}

export function getGameBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<GameDetail> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    throw new Error(
      "Game slug tidak boleh kosong.",
    );
  }

  return apiClient.get<GameDetail>(
    `/api/games/${encodeURIComponent(
      normalizedSlug,
    )}`,
    {
      signal,
    },
  );
}

export function createGame(
  input: CreateGameInput,
  signal?: AbortSignal,
): Promise<GameRecord> {
  return apiClient.post<
    GameRecord,
    CreateGameInput
  >(
    "/api/games",
    input,
    {
      signal,
    },
  );
}

export function updateGame(
  id: number,
  input: UpdateGameInput,
  signal?: AbortSignal,
): Promise<GameRecord> {
  assertPositiveGameId(id);

  return apiClient.patch<
    GameRecord,
    UpdateGameInput
  >(
    `/api/games/id/${id}`,
    input,
    {
      signal,
    },
  );
}

export function deleteGame(
  id: number,
  signal?: AbortSignal,
): Promise<DeleteGameResult> {
  assertPositiveGameId(id);

  return apiClient.delete<DeleteGameResult>(
    `/api/games/id/${id}`,
    {
      signal,
    },
  );
}
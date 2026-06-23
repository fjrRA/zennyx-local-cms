// src/features/games/hooks/useGames.ts
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getGames } from "../api/games.service";

import type {
  GameListItem,
} from "../game.types";

type GamesRequestStatus =
  | "loading"
  | "success"
  | "error";

type GamesState = {
  status: GamesRequestStatus;
  games: GameListItem[];
  error: string | null;
};

const initialGamesState: GamesState = {
  status: "loading",
  games: [],
  error: null,
};

function getGamesErrorMessage(
  error: unknown,
): string {
  if (
    error instanceof Error &&
    error.message.trim()
  ) {
    return error.message;
  }

  return "Gagal mengambil daftar Game.";
}

export function useGames() {
  const [
    requestVersion,
    setRequestVersion,
  ] = useState(0);

  const [
    state,
    setState,
  ] = useState<GamesState>(
    initialGamesState,
  );

  useEffect(() => {
    const controller =
      new AbortController();

    getGames(controller.signal)
      .then((games) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: "success",
          games,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: "error",
          games: [],
          error:
            getGamesErrorMessage(error),
        });
      });

    return () => {
      controller.abort();
    };
  }, [requestVersion]);

  const retry = useCallback(() => {
    setState({
      status: "loading",
      games: [],
      error: null,
    });

    setRequestVersion(
      (currentVersion) =>
        currentVersion + 1,
    );
  }, []);

  return {
    ...state,

    isLoading:
      state.status === "loading",

    isSuccess:
      state.status === "success",

    isError:
      state.status === "error",

    retry,
  };
}
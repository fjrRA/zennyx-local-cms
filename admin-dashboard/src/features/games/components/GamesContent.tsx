// src/features/games/components/GamesContent.tsx
import type {
  GameListItem,
} from "../game.types";

import GamesEmptyState from "./GamesEmptyState";
import GamesErrorState from "./GamesErrorState";
import GamesLoadedState from "./GamesLoadedState";
import GamesLoadingState from "./GamesLoadingState";

type GamesContentProps = {
  games: GameListItem[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  onRetry: () => void;
};

export default function GamesContent({
  games,
  isLoading,
  isError,
  error,
  onRetry,
}: GamesContentProps) {
  if (isLoading) {
    return <GamesLoadingState />;
  }

  if (isError) {
    return (
      <GamesErrorState
        message={
          error ??
          "Gagal mengambil daftar Game."
        }
        onRetry={onRetry}
      />
    );
  }

  if (games.length === 0) {
    return <GamesEmptyState />;
  }

  return (
    <GamesLoadedState
      games={games}
    />
  );
}
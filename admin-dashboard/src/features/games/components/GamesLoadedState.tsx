// src/features/games/components/GamesLoadedState.tsx
import type {
  GameListItem,
} from "../game.types";

import GamesList from "./GamesList";

type GamesLoadedStateProps = {
  games: GameListItem[];
};

export default function GamesLoadedState({
  games,
}: GamesLoadedStateProps) {
  return <GamesList games={games} />;
}
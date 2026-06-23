// src/features/games/components/GamesList.tsx
import type {
  GameListItem,
} from "../game.types";

import GameCard from "./GameCard";

type GamesListProps = {
  games: GameListItem[];
};

export default function GamesList({
  games,
}: GamesListProps) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">
            Daftar Game
          </h2>

          <p className="mt-1 text-sm leading-6 text-zinc-500">
            Game yang tersimpan di database lokal.
          </p>
        </div>

        <p className="shrink-0 text-sm font-medium text-zinc-400">
          {games.length} Game
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
      </div>
    </section>
  );
}
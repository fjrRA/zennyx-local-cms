// src/pages/GamesPage.tsx
import GamesContent from "../features/games/components/GamesContent";
import {
  Plus,
} from "lucide-react";
import { Link } from "react-router";

import {
  useGames,
} from "../features/games/hooks/useGames";

export default function GamesPage() {
  const {
    games,
    error,
    isLoading,
    isError,
    retry,
  } = useGames();

  return (
    <section>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 sm:text-sm">
            Content Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Games
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            Kelola daftar game yang disimpan
            di Zennyx Local CMS.
          </p>
        </div>

        <Link
          to="/games/new"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 sm:w-auto"
        >
          <Plus
            size={18}
            aria-hidden="true"
          />

          Tambah Game
        </Link>
      </div>

      <div className="mt-8">
        <GamesContent
          games={games}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={retry}
        />
      </div>
    </section>
  );
}
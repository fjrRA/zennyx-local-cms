// src/pages/GamesPage.tsx
import GamesContent from "../features/games/components/GamesContent";
import {
  Plus,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router";

import {
  useEffect,
  useState,
} from "react";

import {
  useGames,
} from "../features/games/hooks/useGames";

import {
  readGameCreatedNavigationState,
} from "../features/games/utils/game-created-navigation-state";

import GameCreatedNotice from "../features/games/components/GameCreatedNotice";

export default function GamesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [
    createdGameState,
    setCreatedGameState,
  ] = useState(() =>
    readGameCreatedNavigationState(
      location.state,
    ),
  );

  const {
    games,
    error,
    isLoading,
    isError,
    retry,
  } = useGames();

  useEffect(() => {
    if (!createdGameState) {
      return;
    }

    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      },
      {
        replace: true,
        state: null,
      },
    );
  }, [
    createdGameState,
    location.hash,
    location.pathname,
    location.search,
    navigate,
  ]);

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
        {createdGameState ? (
          <GameCreatedNotice
            title={
              createdGameState.createdGame.title
            }
            slug={
              createdGameState.createdGame.slug
            }
            onDismiss={() => {
              setCreatedGameState(null);
            }}
          />
        ) : null}

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
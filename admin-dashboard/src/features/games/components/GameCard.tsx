// src/features/games/components/GameCard.tsx
import {
  CalendarClock,
  FileText,
  Gamepad2,
  Globe2,
  ListOrdered,
  LockKeyhole,
  Star,
} from "lucide-react";

import type {
  GameListItem,
} from "../game.types";

import {
  formatGameDate,
} from "../utils/format-game-date";

type GameCardProps = {
  game: GameListItem;
};

export default function GameCard({
  game,
}: GameCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl transition hover:border-zinc-700 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
          <Gamepad2
            size={21}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="wrap-break-word text-lg font-semibold text-zinc-100">
            {game.title}
          </h3>

          <p className="mt-1 break-all font-mono text-xs text-zinc-500">
            {game.slug}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={[
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            game.isPublic
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
              : "border-zinc-700 bg-zinc-800 text-zinc-400",
          ].join(" ")}
        >
          {game.isPublic ? (
            <Globe2
              size={13}
              aria-hidden="true"
            />
          ) : (
            <LockKeyhole
              size={13}
              aria-hidden="true"
            />
          )}

          {game.isPublic
            ? "Public"
            : "Private"}
        </span>

        {game.isFeatured && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
            <Star
              size={13}
              aria-hidden="true"
            />

            Featured
          </span>
        )}

        <span className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/5 px-2.5 py-1 text-xs font-semibold text-orange-300">
          {game.status}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
        {game.summary}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
          <dt className="text-xs text-zinc-500">
            Production Type
          </dt>

          <dd className="mt-1 wrap-break-word text-sm font-medium text-zinc-200">
            {game.productionType}
          </dd>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
          <dt className="text-xs text-zinc-500">
            Target Build
          </dt>

          <dd className="mt-1 wrap-break-word text-sm font-medium text-zinc-200">
            {game.targetBuild}
          </dd>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
          <dt className="flex items-center gap-1.5 text-xs text-zinc-500">
            <FileText
              size={13}
              aria-hidden="true"
            />

            Devlogs
          </dt>

          <dd className="mt-1 text-sm font-medium text-zinc-200">
            {game.devlogs.length} terkait
          </dd>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
          <dt className="flex items-center gap-1.5 text-xs text-zinc-500">
            <ListOrdered
              size={13}
              aria-hidden="true"
            />

            Urutan
          </dt>

          <dd className="mt-1 text-sm font-medium text-zinc-200">
            {game.order}
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex items-start gap-2 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
        <CalendarClock
          size={14}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <p>
          Terakhir diperbarui{" "}
          <span className="text-zinc-400">
            {formatGameDate(game.updatedAt)}
          </span>
        </p>
      </div>
    </article>
  );
}
// src/pages/CreateGamePage.tsx
import {
  ArrowLeft,
  Gamepad2,
} from "lucide-react";
import { Link } from "react-router";
import CreateGameForm from "../features/games/form/CreateGameForm";

export default function CreateGamePage() {
  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-100"
          >
            <ArrowLeft
              size={17}
              aria-hidden="true"
            />

            Kembali ke daftar Game
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 sm:text-sm">
            Content Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Tambah Game
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            Tambahkan data Game baru ke dalam
            Zennyx Local CMS.
          </p>
        </div>

        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
          <Gamepad2
            size={23}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-8">
        <CreateGameForm />
      </div>
    </section>
  );
}
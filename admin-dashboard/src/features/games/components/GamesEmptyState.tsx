// src/features/games/components/GamesEmptyState.tsx
import { Gamepad2 } from "lucide-react";

export default function GamesEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 px-5 py-10 text-center sm:px-8 sm:py-12">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
        <Gamepad2
          size={26}
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-zinc-100">
        Belum ada Game
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Data Game belum tersedia di Zennyx Local
        CMS. Nantinya Game baru dapat ditambahkan
        melalui halaman tambah Game.
      </p>
    </div>
  );
}
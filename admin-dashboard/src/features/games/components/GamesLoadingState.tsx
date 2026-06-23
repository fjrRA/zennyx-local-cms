// src/features/games/components/GamesLoadingState.tsx
import { LoaderCircle } from "lucide-react";

export default function GamesLoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-300"
    >
      <LoaderCircle
        size={20}
        className="shrink-0 animate-spin text-orange-500"
        aria-hidden="true"
      />

      <div>
        <h2 className="font-semibold text-zinc-200">
          Memuat daftar Game
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Mengambil data dari Zennyx Local CMS.
        </p>
      </div>
    </div>
  );
}
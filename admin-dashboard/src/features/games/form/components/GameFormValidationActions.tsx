// src/features/games/form/components/GameFormValidationActions.tsx
import {
  ClipboardCheck,
} from "lucide-react";

export default function GameFormValidationActions() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <p className="text-sm leading-6 text-zinc-500">
        Tombol ini baru memeriksa form.
        Data belum disimpan ke database.
      </p>

      <button
        type="submit"
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 sm:w-auto"
      >
        <ClipboardCheck
          size={18}
          aria-hidden="true"
        />

        Periksa Form
      </button>
    </div>
  );
}
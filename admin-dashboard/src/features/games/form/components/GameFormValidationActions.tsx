// src/features/games/form/components/
// GameFormValidationActions.tsx

import {
  LoaderCircle,
  Save,
} from "lucide-react";

type GameFormValidationActionsProps = {
  isSubmitting: boolean;
};

export default function GameFormValidationActions({
  isSubmitting,
}: GameFormValidationActionsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <p className="text-sm leading-6 text-zinc-500">
        Data akan diperiksa terlebih dahulu,
        lalu dikirim ke backend dan disimpan
        ke database lokal.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-500/50 disabled:text-zinc-900/70 sm:w-auto"
      >
        {isSubmitting ? (
          <LoaderCircle
            size={18}
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          <Save
            size={18}
            aria-hidden="true"
          />
        )}

        {isSubmitting
          ? "Menyimpan..."
          : "Simpan Game"}
      </button>
    </div>
  );
}
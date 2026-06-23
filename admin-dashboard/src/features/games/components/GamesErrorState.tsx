// src/features/games/components/GamesErrorState.tsx
import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

type GamesErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export default function GamesErrorState({
  message,
  onRetry,
}: GamesErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="flex items-start gap-3">
        <AlertCircle
          size={20}
          className="mt-0.5 shrink-0 text-red-400"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <h2 className="font-semibold text-red-300">
            Daftar Game gagal dimuat
          </h2>

          <p className="mt-1 wrap-break-word text-sm leading-6 text-red-200/70">
            {message}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 sm:w-auto"
      >
        <RefreshCw
          size={17}
          aria-hidden="true"
        />

        Coba Lagi
      </button>
    </div>
  );
}
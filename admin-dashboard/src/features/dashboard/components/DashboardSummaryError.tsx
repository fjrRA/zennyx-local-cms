// src/features/dashboard/components/DashboardSummaryError.tsx
import {
  CircleAlert,
  RefreshCw,
} from "lucide-react";

type DashboardSummaryErrorProps = {
  message: string;
  onRetry: () => void;
};

export default function DashboardSummaryError({
  message,
  onRetry,
}: DashboardSummaryErrorProps) {
  return (
    <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
      <div className="flex items-start gap-3">
        <CircleAlert
          size={22}
          className="mt-0.5 shrink-0 text-red-400"
          aria-hidden="true"
        />

        <div>
          <p className="font-semibold text-red-400">
            Ringkasan Dashboard gagal dimuat
          </p>

          <p className="mt-2 text-sm leading-6 text-red-300/80">
            {message}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
      >
        <RefreshCw
          size={17}
          aria-hidden="true"
        />

        Coba Lagi
      </button>
    </section>
  );
}
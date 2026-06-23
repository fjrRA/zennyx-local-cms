// src/features/dashboard/components/DashboardSummaryLoading.tsx
import { LoaderCircle } from "lucide-react";

const SUMMARY_CARD_COUNT = 4;

export default function DashboardSummaryLoading() {
  return (
    <section>
      <div className="flex items-center gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
        <LoaderCircle
          size={20}
          className="animate-spin text-orange-400"
          aria-hidden="true"
        />

        <div>
          <p className="text-sm font-semibold text-orange-300">
            Memuat ringkasan Dashboard...
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Mengambil data dari admin API.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: SUMMARY_CARD_COUNT,
        }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900"
          />
        ))}
      </div>

      <div className="mt-4 h-44 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900" />
    </section>
  );
}
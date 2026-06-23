// src/features/dashboard/components/DashboardSummaryHeader.tsx
import { RefreshCw } from "lucide-react";

type DashboardSummaryHeaderProps = {
  onRefresh: () => void;
};

export default function DashboardSummaryHeader({
  onRefresh,
}: DashboardSummaryHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h2 className="text-xl font-semibold text-zinc-100">
          Content Overview
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          Ringkasan data yang tersimpan di Zennyx
          Local CMS.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 sm:w-auto"
      >
        <RefreshCw
          size={17}
          aria-hidden="true"
        />

        Muat Ulang
      </button>
    </div>
  );
}
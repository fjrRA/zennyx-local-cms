// src/features/dashboard/components/DashboardSummaryDebug.tsx
import {
  Braces,
  CircleAlert,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import { useDashboardSummary } from "../hooks/useDashboardSummary";

export default function DashboardSummaryDebug() {
  const {
    state,
    retry,
  } = useDashboardSummary();

  if (state.status === "loading") {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <div className="flex items-center gap-3 text-orange-400">
          <LoaderCircle
            size={20}
            className="animate-spin"
            aria-hidden="true"
          />

          <p className="text-sm font-semibold">
            Memuat ringkasan Dashboard...
          </p>
        </div>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Mengambil data Games, Devlogs, Site,
          Team, dan Socials dari admin API.
        </p>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="flex items-start gap-3">
          <CircleAlert
            size={21}
            className="mt-0.5 shrink-0 text-red-400"
            aria-hidden="true"
          />

          <div>
            <p className="font-semibold text-red-400">
              Ringkasan Dashboard gagal dimuat
            </p>

            <p className="mt-2 text-sm leading-6 text-red-300/80">
              {state.message}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={retry}
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

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <Braces
            size={20}
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="font-semibold text-zinc-100">
            Dashboard Summary Response
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Hasil sementara sebelum dibuat menjadi
            kartu statistik.
          </p>
        </div>
      </div>

      <pre className="mt-5 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-xs leading-6 text-zinc-300">
        {JSON.stringify(state.data, null, 2)}
      </pre>

      <button
        type="button"
        onClick={retry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800"
      >
        <RefreshCw
          size={17}
          aria-hidden="true"
        />

        Muat Ulang Data
      </button>
    </section>
  );
}
// src/features/export/components/ExportBackendStatus.tsx
import {
  CircleAlert,
  LoaderCircle,
  RefreshCw,
  ServerCog,
} from "lucide-react";

import type {
  WebsiteExportStatusState,
} from "../export.types";

type ExportBackendStatusProps = {
  state: WebsiteExportStatusState;
  onRefresh: () => void;
};

export default function ExportBackendStatus({
  state,
  onRefresh,
}: ExportBackendStatusProps) {
  if (state.status === "loading") {
    return (
      <div
        aria-live="polite"
        className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4"
      >
        <LoaderCircle
          size={19}
          className="shrink-0 animate-spin text-orange-400"
          aria-hidden="true"
        />

        <div>
          <p className="text-sm font-semibold text-orange-300">
            Memeriksa status export
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Menghubungi admin API...
          </p>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div
        role="alert"
        className="flex flex-col justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center"
      >
        <div className="flex items-start gap-3">
          <CircleAlert
            size={19}
            className="mt-0.5 shrink-0 text-red-400"
            aria-hidden="true"
          />

          <div>
            <p className="text-sm font-semibold text-red-400">
              Status export tidak tersedia
            </p>

            <p className="mt-1 text-xs leading-5 text-red-300/80">
              {state.message}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/10 sm:w-auto"
        >
          <RefreshCw
            size={15}
            aria-hidden="true"
          />

          Periksa Ulang
        </button>
      </div>
    );
  }

  const isRunning =
    state.data.isRunning;

  return (
    <div
      aria-live="polite"
      className={[
        "flex items-center gap-3 rounded-xl border p-4",
        isRunning
          ? "border-amber-500/20 bg-amber-500/5"
          : "border-emerald-500/20 bg-emerald-500/5",
      ].join(" ")}
    >
      <ServerCog
        size={19}
        className={[
          "shrink-0",
          isRunning
            ? "text-amber-400"
            : "text-emerald-400",
        ].join(" ")}
        aria-hidden="true"
      />

      <div className="min-w-0">
        <p
          className={[
            "text-sm font-semibold",
            isRunning
              ? "text-amber-300"
              : "text-emerald-400",
          ].join(" ")}
        >
          {isRunning
            ? "Export sedang berjalan di backend"
            : "Backend siap menerima export"}
        </p>

        <p className="mt-1 wrap-break-word text-xs leading-5 text-zinc-500">
          Status diperbarui otomatis setiap dua
          detik.
        </p>
      </div>
    </div>
  );
}
// src/features/export/components/ExportErrorResult.tsx
import {
  CircleAlert,
  X,
} from "lucide-react";

import type {
  WebsiteExportErrorState,
} from "../export.types";

type ExportErrorResultProps = {
  state: WebsiteExportErrorState;
  onClose: () => void;
};

export default function ExportErrorResult({
  state,
  onClose,
}: ExportErrorResultProps) {
  const isAlreadyRunning =
    state.kind === "already-running";

  const containerClassName = isAlreadyRunning
    ? "border-amber-500/20 bg-amber-500/5"
    : "border-red-500/20 bg-red-500/5";

  const iconClassName = isAlreadyRunning
    ? "text-amber-400"
    : "text-red-400";

  const titleClassName = isAlreadyRunning
    ? "text-amber-300"
    : "text-red-400";

  const title = isAlreadyRunning
    ? "Export lain sedang berjalan"
    : "Export gagal";

  const statusMessage =
    state.statusCode === 0
      ? "Backend tidak dapat dijangkau"
      : `HTTP ${state.statusCode ?? "Unknown"}`;

  return (
    <section
      role="alert"
      className={[
        "mt-5 rounded-2xl border p-4 sm:p-5",
        containerClassName,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <CircleAlert
          size={22}
          className={[
            "mt-0.5 shrink-0",
            iconClassName,
          ].join(" ")}
          aria-hidden="true"
        />

        <div>
          <h3
            className={[
              "font-semibold",
              titleClassName,
            ].join(" ")}
          >
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {state.message}
          </p>

          <p className="mt-2 font-mono text-xs text-zinc-500">
            {statusMessage}
          </p>

          {isAlreadyRunning && (
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Tunggu proses export yang sedang aktif
              selesai sebelum mencoba kembali.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 sm:w-auto"
        >
          <X
            size={17}
            aria-hidden="true"
          />

          Tutup
        </button>
      </div>
    </section>
  );
}
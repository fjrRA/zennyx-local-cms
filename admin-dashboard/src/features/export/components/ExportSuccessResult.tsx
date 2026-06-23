// src/features/export/components/ExportSuccessResult.tsx
import {
  CheckCircle2,
  FolderOpen,
} from "lucide-react";

import type {
  WebsiteExportSuccessState,
} from "../export.types";

import ExportCountsGrid from "./ExportCountsGrid";

type ExportSuccessResultProps = {
  state: WebsiteExportSuccessState;
  onClose: () => void;
};

export default function ExportSuccessResult({
  state,
  onClose,
}: ExportSuccessResultProps) {
  const { result } = state;

  return (
    <section
      aria-live="polite"
      className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          size={22}
          className="mt-0.5 shrink-0 text-emerald-400"
          aria-hidden="true"
        />

        <div>
          <h3 className="font-semibold text-emerald-400">
            Export berhasil
          </h3>

          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {result.message}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <div className="flex items-start gap-3">
          <FolderOpen
            size={19}
            className="mt-0.5 shrink-0 text-orange-500"
            aria-hidden="true"
          />

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Destination
            </p>

            <p className="mt-2 break-all font-mono text-xs leading-6 text-zinc-300">
              {result.destination}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ExportCountsGrid
          counts={result.counts}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 sm:w-auto"
        >
          <CheckCircle2
            size={17}
            aria-hidden="true"
          />

          Selesai
        </button>
      </div>
    </section>
  );
}
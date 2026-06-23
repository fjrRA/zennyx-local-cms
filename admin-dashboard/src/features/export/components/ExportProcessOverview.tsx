// src/features/export/components/ExportProcessOverview.tsx
import {
  CheckCircle2,
  Database,
  FileCheck2,
} from "lucide-react";

const exportedContent = [
  "Games",
  "Devlogs",
  "Site",
  "Team",
  "Socials",
];

export default function ExportProcessOverview() {
  return (
    <>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center gap-3">
            <Database
              size={19}
              className="text-orange-500"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold text-zinc-200">
              Sumber Data
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Data diambil dari MySQL lokal melalui
            admin API.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center gap-3">
            <FileCheck2
              size={19}
              className="text-orange-500"
              aria-hidden="true"
            />

            <p className="text-sm font-semibold text-zinc-200">
              Staging dan Validasi
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Hasil export akan diperiksa sebelum
            mengganti konten website.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Konten yang diekspor
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {exportedContent.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs font-medium text-zinc-300"
            >
              <CheckCircle2
                size={14}
                className="text-emerald-400"
                aria-hidden="true"
              />

              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
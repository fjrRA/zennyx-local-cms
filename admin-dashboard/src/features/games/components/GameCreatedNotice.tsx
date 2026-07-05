// src/features/games/components/
// GameCreatedNotice.tsx

import {
  CheckCircle2,
  X,
} from "lucide-react";

type GameCreatedNoticeProps = {
  title: string;
  slug: string;
  onDismiss: () => void;
};

export default function GameCreatedNotice({
  title,
  slug,
  onDismiss,
}: GameCreatedNoticeProps) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5"
    >
      <CheckCircle2
        size={20}
        className="mt-0.5 shrink-0 text-emerald-400"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <h2 className="font-semibold text-emerald-300">
          Game berhasil ditambahkan
        </h2>

        <p className="mt-1 text-sm leading-6 text-emerald-200/70">
          <span className="font-medium text-emerald-200">
            {title}
          </span>{" "}
          sudah disimpan ke database lokal dan
          ditambahkan ke daftar Game.
        </p>

        <p className="mt-2 break-all font-mono text-xs text-emerald-300/60">
          {slug}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Tutup pesan berhasil"
        className="shrink-0 rounded-lg p-1.5 text-emerald-300/60 transition hover:bg-emerald-500/10 hover:text-emerald-200"
      >
        <X
          size={18}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
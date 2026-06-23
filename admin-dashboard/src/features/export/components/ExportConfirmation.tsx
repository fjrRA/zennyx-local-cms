// src/features/export/components/ExportConfirmation.tsx
import {
  CircleAlert,
  LoaderCircle,
  LockKeyhole,
  X,
} from "lucide-react";

type ExportConfirmationProps = {
  isExporting: boolean;
  isBlocked: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

export default function ExportConfirmation({
  isExporting,
  isBlocked,
  onCancel,
  onConfirm,
}: ExportConfirmationProps) {
  function handleConfirm() {
    void onConfirm();
  }

  return (
    <div
      role="region"
      aria-labelledby="export-confirmation-title"
      className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <CircleAlert
          size={21}
          className="mt-0.5 shrink-0 text-amber-400"
          aria-hidden="true"
        />

        <div>
          <h3
            id="export-confirmation-title"
            className="font-semibold text-amber-300"
          >
            Konfirmasi export
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Proses export akan membuat staging,
            memvalidasi hasil, lalu menyalin konten ke
            project zennyx-website.
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-300/80">
            Jangan menutup admin API ketika proses export
            sedang berjalan.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isExporting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <X
            size={17}
            aria-hidden="true"
          />

          Batal
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={
            isExporting ||
            isBlocked
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isExporting ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
                aria-hidden="true"
              />

              Mengekspor...
            </>
          ) : isBlocked ? (
            <>
              <LockKeyhole
                size={17}
                aria-hidden="true"
              />

              Export belum tersedia
            </>
          ) : (
            <>
              <LockKeyhole
                size={17}
                aria-hidden="true"
              />

              Konfirmasi Export
            </>
          )}
        </button>
      </div>
    </div>
  );
}
// src/features/export/components/ExportPanelHeader.tsx
import {
  FolderInput,
  FolderSync,
  LoaderCircle,
} from "lucide-react";

type ExportPanelHeaderProps = {
  buttonLabel: string;
  isDisabled: boolean;
  isLoading: boolean;
  onOpenConfirmation: () => void;
};

export default function ExportPanelHeader({
  buttonLabel,
  isDisabled,
  isLoading,
  onOpenConfirmation,
}: ExportPanelHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
      <div className="flex min-w-0 items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
          <FolderSync
            size={23}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">
            Website Export
          </p>

          <h2 className="mt-1 text-xl font-semibold text-zinc-100">
            Export to Website
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Siapkan seluruh konten dari database
            lokal untuk disalin ke folder content
            milik zennyx-website.
          </p>

          <p className="mt-3 break-all font-mono text-xs text-zinc-500">
            POST /api/export/website
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenConfirmation}
        disabled={isDisabled}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isLoading ? (
          <LoaderCircle
            size={18}
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          <FolderInput
            size={18}
            aria-hidden="true"
          />
        )}

        {buttonLabel}
      </button>
    </div>
  );
}
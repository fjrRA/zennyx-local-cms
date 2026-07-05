// src/features/media/components/
// GalleryImageGrid.tsx

import {
  ImageOff,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  getGameMediaPreviewUrl,
} from "../utils/media-preview-url";

type GalleryImageGridProps = {
  values: string[];

  onRemove: (
    index: number,
  ) => void;

  disabled?: boolean;

  deletingIndex?:
  number | null;
};

type GalleryItem = {
  originalIndex: number;
  publicPath: string;
  previewUrl: string | null;
};

export default function GalleryImageGrid({
  values,
  onRemove,
  disabled = false,
  deletingIndex = null,
}: GalleryImageGridProps) {
  const [
    brokenImagePaths,
    setBrokenImagePaths,
  ] = useState<Set<string>>(
    () => new Set(),
  );

  const items: GalleryItem[] =
    values
      .map(
        (
          value,
          originalIndex,
        ) => {
          const publicPath =
            value.trim();

          return {
            originalIndex,
            publicPath,

            previewUrl:
              getGameMediaPreviewUrl(
                publicPath,
              ),
          };
        },
      )
      .filter(
        (item) =>
          item.publicPath.length > 0,
      );

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-5 py-10 text-center">
        <ImageOff
          size={34}
          className="mx-auto text-zinc-700"
          aria-hidden="true"
        />

        <p className="mt-3 text-sm text-zinc-500">
          Belum ada gambar Gallery.
        </p>
      </div>
    );
  }

  function markImageAsBroken(
    publicPath: string,
  ) {
    setBrokenImagePaths(
      (currentPaths) => {
        const nextPaths =
          new Set(currentPaths);

        nextPaths.add(publicPath);

        return nextPaths;
      },
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(
        (
          {
            originalIndex,
            publicPath,
            previewUrl,
          },
          visibleIndex,
        ) => {
          const previewIsBroken =
            brokenImagePaths.has(
              publicPath,
            );

          const canShowPreview =
            Boolean(previewUrl) &&
            !previewIsBroken;

          const isDeleting =
            deletingIndex ===
            originalIndex;

          return (
            <article
              key={`${publicPath}-${originalIndex}`}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
            >
              <div className="flex aspect-video items-center justify-center bg-black/30 p-3">
                {canShowPreview ? (
                  <img
                    src={
                      previewUrl ??
                      undefined
                    }
                    alt={`Preview Gallery ${visibleIndex + 1}`}
                    onError={() =>
                      markImageAsBroken(
                        publicPath,
                      )
                    }
                    className="h-full w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center text-zinc-600">
                    <ImageOff
                      size={30}
                      aria-hidden="true"
                    />

                    <p className="text-xs">
                      Preview tidak tersedia.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t border-zinc-800 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                    Gallery{" "}
                    {visibleIndex + 1}
                  </p>

                  <p className="mt-1 break-all font-mono text-xs leading-5 text-zinc-400">
                    {publicPath}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={
                    disabled ||
                    isDeleting
                  }
                  onClick={() =>
                    onRemove(
                      originalIndex,
                    )
                  }
                  aria-label={`Hapus Gallery gambar ${visibleIndex + 1}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isDeleting ? (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Trash2
                      size={17}
                      aria-hidden="true"
                    />
                  )}

                  {isDeleting
                    ? "Menghapus..."
                    : "Hapus gambar"}
                </button>
              </div>
            </article>
          );
        },
      )}
    </div>
  );
}
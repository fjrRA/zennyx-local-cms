// src/features/media/components/
// GalleryImageUploadField.tsx

import {
  Images,
  LoaderCircle,
  Upload,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
} from "react";

import {
  getApiErrorMessage,
  isAbortError,
} from "../../../lib/api";

import {
  deleteGameImage,
} from "../api/media.service";

import {
  useGalleryImageUpload,
} from "../hooks/useGalleryImageUpload";

import {
  IMAGE_FILE_ACCEPT,
  isValidGameSlugForMedia,
  validateImageUploadFile,
} from "../utils/image-upload-validation";

import {
  getGameMediaPreviewUrl,
} from "../utils/media-preview-url";

import GalleryImageGrid from "./GalleryImageGrid";

type GalleryImageUploadFieldProps = {
  id: string;
  label: string;
  description: string;

  slug: string;
  values: string[];
  maxImages: number;

  onUploaded: (
    publicPaths: string[],
  ) => void;

  onRemove: (
    index: number,
  ) => void;

  validationError?: string | null;
  disabled?: boolean;
};

export default function GalleryImageUploadField({
  id,
  label,
  description,
  slug,
  values,
  maxImages,
  onUploaded,
  onRemove,
  validationError = null,
  disabled = false,
}: GalleryImageUploadFieldProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const [
    clientError,
    setClientError,
  ] = useState<string | null>(
    null,
  );

  const [
    deletingIndex,
    setDeletingIndex,
  ] = useState<number | null>(
    null,
  );

  const [
    deleteError,
    setDeleteError,
  ] = useState<string | null>(
    null,
  );

  const {
    status,
    isUploading,
    progress,
    failures,
    errorMessage,
    uploadGalleryImages,
    resetUpload,
  } = useGalleryImageUpload();

  const normalizedValues =
    values
      .map((value) => value.trim())
      .filter(
        (value) =>
          value.length > 0,
      );

  const currentImageCount =
    normalizedValues.length;

  const remainingSlots =
    Math.max(
      maxImages -
      currentImageCount,
      0,
    );

  const slugIsValid =
    isValidGameSlugForMedia(
      slug,
    );

  /*
   * Delete error ditampilkan secara
   * terpisah di bawah Gallery Grid.
   */
  const visibleError =
    clientError ??
    errorMessage ??
    validationError;

  const fileInputId =
    `${id}-file`;

  const errorId =
    `${id}-upload-error`;

  const uploadIsDisabled =
    disabled ||
    isUploading ||
    deletingIndex !== null ||
    !slugIsValid ||
    remainingSlots === 0;

  const visibleProgressNumber =
    progress
      ? Math.min(
        progress.currentFileName
          ? progress.completed + 1
          : progress.completed,
        progress.total,
      )
      : 0;

  function openFilePicker() {
    if (uploadIsDisabled) {
      return;
    }

    inputRef.current?.click();
  }

  async function handleFileChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFiles =
      Array.from(
        event.currentTarget.files ??
        [],
      );

    /*
     * Mengosongkan input memungkinkan
     * pengguna memilih file yang sama lagi.
     */
    event.currentTarget.value = "";

    if (
      selectedFiles.length === 0
    ) {
      return;
    }

    setDeleteError(null);

    if (!slugIsValid) {
      setClientError(
        "Isi slug Game yang valid sebelum mengunggah Gallery.",
      );

      return;
    }

    if (
      selectedFiles.length >
      remainingSlots
    ) {
      setClientError(
        `Sisa slot Gallery hanya ${remainingSlots} gambar.`,
      );

      return;
    }

    /*
     * Seluruh file diperiksa terlebih dahulu.
     * Jika satu file tidak valid, tidak ada
     * request upload yang dijalankan.
     */
    for (
      const file of selectedFiles
    ) {
      const validationMessage =
        validateImageUploadFile(
          file,
        );

      if (validationMessage) {
        setClientError(
          `${file.name}: ${validationMessage}`,
        );

        return;
      }
    }

    setClientError(null);

    try {
      const result =
        await uploadGalleryImages(
          selectedFiles,
          slug.trim(),
        );

      const publicPaths =
        result.uploadedImages.map(
          (image) =>
            image.publicPath,
        );

      /*
       * File yang berhasil tetap dimasukkan
       * ke form walaupun file lain gagal.
       */
      if (
        publicPaths.length > 0
      ) {
        onUploaded(publicPaths);
      }
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      /*
       * Error non-Abort sudah disimpan
       * oleh useGalleryImageUpload.
       */
    }
  }

  async function handleRemoveImage(
    index: number,
  ) {
    if (
      deletingIndex !== null ||
      isUploading
    ) {
      return;
    }

    const publicPath =
      values[index]?.trim();

    /*
     * Jika item kosong, cukup bersihkan
     * item tersebut dari state form.
     */
    if (!publicPath) {
      onRemove(index);
      return;
    }

    resetUpload();
    setClientError(null);
    setDeleteError(null);
    setDeletingIndex(index);

    try {
      /*
       * Hanya path media yang dikelola CMS
       * yang dihapus secara fisik.
       *
       * Path lama atau path yang tidak sesuai
       * pola /images/games/... cukup dihapus
       * dari state form.
       */
      const isManagedMedia =
        Boolean(
          getGameMediaPreviewUrl(
            publicPath,
          ),
        );

      if (isManagedMedia) {
        await deleteGameImage(
          publicPath,
        );
      }

      /*
       * State form baru diubah setelah
       * proses delete berhasil.
       */
      onRemove(index);
    } catch (error) {
      setDeleteError(
        `Gallery gagal dihapus: ${getApiErrorMessage(
          error,
        )}`,
      );
    } finally {
      setDeletingIndex(null);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-zinc-100">
          {label}
        </p>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>

      <input
        ref={inputRef}
        id={fileInputId}
        type="file"
        multiple
        accept={IMAGE_FILE_ACCEPT}
        disabled={
          uploadIsDisabled
        }
        aria-invalid={
          Boolean(visibleError)
        }
        aria-describedby={
          visibleError
            ? errorId
            : undefined
        }
        onChange={
          handleFileChange
        }
        className="sr-only"
      />

      <div
        className={[
          "rounded-2xl border bg-zinc-950 p-5",
          visibleError
            ? "border-red-500/60"
            : "border-zinc-800",
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <Images
            size={38}
            className="text-zinc-600"
            aria-hidden="true"
          />

          <div>
            <p className="text-sm font-medium text-zinc-300">
              {currentImageCount} dari{" "}
              {maxImages} gambar digunakan
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Tersisa {remainingSlots} slot
              Gallery.
            </p>
          </div>

          <button
            id={id}
            type="button"
            disabled={
              uploadIsDisabled
            }
            aria-invalid={
              Boolean(visibleError)
            }
            aria-describedby={
              visibleError
                ? errorId
                : undefined
            }
            onClick={
              openFilePicker
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-orange-500/50 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? (
              <LoaderCircle
                size={17}
                className="animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Upload
                size={17}
                aria-hidden="true"
              />
            )}

            {isUploading
              ? "Mengunggah Gallery..."
              : "Pilih gambar Gallery"}
          </button>
        </div>

        {!slugIsValid ? (
          <p className="mt-4 text-sm leading-6 text-amber-400">
            Isi slug Game yang valid
            sebelum mengunggah Gallery.
          </p>
        ) : null}

        {remainingSlots === 0 ? (
          <p className="mt-4 text-sm leading-6 text-amber-400">
            Gallery sudah mencapai
            batas maksimal {maxImages}{" "}
            gambar.
          </p>
        ) : null}

        {isUploading && progress ? (
          <div
            role="status"
            className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4"
          >
            <p className="text-sm font-medium text-zinc-300">
              Mengunggah{" "}
              {visibleProgressNumber} dari{" "}
              {progress.total}
            </p>

            {progress.currentFileName ? (
              <p className="mt-1 break-all text-xs text-zinc-500">
                {
                  progress.currentFileName
                }
              </p>
            ) : null}
          </div>
        ) : null}

        {status === "success" ? (
          <p
            role="status"
            className="mt-4 text-sm text-emerald-400"
          >
            Semua gambar Gallery
            berhasil diunggah.
          </p>
        ) : null}

        {visibleError ? (
          <p
            id={errorId}
            role="alert"
            className="mt-4 text-sm leading-6 text-red-400"
          >
            {visibleError}
          </p>
        ) : null}

        {failures.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {failures.map(
              (
                failure,
                index,
              ) => (
                <li
                  key={`${failure.fileName}-${index}`}
                  className="text-xs leading-5 text-red-300"
                >
                  <span className="font-medium">
                    {
                      failure.fileName
                    }
                    :
                  </span>{" "}
                  {failure.message}
                </li>
              ),
            )}
          </ul>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-zinc-600">
          Pilih beberapa JPEG, PNG,
          atau WebP sekaligus. Maksimal
          8 MiB per file.
        </p>
      </div>

      <GalleryImageGrid
        values={values}
        disabled={
          disabled ||
          isUploading ||
          deletingIndex !== null
        }
        onRemove={
          handleRemoveImage
        }
      />

      {deleteError ? (
        <p
          role="alert"
          className="text-sm leading-6 text-red-400"
        >
          {deleteError}
        </p>
      ) : null}
    </div>
  );
}
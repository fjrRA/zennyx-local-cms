// src/features/media/components/
// ImageUploadField.tsx

import {
  ImageIcon,
  LoaderCircle,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";

import {
  useEffect,
  useMemo,
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
  useImageUpload,
} from "../hooks/useImageUpload";

import type {
  GameImageRole,
} from "../media.types";

import {
  IMAGE_FILE_ACCEPT,
  formatImageFileSize,
  isValidGameSlugForMedia,
  validateImageUploadFile,
} from "../utils/image-upload-validation";

import {
  getGameMediaPreviewUrl,
} from "../utils/media-preview-url";

type ImageUploadFieldProps = {
  id: string;
  label: string;
  slug: string;
  role: GameImageRole;
  value: string;

  onValueChange: (
    publicPath: string,
  ) => void;

  description?: string;
  previewAlt?: string;
  validationError?: string | null;
  disabled?: boolean;
  required?: boolean;
};

export default function ImageUploadField({
  id,
  label,
  slug,
  role,
  value,
  onValueChange,
  description,
  previewAlt,
  validationError = null,
  disabled = false,
  required = false,
}: ImageUploadFieldProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const [
    temporaryPreviewUrl,
    setTemporaryPreviewUrl,
  ] = useState<string | null>(
    null,
  );

  const [
    selectedFileInfo,
    setSelectedFileInfo,
  ] = useState<string | null>(
    null,
  );

  const [
    clientError,
    setClientError,
  ] = useState<string | null>(
    null,
  );

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const [
    deleteError,
    setDeleteError,
  ] = useState<string | null>(
    null,
  );

  const [
    cleanupWarning,
    setCleanupWarning,
  ] = useState<string | null>(
    null,
  );

  const {
    status,
    isUploading,
    errorMessage,
    uploadImage,
    cancelUpload,
    resetUpload,
  } = useImageUpload();

  const normalizedValue =
    value.trim();

  const hasValue =
    normalizedValue.length > 0;

  const slugIsValid =
    isValidGameSlugForMedia(slug);

  const storedPreviewUrl =
    useMemo(
      () =>
        getGameMediaPreviewUrl(
          normalizedValue,
        ),
      [normalizedValue],
    );

  const activePreviewUrl =
    temporaryPreviewUrl ??
    storedPreviewUrl;

  const visibleError =
    clientError ??
    errorMessage ??
    deleteError ??
    validationError;

  const fieldErrorId =
    `${id}-upload-error`;

  const fileInputId =
    `${id}-file`;

  useEffect(() => {
    return () => {
      if (temporaryPreviewUrl) {
        URL.revokeObjectURL(
          temporaryPreviewUrl,
        );
      }
    };
  }, [temporaryPreviewUrl]);

  function openFilePicker() {
    if (
      disabled ||
      isUploading ||
      isDeleting ||
      !slugIsValid
    ) {
      return;
    }

    inputRef.current?.click();
  }

  async function handleFileChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.currentTarget.files?.[0];

    event.currentTarget.value = "";

    if (!file) {
      return;
    }

    setDeleteError(null);
    setCleanupWarning(null);

    const validationMessage =
      validateImageUploadFile(file);

    if (validationMessage) {
      setClientError(
        validationMessage,
      );

      return;
    }

    if (!slugIsValid) {
      setClientError(
        "Isi slug Game yang valid sebelum mengunggah gambar.",
      );

      return;
    }

    setClientError(null);

    /*
     * Simpan path lama sebelum upload.
     * Path ini akan dihapus setelah gambar
     * baru berhasil disimpan.
     */
    const previousPublicPath =
      normalizedValue;

    const objectUrl =
      URL.createObjectURL(file);

    setTemporaryPreviewUrl(
      objectUrl,
    );

    setSelectedFileInfo(
      `${file.name} · ${formatImageFileSize(
        file.size,
      )}`,
    );

    try {
      const uploadedImage =
        await uploadImage({
          file,
          slug: slug.trim(),
          role,
        });

      /*
       * Ganti state form terlebih dahulu
       * menggunakan path gambar baru.
       */
      onValueChange(
        uploadedImage.publicPath,
      );

      setTemporaryPreviewUrl(null);

      setSelectedFileInfo(
        `${uploadedImage.originalName} · ${formatImageFileSize(
          uploadedImage.size,
        )}`,
      );

      /*
       * Hapus file lama hanya jika path lama
       * merupakan media yang dikelola CMS.
       */
      const oldImageIsManaged =
        Boolean(
          getGameMediaPreviewUrl(
            previousPublicPath,
          ),
        );

      if (
        previousPublicPath &&
        previousPublicPath !==
        uploadedImage.publicPath &&
        oldImageIsManaged
      ) {
        try {
          await deleteGameImage(
            previousPublicPath,
          );
        } catch (error) {
          setCleanupWarning(
            `Gambar baru berhasil disimpan, tetapi file lama gagal dihapus: ${getApiErrorMessage(
              error,
            )}`,
          );
        }
      }
    } catch (error) {
      setTemporaryPreviewUrl(null);

      if (isAbortError(error)) {
        return;
      }
    }
  }

  async function handleClearValue() {
    if (
      isDeleting ||
      isUploading
    ) {
      return;
    }

    cancelUpload();
    resetUpload();

    setDeleteError(null);
    setCleanupWarning(null);

    /*
     * Hanya hapus file fisik jika path
     * berasal dari folder media Game CMS.
     *
     * Path lama atau path eksternal tetap
     * boleh dibersihkan dari form tanpa
     * mencoba menghapus file storage.
     */
    const shouldDeletePhysicalFile =
      Boolean(
        getGameMediaPreviewUrl(
          normalizedValue,
        ),
      );

    if (
      normalizedValue &&
      shouldDeletePhysicalFile
    ) {
      setIsDeleting(true);

      try {
        await deleteGameImage(
          normalizedValue,
        );
      } catch (error) {
        setDeleteError(
          `Gambar gagal dihapus: ${getApiErrorMessage(
            error,
          )}`,
        );

        return;
      } finally {
        setIsDeleting(false);
      }
    }

    setTemporaryPreviewUrl(null);
    setSelectedFileInfo(null);
    setClientError(null);

    onValueChange("");
  }

  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor={fileInputId}
          className="text-sm font-semibold text-zinc-100"
        >
          {label}

          {required ? (
            <span className="ml-1 text-orange-400">
              *
            </span>
          ) : null}
        </label>

        {description ? (
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            {description}
          </p>
        ) : null}
      </div>

      <input
        ref={inputRef}
        id={fileInputId}
        type="file"
        accept={IMAGE_FILE_ACCEPT}
        disabled={
          disabled ||
          isUploading ||
          isDeleting ||
          !slugIsValid
        }
        aria-invalid={
          Boolean(visibleError)
        }
        aria-describedby={
          visibleError
            ? fieldErrorId
            : undefined
        }
        onChange={handleFileChange}
        className="sr-only"
      />

      <div
        className={[
          "overflow-hidden rounded-2xl border bg-zinc-950",
          visibleError
            ? "border-red-500/60"
            : "border-zinc-800",
        ].join(" ")}
      >
        <div className="flex min-h-52 items-center justify-center bg-black/20 p-4">
          {activePreviewUrl ? (
            <img
              src={activePreviewUrl}
              alt={
                previewAlt ??
                `Preview ${label}`
              }
              className="max-h-80 w-full rounded-xl object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 py-10 text-center text-zinc-600">
              <ImageIcon
                size={38}
                aria-hidden="true"
              />

              <p className="text-sm">
                Belum ada gambar.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 border-t border-zinc-800 p-4">
          {normalizedValue ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                Public path
              </p>

              <p className="mt-1 break-all font-mono text-xs leading-5 text-zinc-400">
                {normalizedValue}
              </p>
            </div>
          ) : null}

          {selectedFileInfo ? (
            <p className="break-all text-xs text-zinc-500">
              {selectedFileInfo}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              id={id}
              type="button"
              disabled={
                disabled ||
                isUploading ||
                isDeleting ||
                !slugIsValid
              }
              aria-invalid={
                Boolean(visibleError)
              }
              aria-describedby={
                visibleError
                  ? fieldErrorId
                  : undefined
              }
              onClick={openFilePicker}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-orange-500/50 hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                  aria-hidden="true"
                />
              ) : hasValue ? (
                <RefreshCw
                  size={17}
                  aria-hidden="true"
                />
              ) : (
                <Upload
                  size={17}
                  aria-hidden="true"
                />
              )}

              {isUploading
                ? "Mengunggah..."
                : hasValue
                  ? "Ganti gambar"
                  : "Pilih gambar"}
            </button>

            {hasValue ? (
              <button
                type="button"
                disabled={
                  disabled ||
                  isUploading ||
                  isDeleting
                }
                onClick={handleClearValue}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
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
            ) : null}
          </div>

          {!slugIsValid ? (
            <p className="text-sm leading-6 text-amber-400">
              Isi slug Game yang valid sebelum
              mengunggah gambar.
            </p>
          ) : null}

          {status === "success" ? (
            <p
              role="status"
              className="text-sm text-emerald-400"
            >
              Gambar berhasil diunggah.
            </p>
          ) : null}

          {cleanupWarning ? (
            <p
              role="alert"
              className="text-sm leading-6 text-amber-400"
            >
              {cleanupWarning}
            </p>
          ) : null}

          {visibleError ? (
            <p
              id={fieldErrorId}
              role="alert"
              className="text-sm leading-6 text-red-400"
            >
              {visibleError}
            </p>
          ) : null}

          <p className="text-xs leading-5 text-zinc-600">
            JPEG, PNG, atau WebP. Maksimal
            8 MiB.
          </p>
        </div>
      </div>
    </div>
  );
}
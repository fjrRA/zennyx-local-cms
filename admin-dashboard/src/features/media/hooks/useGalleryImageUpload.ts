// src/features/media/hooks/
// useGalleryImageUpload.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  isAbortError,
} from "../../../lib/api";

import {
  uploadGameImage,
} from "../api/media.service";

import {
  getMediaUploadErrorMessage,
} from "../utils/media-upload-error";

import type {
  UploadedGameImage,
} from "../media.types";

export type GalleryImageUploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "partial-error"
  | "error";

export type GalleryImageUploadFailure = {
  fileName: string;
  message: string;
};

export type GalleryImageUploadProgress = {
  completed: number;
  total: number;
  currentFileName: string | null;
};

export type GalleryImageUploadResult = {
  uploadedImages: UploadedGameImage[];

  failures:
  GalleryImageUploadFailure[];
};

type UseGalleryImageUploadResult = {
  status: GalleryImageUploadStatus;
  isUploading: boolean;

  progress:
  GalleryImageUploadProgress | null;

  uploadedImages:
  UploadedGameImage[];

  failures:
  GalleryImageUploadFailure[];

  errorMessage: string | null;

  uploadGalleryImages: (
    files: File[],
    slug: string,
  ) => Promise<GalleryImageUploadResult>;

  cancelUpload: () => void;
  resetUpload: () => void;
};

export function useGalleryImageUpload():
  UseGalleryImageUploadResult {
  const [
    status,
    setStatus,
  ] = useState<GalleryImageUploadStatus>(
    "idle",
  );

  const [
    progress,
    setProgress,
  ] =
    useState<GalleryImageUploadProgress | null>(
      null,
    );

  const [
    uploadedImages,
    setUploadedImages,
  ] = useState<UploadedGameImage[]>(
    [],
  );

  const [
    failures,
    setFailures,
  ] =
    useState<GalleryImageUploadFailure[]>(
      [],
    );

  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string | null>(
    null,
  );

  const abortControllerRef =
    useRef<AbortController | null>(
      null,
    );

  const isMountedRef =
    useRef(true);

  const cancelUpload =
    useCallback(() => {
      const controller =
        abortControllerRef.current;

      abortControllerRef.current =
        null;

      controller?.abort();

      if (!isMountedRef.current) {
        return;
      }

      setStatus("idle");
      setProgress(null);
      setUploadedImages([]);
      setFailures([]);
      setErrorMessage(null);
    }, []);

  const resetUpload =
    useCallback(() => {
      if (!isMountedRef.current) {
        return;
      }

      setStatus("idle");
      setProgress(null);
      setUploadedImages([]);
      setFailures([]);
      setErrorMessage(null);
    }, []);

  const uploadGalleryImages =
    useCallback(
      async (
        files: File[],
        slug: string,
      ): Promise<GalleryImageUploadResult> => {
        if (files.length === 0) {
          return {
            uploadedImages: [],
            failures: [],
          };
        }

        abortControllerRef.current?.abort();

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;

        if (isMountedRef.current) {
          setStatus("uploading");

          setProgress({
            completed: 0,
            total: files.length,

            currentFileName:
              files[0]?.name ?? null,
          });

          setUploadedImages([]);
          setFailures([]);
          setErrorMessage(null);
        }

        const successfulUploads:
          UploadedGameImage[] = [];

        const failedUploads:
          GalleryImageUploadFailure[] = [];

        try {
          for (
            let index = 0;
            index < files.length;
            index += 1
          ) {
            const file =
              files[index];

            if (!file) {
              continue;
            }

            if (
              controller.signal.aborted
            ) {
              throw new DOMException(
                "Upload dibatalkan.",
                "AbortError",
              );
            }

            if (
              isMountedRef.current &&
              abortControllerRef.current ===
              controller
            ) {
              setProgress({
                completed: index,
                total: files.length,
                currentFileName:
                  file.name,
              });
            }

            try {
              const uploadedImage =
                await uploadGameImage(
                  {
                    file,
                    slug,
                    role: "gallery",
                  },
                  controller.signal,
                );

              successfulUploads.push(
                uploadedImage,
              );
            } catch (error) {
              if (isAbortError(error)) {
                throw error;
              }

              failedUploads.push({
                fileName: file.name,

                message:
                  getMediaUploadErrorMessage(
                    error,
                  ),
              });
            }

            if (
              isMountedRef.current &&
              abortControllerRef.current ===
              controller
            ) {
              setProgress({
                completed: index + 1,
                total: files.length,

                currentFileName:
                  files[index + 1]
                    ?.name ?? null,
              });
            }
          }

          if (
            isMountedRef.current &&
            abortControllerRef.current ===
            controller
          ) {
            setUploadedImages(
              successfulUploads,
            );

            setFailures(
              failedUploads,
            );

            if (
              failedUploads.length === 0
            ) {
              setStatus("success");
              setErrorMessage(null);
            } else if (
              successfulUploads.length > 0
            ) {
              setStatus(
                "partial-error",
              );

              setErrorMessage(
                `${failedUploads.length} dari ${files.length} gambar gagal diunggah.`,
              );
            } else {
              setStatus("error");

              setErrorMessage(
                "Semua gambar Gallery gagal diunggah.",
              );
            }
          }

          return {
            uploadedImages:
              successfulUploads,

            failures:
              failedUploads,
          };
        } catch (error) {
          if (
            isAbortError(error) &&
            isMountedRef.current &&
            abortControllerRef.current ===
            controller
          ) {
            setStatus("idle");
            setProgress(null);
            setErrorMessage(null);
          }

          throw error;
        } finally {
          if (
            abortControllerRef.current ===
            controller
          ) {
            abortControllerRef.current =
              null;
          }
        }
      },
      [],
    );

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      abortControllerRef.current?.abort();

      abortControllerRef.current =
        null;
    };
  }, []);

  return {
    status,

    isUploading:
      status === "uploading",

    progress,
    uploadedImages,
    failures,
    errorMessage,

    uploadGalleryImages,
    cancelUpload,
    resetUpload,
  };
}
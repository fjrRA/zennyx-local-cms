// src/features/media/hooks/
// useImageUpload.ts

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
  getMediaUploadErrorMessage,
} from "../utils/media-upload-error";

import {
  uploadGameImage,
} from "../api/media.service";

import type {
  UploadedGameImage,
  UploadGameImageInput,
} from "../media.types";

export type ImageUploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error";

type UseImageUploadResult = {
  status: ImageUploadStatus;
  isUploading: boolean;
  errorMessage: string | null;

  uploadedImage:
  UploadedGameImage | null;

  uploadImage: (
    input: UploadGameImageInput,
  ) => Promise<UploadedGameImage>;

  cancelUpload: () => void;
  resetUpload: () => void;
};

export function useImageUpload():
  UseImageUploadResult {
  const [
    status,
    setStatus,
  ] = useState<ImageUploadStatus>(
    "idle",
  );

  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string | null>(
    null,
  );

  const [
    uploadedImage,
    setUploadedImage,
  ] = useState<UploadedGameImage | null>(
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
      const activeController =
        abortControllerRef.current;

      abortControllerRef.current =
        null;

      activeController?.abort();

      if (!isMountedRef.current) {
        return;
      }

      setStatus("idle");
      setErrorMessage(null);
      setUploadedImage(null);
    }, []);

  const resetUpload =
    useCallback(() => {
      if (!isMountedRef.current) {
        return;
      }

      setStatus("idle");
      setErrorMessage(null);
      setUploadedImage(null);
    }, []);

  const uploadImage =
    useCallback(
      async (
        input: UploadGameImageInput,
      ): Promise<UploadedGameImage> => {
        abortControllerRef.current?.abort();

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;

        if (isMountedRef.current) {
          setStatus("uploading");
          setErrorMessage(null);
          setUploadedImage(null);
        }

        try {
          const result =
            await uploadGameImage(
              input,
              controller.signal,
            );

          if (
            isMountedRef.current &&
            abortControllerRef.current ===
            controller
          ) {
            setStatus("success");
            setUploadedImage(result);
          }

          return result;
        } catch (error) {
          const isCurrentRequest =
            abortControllerRef.current ===
            controller;

          if (isAbortError(error)) {
            if (
              isMountedRef.current &&
              isCurrentRequest
            ) {
              setStatus("idle");
              setErrorMessage(null);
            }

            throw error;
          }

          if (
            isMountedRef.current &&
            isCurrentRequest
          ) {
            setStatus("error");

            setErrorMessage(
              getMediaUploadErrorMessage(error),
            );
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

    errorMessage,
    uploadedImage,

    uploadImage,
    cancelUpload,
    resetUpload,
  };
}
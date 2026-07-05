// src/features/games/form/hooks/
// useCreateGameSubmit.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  isAbortError,
} from "../../../../lib/api";

import {
  createGame,
} from "../../api/games.service";

import {
  resolveGameSubmitError,
} from "../validation/game-submit-error.helper";

import type {
  CreateGameInput,
  GameRecord,
} from "../../game.types";

import type {
  GameSubmitErrorState,
} from "../validation/game-submit-error.helper";

type CreateGameSubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type UseCreateGameSubmitResult = {
  status: CreateGameSubmitStatus;
  isSubmitting: boolean;

  submitError:
  GameSubmitErrorState | null;

  submitCreateGame: (
    input: CreateGameInput,
  ) => Promise<GameRecord>;

  cancelSubmit: () => void;
  resetSubmitState: () => void;
};

export function useCreateGameSubmit():
  UseCreateGameSubmitResult {
  const [
    status,
    setStatus,
  ] = useState<CreateGameSubmitStatus>(
    "idle",
  );

  const [
    submitError,
    setSubmitError,
  ] = useState<GameSubmitErrorState | null>(
    null,
  );

  const abortControllerRef =
    useRef<AbortController | null>(null);

  const isMountedRef = useRef(true);

  const cancelSubmit = useCallback(() => {
    const activeController =
      abortControllerRef.current;

    abortControllerRef.current = null;

    activeController?.abort();

    if (!isMountedRef.current) {
      return;
    }

    setStatus("idle");
    setSubmitError(null);
  }, []);

  const resetSubmitState =
    useCallback(() => {
      if (!isMountedRef.current) {
        return;
      }

      setStatus("idle");
      setSubmitError(null);
    }, []);

  const submitCreateGame = useCallback(
    async (
      input: CreateGameInput,
    ): Promise<GameRecord> => {
      abortControllerRef.current?.abort();

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      if (isMountedRef.current) {
        setStatus("submitting");
        setSubmitError(null);
      }

      try {
        const createdGame =
          await createGame(
            input,
            controller.signal,
          );

        if (
          isMountedRef.current &&
          abortControllerRef.current ===
          controller
        ) {
          setStatus("success");
        }

        return createdGame;
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
            setSubmitError(null);
          }

          throw error;
        }

        if (
          isMountedRef.current &&
          isCurrentRequest
        ) {
          setStatus("error");

          setSubmitError(
            resolveGameSubmitError(error),
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
      abortControllerRef.current = null;
    };
  }, []);

  return {
    status,
    isSubmitting:
      status === "submitting",

    submitError,

    submitCreateGame,
    cancelSubmit,
    resetSubmitState,
  };
}
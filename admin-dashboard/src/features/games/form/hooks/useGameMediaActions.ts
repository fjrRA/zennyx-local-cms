// src/features/games/form/hooks/
// useGameMediaActions.ts

import {
  useCallback,
} from "react";

import {
  MAX_GAME_GALLERY_IMAGES,
} from "../game-media.constants";

import type {
  GameMediaFormState,
} from "../game-form.types";

import type {
  SetGameFormState,
} from "./game-form-action.types";

export type GameMediaTextField =
  Exclude<
    keyof GameMediaFormState,
    "gallery"
  >;

function normalizeGalleryPaths(
  values: string[],
): string[] {
  return values
    .map((value) => value.trim())
    .filter(
      (value) =>
        value.length > 0,
    );
}

export function useGameMediaActions(
  setFormState: SetGameFormState,
) {
  const updateMediaField =
    useCallback(
      (
        field: GameMediaTextField,
        value: string,
      ) => {
        setFormState(
          (currentState) => ({
            ...currentState,

            media: {
              ...currentState.media,
              [field]: value,
            },
          }),
        );
      },
      [setFormState],
    );

  const appendMediaGalleryItems =
    useCallback(
      (
        publicPaths: string[],
      ) => {
        const normalizedNewPaths =
          normalizeGalleryPaths(
            publicPaths,
          );

        if (
          normalizedNewPaths.length ===
          0
        ) {
          return;
        }

        setFormState(
          (currentState) => {
            const currentPaths =
              normalizeGalleryPaths(
                currentState.media
                  .gallery,
              );

            const availableSlots =
              MAX_GAME_GALLERY_IMAGES -
              currentPaths.length;

            if (availableSlots <= 0) {
              return currentState;
            }

            const acceptedPaths =
              normalizedNewPaths.slice(
                0,
                availableSlots,
              );

            return {
              ...currentState,

              media: {
                ...currentState.media,

                gallery: [
                  ...currentPaths,
                  ...acceptedPaths,
                ],
              },
            };
          },
        );
      },
      [setFormState],
    );

  const removeMediaGalleryItem =
    useCallback(
      (index: number) => {
        setFormState(
          (currentState) => ({
            ...currentState,

            media: {
              ...currentState.media,

              gallery:
                currentState.media
                  .gallery.filter(
                    (
                      _,
                      currentIndex,
                    ) =>
                      currentIndex !==
                      index,
                  ),
            },
          }),
        );
      },
      [setFormState],
    );

  return {
    updateMediaField,
    appendMediaGalleryItems,
    removeMediaGalleryItem,
  };
}
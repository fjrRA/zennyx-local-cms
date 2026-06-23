// src/features/games/form/hooks/useGameMediaActions.ts
import {
  useCallback,
} from "react";

import {
  appendEmptyStringListItem,
  removeStringListItem,
  replaceStringListItem,
} from "../game-form-list.helpers";

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

export function useGameMediaActions(
  setFormState: SetGameFormState,
) {
  const updateMediaField = useCallback(
    (
      field: GameMediaTextField,
      value: string,
    ) => {
      setFormState((currentState) => ({
        ...currentState,

        media: {
          ...currentState.media,
          [field]: value,
        },
      }));
    },
    [setFormState],
  );

  const updateMediaGalleryItem =
    useCallback(
      (
        index: number,
        value: string,
      ) => {
        setFormState((currentState) => ({
          ...currentState,

          media: {
            ...currentState.media,

            gallery:
              replaceStringListItem(
                currentState.media.gallery,
                index,
                value,
              ),
          },
        }));
      },
      [setFormState],
    );

  const addMediaGalleryItem =
    useCallback(() => {
      setFormState((currentState) => ({
        ...currentState,

        media: {
          ...currentState.media,

          gallery:
            appendEmptyStringListItem(
              currentState.media.gallery,
            ),
        },
      }));
    }, [setFormState]);

  const removeMediaGalleryItem =
    useCallback(
      (index: number) => {
        setFormState((currentState) => ({
          ...currentState,

          media: {
            ...currentState.media,

            gallery:
              removeStringListItem(
                currentState.media.gallery,
                index,
              ),
          },
        }));
      },
      [setFormState],
    );

  return {
    updateMediaField,
    updateMediaGalleryItem,
    addMediaGalleryItem,
    removeMediaGalleryItem,
  };
}
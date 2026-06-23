// src/features/games/form/hooks/useGameFormState.ts
import {
  useCallback,
  useState,
} from "react";

import {
  createInitialGameFormState,
} from "../game-form.defaults";

import {
  appendEmptyStringListItem,
  removeStringListItem,
  replaceStringListItem,
} from "../game-form-list.helpers";

import type {
  GameFormState,
} from "../game-form.types";

import {
  useGameFormDevelopmentActions,
} from "./useGameFormDevelopmentActions";

import {
  useGameFormPublishingActions,
} from "./useGameFormPublishingActions";

export type GameTextField =
  | "title"
  | "slug"
  | "status"
  | "productionType"
  | "order"
  | "summary"
  | "shortDescription"
  | "description"
  | "targetBuild"
  | "targetRelease";

export type GameBooleanField =
  | "isFeatured"
  | "isPublic";

export type GameListField =
  | "genre"
  | "theme"
  | "platforms"
  | "prototypeScope"
  | "deferredFeatures"
  | "relatedDevlogs";

export function useGameFormState() {
  const [
    formState,
    setFormState,
  ] = useState<GameFormState>(
    createInitialGameFormState,
  );

  const developmentActions =
    useGameFormDevelopmentActions(
      setFormState,
    );

  const publishingActions =
    useGameFormPublishingActions(
      setFormState,
    );

  const updateTextField = useCallback(
    (
      field: GameTextField,
      value: string,
    ) => {
      setFormState((currentState) => ({
        ...currentState,

        [field]: value,
      }));
    },
    [],
  );

  const updateBooleanField = useCallback(
    (
      field: GameBooleanField,
      value: boolean,
    ) => {
      setFormState((currentState) => ({
        ...currentState,

        [field]: value,
      }));
    },
    [],
  );

  const updateListItem = useCallback(
    (
      field: GameListField,
      index: number,
      value: string,
    ) => {
      setFormState((currentState) => ({
        ...currentState,


        [field]: replaceStringListItem(
          currentState[field],
          index,
          value,
        ),
      }));
    },
    [],
  );

  const addListItem = useCallback(
    (field: GameListField) => {
      setFormState((currentState) => ({
        ...currentState,


        [field]:
          appendEmptyStringListItem(
            currentState[field],
          ),
      }));
    },
    [],
  );

  const removeListItem = useCallback(
    (
      field: GameListField,
      index: number,
    ) => {
      setFormState((currentState) => ({
        ...currentState,


        [field]: removeStringListItem(
          currentState[field],
          index,
        ),
      }));
    },
    [],
  );

  return {
    formState,

    updateTextField,
    updateBooleanField,

    updateListItem,
    addListItem,
    removeListItem,

    ...developmentActions,
    ...publishingActions,
  };
}

export type GameFormController =
  ReturnType<typeof useGameFormState>;
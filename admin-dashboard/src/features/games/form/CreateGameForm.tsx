// src/features/games/form/CreateGameForm.tsx
// src/features/games/form/CreateGameForm.tsx

import type {
  FormEvent,
} from "react";

import {
  isAbortError,
} from "../../../lib/api";

import GameFormSubmitFeedback from "./components/GameFormSubmitFeedback";

import GameFormValidationActions from "./components/GameFormValidationActions";

import GameFormValidationProvider from "./components/GameFormValidationProvider";

import GameFormValidationSummary from "./components/GameFormValidationSummary";

import GameFormCoreSections from "./composition/GameFormCoreSections";

import GameFormDevelopmentSections from "./composition/GameFormDevelopmentSections";

import GameFormPublishingSections from "./composition/GameFormPublishingSections";

import {
  toCreateGameInput,
} from "./game-form.mapper";

import {
  useCreateGameFormValidation,
} from "./hooks/useCreateGameFormValidation";

import {
  useCreateGameSubmit,
} from "./hooks/useCreateGameSubmit";

import {
  useGameFormState,
} from "./hooks/useGameFormState";

import {
  resolveGameSubmitError,
} from "./validation/game-submit-error.helper";

import {
  createGameCreatedNavigationState,
} from "../utils/game-created-navigation-state";

import { useNavigate } from "react-router";

export default function CreateGameForm() {
  const navigate = useNavigate();

  const formController =
    useGameFormState();

  const {
    validationErrors,
    validateCurrentForm,
    replaceValidationErrors,
    clearValidation,
  } = useCreateGameFormValidation();

  const {
    isSubmitting,
    submitError,
    submitCreateGame,
    resetSubmitState,
  } = useCreateGameSubmit();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    resetSubmitState();

    const isFormValid =
      validateCurrentForm(
        formController.formState,
      );

    if (!isFormValid) {
      return;
    }

    const input =
      toCreateGameInput(
        formController.formState,
      );

    try {
      const createdGame =
        await submitCreateGame(input);

      clearValidation();

      navigate("/games", {
        replace: true,
        state:
          createGameCreatedNavigationState(
            createdGame,
          ),
      });
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      const resolvedError =
        resolveGameSubmitError(error);

      if (
        resolvedError.kind ===
        "validation"
      ) {
        replaceValidationErrors(
          resolvedError.fieldErrors,
        );
      }
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <GameFormValidationProvider
        errors={validationErrors}
      >
        <GameFormValidationSummary
          errors={validationErrors}
        />

        <GameFormSubmitFeedback
          error={submitError}
        />

        <GameFormCoreSections
          controller={formController}
        />

        <GameFormDevelopmentSections
          controller={formController}
        />

        <GameFormPublishingSections
          controller={formController}
        />

        <GameFormValidationActions
          isSubmitting={isSubmitting}
        />
      </GameFormValidationProvider>
    </form>
  );
}
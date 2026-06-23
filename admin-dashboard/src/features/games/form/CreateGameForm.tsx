// src/features/games/form/CreateGameForm.tsx
import type {
  FormEvent,
} from "react";

import GameFormValidationActions from "./components/GameFormValidationActions";
import GameFormValidationProvider from "./components/GameFormValidationProvider";
import GameFormValidationSuccess from "./components/GameFormValidationSuccess";
import GameFormValidationSummary from "./components/GameFormValidationSummary";

import GameFormCoreSections from "./composition/GameFormCoreSections";
import GameFormDevelopmentSections from "./composition/GameFormDevelopmentSections";
import GameFormPublishingSections from "./composition/GameFormPublishingSections";

import {
  useCreateGameFormValidation,
} from "./hooks/useCreateGameFormValidation";

import {
  useGameFormState,
} from "./hooks/useGameFormState";

export default function CreateGameForm() {
  const formController =
    useGameFormState();

  const {
    validationErrors,
    isValidationSuccessful,
    validateCurrentForm,
  } = useCreateGameFormValidation();

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    validateCurrentForm(
      formController.formState,
    );
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

        <GameFormCoreSections
          controller={formController}
        />

        <GameFormDevelopmentSections
          controller={formController}
        />

        <GameFormPublishingSections
          controller={formController}
        />

        <GameFormValidationSuccess
          isVisible={
            isValidationSuccessful
          }
        />

        <GameFormValidationActions />
      </GameFormValidationProvider>
    </form>
  );
}
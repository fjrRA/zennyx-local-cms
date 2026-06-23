// src/features/games/form/hooks/useCreateGameFormValidation.ts
import {
  useCallback,
  useState,
} from "react";

import {
  toCreateGameInput,
} from "../game-form.mapper";

import type {
  GameFormState,
} from "../game-form.types";

import {
  validateGameForm,
} from "../validation/validate-game-form";

import type {
  GameFormErrors,
  GameFormFieldId,
} from "../validation/game-form-validation.types";

function focusFirstError(
  errors: GameFormErrors,
): void {
  const firstErrorId =
    Object.keys(errors)[0] as
    | GameFormFieldId
    | undefined;

  if (!firstErrorId) {
    return;
  }

  requestAnimationFrame(() => {
    document
      .getElementById(firstErrorId)
      ?.focus();
  });
}

export function useCreateGameFormValidation() {
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<GameFormErrors>({});

  const [
    isValidationSuccessful,
    setIsValidationSuccessful,
  ] = useState(false);

  const validateCurrentForm =
    useCallback(
      (
        formState: GameFormState,
      ): boolean => {
        setIsValidationSuccessful(false);

        const result =
          validateGameForm(formState);

        if (!result.isValid) {
          setValidationErrors(
            result.errors,
          );

          focusFirstError(
            result.errors,
          );

          return false;
        }

        try {
          toCreateGameInput(formState);

          setValidationErrors({});
          setIsValidationSuccessful(
            true,
          );

          return true;
        } catch (error) {
          const mapperErrors:
            GameFormErrors = {
            "game-order":
              error instanceof Error
                ? error.message
                : "Data form tidak valid.",
          };

          setValidationErrors(
            mapperErrors,
          );

          focusFirstError(
            mapperErrors,
          );

          return false;
        }
      },
      [],
    );

  const replaceValidationErrors =
    useCallback(
      (errors: GameFormErrors) => {
        setIsValidationSuccessful(false);
        setValidationErrors(errors);
        focusFirstError(errors);
      },
      [],
    );

  const clearValidation =
    useCallback(() => {
      setValidationErrors({});
      setIsValidationSuccessful(false);
    }, []);

  return {
    validationErrors,
    isValidationSuccessful,

    validateCurrentForm,

    replaceValidationErrors,
    clearValidation,
  };
}
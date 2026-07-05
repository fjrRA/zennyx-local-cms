// src/features/games/form/components/GameFormValidationSummary.tsx
import {
  AlertCircle,
} from "lucide-react";

import type {
  GameFormErrors,
  GameFormFieldId,
} from "../validation/game-form-validation.types";

type GameFormValidationSummaryProps = {
  errors: GameFormErrors;
};

export default function GameFormValidationSummary({
  errors,
}: GameFormValidationSummaryProps) {
  const entries = Object.entries(
    errors,
  ) as Array<
    [GameFormFieldId, string]
  >;

  if (entries.length === 0) {
    return null;
  }

  function focusField(
    fieldId: GameFormFieldId,
  ) {
    document
      .getElementById(fieldId)
      ?.focus();
  }

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          size={20}
          className="mt-0.5 shrink-0 text-red-400"
          aria-hidden="true"
        />

        <div className="min-w-0">
          <h2 className="font-semibold text-red-300">
            Form belum dapat disimpan
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-200/70">
            Periksa {entries.length} bagian
            yang masih tidak valid.
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {entries.map(
          ([fieldId, message]) => (
            <li key={fieldId}>
              <button
                type="button"
                onClick={() =>
                  focusField(fieldId)
                }
                className="text-left text-sm text-red-300 underline decoration-red-500/40 underline-offset-4 transition hover:text-red-200"
              >
                {message}
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
// src/features/games/form/components/
// GameFormSubmitFeedback.tsx

import {
  AlertCircle,
} from "lucide-react";

import type {
  GameSubmitErrorState,
} from "../validation/game-submit-error.helper";

type GameFormSubmitFeedbackProps = {
  error:
  GameSubmitErrorState | null;
};

export default function GameFormSubmitFeedback({
  error,
}: GameFormSubmitFeedbackProps) {
  if (!error) {
    return null;
  }

  if (
    error.kind === "validation" &&
    error.formErrors.length === 0
  ) {
    return null;
  }

  const messages =
    error.kind === "validation"
      ? error.formErrors
      : [error.message];

  const title =
    error.kind === "validation"
      ? "Backend menolak data Game"
      : "Game gagal disimpan";

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
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-red-200/70">
            Periksa pesan berikut sebelum mencoba
            menyimpan kembali.
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {messages.map((message, index) => (
          <li
            key={`${message}-${index}`}
            className="text-sm leading-6 text-red-300"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
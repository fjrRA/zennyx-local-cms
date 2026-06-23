// src/features/games/form/components/StringListField.tsx
import {
  Plus,
  Trash2,
} from "lucide-react";

import {
  useGameFormFieldError,
} from "../hooks/useGameFormFieldError";

import type {
  GameFormFieldId,
} from "../validation/game-form-validation.types";

type StringListFieldProps = {
  id: GameFormFieldId;
  label: string;
  description: string;
  values: string[];

  onItemChange: (
    index: number,
    value: string,
  ) => void;

  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
};

export default function StringListField({
  id,
  label,
  description,
  values,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: StringListFieldProps) {
  const error =
    useGameFormFieldError(id);

  const errorId = error
    ? `${id}-error`
    : undefined;

  return (
    <div>
      <div>
        <p className="text-sm font-semibold text-zinc-200">
          {label}
        </p>

        {error && (
          <p
            id={errorId}
            className="mt-2 text-xs font-medium leading-5 text-red-400"
          >
            {error}
          </p>
        )}

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {description}
        </p>
      </div>

      <div className="mt-3 space-y-3">
        {values.map((value, index) => {
          const inputId =
            `${id}-${index}`;

          return (
            <div
              key={inputId}
              className="flex items-start gap-2"
            >
              <input
                id={inputId}
                type="text"
                value={value}
                aria-invalid={Boolean(error)}
                aria-describedby={errorId}
                onChange={(event) =>
                  onItemChange(
                    index,
                    event.target.value,
                  )
                }
                placeholder={`Item ${index + 1}`}
                className={[
                  "min-w-0 flex-1 rounded-xl border bg-zinc-950 px-4 py-3",
                  "text-sm text-zinc-100 outline-none transition",
                  "placeholder:text-zinc-600",
                  error
                    ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/15"
                    : "border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15",
                ].join(" ")}
              />

              <button
                type="button"
                aria-invalid={Boolean(error)}
                aria-describedby={errorId}
                aria-label={`Hapus ${label} nomor ${index + 1}`}
                onClick={() =>
                  onRemoveItem(index)
                }
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10"
              >
                <Trash2
                  size={17}
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAddItem}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-orange-300 sm:w-auto"
      >
        <Plus
          size={17}
          aria-hidden="true"
        />

        Tambah {label}
      </button>
    </div>
  );
}
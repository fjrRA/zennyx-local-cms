// src/features/games/form/components/FormInputField.tsx
import {
  useGameFormFieldError,
} from "../hooks/useGameFormFieldError";

import type {
  GameFormFieldId,
} from "../validation/game-form-validation.types";

type FormInputFieldProps = {
  id: GameFormFieldId;
  label: string;
  value: string;
  onChange: (value: string) => void;

  type?: "text" | "number";
  placeholder?: string;
  helperText?: string;

  required?: boolean;
  min?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export default function FormInputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  helperText,
  required = false,
  min,
  step,
  minLength,
  maxLength,
  pattern,
}: FormInputFieldProps) {
  const helperId = helperText
    ? `${id}-helper`
    : undefined;

  const error =
    useGameFormFieldError(id);

  const errorId = error
    ? `${id}-error`
    : undefined;

  const describedBy = [
    helperId,
    errorId,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-zinc-200"
      >
        {label}

        {required && (
          <span className="ml-1 text-orange-500">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={[
          "mt-2 w-full rounded-xl border bg-zinc-950 px-4 py-3",
          "text-sm text-zinc-100 outline-none transition",
          "placeholder:text-zinc-600",
          error
            ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/15"
            : "border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15",
        ].join(" ")}
      />
      {error && (
        <p
          id={errorId}
          className="mt-2 text-xs font-medium leading-5 text-red-400"
        >
          {error}
        </p>
      )}

      {helperText && (
        <p
          id={helperId}
          className="mt-2 text-xs leading-5 text-zinc-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
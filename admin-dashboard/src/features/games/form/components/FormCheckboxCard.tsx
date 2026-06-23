// src/features/games/form/components/FormCheckboxCard.tsx
type FormCheckboxCardProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function FormCheckboxCard({
  id,
  label,
  description,
  checked,
  onChange,
}: FormCheckboxCardProps) {
  return (
    <label
      htmlFor={id}
      className={[
        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
        checked
          ? "border-orange-500/40 bg-orange-500/10"
          : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700",
      ].join(" ")}
    >
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="mt-1 h-4 w-4 shrink-0 accent-orange-500"
      />

      <span className="min-w-0">
        <span className="block text-sm font-semibold text-zinc-100">
          {label}
        </span>

        <span className="mt-1 block text-xs leading-5 text-zinc-500">
          {description}
        </span>
      </span>
    </label>
  );
}
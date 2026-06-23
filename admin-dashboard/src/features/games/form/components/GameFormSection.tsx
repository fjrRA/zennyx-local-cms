// src/features/games/form/components/GameFormSection.tsx
import type {
  ReactNode,
} from "react";

type GameFormSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function GameFormSection({
  title,
  description,
  children,
}: GameFormSectionProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl sm:p-6">
      <div className="border-b border-zinc-800 pb-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}
// src/features/games/form/components/GameFormValidationSuccess.tsx
import {
  CheckCircle2,
} from "lucide-react";

type GameFormValidationSuccessProps = {
  isVisible: boolean;
};

export default function GameFormValidationSuccess({
  isVisible,
}: GameFormValidationSuccessProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
      <CheckCircle2
        size={20}
        className="mt-0.5 shrink-0 text-emerald-400"
        aria-hidden="true"
      />

      <div>
        <h2 className="font-semibold text-emerald-300">
          Form Game sudah valid
        </h2>

        <p className="mt-1 text-sm leading-6 text-emerald-200/70">
          Data siap dikirim ke backend
          pada tahap penyimpanan.
        </p>
      </div>
    </div>
  );
}
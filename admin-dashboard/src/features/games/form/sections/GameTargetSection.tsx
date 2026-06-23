// src/features/games/form/sections/GameTargetSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameTextField,
} from "../hooks/useGameFormState";

import FormInputField from "../components/FormInputField";
import GameFormSection from "../components/GameFormSection";

type GameTargetSectionProps = {
  state: GameFormState;

  onChange: (
    field: GameTextField,
    value: string,
  ) => void;
};

export default function GameTargetSection({
  state,
  onChange,
}: GameTargetSectionProps) {
  return (
    <GameFormSection
      title="Target Development"
      description="Target build dan rencana perilisan Game."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInputField
          id="game-target-build"
          label="Target Build"
          value={state.targetBuild}
          onChange={(value) =>
            onChange(
              "targetBuild",
              value,
            )
          }
          placeholder="Contoh: Prototype"
          required
          minLength={2}
          maxLength={120}
        />

        <FormInputField
          id="game-target-release"
          label="Target Release"
          value={state.targetRelease}
          onChange={(value) =>
            onChange(
              "targetRelease",
              value,
            )
          }
          placeholder="Contoh: To be announced"
          required
          minLength={2}
          maxLength={120}
        />
      </div>
    </GameFormSection>
  );
}
// src/features/games/form/sections/GameDevelopmentStageSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameDevelopmentStageTextField,
} from "../hooks/useGameFormDevelopmentActions";

import FormInputField from "../components/FormInputField";
import FormTextareaField from "../components/FormTextareaField";
import GameFormSection from "../components/GameFormSection";

type GameDevelopmentStageSectionProps = {
  state: GameFormState;

  onChange: (
    field:
      GameDevelopmentStageTextField,
    value: string,
  ) => void;
};

export default function GameDevelopmentStageSection({
  state,
  onChange,
}: GameDevelopmentStageSectionProps) {
  return (
    <GameFormSection
      title="Development Stage"
      description="Posisi proyek saat ini dan target milestone berikutnya."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInputField
          id="game-development-current"
          label="Current Stage"
          value={
            state.developmentStage.current
          }
          onChange={(value) =>
            onChange("current", value)
          }
          placeholder="Contoh: Early prototype planning"
          required
        />

        <FormInputField
          id="game-development-next"
          label="Next Milestone"
          value={
            state.developmentStage
              .nextMilestone
          }
          onChange={(value) =>
            onChange(
              "nextMilestone",
              value,
            )
          }
          placeholder="Contoh: Playable prototype"
          required
        />
      </div>

      <div className="mt-5">
        <FormTextareaField
          id="game-development-notes"
          label="Development Notes"
          value={
            state.developmentStage.notes
          }
          onChange={(value) =>
            onChange("notes", value)
          }
          placeholder="Catatan tentang fokus pengembangan saat ini..."
          required
          rows={5}
        />
      </div>
    </GameFormSection>
  );
}
// src/features/games/form/sections/GameGameplayFocusSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameGameplayFocusTextField,
} from "../hooks/useGameFormDevelopmentActions";

import FormInputField from "../components/FormInputField";
import FormTextareaField from "../components/FormTextareaField";
import GameFormSection from "../components/GameFormSection";
import StringListField from "../components/StringListField";

type GameGameplayFocusSectionProps = {
  state: GameFormState;

  onTextChange: (
    field: GameGameplayFocusTextField,
    value: string,
  ) => void;

  onPointChange: (
    index: number,
    value: string,
  ) => void;

  onAddPoint: () => void;
  onRemovePoint: (
    index: number,
  ) => void;
};

export default function GameGameplayFocusSection({
  state,
  onTextChange,
  onPointChange,
  onAddPoint,
  onRemovePoint,
}: GameGameplayFocusSectionProps) {
  return (
    <GameFormSection
      title="Gameplay Focus"
      description="Fokus mekanik dan pengalaman bermain yang ingin dibangun."
    >
      <div className="space-y-5">
        <FormInputField
          id="game-gameplay-title"
          label="Judul Gameplay Focus"
          value={
            state.gameplayFocus.title
          }
          onChange={(value) =>
            onTextChange("title", value)
          }
          placeholder="Contoh: Gameplay Focus"
          required
        />

        <FormTextareaField
          id="game-gameplay-description"
          label="Deskripsi Gameplay"
          value={
            state.gameplayFocus
              .description
          }
          onChange={(value) =>
            onTextChange(
              "description",
              value,
            )
          }
          placeholder="Jelaskan fokus gameplay utama..."
          required
          rows={5}
        />

        <StringListField
          id="game-gameplay-points"
          label="Gameplay Point"
          description="Daftar mekanik atau kemampuan yang menjadi fokus."
          values={
            state.gameplayFocus.points
          }
          onItemChange={onPointChange}
          onAddItem={onAddPoint}
          onRemoveItem={onRemovePoint}
        />
      </div>
    </GameFormSection>
  );
}
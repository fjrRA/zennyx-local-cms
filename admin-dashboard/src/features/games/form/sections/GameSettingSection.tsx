// src/features/games/form/sections/GameSettingSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameSettingTextField,
} from "../hooks/useGameFormDevelopmentActions";

import FormInputField from "../components/FormInputField";
import FormTextareaField from "../components/FormTextareaField";
import GameFormSection from "../components/GameFormSection";
import StringListField from "../components/StringListField";

type GameSettingSectionProps = {
  state: GameFormState;

  onTextChange: (
    field: GameSettingTextField,
    value: string,
  ) => void;

  onInspirationChange: (
    index: number,
    value: string,
  ) => void;

  onAddInspiration: () => void;
  onRemoveInspiration: (
    index: number,
  ) => void;
};

export default function GameSettingSection({
  state,
  onTextChange,
  onInspirationChange,
  onAddInspiration,
  onRemoveInspiration,
}: GameSettingSectionProps) {
  return (
    <GameFormSection
      title="Setting"
      description="Lokasi, suasana, dan sumber inspirasi dunia Game."
    >
      <div className="space-y-5">
        <FormInputField
          id="game-setting-name"
          label="Nama Setting"
          value={state.setting.name}
          onChange={(value) =>
            onTextChange("name", value)
          }
          placeholder="Contoh: Kota Andara"
          required
        />

        <FormTextareaField
          id="game-setting-description"
          label="Deskripsi Setting"
          value={
            state.setting.description
          }
          onChange={(value) =>
            onTextChange(
              "description",
              value,
            )
          }
          placeholder="Jelaskan lokasi dan atmosfer dunia Game..."
          required
          rows={5}
        />

        <StringListField
          id="game-setting-inspiration"
          label="Inspirasi Setting"
          description="Contoh: Kota malam, gang sempit, dan suasana urban."
          values={
            state.setting.inspiration
          }
          onItemChange={
            onInspirationChange
          }
          onAddItem={onAddInspiration}
          onRemoveItem={
            onRemoveInspiration
          }
        />
      </div>
    </GameFormSection>
  );
}
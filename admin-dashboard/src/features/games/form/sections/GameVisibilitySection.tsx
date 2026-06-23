// src/features/games/form/sections/GameVisibilitySection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameBooleanField,
  GameTextField,
} from "../hooks/useGameFormState";

import FormCheckboxCard from "../components/FormCheckboxCard";
import FormInputField from "../components/FormInputField";
import GameFormSection from "../components/GameFormSection";

type GameVisibilitySectionProps = {
  state: GameFormState;

  onTextChange: (
    field: GameTextField,
    value: string,
  ) => void;

  onBooleanChange: (
    field: GameBooleanField,
    value: boolean,
  ) => void;
};

export default function GameVisibilitySection({
  state,
  onTextChange,
  onBooleanChange,
}: GameVisibilitySectionProps) {
  return (
    <GameFormSection
      title="Visibilitas dan Urutan"
      description="Atur status publik, featured, dan posisi Game."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FormCheckboxCard
          id="game-is-public"
          label="Public"
          description="Game dapat ikut diekspor dan ditampilkan sebagai konten publik."
          checked={state.isPublic}
          onChange={(checked) =>
            onBooleanChange(
              "isPublic",
              checked,
            )
          }
        />

        <FormCheckboxCard
          id="game-is-featured"
          label="Featured"
          description="Game dapat diprioritaskan pada bagian unggulan website."
          checked={state.isFeatured}
          onChange={(checked) =>
            onBooleanChange(
              "isFeatured",
              checked,
            )
          }
        />
      </div>

      <div className="mt-5 max-w-xs">
        <FormInputField
          id="game-order"
          label="Urutan"
          value={state.order}
          onChange={(value) =>
            onTextChange("order", value)
          }
          type="number"
          min={0}
          step={1}
          helperText="Angka lebih kecil ditampilkan terlebih dahulu."
          required
        />
      </div>
    </GameFormSection>
  );
}
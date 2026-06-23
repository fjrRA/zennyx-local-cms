// src/features/games/form/sections/GameClassificationSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameListField,
} from "../hooks/useGameFormState";

import GameFormSection from "../components/GameFormSection";
import StringListField from "../components/StringListField";

type GameClassificationSectionProps = {
  state: GameFormState;

  onItemChange: (
    field: GameListField,
    index: number,
    value: string,
  ) => void;

  onAddItem: (
    field: GameListField,
  ) => void;

  onRemoveItem: (
    field: GameListField,
    index: number,
  ) => void;
};

export default function GameClassificationSection({
  state,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: GameClassificationSectionProps) {
  return (
    <GameFormSection
      title="Klasifikasi"
      description="Genre, tema, dan platform utama Game."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <StringListField
          id="game-genre"
          label="Genre"
          description="Contoh: Action, Beat 'em up."
          values={state.genre}
          onItemChange={(index, value) =>
            onItemChange(
              "genre",
              index,
              value,
            )
          }
          onAddItem={() =>
            onAddItem("genre")
          }
          onRemoveItem={(index) =>
            onRemoveItem(
              "genre",
              index,
            )
          }
        />

        <StringListField
          id="game-theme"
          label="Tema"
          description="Contoh: Urban conflict."
          values={state.theme}
          onItemChange={(index, value) =>
            onItemChange(
              "theme",
              index,
              value,
            )
          }
          onAddItem={() =>
            onAddItem("theme")
          }
          onRemoveItem={(index) =>
            onRemoveItem(
              "theme",
              index,
            )
          }
        />

        <StringListField
          id="game-platform"
          label="Platform"
          description="Contoh: PC."
          values={state.platforms}
          onItemChange={(index, value) =>
            onItemChange(
              "platforms",
              index,
              value,
            )
          }
          onAddItem={() =>
            onAddItem("platforms")
          }
          onRemoveItem={(index) =>
            onRemoveItem(
              "platforms",
              index,
            )
          }
        />
      </div>
    </GameFormSection>
  );
}
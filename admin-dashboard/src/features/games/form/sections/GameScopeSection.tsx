// src/features/games/form/sections/GameScopeSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameListField,
} from "../hooks/useGameFormState";

import GameFormSection from "../components/GameFormSection";
import StringListField from "../components/StringListField";

type GameScopeSectionProps = {
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

export default function GameScopeSection({
  state,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: GameScopeSectionProps) {
  return (
    <GameFormSection
      title="Scope"
      description="Tentukan fitur prototype dan fitur yang sengaja ditunda."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <StringListField
          id="game-prototype-scope"
          label="Prototype Scope"
          description="Fitur yang masuk dalam target prototype awal."
          values={state.prototypeScope}
          onItemChange={(index, value) =>
            onItemChange(
              "prototypeScope",
              index,
              value,
            )
          }
          onAddItem={() =>
            onAddItem(
              "prototypeScope",
            )
          }
          onRemoveItem={(index) =>
            onRemoveItem(
              "prototypeScope",
              index,
            )
          }
        />

        <StringListField
          id="game-deferred-features"
          label="Deferred Feature"
          description="Fitur yang tidak dikerjakan pada scope saat ini."
          values={
            state.deferredFeatures
          }
          onItemChange={(index, value) =>
            onItemChange(
              "deferredFeatures",
              index,
              value,
            )
          }
          onAddItem={() =>
            onAddItem(
              "deferredFeatures",
            )
          }
          onRemoveItem={(index) =>
            onRemoveItem(
              "deferredFeatures",
              index,
            )
          }
        />
      </div>
    </GameFormSection>
  );
}
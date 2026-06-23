// src/features/games/form/sections/GameRelatedDevlogsSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameListField,
} from "../hooks/useGameFormState";

import GameFormSection from "../components/GameFormSection";
import StringListField from "../components/StringListField";

type GameRelatedDevlogsSectionProps = {
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

export default function GameRelatedDevlogsSection({
  state,
  onItemChange,
  onAddItem,
  onRemoveItem,
}: GameRelatedDevlogsSectionProps) {
  return (
    <GameFormSection
      title="Related Devlogs"
      description="Slug Devlog yang akan dihubungkan pada konten Game di website."
    >
      <StringListField
        id="game-related-devlogs"
        label="Devlog Slug"
        description="Contoh: membangun-game-beat-em-up-pertama."
        values={state.relatedDevlogs}
        onItemChange={(index, value) =>
          onItemChange(
            "relatedDevlogs",
            index,
            value,
          )
        }
        onAddItem={() =>
          onAddItem(
            "relatedDevlogs",
          )
        }
        onRemoveItem={(index) =>
          onRemoveItem(
            "relatedDevlogs",
            index,
          )
        }
      />

      <p className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 text-xs leading-5 text-zinc-500">
        Field ini menyimpan daftar slug manual.
        Ini berbeda dari relasi database
        Devlog yang menggunakan gameId.
      </p>
    </GameFormSection>
  );
}
// src/features/games/form/sections/GameSeoSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameSeoTextField,
} from "../hooks/useGameFormPublishingActions";

import FormInputField from "../components/FormInputField";
import FormTextareaField from "../components/FormTextareaField";
import GameFormSection from "../components/GameFormSection";

type GameSeoSectionProps = {
  state: GameFormState;

  onChange: (
    field: GameSeoTextField,
    value: string,
  ) => void;
};

export default function GameSeoSection({
  state,
  onChange,
}: GameSeoSectionProps) {
  return (
    <GameFormSection
      title="SEO"
      description="Metadata Game untuk halaman website dan social sharing."
    >
      <div className="space-y-5">
        <FormInputField
          id="game-seo-title"
          label="SEO Title"
          value={state.seo.title}
          onChange={(value) =>
            onChange("title", value)
          }
          placeholder="Judul halaman Game"
        />

        <FormTextareaField
          id="game-seo-description"
          label="SEO Description"
          value={
            state.seo.description
          }
          onChange={(value) =>
            onChange(
              "description",
              value,
            )
          }
          placeholder="Deskripsi singkat untuk mesin pencari..."
          rows={4}
        />

        <FormInputField
          id="game-seo-og-image"
          label="Open Graph Image"
          value={state.seo.ogImage}
          onChange={(value) =>
            onChange("ogImage", value)
          }
          placeholder="/og/game-slug-og.png"
          helperText="Path gambar yang digunakan ketika halaman dibagikan."
        />
      </div>
    </GameFormSection>
  );
}
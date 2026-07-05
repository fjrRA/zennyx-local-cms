// src/features/games/form/sections/
// GameSeoSection.tsx

import {
  ImageUploadField,
} from "../../../media";

import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameSeoTextField,
} from "../hooks/useGameFormPublishingActions";

import {
  useGameFormFieldError,
} from "../hooks/useGameFormFieldError";

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
  const ogImageError =
    useGameFormFieldError(
      "game-seo-og-image",
    );

  const gameTitle =
    state.title.trim() || "Game";

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

        <ImageUploadField
          id="game-seo-og-image"
          label="Open Graph Image"
          slug={state.slug}
          role="og-image"
          value={state.seo.ogImage}
          validationError={
            ogImageError
          }
          description="Gambar yang ditampilkan ketika halaman Game dibagikan ke media sosial."
          previewAlt={`Preview Open Graph Image ${gameTitle}`}
          onValueChange={(publicPath) =>
            onChange(
              "ogImage",
              publicPath,
            )
          }
        />
      </div>
    </GameFormSection>
  );
}
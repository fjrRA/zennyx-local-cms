// src/features/games/form/sections/GameMediaSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameMediaTextField,
} from "../hooks/useGameFormPublishingActions";

import FormInputField from "../components/FormInputField";
import GameFormSection from "../components/GameFormSection";
import StringListField from "../components/StringListField";

type GameMediaSectionProps = {
  state: GameFormState;

  onTextChange: (
    field: GameMediaTextField,
    value: string,
  ) => void;

  onGalleryChange: (
    index: number,
    value: string,
  ) => void;

  onAddGallery: () => void;

  onRemoveGallery: (
    index: number,
  ) => void;
};

export default function GameMediaSection({
  state,
  onTextChange,
  onGalleryChange,
  onAddGallery,
  onRemoveGallery,
}: GameMediaSectionProps) {
  return (
    <GameFormSection
      title="Media"
      description="Path gambar utama dan galeri untuk konten website."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInputField
          id="game-media-hero-image"
          label="Hero Image"
          value={state.media.heroImage}
          onChange={(value) =>
            onTextChange(
              "heroImage",
              value,
            )
          }
          placeholder="/images/games/game-slug/hero.png"
          helperText="Gunakan path file relatif dari folder public website."
        />

        <FormInputField
          id="game-media-thumbnail"
          label="Thumbnail"
          value={state.media.thumbnail}
          onChange={(value) =>
            onTextChange(
              "thumbnail",
              value,
            )
          }
          placeholder="/images/games/game-slug/thumb.png"
        />

        <FormInputField
          id="game-media-cover-image"
          label="Cover Image"
          value={state.media.coverImage}
          onChange={(value) =>
            onTextChange(
              "coverImage",
              value,
            )
          }
          placeholder="/images/games/game-slug/cover.png"
        />
      </div>

      <div className="mt-6">
        <StringListField
          id="game-media-gallery"
          label="Gallery Image"
          description="Daftar path gambar tambahan untuk galeri Game."
          values={state.media.gallery}
          onItemChange={
            onGalleryChange
          }
          onAddItem={onAddGallery}
          onRemoveItem={
            onRemoveGallery
          }
        />
      </div>
    </GameFormSection>
  );
}
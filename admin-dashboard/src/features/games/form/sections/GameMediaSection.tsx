// src/features/games/form/sections/
// GameMediaSection.tsx

import {
  GalleryImageUploadField,
  ImageUploadField,
} from "../../../media";

import {
  MAX_GAME_GALLERY_IMAGES,
} from "../game-media.constants";

import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameMediaTextField,
} from "../hooks/useGameFormPublishingActions";

import {
  useGameFormFieldError,
} from "../hooks/useGameFormFieldError";

import GameFormSection from "../components/GameFormSection";

type GameMediaSectionProps = {
  state: GameFormState;

  onTextChange: (
    field: GameMediaTextField,
    value: string,
  ) => void;

  onAppendGallery: (
    publicPaths: string[],
  ) => void;

  onRemoveGallery: (
    index: number,
  ) => void;
};

export default function GameMediaSection({
  state,
  onTextChange,
  onAppendGallery,
  onRemoveGallery,
}: GameMediaSectionProps) {
  const heroImageError =
    useGameFormFieldError(
      "game-media-hero-image",
    );

  const thumbnailError =
    useGameFormFieldError(
      "game-media-thumbnail",
    );

  const coverImageError =
    useGameFormFieldError(
      "game-media-cover-image",
    );

  const galleryError =
    useGameFormFieldError(
      "game-media-gallery",
    );

  const gameTitle =
    state.title.trim() || "Game";

  return (
    <GameFormSection
      title="Media"
      description="Unggah gambar utama dan kelola galeri untuk konten website."
    >
      <div className="grid gap-5 xl:grid-cols-2">
        <ImageUploadField
          id="game-media-hero-image"
          label="Hero Image"
          slug={state.slug}
          role="hero"
          value={state.media.heroImage}
          validationError={
            heroImageError
          }
          description="Gambar utama berukuran besar untuk halaman detail Game."
          previewAlt={`Preview Hero Image ${gameTitle}`}
          onValueChange={(publicPath) =>
            onTextChange(
              "heroImage",
              publicPath,
            )
          }
        />

        <ImageUploadField
          id="game-media-thumbnail"
          label="Thumbnail"
          slug={state.slug}
          role="thumbnail"
          value={state.media.thumbnail}
          validationError={
            thumbnailError
          }
          description="Gambar ringkas untuk kartu dan daftar Game."
          previewAlt={`Preview Thumbnail ${gameTitle}`}
          onValueChange={(publicPath) =>
            onTextChange(
              "thumbnail",
              publicPath,
            )
          }
        />

        <ImageUploadField
          id="game-media-cover-image"
          label="Cover Image"
          slug={state.slug}
          role="cover"
          value={state.media.coverImage}
          validationError={
            coverImageError
          }
          description="Gambar sampul yang digunakan pada presentasi Game."
          previewAlt={`Preview Cover Image ${gameTitle}`}
          onValueChange={(publicPath) =>
            onTextChange(
              "coverImage",
              publicPath,
            )
          }
        />
      </div>

      <div className="mt-6">
        <GalleryImageUploadField
          id="game-media-gallery"
          label="Gallery Image"
          description="Pilih beberapa gambar tambahan untuk Gallery Game. Gambar akan diunggah secara berurutan."
          slug={state.slug}
          values={state.media.gallery}
          maxImages={
            MAX_GAME_GALLERY_IMAGES
          }
          validationError={
            galleryError
          }
          onUploaded={
            onAppendGallery
          }
          onRemove={
            onRemoveGallery
          }
        />
      </div>
    </GameFormSection>
  );
}
// src/features/games/form/sections/GameBasicInfoSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameTextField,
} from "../hooks/useGameFormState";

import FormInputField from "../components/FormInputField";
import FormTextareaField from "../components/FormTextareaField";
import GameFormSection from "../components/GameFormSection";

type GameBasicInfoSectionProps = {
  state: GameFormState;

  onChange: (
    field: GameTextField,
    value: string,
  ) => void;
};

export default function GameBasicInfoSection({
  state,
  onChange,
}: GameBasicInfoSectionProps) {
  return (
    <GameFormSection
      title="Informasi Dasar"
      description="Identitas utama dan penjelasan Game."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInputField
          id="game-title"
          label="Judul Game"
          value={state.title}
          onChange={(value) =>
            onChange("title", value)
          }
          placeholder="Contoh: Untitled Andara Beat 'em Up"
          required
          minLength={3}
          maxLength={180}
        />

        <FormInputField
          id="game-slug"
          label="Slug"
          value={state.slug}
          onChange={(value) =>
            onChange("slug", value)
          }
          placeholder="contoh-game-baru"
          helperText="Gunakan huruf kecil, angka, dan tanda dash."
          required
          minLength={3}
          maxLength={140}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        />

        <FormInputField
          id="game-status"
          label="Status"
          value={state.status}
          onChange={(value) =>
            onChange("status", value)
          }
          placeholder="Contoh: Active Production"
          required
          minLength={2}
          maxLength={120}
        />

        <FormInputField
          id="game-production-type"
          label="Production Type"
          value={state.productionType}
          onChange={(value) =>
            onChange(
              "productionType",
              value,
            )
          }
          placeholder="Contoh: Current Main Project"
          required
          minLength={2}
          maxLength={160}
        />
      </div>

      <div className="mt-5 space-y-5">
        <FormTextareaField
          id="game-summary"
          label="Summary"
          value={state.summary}
          onChange={(value) =>
            onChange("summary", value)
          }
          placeholder="Ringkasan utama Game..."
          helperText="Digunakan untuk ringkasan Game pada daftar dan website."
          required
          rows={4}
          minLength={10}
        />

        <FormTextareaField
          id="game-short-description"
          label="Short Description"
          value={state.shortDescription}
          onChange={(value) =>
            onChange(
              "shortDescription",
              value,
            )
          }
          placeholder="Deskripsi pendek Game..."
          required
          rows={3}
          minLength={10}
        />

        <FormTextareaField
          id="game-description"
          label="Description"
          value={state.description}
          onChange={(value) =>
            onChange(
              "description",
              value,
            )
          }
          placeholder="Deskripsi lengkap Game..."
          required
          rows={7}
          minLength={10}
        />
      </div>
    </GameFormSection>
  );
}
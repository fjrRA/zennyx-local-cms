// src/features/games/form/sections/GameLinksSection.tsx
import type {
  GameFormState,
} from "../game-form.types";

import type {
  GameLinksTextField,
} from "../hooks/useGameFormPublishingActions";

import FormInputField from "../components/FormInputField";
import GameFormSection from "../components/GameFormSection";

type GameLinksSectionProps = {
  state: GameFormState;

  onChange: (
    field: GameLinksTextField,
    value: string,
  ) => void;
};

export default function GameLinksSection({
  state,
  onChange,
}: GameLinksSectionProps) {
  return (
    <GameFormSection
      title="Links"
      description="Tautan demo, store, trailer, dan halaman devlog."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInputField
          id="game-link-demo"
          label="Demo"
          value={state.links.demo}
          onChange={(value) =>
            onChange("demo", value)
          }
          placeholder="https://... atau /games/demo"
        />

        <FormInputField
          id="game-link-itch"
          label="Itch.io"
          value={state.links.itch}
          onChange={(value) =>
            onChange("itch", value)
          }
          placeholder="https://studio.itch.io/game"
        />

        <FormInputField
          id="game-link-steam"
          label="Steam"
          value={state.links.steam}
          onChange={(value) =>
            onChange("steam", value)
          }
          placeholder="https://store.steampowered.com/..."
        />

        <FormInputField
          id="game-link-devlog"
          label="Devlog"
          value={state.links.devlog}
          onChange={(value) =>
            onChange("devlog", value)
          }
          placeholder="/devlog"
          helperText="Boleh berupa path internal seperti /devlog."
        />

        <FormInputField
          id="game-link-trailer"
          label="Trailer"
          value={state.links.trailer}
          onChange={(value) =>
            onChange("trailer", value)
          }
          placeholder="https://youtube.com/..."
        />
      </div>
    </GameFormSection>
  );
}
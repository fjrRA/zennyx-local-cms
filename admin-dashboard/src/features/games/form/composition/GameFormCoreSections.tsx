// src/features/games/form/composition/GameFormCoreSections.tsx
import type {
  GameFormController,
} from "../hooks/useGameFormState";

import GameBasicInfoSection from "../sections/GameBasicInfoSection";
import GameClassificationSection from "../sections/GameClassificationSection";
import GameTargetSection from "../sections/GameTargetSection";
import GameVisibilitySection from "../sections/GameVisibilitySection";

type GameFormCoreSectionsProps = {
  controller: GameFormController;
};

export default function GameFormCoreSections({
  controller,
}: GameFormCoreSectionsProps) {
  const {
    formState,
    updateTextField,
    updateBooleanField,
    updateListItem,
    addListItem,
    removeListItem,
  } = controller;

  return (
    <>
      <GameBasicInfoSection
        state={formState}
        onChange={updateTextField}
      />

      <GameVisibilitySection
        state={formState}
        onTextChange={updateTextField}
        onBooleanChange={
          updateBooleanField
        }
      />

      <GameClassificationSection
        state={formState}
        onItemChange={updateListItem}
        onAddItem={addListItem}
        onRemoveItem={removeListItem}
      />

      <GameTargetSection
        state={formState}
        onChange={updateTextField}
      />
    </>
  );
}
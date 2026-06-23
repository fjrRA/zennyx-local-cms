// src/features/games/form/composition/GameFormDevelopmentSections.tsx
import type {
  GameFormController,
} from "../hooks/useGameFormState";

import GameDevelopmentStageSection from "../sections/GameDevelopmentStageSection";
import GameGameplayFocusSection from "../sections/GameGameplayFocusSection";
import GameScopeSection from "../sections/GameScopeSection";
import GameSettingSection from "../sections/GameSettingSection";

type GameFormDevelopmentSectionsProps = {
  controller: GameFormController;
};

export default function GameFormDevelopmentSections({
  controller,
}: GameFormDevelopmentSectionsProps) {
  const {
    formState,

    updateListItem,
    addListItem,
    removeListItem,

    updateSettingField,
    updateSettingInspirationItem,
    addSettingInspiration,
    removeSettingInspiration,

    updateDevelopmentStageField,

    updateGameplayFocusField,
    updateGameplayPointItem,
    addGameplayPoint,
    removeGameplayPoint,
  } = controller;

  return (
    <>
      <GameSettingSection
        state={formState}
        onTextChange={
          updateSettingField
        }
        onInspirationChange={
          updateSettingInspirationItem
        }
        onAddInspiration={
          addSettingInspiration
        }
        onRemoveInspiration={
          removeSettingInspiration
        }
      />

      <GameDevelopmentStageSection
        state={formState}
        onChange={
          updateDevelopmentStageField
        }
      />

      <GameGameplayFocusSection
        state={formState}
        onTextChange={
          updateGameplayFocusField
        }
        onPointChange={
          updateGameplayPointItem
        }
        onAddPoint={
          addGameplayPoint
        }
        onRemovePoint={
          removeGameplayPoint
        }
      />

      <GameScopeSection
        state={formState}
        onItemChange={updateListItem}
        onAddItem={addListItem}
        onRemoveItem={removeListItem}
      />
    </>
  );
}
// src/features/games/form/composition/GameFormPublishingSections.tsx
import type {
  GameFormController,
} from "../hooks/useGameFormState";

import GameLinksSection from "../sections/GameLinksSection";
import GameMediaSection from "../sections/GameMediaSection";
import GameRelatedDevlogsSection from "../sections/GameRelatedDevlogsSection";
import GameSeoSection from "../sections/GameSeoSection";

type GameFormPublishingSectionsProps = {
  controller: GameFormController;
};

export default function GameFormPublishingSections({
  controller,
}: GameFormPublishingSectionsProps) {
  const {
    formState,

    updateListItem,
    addListItem,
    removeListItem,

    updateMediaField,
    updateMediaGalleryItem,
    addMediaGalleryItem,
    removeMediaGalleryItem,

    updateLinksField,
    updateSeoField,
  } = controller;

  return (
    <>
      <GameMediaSection
        state={formState}
        onTextChange={updateMediaField}
        onGalleryChange={
          updateMediaGalleryItem
        }
        onAddGallery={
          addMediaGalleryItem
        }
        onRemoveGallery={
          removeMediaGalleryItem
        }
      />

      <GameLinksSection
        state={formState}
        onChange={updateLinksField}
      />

      <GameRelatedDevlogsSection
        state={formState}
        onItemChange={updateListItem}
        onAddItem={addListItem}
        onRemoveItem={removeListItem}
      />

      <GameSeoSection
        state={formState}
        onChange={updateSeoField}
      />
    </>
  );
}
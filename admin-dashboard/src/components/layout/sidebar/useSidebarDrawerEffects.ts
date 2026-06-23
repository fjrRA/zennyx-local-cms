// src/components/layout/sidebar/useSidebarDrawerEffects.ts
import { useEffect } from "react";

type UseSidebarDrawerEffectsOptions = {
  isOpen: boolean;
  onClose: () => void;
};

const DESKTOP_MEDIA_QUERY =
  "(min-width: 1024px)";

export function useSidebarDrawerEffects({
  isOpen,
  onClose,
}: UseSidebarDrawerEffectsOptions) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const desktopMediaQuery =
      window.matchMedia(
        DESKTOP_MEDIA_QUERY,
      );

    if (desktopMediaQuery.matches) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    function handleViewportChange(
      event: MediaQueryListEvent,
    ) {
      if (event.matches) {
        onClose();
      }
    }

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    desktopMediaQuery.addEventListener(
      "change",
      handleViewportChange,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      desktopMediaQuery.removeEventListener(
        "change",
        handleViewportChange,
      );
    };
  }, [isOpen, onClose]);
}
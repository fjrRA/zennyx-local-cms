// src/components/layout/Sidebar.tsx
import SidebarBackdrop from "./sidebar/SidebarBackdrop";
import SidebarEnvironmentCard from "./sidebar/SidebarEnvironmentCard";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";

import {
  useSidebarDrawerEffects,
} from "./sidebar/useSidebarDrawerEffects";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  useSidebarDrawerEffects({
    isOpen,
    onClose,
  });

  const drawerPositionClass = isOpen
    ? "translate-x-0"
    : "-translate-x-full";

  return (
    <>
      <SidebarBackdrop
        isOpen={isOpen}
        onClose={onClose}
      />

      <aside
        id="admin-sidebar"
        aria-label="Sidebar admin"
        className={[
          "fixed inset-y-0 left-0 z-50",
          "flex h-dvh w-[calc(100vw-3rem)] max-w-72 shrink-0 flex-col",
          "border-r border-zinc-800 bg-zinc-950 p-5",
          "shadow-2xl transition-transform duration-300 ease-out",
          drawerPositionClass,
          "lg:sticky lg:top-0 lg:z-0",
          "lg:h-screen lg:w-72 lg:max-w-none",
          "lg:translate-x-0 lg:shadow-none",
        ].join(" ")}
      >
        <SidebarHeader
          onClose={onClose}
        />

        <SidebarNavigation
          onNavigate={onClose}
        />

        <SidebarEnvironmentCard />
      </aside>
    </>
  );
}
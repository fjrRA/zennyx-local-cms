// src/components/layout/sidebar/SidebarNavigation.tsx
import SidebarNavItem from "../SidebarNavItem";

import {
  sidebarNavigationItems,
} from "./sidebar-navigation";

type SidebarNavigationProps = {
  onNavigate: () => void;
};

export default function SidebarNavigation({
  onNavigate,
}: SidebarNavigationProps) {
  return (
    <nav
      aria-label="Navigasi utama"
      className="mt-6 space-y-1"
    >
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
        Main Menu
      </p>

      {sidebarNavigationItems.map(
        (item) => (
          <SidebarNavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            end={item.end}
            onClick={onNavigate}
          />
        ),
      )}
    </nav>
  );
}
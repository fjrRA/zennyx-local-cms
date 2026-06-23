// src/components/layout/SidebarNavItem.tsx
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

type SidebarNavItemProps = {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  onClick?: () => void;
};

export default function SidebarNavItem({
  to,
  label,
  icon: Icon,
  end = false,
  onClick,
}: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-3",
          "text-sm font-medium transition",
          isActive
            ? "bg-orange-500 text-zinc-950"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
        ].join(" ")
      }
    >
      <Icon
        size={20}
        aria-hidden="true"
      />

      <span>{label}</span>
    </NavLink>
  );
}
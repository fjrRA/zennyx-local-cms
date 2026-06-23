// src/components/layout/sidebar/sidebar-navigation.ts
import type { LucideIcon } from "lucide-react";

import {
  FileText,
  Gamepad2,
  LayoutDashboard,
  Settings2,
  Share2,
  Users,
} from "lucide-react";

export type SidebarNavigationItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
};

export const sidebarNavigationItems:
  SidebarNavigationItem[] = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Games",
      to: "/games",
      icon: Gamepad2,
    },
    {
      label: "Devlogs",
      to: "/devlogs",
      icon: FileText,
    },
    {
      label: "Site",
      to: "/site",
      icon: Settings2,
    },
    {
      label: "Team",
      to: "/team",
      icon: Users,
    },
    {
      label: "Socials",
      to: "/socials",
      icon: Share2,
    },
  ];
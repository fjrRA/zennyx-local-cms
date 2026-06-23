// src/features/dashboard/components/DashboardStatsGrid.tsx
import {
  FileText,
  Gamepad2,
  Share2,
  Users,
} from "lucide-react";

import type {
  DashboardSummary,
} from "../dashboard.types";

import SummaryCard from "./SummaryCard";

type DashboardStatsGridProps = {
  data: DashboardSummary;
};

export default function DashboardStatsGrid({
  data,
}: DashboardStatsGridProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Games"
        value={data.totalGames}
        detail={`${data.publicGames} public`}
        icon={Gamepad2}
        to="/games"
      />

      <SummaryCard
        title="Devlogs"
        value={data.totalDevlogs}
        detail={`${data.publishedDevlogs} published`}
        icon={FileText}
        to="/devlogs"
      />

      <SummaryCard
        title="Team Members"
        value={data.totalTeamMembers}
        detail={`${data.activeTeamMembers} active`}
        icon={Users}
        to="/team"
      />

      <SummaryCard
        title="Social Links"
        value={data.totalSocialLinks}
        detail={`${data.activeSocialLinks} active`}
        icon={Share2}
        to="/socials"
      />
    </div>
  );
}
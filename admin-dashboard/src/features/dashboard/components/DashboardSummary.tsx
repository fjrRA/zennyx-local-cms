// src/features/dashboard/components/DashboardSummary.tsx
import { useDashboardSummary } from "../hooks/useDashboardSummary";

import DashboardStatsGrid from "./DashboardStatsGrid";
import DashboardSummaryError from "./DashboardSummaryError";
import DashboardSummaryHeader from "./DashboardSummaryHeader";
import DashboardSummaryLoading from "./DashboardSummaryLoading";
import SiteConfigurationCard from "./SiteConfigurationCard";

export default function DashboardSummary() {
  const {
    state,
    retry,
  } = useDashboardSummary();

  if (state.status === "loading") {
    return <DashboardSummaryLoading />;
  }

  if (state.status === "error") {
    return (
      <DashboardSummaryError
        message={state.message}
        onRetry={retry}
      />
    );
  }

  const { data } = state;

  return (
    <section>
      <DashboardSummaryHeader
        onRefresh={retry}
      />

      <DashboardStatsGrid data={data} />

      <SiteConfigurationCard
        siteName={data.siteName}
        siteUpdatedAt={data.siteUpdatedAt}
        isConfigured={data.siteConfigured}
      />
    </section>
  );
}
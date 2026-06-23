// src/features/dashboard/components/SiteConfigurationCard.tsx
import {
  CheckCircle2,
  CircleAlert,
  Settings2,
} from "lucide-react";
import { Link } from "react-router";

import { formatUpdatedAt } from "../utils/format-updated-at";

type SiteConfigurationCardProps = {
  siteName: string;
  siteUpdatedAt: string | null;
  isConfigured: boolean;
};

export default function SiteConfigurationCard({
  siteName,
  siteUpdatedAt,
  isConfigured,
}: SiteConfigurationCardProps) {
  const StatusIcon = isConfigured
    ? CheckCircle2
    : CircleAlert;

  const statusLabel = isConfigured
    ? "Configured"
    : "Not Configured";

  const statusClassName = isConfigured
    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
    : "border-amber-500/20 bg-amber-500/10 text-amber-400";

  return (
    <section className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl sm:p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="flex min-w-0 items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
            <Settings2
              size={22}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm  font-medium text-zinc-400">
              Site Configuration
            </p>

            <h3 className="mt-1 wrap-break-word text-lg font-semibold text-zinc-100">
              {siteName}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Terakhir diperbarui:{" "}
              {formatUpdatedAt(siteUpdatedAt)}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:items-end">
          <div
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
              "text-xs font-semibold",
              statusClassName,
            ].join(" ")}
          >
            <StatusIcon
              size={15}
              aria-hidden="true"
            />

            {statusLabel}
          </div>

          <Link
            to="/site"
            className="inline-flex w-full justify-center rounded-lg border border-orange-500/20 bg-orange-500/5 px-3 py-2 text-sm font-semibold text-orange-400 transition hover:bg-orange-500/10 hover:text-orange-300 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0"
          >
            Kelola konfigurasi
          </Link>
        </div>
      </div>
    </section>
  );
}
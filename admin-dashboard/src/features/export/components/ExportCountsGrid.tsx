// src/features/export/components/ExportCountsGrid.tsx
import type {
  WebsiteExportCounts,
} from "../export.types";

type ExportCountsGridProps = {
  counts: WebsiteExportCounts;
};

const exportedCountItems: Array<{
  key: keyof WebsiteExportCounts;
  label: string;
}> = [
    {
      key: "site",
      label: "Site",
    },
    {
      key: "games",
      label: "Games",
    },
    {
      key: "team",
      label: "Team",
    },
    {
      key: "socials",
      label: "Socials",
    },
    {
      key: "devlogs",
      label: "Devlogs",
    },
  ];

export default function ExportCountsGrid({
  counts,
}: ExportCountsGridProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        Exported Content
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {exportedCountItems.map((item) => (
          <div
            key={item.key}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
          >
            <p className="text-xs font-medium text-zinc-500">
              {item.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-zinc-100">
              {counts[item.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
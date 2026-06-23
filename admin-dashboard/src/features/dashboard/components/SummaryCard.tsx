// src/features/dashboard/components/SummaryCard.tsx
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

type SummaryCardProps = {
  title: string;
  value: number;
  detail: string;
  icon: LucideIcon;
  to: string;
};

export default function SummaryCard({
  title,
  value,
  detail,
  icon: Icon,
  to,
}: SummaryCardProps) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl transition hover:border-zinc-700 hover:bg-zinc-800/80 sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
          <Icon
            size={21}
            aria-hidden="true"
          />
        </div>

        <ArrowUpRight
          size={19}
          className="text-zinc-600 transition group-hover:text-orange-400"
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 sm:mt-6">
        <p className="text-sm font-medium text-zinc-400">
          {title}
        </p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
          {value}
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          {detail}
        </p>
      </div>
    </Link>
  );
}
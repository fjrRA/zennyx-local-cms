// src/components/layout/sidebar/SidebarHeader.tsx
import {
  Boxes,
  X,
} from "lucide-react";

type SidebarHeaderProps = {
  onClose: () => void;
};

export default function SidebarHeader({
  onClose,
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-800 pb-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-500">
        <Boxes
          size={22}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate font-bold text-zinc-100">
          Zennyx CMS
        </p>

        <p className="truncate text-xs text-zinc-500">
          Admin Dashboard
        </p>
      </div>

      <button
        type="button"
        aria-label="Tutup sidebar"
        onClick={onClose}
        className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100 lg:hidden"
      >
        <X
          size={18}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

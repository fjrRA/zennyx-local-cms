// src/components/layout/Topbar.tsx
import {
  Menu,
  MonitorCog,
} from "lucide-react";

type TopbarProps = {
  isSidebarOpen: boolean;
  onOpenSidebar: () => void;
};

export default function Topbar({
  isSidebarOpen,
  onOpenSidebar,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Buka sidebar"
            aria-controls="admin-sidebar"
            aria-expanded={isSidebarOpen}
            onClick={onOpenSidebar}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
          >
            <Menu
              size={19}
              aria-hidden="true"
            />
          </button>

          <div className="min-w-0">
            <p className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-orange-500 sm:block">
              Admin Workspace
            </p>

            <h2 className="truncate text-sm font-semibold text-zinc-100 sm:mt-1 sm:text-lg">
              Content Management
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300">
          <MonitorCog
            size={17}
            className="text-orange-500"
            aria-hidden="true"
          />

          <span className="sm:hidden">
            Local
          </span>

          <span className="hidden sm:inline">
            Local Mode
          </span>
        </div>
      </div>
    </header>
  );
}
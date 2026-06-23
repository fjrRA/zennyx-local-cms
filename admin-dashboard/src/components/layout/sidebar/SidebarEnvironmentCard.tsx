// src/components/layout/sidebar/SidebarEnvironmentCard.tsx
export default function SidebarEnvironmentCard() {
  return (
    <div className="mt-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        Environment
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full bg-emerald-400"
          aria-hidden="true"
        />

        <p className="text-sm font-medium text-zinc-300">
          Local Development
        </p>
      </div>

      <p className="mt-2 text-xs text-zinc-500">
        API: localhost:4000
      </p>
    </div>
  );
}
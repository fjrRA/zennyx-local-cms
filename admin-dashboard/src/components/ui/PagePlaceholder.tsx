// src/components/ui/PagePlaceholder.tsx
type PagePlaceholderProps = {
  title: string;
  description: string;
};

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
          Zennyx Local CMS
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100">
          {title}
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <p className="text-sm leading-7 text-zinc-400">
          Konten halaman ini akan dibuat pada tahap pengembangan berikutnya.
        </p>
      </div>
    </section>
  );
}
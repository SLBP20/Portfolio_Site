import Link from "next/link";

type ProjectPreviewProps = {
  href: string;
  title: string;
  blurb: string;
  meta: string[];
  featured?: boolean;
  index?: string;
};

export function ProjectPreview({ href, title, blurb, meta, featured = false, index }: ProjectPreviewProps) {
  const marker = featured ? "★" : index ?? "—";

  return (
    <article className="py-3 border-t border-[var(--border)] first:border-t-0 group/proj">
      {/* Entry line — like a file listing */}
      <div className="flex items-baseline gap-0 font-mono text-base">
        <span className="text-[var(--accent)] opacity-50 w-8 shrink-0 text-sm tabular-nums">{marker}</span>
        <Link
          href={href}
          className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors tracking-tight"
        >
          {title}
        </Link>
        {meta[0] ? (
          <span className="ml-auto hidden sm:block text-[0.7rem] text-[var(--muted-bright)] opacity-65 shrink-0 pl-4 tracking-wide">
            {meta[0]}
          </span>
        ) : null}
      </div>

      {/* Description + tags — indented under the entry */}
      <div className="pl-8 mt-2 space-y-2">
        <p className="text-sm leading-relaxed text-[var(--muted-bright)]">{blurb}</p>

        {meta.length > 1 ? (
          <p className="text-[0.68rem] text-[var(--muted-bright)] opacity-60 tracking-[0.08em] uppercase">
            {meta.slice(1).join("  ·  ")}
          </p>
        ) : null}

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[0.72rem] text-[var(--accent)] opacity-65 hover:opacity-100 transition-opacity mt-1"
        >
          <span className="font-bold">{">"}</span>
          <span>open {featured ? "project" : `project-${index}`}</span>
        </Link>
      </div>
    </article>
  );
}

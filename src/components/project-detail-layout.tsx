type ProjectSection = {
  title: string;
  content: string;
};

type ProjectLink = {
  href: string;
  label: string;
};

type ProjectDetailLayoutProps = {
  title: string;
  summary: string;
  meta: string[];
  sections: ProjectSection[];
  links?: ProjectLink[];
};

export function ProjectDetailLayout({ title, summary, meta, sections, links = [] }: ProjectDetailLayoutProps) {
  return (
    <div className="content-grid py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--reading-width))_minmax(14rem,18rem)] lg:items-start">
        <article className="space-y-10">
          <header className="space-y-5 border-b border-[var(--border)] pb-10">
            <p className="eyebrow">Project Detail</p>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-[var(--font-heading)] text-4xl leading-tight sm:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{summary}</p>
              {links.length > 0 ? (
                <div className="flex flex-wrap gap-4 pt-2">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </header>
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3 border-b border-[var(--border)] pb-8 last:border-b-0">
                <h2 className="font-[var(--font-heading)] text-2xl text-[var(--foreground)]">{section.title}</h2>
                <p className="text-lg leading-8 text-[var(--muted)]">{section.content}</p>
              </section>
            ))}
          </div>
        </article>
        <aside className="space-y-4 lg:sticky lg:top-24">
          <p className="eyebrow">Snapshot</p>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            {meta.map((item) => (
              <li key={item} className="border-t border-[var(--border)] pt-3">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

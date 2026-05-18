import { ContactLink } from "@/components/contact-link";
import Link from "next/link";
import { ProjectPreview } from "@/components/project-preview";
import { contactLinks, featuredProject, heroContent, notes, supportingProjects } from "@/lib/site-data";

const heroStats = [
  { value: "    43", label: "RSS outlets ingested across 17 languages" },
  { value: " 5,500", label: "article embeddings in the vector store" },
  { value: "     8", label: "containers in the polyglot Docker stack" },
];

const heroTitle = heroContent.title;

function PaneBar({ title }: { title: string }) {
  return (
    <div className="term-pane-bar">
      <div className="term-pane-dots">
        <span className="term-pane-dot red" />
        <span className="term-pane-dot yellow" />
        <span className="term-pane-dot green" />
      </div>
      <span className="term-pane-title">{title}</span>
    </div>
  );
}

function Prompt({ user, path, cmd }: { user: string; path: string; cmd: string }) {
  return (
    <p className="term-prompt">
      <span className="term-user">{user}</span>
      <span className="term-colon">:</span>
      <span className="term-path">{path}</span>
      <span className="term-cmd"> % {cmd}</span>
    </p>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero pane ──────────────────────────────────────── */}
      <div className="term-pane pane-full fade-up">
        <PaneBar title="~/portfolio — zsh — 122×33" />
        <div className="term-pane-body">
          <Prompt user="samuel@portfolio" path="~/portfolio" cmd="cat intro.md" />

          <div className="space-y-8">
            {/* Identity line — terminal output style */}
            <p className="text-[0.8rem] tracking-[0.18em] text-[var(--muted-bright)] uppercase">
              London&nbsp;&nbsp;·&nbsp;&nbsp;Data Engineer&nbsp;&nbsp;·&nbsp;&nbsp;MSc Business Analytics, UCL
            </p>

            {/* H1 */}
            <h1 className="font-bold text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[0.92] tracking-tight max-w-4xl">
              <span className="glitch cursor-blink" data-text={heroTitle}>
                {heroTitle}
              </span>
            </h1>

            {/* Body copy — plain terminal output, no styling chrome */}
            <div className="space-y-3 text-base leading-relaxed text-[var(--muted-bright)] max-w-2xl">
              <p>{heroContent.intro}</p>
              <p className="text-sm leading-6 border-l-2 border-[var(--muted)] border-opacity-30 pl-3 text-[var(--muted-bright)]">
                Interested in data engineering, analytics engineering, and applied machine learning infrastructure.
              </p>
            </div>

            {/* Stats — formatted like terminal metric output */}
            <div className="font-mono">
              <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[var(--muted-bright)] opacity-60 mb-2">
                flagship system metrics
                <span className="inline-block ml-2 w-32 h-px align-middle bg-[var(--border)]" />
              </p>
              <table className="text-sm border-collapse">
                <tbody>
                  {heroStats.map((stat) => (
                    <tr key={stat.label}>
                      <td className="pr-4 text-right font-bold text-[var(--accent-amber)] tabular-nums text-lg pb-1">
                        {stat.value}
                      </td>
                      <td className="text-[var(--muted-bright)] text-sm pb-1">{stat.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Nav — looks like shell commands available */}
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[0.78rem] text-[var(--muted-bright)] tracking-[0.08em]">
              <span className="text-[var(--accent)] opacity-50 mr-1">→</span>
              <Link href={`/projects#${featuredProject.slug}`} className="hover:text-[var(--accent)] transition-colors">flagship project</Link>
              <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">all projects</Link>
              <Link href="/about" className="hover:text-[var(--accent)] transition-colors">about</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Work pane ─────────────────────────────── */}
      <div className="term-pane pane-lg scroll-reveal">
        <PaneBar title="pipeline.py — python3 — 96×25" />
        <div className="term-pane-body">
          <Prompt user="samuel@portfolio" path="~/work" cmd="python pipeline.py --info" />

          <div className="space-y-4">
            <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[var(--muted-bright)] opacity-60 mb-1">
              featured work
              <span className="inline-block ml-2 w-24 h-px align-middle bg-[var(--border)]" />
            </p>
            <ProjectPreview
              href={`/projects#${featuredProject.slug}`}
              title={featuredProject.title}
              blurb={featuredProject.blurb}
              meta={featuredProject.meta}
              featured
            />
          </div>
        </div>
      </div>

      {/* ── Supporting Projects pane ────────────────────────── */}
      <div className="term-pane pane-md scroll-reveal">
        <PaneBar title="projects.sh — zsh — 80×24" />
        <div className="term-pane-body">
          <Prompt user="samuel@portfolio" path="~/projects" cmd="ls -la" />

          <div className="space-y-1">
            {/* ls header */}
            <div className="flex text-[0.7rem] tracking-[0.14em] uppercase text-[var(--muted-bright)] opacity-60 pb-2 border-b border-[var(--border)]">
              <span className="w-8 shrink-0">#</span>
              <span className="flex-1">name</span>
              <span className="hidden sm:block text-right pr-4">type</span>
            </div>
            {supportingProjects.map((project, index) => (
              <ProjectPreview
                key={project.slug}
                href={`/projects#${project.slug}`}
                title={project.title}
                blurb={project.blurb}
                meta={project.meta}
                index={`0${index + 2}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Notes pane ─────────────────────────────────────── */}
      <div className="term-pane pane-sm scroll-reveal">
        <PaneBar title="notes.md — vim — 72×30" />
        <div className="term-pane-body">
          <Prompt user="samuel@portfolio" path="~/notes" cmd="vim notes.md" />

          {/* vim-style header bar */}
          <div className="text-[0.72rem] text-[var(--muted-bright)] opacity-65 tracking-[0.08em] mb-4 flex gap-4">
            <span className="text-[var(--accent)] opacity-60">-- NORMAL --</span>
            <span className="ml-auto opacity-55">notes.md  {notes.length}L</span>
          </div>

          <div className="space-y-0 font-mono">
            {notes.map((note, i) => (
              <div
                key={note.slug}
                className="grid grid-cols-[1.75rem_1fr] gap-3 py-2 border-t border-[var(--border)] first:border-t-0 group/note"
              >
                <span className="text-[var(--muted-bright)] opacity-50 text-[0.7rem] tabular-nums pt-1 text-right select-none">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base text-[var(--foreground)] leading-snug group-hover/note:text-[var(--accent)] transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-sm leading-6 text-[var(--muted-bright)] mt-1">{note.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact pane ───────────────────────────────────── */}
      <div className="term-pane pane-xs scroll-reveal">
        <PaneBar title="contact.sh — zsh — 60×18" />
        <div className="term-pane-body">
          <Prompt user="samuel@portfolio" path="~" cmd="./contact.sh" />

          {/* script-output style */}
          <div className="space-y-0 text-sm font-mono">
            <p className="text-[var(--muted-bright)] opacity-60 text-[0.72rem] mb-3">checking endpoints...</p>
            {contactLinks.map((link) => (
              <div key={link.label} className="py-2 border-t border-[var(--border)] flex items-center gap-3">
                <span className="text-[var(--muted-bright)] w-24 shrink-0">{link.label}</span>
                <span className="text-[var(--accent)] opacity-50 shrink-0">→</span>
                <ContactLink
                  href={link.href}
                  label={link.label}
                  className="text-[var(--accent)] opacity-90 hover:opacity-100 transition-opacity text-[0.82rem] truncate"
                />
              </div>
            ))}
            <p className="text-[var(--tl-green)] text-[0.78rem] mt-3 pt-2 border-t border-[var(--border)]">done.</p>
          </div>
        </div>
      </div>
    </>
  );
}

import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { AsciiArtClusters } from "@/components/ascii-art-clusters";
import { DiagramViewer } from "@/components/diagram-viewer";
import { WorldMapPlaceholder } from "@/components/world-map-placeholder";
import { projects } from "@/lib/site-data";

const paneWidths = ["pane-full", "pane-lg", "pane-md", "pane-sm", "pane-sm"];

const paneTitles = [
  (slug: string) => `${slug}.py — python3 — 118×36`,
  (slug: string) => `${slug}.ipynb — jupyter — 96×30`,
  (slug: string) => `${slug}.sh — airflow — 104×32`,
  (slug: string) => `${slug}.R — r — 80×26`,
  (slug: string) => `${slug}.sql — psql — 72×22`,
];

const projectColors = [
  { colorStart: "#e8a838", colorEnd: "#f5d06b" }, // Geopolitical — amber (flagship)
  { colorStart: "#4d9de0", colorEnd: "#8ecbff" }, // Steam — blue
  { colorStart: "#9b59b6", colorEnd: "#d670d6" }, // PL — purple
  { colorStart: "#14b8a6", colorEnd: "#60efcb" }, // Marketing — teal
];

function readAscii(filename: string): string {
  return fs.readFileSync(path.join(process.cwd(), "src/lib", filename), "utf-8");
}

const asciiBySlug: Record<string, string> = {
  "indie-game-success-data-pipeline": readAscii("steam-ascii.txt"),
  "premier-league-predictive-analytics": readAscii("pl-ascii.txt"),
  "geopolitical-crisis-narrative-tracker": readAscii("earth-ascii.txt"),
};

// ASCII art sizes are kept in absolute px (not rem) so the root font-size bump
// for content readability doesn't blow up the icon dimensions. Font-size ≥ 8px
// also keeps Safari's small-text clamp from breaking -webkit-background-clip.
const asciiFontSize: Record<string, string> = {
  "indie-game-success-data-pipeline": "8px",
  "premier-league-predictive-analytics": "8px",
  "geopolitical-crisis-narrative-tracker": "10px",
};

const asciiZoom: Record<string, number> = {
  "indie-game-success-data-pipeline": 0.27,
  "premier-league-predictive-analytics": 0.26,
  "geopolitical-crisis-narrative-tracker": 1,
};

const asciiHeight: Record<string, string> = {
  "indie-game-success-data-pipeline": "280px",
  "premier-league-predictive-analytics": "336px",
  "geopolitical-crisis-narrative-tracker": "192px",
};

const asciiWidth: Record<string, string> = {
  "indie-game-success-data-pipeline": "288px",
  "premier-league-predictive-analytics": "352px",
  "geopolitical-crisis-narrative-tracker": "384px",
};

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

export default function ProjectsPage() {
  return (
    <>
      {projects.map((project, index) => {
        const widthClass = paneWidths[index] ?? "pane-md";
        const paneTitle = (paneTitles[index] ?? paneTitles[2])(project.slug);
        const isFirst = index === 0;
        const hasAscii = !!asciiBySlug[project.slug];
        const colors = projectColors[index];

        const isGeopolitical = project.slug === "geopolitical-crisis-narrative-tracker";
        const isAfterGeopolitical = project.slug === "marketing-analytics-segmentation";

        return (
          <div
            key={project.slug}
            style={
              isGeopolitical ? { marginTop: "-1.75rem" } :
              isAfterGeopolitical ? { marginTop: "-1.75rem" } :
              undefined
            }
            id={project.slug}
            className={`term-pane ${widthClass} ${isFirst ? "fade-up" : "scroll-reveal"}`}
          >
            <PaneBar title={paneTitle} />
            <div className="term-pane-body">
              {/* Shell prompt */}
              <p className="term-prompt">
                <span className="term-user">samuel@portfolio</span>
                <span className="term-colon">:</span>
                <span className="term-path">~/projects</span>
                <span className="term-cmd"> % cat {project.slug}.md</span>
              </p>

              {/* Cluster art for projects without ascii text art */}
              {!hasAscii && !project.logo ? (
                <AsciiArtClusters
                  colorStart={colors?.colorStart ?? "#14b8a6"}
                  colorEnd={colors?.colorEnd ?? "#60efcb"}
                />
              ) : null}

              {/* Main layout: content left, ASCII art right (when available) */}
              <div
                className={
                  hasAscii
                    ? isGeopolitical
                      ? "lg:grid lg:grid-cols-[minmax(0,1fr)_52%] lg:gap-10 lg:items-start"
                      : "lg:grid lg:grid-cols-[minmax(0,1fr)_42%] lg:gap-10 lg:items-start"
                    : ""
                }
              >
                {/* ── Left column: all readable content ─────────── */}
                <div className="space-y-7">

                  {/* Header */}
                  <div className="space-y-4">
                    <p className="text-[0.58rem] tracking-[0.2em] uppercase text-[var(--muted)]">
                      {isFirst ? "flagship project" : `project 0${index + 1}`}
                      <span className="inline-block ml-2 w-20 h-px align-middle bg-[var(--border)]" />
                    </p>

                    <div className="flex items-center gap-4">
                      {project.logo ? (
                        <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[var(--border)] bg-[var(--background-panel)] p-1.5">
                          <Image
                            src={project.logo.src}
                            alt={project.logo.alt}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : null}
                      <h2 className="font-bold text-2xl sm:text-3xl tracking-tight text-[var(--foreground)]">
                        {project.title}
                      </h2>
                    </div>

                    <p className="text-base leading-relaxed text-[var(--muted-bright)] max-w-2xl">
                      {project.summary}
                    </p>
                  </div>

                  {/* Mobile-only ASCII art — sits just under the title.
                      The desktop layout shows the same art in the sticky
                      right rail (rendered below), so this duplicate is
                      hidden on lg+. */}
                  {hasAscii ? (
                    <div
                      className="overflow-hidden block lg:hidden"
                      style={{
                        width: `calc(${asciiWidth[project.slug] ?? "288px"} * 0.5)`,
                        height: `calc(${asciiHeight[project.slug] ?? "272px"} * 0.5)`,
                        maxHeight: "26vh",
                        margin: "0 auto",
                        maskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                      }}
                    >
                      <pre
                        className="font-mono select-none whitespace-pre"
                        style={{
                          fontSize: asciiFontSize[project.slug] ?? "0.5rem",
                          lineHeight: 1.05,
                          width: "max-content",
                          flexShrink: 0,
                          transform: `scale(${(asciiZoom[project.slug] ?? 0.34) * 0.5})`,
                          transformOrigin: "top left",
                          margin: 0,
                          background: `linear-gradient(135deg, ${colors?.colorStart ?? "#14b8a6"} 0%, ${colors?.colorEnd ?? "#60efcb"} 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        aria-label={project.logo?.alt ?? project.title}
                      >
                        {asciiBySlug[project.slug]}
                      </pre>
                    </div>
                  ) : null}

                  {/* Links — bordered pill buttons */}
                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.65rem] tracking-[0.1em] uppercase border border-[var(--border)] text-[var(--accent)] opacity-75 hover:opacity-100 hover:border-[var(--accent)] transition-all duration-200 font-mono"
                        >
                          <span className="opacity-70">↗</span>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}

                  {/* Sections as log output — full width */}
                  <div className="space-y-0 font-mono">
                    {project.sections.map((section) => (
                      <div key={section.title} className="py-4 border-t border-[var(--border)]">
                        <p className="text-[0.72rem] tracking-[0.14em] uppercase text-[var(--accent)] opacity-80 mb-2">
                          {section.title}
                        </p>
                        <p className="text-[0.95rem] leading-relaxed text-[var(--muted-bright)]">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Schema summary — left column, below sections */}
                  {"galleryNote" in project && Array.isArray(project.galleryNote) ? (
                    <div className="font-mono space-y-0">
                      <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted-bright)] opacity-60 mb-2">
                        schema summary
                        <span className="inline-block ml-2 w-8 h-px align-middle bg-[var(--border)]" />
                      </p>
                      {(project.galleryNote as { storage: string; contents: string; size: string; purpose: string }[]).map((row) => (
                        <div key={row.storage} className="py-3 border-t border-[var(--border)]">
                          <div className="flex items-baseline justify-between gap-2 mb-1.5">
                            <span className="text-[0.78rem] font-bold text-[var(--accent)] opacity-90">{row.storage}</span>
                            <span className="text-[0.72rem] text-[var(--muted-bright)] opacity-70 shrink-0">{row.size}</span>
                          </div>
                          <p className="text-[0.92rem] leading-relaxed text-[var(--muted-bright)]">{row.purpose}</p>
                          <p className="text-[0.78rem] leading-6 text-[var(--muted-bright)] opacity-70 mt-1">{row.contents}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                </div>

                {/* ── Right column: ASCII art + meta sidebar ──── */}
                {hasAscii ? (
                  <div className="mt-6 lg:mt-0 lg:sticky lg:top-20 self-start space-y-6">
                    {/* ASCII art — desktop only; mobile renders the same art
                        higher up in the content column under the title. */}
                    <div
                      className="hidden lg:block overflow-hidden"
                      style={{
                        width: asciiWidth[project.slug] ?? "288px",
                        height: asciiHeight[project.slug] ?? "272px",
                        maxHeight: "52vh",
                        margin: "0 auto",
                        maskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
                      }}
                    >
                      <pre
                        className="font-mono select-none whitespace-pre"
                        style={{
                          fontSize: asciiFontSize[project.slug] ?? "0.5rem",
                          lineHeight: 1.05,
                          width: "max-content",
                          flexShrink: 0,
                          transform: `scale(${asciiZoom[project.slug] ?? 0.34})`,
                          transformOrigin: "top left",
                          margin: 0,
                          background: `linear-gradient(135deg, ${colors?.colorStart ?? "#14b8a6"} 0%, ${colors?.colorEnd ?? "#60efcb"} 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        aria-label={project.logo?.alt ?? project.title}
                      >
                        {asciiBySlug[project.slug]}
                      </pre>
                    </div>

                    {/* Snapshot meta */}
                    <div>
                      <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-2">
                        snapshot
                        <span className="inline-block ml-2 w-10 h-px align-middle bg-[var(--border)]" />
                      </p>
                      <ul className="space-y-1.5 font-mono">
                        {project.meta.map((item) => (
                          <li
                            key={item}
                            className="text-[0.88rem] text-[var(--muted-bright)] border-t border-[var(--border)] pt-2 leading-relaxed"
                          >
                            <span className="text-[var(--accent)] opacity-30 mr-1.5">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Diagram viewer */}
                    {project.gallery.length > 0 ? (
                      <div className="space-y-4">
                        {project.gallery.map((item) => (
                          <DiagramViewer
                            key={item.src}
                            src={item.src}
                            alt={item.alt}
                            caption={item.caption}
                          />
                        ))}
                      </div>
                    ) : null}

                    {/* Conflict map — static export from the tracker's
                        geospatial notebook. The live deployment serves an
                        interactive Leaflet equivalent at /map; this PNG is the
                        snapshot output of the same GeoJSON pipeline. */}
                    {isGeopolitical ? (
                      <div className="space-y-2">
                        <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--muted)]">
                          conflict map
                          <span className="inline-block ml-2 w-8 h-px align-middle bg-[var(--border)]" />
                        </p>
                        <DiagramViewer
                          src="/images/projects/geopolitical/static_event_map.png"
                          alt="Global conflict event map — GDELT + RSS ingestion plotted geographically"
                          caption="Static export of the conflict map — the live deployment serves an interactive Leaflet version of this GeoJSON at /map."
                        />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  /* Fallback meta for projects without ASCII art */
                  <div className="mt-6 lg:mt-0">
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-2">
                      snapshot
                      <span className="inline-block ml-2 w-10 h-px align-middle bg-[var(--border)]" />
                    </p>
                    <ul className="space-y-1.5 font-mono">
                      {project.meta.map((item) => (
                        <li
                          key={item}
                          className="text-[0.85rem] text-[var(--muted-bright)] border-t border-[var(--border)] pt-2 leading-relaxed"
                        >
                          <span className="text-[var(--accent)] opacity-30 mr-1.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

import fs from "fs";
import path from "path";
import Image from "next/image";

const uhAscii = fs.readFileSync(path.join(process.cwd(), "src/lib/uh-ascii.txt"), "utf-8");
const neomaAscii = fs.readFileSync(path.join(process.cwd(), "src/lib/neoma-ascii.txt"), "utf-8");
const uclAscii = fs
  .readFileSync(path.join(process.cwd(), "src/lib/ucl-ascii.txt"), "utf-8")
  .split("\n")
  .map((line) => (line.startsWith("@") ? line.slice(1) : line))
  .join("\n");

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

function Prompt({ path, cmd }: { path: string; cmd: string }) {
  return (
    <p className="term-prompt">
      <span className="term-user">samuel@portfolio</span>
      <span className="term-colon">:</span>
      <span className="term-path">{path}</span>
      <span className="term-cmd"> % {cmd}</span>
    </p>
  );
}

const education = [
  {
    tag: "MSc",
    title: "University College London",
    href: "https://www.ucl.ac.uk/",
    sub: "MSc Business Analytics",
    meta: "London, UK",
    body: "Current degree focused on applying statistics, machine learning, and large-scale data infrastructure to business problems.",
    items: ["Data Engineering", "Machine Learning", "Predictive Analytics", "Programming for Business Analytics"],
    ascii: uclAscii,
    asciiGradient: "linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)",
    asciiFontSize: "8px",
    asciiZoom: 0.22,
    asciiWidth: "352px",
    asciiHeight: "200px",
  },
  {
    tag: "BBA",
    title: "University of Houston",
    href: "https://www.uh.edu/",
    sub: "BBA Management Information Systems, cum laude",
    meta: "Houston, Texas",
    body: "Graduated Cum Laude (equivalent to upper 2:1), with coursework centred on databases, enterprise systems, analytics, IT project management and information systems management.",
    items: ["Database Management", "IS Development Tools", "IT Project Management", "Transaction Processing Systems"],
    ascii: uhAscii,
    asciiGradient: "linear-gradient(135deg, #dc2626 0%, #ff6b6b 100%)",
    asciiFontSize: "8px",
    asciiZoom: 0.35,
    asciiWidth: "336px",
    asciiHeight: "184px",
  },
  {
    tag: "ABR",
    title: "NEOMA Business School",
    href: "https://www.neoma-bs.fr/",
    sub: "Semester abroad",
    meta: "Rouen, France",
    body: "International study experience in France, which added broader academic and cultural context to my business and systems education.",
    ascii: neomaAscii,
    asciiGradient: "linear-gradient(135deg, #4a1a8a 0%, #9b59d4 100%)",
    asciiFontSize: "8px",
    asciiZoom: 0.18,
    asciiWidth: "260px",
    asciiHeight: "256px",
  },
];

const experience = [
  {
    tag: "INT",
    title: "McDermott International (Houston, TX)",
    sub: "IT Intern (Data / AI Governance)",
    meta: "",
    body: [
      "Built Power BI dashboards, supported Microsoft Purview governance initiatives, created internal AI compliance training material, and assisted enterprise data classification efforts.",
      "Gave direct exposure to large-scale governance systems and the operational side of enterprise data work.",
    ],
  },
  {
    tag: "INT",
    title: "Guinea Mobile (London, England)",
    sub: "Data Engineering Intern",
    meta: "Starting May",
    body: [
      "Built a reproducible data pipeline transforming raw telecom output from an MVNO's Oracle BSS environment into structured analytical datasets.",
      "Deployed using Google BigQuery and CI-based workflows. Enabled active customer tracking, expiry forecasting, and bundle-balance analysis.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Profile pane ──────────────────────────────────── */}
      <div className="term-pane pane-full fade-up">
        <PaneBar title="profile.md — vim — 120×40" />
        <div className="term-pane-body">
          <Prompt path="~/about" cmd="cat profile.md" />

          <div className="flex flex-col gap-8 lg:gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
            <div className="space-y-5 order-2 lg:order-1">
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-[var(--muted-bright)] opacity-60">
                about
                <span className="inline-block ml-2 w-20 h-px align-middle bg-[var(--border)]" />
              </p>
              <h1 className="font-bold text-4xl leading-tight sm:text-5xl tracking-tight max-w-2xl">
                A data and analytics background shaped across Houston and London.
              </h1>
              <div className="space-y-4 text-base leading-relaxed text-[var(--muted-bright)] max-w-xl">
                <p>Hi, I'm Sam, a London-based data and analytics professional currently completing my MSc in Business Analytics at University College London.</p>
                <p>My work tends to sit across data engineering, analytics systems, machine learning, and modern data infrastructure, with a strong bias toward practical pipelines and clear technical explanation.</p>
                <p>When I am not working or playing with data you will often find me keeping up with Brighton & Hove Albion (Seagulls!!), at the gym, tinkering with my gaming PC, and travelling between Sussex and London.</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[0.7rem] text-[var(--muted-bright)] opacity-75 tracking-[0.12em] uppercase">
                <span><span className="text-[var(--accent)] opacity-60 mr-1">→</span>English (native)</span>
                <span><span className="text-[var(--accent)] opacity-60 mr-1">→</span>Spanish (fluent)</span>
                <span><span className="text-[var(--accent)] opacity-60 mr-1">→</span>Based in London</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 w-full max-w-[14rem] sm:max-w-[16rem] mx-auto lg:mx-0">
              <div className="portrait-frame relative aspect-[4/5]">
                <Image
                  src="/images/linkedin_edited2.png"
                  alt="Portrait of Samuel Brooks"
                  fill
                  sizes="(min-width: 640px) 16rem, 14rem"
                  className="object-cover"
                />
              </div>
              <p className="font-mono text-[0.58rem] text-[var(--muted)] tracking-[0.12em] mt-2 uppercase text-center lg:text-left">
                <span className="text-[var(--accent)] opacity-50 mr-1">//</span>
                samuel_brooks · london
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Education pane ────────────────────────────────── */}
      <div className="term-pane pane-lg scroll-reveal">
        <PaneBar title="education.log — cat — 96×28" />
        <div className="term-pane-body">
          <Prompt path="~/about" cmd="cat education.log" />

          <div className="space-y-0 font-mono">
            {/* Header row */}
            <div className="flex text-[0.66rem] tracking-[0.14em] uppercase text-[var(--muted-bright)] opacity-55 pb-2 border-b border-[var(--border)] mb-1">
              <span className="hidden lg:block shrink-0 w-[22rem]" />
              <span className="w-10 shrink-0">tag</span>
              <span className="flex-1">institution</span>
              <span className="hidden sm:block pr-2">location</span>
            </div>

            {education.map((e) => (
              <div key={e.title} className="py-4 border-t border-[var(--border)] lg:flex lg:gap-4 lg:items-center">
                {/* Mobile ASCII — 50% of desktop sizing, rendered as a separate
                    <pre> so we don't rely on CSS `zoom` (which Safari clamps). */}
                {e.ascii ? (
                  <div
                    className="block lg:hidden shrink-0 mx-auto mb-3"
                    style={{
                      width: `calc(${e.asciiWidth} * 0.5)`,
                      height: `calc(${e.asciiHeight} * 0.5)`,
                      overflow: "hidden",
                    }}
                  >
                    <pre
                      className="font-mono select-none whitespace-pre"
                      style={{
                        fontSize: e.asciiFontSize,
                        lineHeight: 1.05,
                        width: "max-content",
                        flexShrink: 0,
                        transform: `scale(${e.asciiZoom * 0.5})`,
                        transformOrigin: "top left",
                        margin: 0,
                        background: e.asciiGradient ?? undefined,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      aria-label={`${e.title} logo`}
                    >
                      {e.ascii}
                    </pre>
                  </div>
                ) : null}

                {/* Desktop ASCII — full sizing, alignment column on every row */}
                <div
                  className="hidden lg:block shrink-0"
                  style={{ width: "352px", height: e.asciiHeight, overflow: "hidden" }}
                >
                  {e.ascii ? (
                    <div
                      style={{
                        width: e.asciiWidth,
                        height: e.asciiHeight,
                        overflow: "hidden",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <pre
                        className="font-mono select-none whitespace-pre"
                        style={{
                          fontSize: e.asciiFontSize,
                          lineHeight: 1.05,
                          width: "max-content",
                          flexShrink: 0,
                          transform: `scale(${e.asciiZoom})`,
                          transformOrigin: "top left",
                          margin: 0,
                          background: e.asciiGradient ?? undefined,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                        aria-label={`${e.title} logo`}
                      >
                        {e.ascii}
                      </pre>
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-[0.78rem] font-bold tracking-[0.16em] text-[var(--accent)] opacity-80 w-10 shrink-0">{e.tag}</span>
                    <a href={e.href} target="_blank" rel="noreferrer" className="font-semibold text-lg text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-200">{e.title}</a>
                    {e.meta ? <span className="ml-auto text-[0.78rem] text-[var(--muted-bright)] opacity-65 hidden sm:block shrink-0">{e.meta}</span> : null}
                  </div>
                  <div className="pl-[3.25rem] space-y-2">
                    <p className="text-[0.95rem] text-[var(--accent)] opacity-90">{e.sub}</p>
                    <p className="text-[0.95rem] leading-relaxed text-[var(--muted-bright)]">{e.body}</p>
                    {e.items ? (
                      <p className="text-[0.82rem] text-[var(--muted-bright)] opacity-75 tracking-[0.05em] pt-1 leading-6">
                        {e.items.join("  ·  ")}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Experience pane ───────────────────────────────── */}
      <div className="term-pane pane-md scroll-reveal">
        <PaneBar title="experience.log — cat — 88×22" />
        <div className="term-pane-body">
          <Prompt path="~/about" cmd="cat experience.log" />

          <div className="space-y-0 font-mono">
            <div className="flex text-[0.66rem] tracking-[0.14em] uppercase text-[var(--muted-bright)] opacity-55 pb-2 border-b border-[var(--border)] mb-1">
              <span className="w-10 shrink-0">tag</span>
              <span className="flex-1">organisation</span>
            </div>
            {experience.map((e) => (
              <div key={e.title} className="py-4 border-t border-[var(--border)]">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[0.62rem] font-bold tracking-[0.16em] text-[var(--accent)] opacity-70 w-10 shrink-0">{e.tag}</span>
                  <span className="font-semibold text-sm text-[var(--foreground)]">{e.title}</span>
                  {e.meta ? <span className="ml-auto text-[0.58rem] text-[var(--muted)] hidden sm:block shrink-0">{e.meta}</span> : null}
                </div>
                <div className="pl-[3.25rem] space-y-2">
                  <p className="text-[0.9rem] text-[var(--accent)] opacity-90">{e.sub}</p>
                  {e.body.map((line, i) => (
                    <p key={i} className="text-[0.9rem] leading-relaxed text-[var(--muted-bright)]">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Background + Direction pane ───────────────────── */}
      <div className="term-pane pane-sm scroll-reveal">
        <PaneBar title="env.sh — zsh — 72×20" />
        <div className="term-pane-body">
          <Prompt path="~/about" cmd="printenv && cat direction.txt" />

          <div className="space-y-6 font-mono text-sm leading-relaxed">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-[0.62rem] tracking-[0.18em] uppercase text-[var(--muted-bright)] opacity-60 mb-2">$PATH</p>
                <p className="text-[var(--muted-bright)]">Houston → London. Built across U.S., U.K., and European study and work environments, with bilingual English and Spanish working fluency.</p>
              </div>
              <div>
                <p className="text-[0.62rem] tracking-[0.18em] uppercase text-[var(--muted-bright)] opacity-60 mb-2">$INTERESTS</p>
                <ul className="space-y-1 text-[var(--muted-bright)]">
                  {["Football — Brighton & Hove Albion", "Technology startups and AI/ML systems", "Fitness and travel", "International environments", "Gaming", "Reading", "Custom PC Building"].map(item => (
                    <li key={item}><span className="text-[var(--accent)] opacity-40 mr-1.5">→</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-5">
              <p className="text-[0.62rem] tracking-[0.18em] uppercase text-[var(--muted-bright)] opacity-60 mb-2">direction.txt</p>
              <div className="space-y-2 text-[var(--muted-bright)]">
                <p>Targeting data engineering, analytics engineering, and applied data roles — ideally around AI infrastructure, modern data stacks, and analytics platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

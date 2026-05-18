import fs from "fs";
import path from "path";
import { ContactLink } from "@/components/contact-link";
import { PhoneContactRow } from "@/components/phone-contact-row";
import { contactLinks } from "@/lib/site-data";

function readAscii(filename: string) {
  return fs.readFileSync(path.join(process.cwd(), "src/lib", filename), "utf-8");
}

const asciiMap: Record<string, { art: string; gradient: string; accentColor: string }> = {
  GitHub: {
    art: readAscii("github-ascii.txt"),
    gradient: "linear-gradient(135deg, #8b949e 0%, #ffffff 100%)",
    accentColor: "rgba(200,210,220,0.2)",
  },
  LinkedIn: {
    art: readAscii("linkedin-ascii.txt"),
    gradient: "linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)",
    accentColor: "rgba(0,160,220,0.15)",
  },
  Email: {
    art: readAscii("mail-ascii.txt"),
    gradient: "linear-gradient(135deg, #4d9de0 0%, #8ecbff 100%)",
    accentColor: "rgba(77,157,224,0.15)",
  },
  "UCL Email": {
    art: readAscii("ucl-email-ascii.txt"),
    gradient: "linear-gradient(135deg, #500778 0%, #9b4dca 100%)",
    accentColor: "rgba(155,77,202,0.15)",
  },
  "CV/Resume": {
    art: readAscii("resume-ascii.txt"),
    gradient: "linear-gradient(135deg, #ff9f0a 0%, #ffcc00 100%)",
    accentColor: "rgba(255,159,10,0.15)",
  },
  Phone: {
    art: readAscii("phone-ascii.txt"),
    gradient: "linear-gradient(135deg, #30d158 0%, #4cd964 100%)",
    accentColor: "rgba(48,209,88,0.15)",
  },
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

export default function ContactPage() {
  return (
    <div className="term-pane pane-sm fade-up">
      <PaneBar title="contact.sh — zsh — 120×40" />
      <div className="term-pane-body">
        <p className="term-prompt">
          <span className="term-user">samuel@portfolio</span>
          <span className="term-colon">:</span>
          <span className="term-path">~</span>
          <span className="term-cmd"> % ./contact.sh --list</span>
        </p>

        <div className="font-mono mt-2">
          {contactLinks.filter((l) => !l.label.startsWith("Phone")).map((link, i) => {
            const ascii = asciiMap[link.label];
            return (
              <div
                key={link.label}
                className="group relative border-t border-[var(--border)] transition-all duration-300"
                style={{
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Hover background — platform tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: ascii?.accentColor }}
                />

                {/* Left accent bar on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: ascii?.gradient }}
                />

                <div className="relative lg:flex lg:gap-6 lg:items-center py-5 pl-3">
                  {/* ASCII column — clickable, routes to the same href as the
                      row's main link. Full desktop size on every breakpoint
                      (sub-pixel shrinking is unreliable on iOS). Centered
                      above the content on mobile, beside it on lg+. */}
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={`${link.label} — open ${link.href}`}
                    className="flex shrink-0 overflow-hidden mx-auto lg:mx-0 mb-3 lg:mb-0 transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                    style={{ width: "224px", cursor: "pointer" }}
                  >
                    {ascii ? (
                      <div
                        style={{
                          width: "224px",
                          height: "176px",
                          overflow: "hidden",
                          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                          maskComposite: "intersect",
                          WebkitMaskComposite: "source-in",
                        }}
                      >
                        <pre
                          className="font-mono select-none whitespace-pre"
                          style={{
                            fontSize: "8px",
                            lineHeight: 1.05,
                            width: "max-content",
                            flexShrink: 0,
                            transform: "scale(0.2)",
                            transformOrigin: "top left",
                            margin: 0,
                            background: ascii.gradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                          aria-hidden="true"
                        >
                          {ascii.art}
                        </pre>
                      </div>
                    ) : null}
                  </a>

                  {/* Vertical divider */}
                  <div
                    className="hidden lg:block shrink-0 w-px self-stretch opacity-20 group-hover:opacity-50 transition-opacity duration-300"
                    style={{ background: ascii?.gradient ?? "var(--border)" }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2 lg:pl-2">
                    {/* Platform label */}
                    <span
                      className="text-[0.7rem] tracking-[0.22em] uppercase font-bold"
                      style={{
                        background: ascii?.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {link.label}
                    </span>

                    {/* Main link */}
                    <ContactLink
                      href={link.href}
                      label={link.label}
                      className="text-xl font-semibold"
                      iconClassName="h-5 w-5"
                    />

                    {/* URL */}
                    <p className="text-[0.78rem] text-[var(--muted-bright)] opacity-60 truncate font-mono tracking-tight">
                      {link.href.replace("mailto:", "")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <PhoneContactRow ascii={asciiMap.Phone} />

          {/* Terminal status footer */}
          <div className="border-t border-[var(--border)] pt-4 mt-1 flex items-center justify-between text-[0.72rem] text-[var(--muted-bright)] opacity-55 font-mono">
            <span>6 endpoints listed</span>
            <span className="tracking-[0.1em]">exit 0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

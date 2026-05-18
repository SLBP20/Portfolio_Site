"use client";

import { useState } from "react";

const phoneLines = [
  { country: "US", tel: "+18323358189", display: "+1 (832) 335-8189" },
  { country: "UK", tel: "+447771939292", display: "+44 7771 939292" },
];

type AsciiData = { art: string; gradient: string; accentColor: string };

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V18a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function PhoneContactRow({ ascii }: { ascii: AsciiData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group/phone relative border-t border-[var(--border)] transition-all duration-300">
      {/* Hover background */}
      <div
        className="absolute inset-0 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: ascii.accentColor }}
      />
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300"
        style={{ background: ascii.gradient }}
      />

      <div className="relative lg:flex lg:gap-6 lg:items-center py-5 pl-3">
        {/* ASCII column — clickable, toggles the US/UK number picker (there
            isn't a single dial-target for the phone row). Same sizing as the
            other contact ASCIIs. */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Hide phone numbers" : "Show phone numbers (US and UK)"}
          aria-expanded={expanded}
          className="flex shrink-0 overflow-hidden mx-auto lg:mx-0 mb-3 lg:mb-0 transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          style={{ width: "224px", cursor: "pointer", background: "transparent", border: 0, padding: 0 }}
        >
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
                transform: "scale(0.4)",
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
        </button>

        {/* Vertical divider */}
        <div
          className="hidden lg:block shrink-0 w-px self-stretch opacity-20 group-hover/phone:opacity-50 transition-opacity duration-300"
          style={{ background: ascii.gradient }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2 lg:pl-2">
          {/* Platform label */}
          <span
            className="text-[0.7rem] tracking-[0.22em] uppercase font-bold"
            style={{
              background: ascii.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Phone
          </span>

          {/* Toggle button */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-200 text-xl font-semibold text-left"
          >
            <PhoneIcon className="h-5 w-5 shrink-0 text-[var(--foreground)]" />
            <span className="border-b border-transparent hover:border-[var(--accent)] transition-colors duration-200">
              Phone
            </span>
            <span className="text-[0.65rem] font-mono font-normal opacity-40 ml-1">
              {expanded ? "▲" : "▼"}
            </span>
          </button>

          {/* Display numbers — both lines, country-tagged */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[0.8rem] text-[var(--muted-bright)] opacity-60 font-mono tracking-tight">
            {phoneLines.map((line, idx) => (
              <span key={line.tel} className="inline-flex items-center gap-1.5">
                <span className="text-[0.62rem] tracking-[0.15em] font-bold opacity-80">{line.country}</span>
                <span>{line.display}</span>
                {idx < phoneLines.length - 1 ? <span className="opacity-30">·</span> : null}
              </span>
            ))}
          </div>

          {/* Expanded sub-buttons — one row per number */}
          {expanded && (
            <div className="flex flex-col gap-2 mt-1">
              {phoneLines.map((line) => (
                <div key={line.tel} className="flex items-center gap-3">
                  <span className="text-[0.55rem] tracking-[0.18em] font-bold font-mono opacity-60 w-5 shrink-0">{line.country}</span>
                  <a
                    href={`tel:${line.tel}`}
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-mono tracking-[0.12em] px-3 py-1.5 border border-[var(--border)] hover:border-[#30d158] hover:text-[#30d158] transition-all duration-200"
                  >
                    <PhoneIcon className="h-3.5 w-3.5 shrink-0" />
                    CALL
                  </a>
                  <a
                    href={`sms:${line.tel}`}
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-mono tracking-[0.12em] px-3 py-1.5 border border-[var(--border)] hover:border-[#30d158] hover:text-[#30d158] transition-all duration-200"
                  >
                    <MessageIcon className="h-3.5 w-3.5 shrink-0" />
                    TEXT
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

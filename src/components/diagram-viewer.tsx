"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption: string;
};

export function DiagramViewer({ src, alt, caption }: Props) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [entering, setEntering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const filename = src.split("/").pop();

  // Track when we're on the client so the portal target (document.body) exists.
  useEffect(() => setMounted(true), []);

  const openLightbox = () => {
    setZoom(1);
    setOpen(true);
    requestAnimationFrame(() => setEntering(true));
  };

  const closeLightbox = useCallback(() => {
    setEntering(false);
    setTimeout(() => setOpen(false), 180);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Thumbnail ── */}
      <figure>
        <div
          className="relative border border-[var(--border)] group"
          style={{ cursor: "zoom-in" }}
          onClick={openLightbox}
          role="button"
          aria-label="Expand diagram"
        >
          <div className="overflow-y-auto" style={{ maxHeight: "18rem" }}>
            <Image
              src={src}
              alt={alt}
              width={1800}
              height={900}
              className="w-full h-auto transition-opacity duration-150 group-hover:opacity-75"
            />
          </div>

          {/* Filename + expand hint — sticky to bottom of outer wrapper */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2.5 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-150 border-t border-[var(--border)] bg-[var(--background-panel)]/90 backdrop-blur-sm">
            <span className="font-mono text-[0.52rem] tracking-[0.1em] text-[var(--muted)] truncate">
              {filename}
            </span>
            <span className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-[var(--accent)] shrink-0 ml-3">
              ↗ expand
            </span>
          </div>
        </div>

        <figcaption className="mt-1 font-mono text-[0.52rem] leading-5 text-[var(--muted)]">
          {caption}
        </figcaption>
      </figure>

      {/* ── Lightbox (portaled to <body> so the transformed term-pane
              ancestor doesn't become its containing block) ── */}
      {open && mounted ? createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            transition: "opacity 180ms ease",
            opacity: entering ? 1 : 0,
            cursor: "zoom-out",
          }}
          onClick={closeLightbox}
        >
          <div
            className="flex flex-col border border-[var(--border)] shadow-2xl"
            style={{
              width: "min(96vw, 1440px)",
              maxHeight: "92vh",
              background: "var(--background-panel)",
              transition: "transform 180ms ease, opacity 180ms ease",
              transform: entering ? "scale(1)" : "scale(0.96)",
              opacity: entering ? 1 : 0,
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar — no dots, just text controls */}
            <div className="flex items-center gap-4 px-3 py-2 border-b border-[var(--border)] shrink-0">
              <span className="font-mono text-[0.55rem] tracking-[0.12em] text-[var(--muted)] flex-1 truncate">
                {filename}
              </span>

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                  className="font-mono text-[0.6rem] w-5 h-5 flex items-center justify-center border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="font-mono text-[0.52rem] text-[var(--muted)] w-10 text-center tabular-nums">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                  className="font-mono text-[0.6rem] w-5 h-5 flex items-center justify-center border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  +
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="font-mono text-[0.52rem] tracking-[0.08em] uppercase px-2 h-5 border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors ml-1 cursor-pointer"
                >
                  reset
                </button>
              </div>

              <span className="font-mono text-[0.48rem] tracking-[0.1em] uppercase text-[var(--muted)] opacity-40">
                esc to close
              </span>

              <button
                onClick={closeLightbox}
                className="font-mono text-[0.6rem] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer ml-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Image area */}
            <div
              className="overflow-auto flex-1 flex justify-center items-start"
              style={{ cursor: zoom > 1 ? "grab" : "default" }}
              onMouseDown={(e) => { if (zoom > 1) e.currentTarget.style.cursor = "grabbing"; }}
              onMouseUp={(e) => { if (zoom > 1) e.currentTarget.style.cursor = "grab"; }}
            >
              <Image
                src={src}
                alt={alt}
                width={1800}
                height={900}
                style={{
                  width: zoom === 1 ? "100%" : `${zoom * 100}%`,
                  maxWidth: zoom === 1 ? "100%" : "none",
                  height: "auto",
                  transition: "width 150ms ease",
                }}
              />
            </div>

            {/* Footer */}
            <div className="px-3 py-1.5 border-t border-[var(--border)] shrink-0">
              <p className="font-mono text-[0.5rem] tracking-[0.06em] text-[var(--muted)]">
                {caption}
              </p>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}

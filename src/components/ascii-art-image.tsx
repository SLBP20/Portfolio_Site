"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  cols?: number;
  rows?: number;
  colorStart: string;
  colorEnd: string;
  invert?: boolean;
};

const DENSITY = [" ", ".", ":", "~", "=", "+", "x", "#", "@", "█"] as const;

function toDensity(v: number): string {
  const idx = Math.round(v * (DENSITY.length - 1));
  return DENSITY[Math.max(0, Math.min(DENSITY.length - 1, idx))];
}

/**
 * Estimated char height / width for JetBrains Mono at small render sizes.
 * Corrects for the fact that monospace chars are taller than wide, so a
 * square logo drawn to cols×rows chars would otherwise appear too wide.
 */
const CHAR_ASPECT = 1.75;

export function AsciiArtImage({
  src,
  alt,
  cols = 72,
  rows = 36,
  colorStart,
  colorEnd,
  invert,
}: Props) {
  const [art, setArt] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      const SCALE = 8; // canvas pixels per output character
      const cw = cols * SCALE;
      const ch = rows * SCALE;

      // ── Aspect-ratio-corrected draw rect ───────────────────────────────────
      const srcAspect = img.naturalWidth / img.naturalHeight;
      const targetRatio = srcAspect * CHAR_ASPECT; // desired drawW/drawH

      let drawW: number, drawH: number;
      if (targetRatio <= cw / ch) {
        drawH = ch;
        drawW = ch * targetRatio;
      } else {
        drawW = cw;
        drawH = cw / targetRatio;
      }
      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;

      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      const { data } = ctx.getImageData(0, 0, cw, ch);

      // ── Detect image type ──────────────────────────────────────────────────
      let opaqueN = 0, transN = 0, lumSum = 0;
      for (let i = 0; i < cw * ch * 4; i += 4 * 8) {
        const a = data[i + 3];
        if (a > 30) { opaqueN++; lumSum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]; }
        else transN++;
      }
      const total = opaqueN + transN;
      // Light/white mark on transparent bg (both Steam and PL logos)
      const lightOnTransparent = transN > total * 0.05 && opaqueN > 0 && lumSum / opaqueN > 170;

      // ── Phase 1: compute per-cell coverage (0 = empty, 1 = filled) ─────────
      const coverage = new Float32Array(rows * cols);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let sum = 0;
          for (let dy = 0; dy < SCALE; dy++) {
            for (let dx = 0; dx < SCALE; dx++) {
              const i = ((r * SCALE + dy) * cw + (c * SCALE + dx)) * 4;
              const a = data[i + 3];
              const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

              let d: number;
              if (invert)                { d = (a / 255) * (lum / 255); }
              else if (lightOnTransparent) { d = a / 255; }          // white mark → filled
              else                        { d = a < 30 ? 0 : 1 - lum / 255; } // dark mark → filled
              sum += d;
            }
          }
          coverage[r * cols + c] = sum / (SCALE * SCALE);
        }
      }

      // ── Phase 2: dome shading ──────────────────────────────────────────────
      // For each "inside" cell find its Manhattan distance to the nearest
      // "outside" cell.  Map 0 (on edge) → sparse, deep inside → dense.
      // This turns flat solid blobs into gradient-shaded shapes.
      const INSIDE_THRESH = 0.25;
      const MAX_R = 12; // search radius (chars)

      const lines: string[] = [];

      for (let r = 0; r < rows; r++) {
        let line = "";
        for (let c = 0; c < cols; c++) {
          const cov = coverage[r * cols + c];

          if (cov <= INSIDE_THRESH) {
            // Outside — render anti-aliased edge using raw coverage
            line += toDensity(Math.min((cov / INSIDE_THRESH) * 0.6, 1));
          } else {
            // Inside — find Manhattan distance to nearest outside cell
            let minDist = MAX_R + 1;
            search: for (let dr = -MAX_R; dr <= MAX_R; dr++) {
              for (let dc = -MAX_R; dc <= MAX_R; dc++) {
                const nr = r + dr, nc = c + dc;
                const isOutside =
                  nr < 0 || nr >= rows || nc < 0 || nc >= cols ||
                  coverage[nr * cols + nc] <= INSIDE_THRESH;
                if (isOutside) {
                  const d = Math.abs(dr) + Math.abs(dc);
                  if (d < minDist) {
                    minDist = d;
                    if (minDist <= 1) break search;
                  }
                }
              }
            }

            // depth: 0 = right on edge, 1 = deep interior
            const depth = Math.min(minDist / (MAX_R * 0.45), 1);
            line += toDensity(depth);
          }
        }
        lines.push(line);
      }

      setArt(lines.join("\n"));
    };

    img.onerror = () => setArt("");
    img.src = src;
  }, [src, cols, rows, invert]);

  if (art === null) return <div style={{ height: `${rows * 0.38}rem` }} />;
  if (art === "") return null;

  return (
    <pre
      className="font-mono overflow-hidden select-none mb-5 whitespace-pre"
      style={{
        fontSize: "0.28rem",
        lineHeight: 1.1,
        background: `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      aria-label={alt}
    >
      {art}
    </pre>
  );
}

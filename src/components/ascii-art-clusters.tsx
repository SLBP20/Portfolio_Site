/**
 * Static ASCII art representing customer segmentation clusters —
 * three distinct groups scattered across a 2-D space.
 */
const CLUSTER_ART = [
  "  ●  ●●   ●        ▲  ▲▲             ",
  " ●●●  ●  ●●       ▲ ▲ ▲▲  ▲          ",
  "  ●  ●●   ●      ▲▲  ▲  ▲▲           ",
  "   ●●  ●          ▲  ▲▲  ▲           ",
  "    ●  ●●                             ",
  "                       ■  ■■  ■       ",
  "                      ■■■ ■  ■■       ",
  "                       ■  ■■■  ■      ",
  "                      ■■  ■  ■■       ",
].join("\n");

type Props = { colorStart: string; colorEnd: string };

export function AsciiArtClusters({ colorStart, colorEnd }: Props) {
  return (
    <div className="mb-5">
      <p
        className="font-mono mb-1 select-none"
        style={{
          fontSize: "0.52rem",
          color: "var(--muted)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        segmentation output — 3 clusters
      </p>
      <pre
        className="font-mono overflow-hidden select-none whitespace-pre"
        style={{
          fontSize: "0.52rem",
          lineHeight: 1.25,
          background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-label="Segmentation cluster visualization"
      >
        {CLUSTER_ART}
      </pre>
    </div>
  );
}

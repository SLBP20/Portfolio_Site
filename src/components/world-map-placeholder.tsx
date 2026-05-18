const crisisMarkers = [
  { cx: 48,  cy: 38, label: "Ukraine" },
  { cx: 53,  cy: 44, label: "Middle East" },
  { cx: 43,  cy: 52, label: "Sahel" },
  { cx: 72,  cy: 36, label: "South China Sea" },
  { cx: 62,  cy: 48, label: "Kashmir" },
  { cx: 20,  cy: 40, label: "Venezuela" },
];

export function WorldMapPlaceholder() {
  return (
    <div className="space-y-2">
      <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[var(--muted)]">
        live map
        <span className="inline-block ml-2 w-8 h-px align-middle bg-[var(--border)]" />
      </p>

      <div
        className="relative border border-[var(--border)] overflow-hidden"
        style={{ background: "rgba(10,18,28,0.85)" }}
      >
        <svg
          viewBox="0 0 1000 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-label="World map placeholder"
        >
          {/* ── Grid ── */}
          {[100, 200, 300, 400].map(y => (
            <line key={y} x1="0" y1={y} x2="1000" y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {[166, 333, 500, 666, 833].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="500"
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          {/* Equator */}
          <line x1="0" y1="250" x2="1000" y2="250"
            stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 5" />

          {/* ── Land masses ── */}
          <g fill="rgba(232,168,56,0.18)" stroke="rgba(232,168,56,0.45)" strokeWidth="1.2" strokeLinejoin="round">

            {/* Greenland */}
            <path d="M 340,45 L 390,38 L 420,52 L 415,82 L 390,95 L 355,90 L 330,72 Z" />

            {/* North America */}
            <path d="
              M 75,100 L 105,78 L 155,68 L 215,65 L 265,72 L 300,88
              L 310,108 L 300,135 L 278,158 L 268,188 L 252,220
              L 232,248 L 205,262 L 178,256 L 155,238 L 135,212
              L 112,192 L 90,170 L 70,148 L 62,125 Z
            " />

            {/* Central America (thin strip) */}
            <path d="M 205,262 L 232,248 L 240,268 L 228,285 L 212,280 Z" />

            {/* South America */}
            <path d="
              M 200,295 L 242,282 L 278,292 L 298,318 L 305,358
              L 298,400 L 272,435 L 238,445 L 205,428
              L 182,398 L 175,358 L 180,320 Z
            " />

            {/* Iceland */}
            <path d="M 388,88 L 408,84 L 418,96 L 408,108 L 390,108 L 380,98 Z" />

            {/* UK & Ireland */}
            <path d="M 420,105 L 435,100 L 442,115 L 430,128 L 415,122 Z" />
            <path d="M 408,112 L 418,108 L 420,122 L 410,124 Z" />

            {/* Europe */}
            <path d="
              M 435,105 L 490,95 L 535,100 L 565,118 L 568,145
              L 552,165 L 525,172 L 495,168 L 468,178
              L 450,168 L 438,148 L 432,128 Z
            " />

            {/* Scandinavia */}
            <path d="M 470,75 L 498,68 L 518,80 L 510,105 L 490,108 L 468,100 Z" />

            {/* Africa */}
            <path d="
              M 448,188 L 510,182 L 555,195 L 575,225 L 578,268
              L 565,318 L 545,362 L 510,388 L 478,392
              L 445,372 L 422,338 L 415,295 L 418,248
              L 430,215 Z
            " />

            {/* Madagascar */}
            <path d="M 578,320 L 592,310 L 600,338 L 590,362 L 575,355 Z" />

            {/* Middle East / Arabian Peninsula */}
            <path d="
              M 555,178 L 600,172 L 638,185 L 648,210
              L 625,235 L 598,240 L 572,225 L 562,205 Z
            " />

            {/* Asia (main landmass) */}
            <path d="
              M 552,98 L 640,80 L 720,72 L 808,78 L 870,95
              L 900,120 L 895,155 L 865,178 L 828,195
              L 788,205 L 755,215 L 720,218 L 688,228
              L 658,222 L 630,232 L 602,225
              L 575,215 L 558,195 L 548,165 L 542,135 Z
            " />

            {/* India */}
            <path d="
              M 630,232 L 658,222 L 672,240 L 668,278
              L 648,302 L 625,295 L 612,270 L 618,248 Z
            " />

            {/* Southeast Asia */}
            <path d="
              M 720,218 L 758,215 L 785,228 L 800,248
              L 785,265 L 755,268 L 730,255 L 715,238 Z
            " />

            {/* Japan */}
            <path d="M 838,120 L 858,112 L 872,128 L 862,148 L 840,148 L 828,135 Z" />

            {/* Indonesia / maritime SE Asia (simplified) */}
            <path d="M 755,285 L 800,275 L 835,285 L 848,302 L 825,315 L 790,310 L 758,300 Z" />
            <path d="M 845,298 L 878,292 L 892,308 L 878,320 L 852,318 Z" />

            {/* Australia */}
            <path d="
              M 735,330 L 812,318 L 870,328 L 905,355
              L 910,395 L 885,430 L 840,440
              L 790,432 L 755,408 L 732,378 L 725,348 Z
            " />

            {/* New Zealand (tiny) */}
            <path d="M 920,408 L 932,398 L 940,415 L 928,428 L 915,420 Z" />
          </g>

          {/* ── Crisis markers ── */}
          {crisisMarkers.map((m) => {
            const cx = m.cx * 10;
            const cy = m.cy * 10;
            return (
              <g key={m.label}>
                <circle cx={cx} cy={cy} r={14} fill="none"
                  stroke="rgba(232,168,56,0.2)" strokeWidth="1" />
                <circle cx={cx} cy={cy} r={5}
                  fill="rgba(232,168,56,0.85)" />
              </g>
            );
          })}

          {/* ── Corner labels ── */}
          <text x="6" y="14" fill="rgba(255,255,255,0.2)"
            fontFamily="monospace" fontSize="12">90°N</text>
          <text x="6" y="494" fill="rgba(255,255,255,0.2)"
            fontFamily="monospace" fontSize="12">90°S</text>
          <text x="944" y="14" fill="rgba(255,255,255,0.2)"
            fontFamily="monospace" fontSize="12">180°E</text>
        </svg>

        {/* Status bar */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-2.5 py-1.5"
          style={{ background: "rgba(0,0,0,0.45)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[0.52rem] tracking-[0.18em] uppercase text-[var(--accent)] opacity-60 font-mono">
            Leaflet.js · GeoJSON
          </span>
          <span className="text-[0.52rem] text-[var(--muted)] opacity-40 font-mono tracking-wider">
            live layer pending
          </span>
        </div>
      </div>
    </div>
  );
}

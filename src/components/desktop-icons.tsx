"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

// Decorative background layer — mimics a busy macOS desktop
// Icons are fixed-position, behind all content (z-index: 0).
// Fades out when the footer scrolls into view so they don't bleed into it.

const GameIcon = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ width: 52, height: 52, borderRadius: 11, overflow: "hidden", flexShrink: 0 }}>
    <Image src={src} alt={alt} width={52} height={52} style={{ width: 52, height: 52, objectFit: "cover" }} />
  </div>
);

const FolderIcon = ({ color = "#7a8fa6" }: { color?: string }) => (
  <svg viewBox="0 0 56 44" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="42">
    <path
      d="M2 10C2 7.79 3.79 6 6 6h13.5l4 5H50c2.21 0 4 1.79 4 4v23c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V10z"
      fill={color}
      fillOpacity={0.9}
    />
    <path
      d="M2 10C2 7.79 3.79 6 6 6h13.5l4 5H50c2.21 0 4 1.79 4 4v23c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V10z"
      fill="url(#folderSheen)"
    />
    <defs>
      <linearGradient id="folderSheen" x1="28" y1="6" x2="28" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity={0.18} />
        <stop offset="100%" stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="46">
    <path
      d="M4 2h26l10 10v40H4V2z"
      fill="#e8e8ea"
      fillOpacity={0.85}
    />
    <path d="M30 2l10 10H30V2z" fill="#c8c8cc" fillOpacity={0.9} />
    <line x1="10" y1="22" x2="34" y2="22" stroke="#aaa" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="10" y1="29" x2="34" y2="29" stroke="#aaa" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="10" y1="36" x2="24" y2="36" stroke="#aaa" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

type DesktopItem = {
  label: string;
  type: "folder" | "file" | "game";
  gameIcon?: ReactNode;
  color?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: number;
};

const items: DesktopItem[] = [
  // ── Left edge column (0–3%) ────────────────────────────────────────────────
  { label: "raw_data",                  type: "folder", color: "#6b8fa8", top: "2%",   left: "1.2%" },
  { label: "screenshot 2026-04-12.png", type: "file",                     top: "8%",   left: "0.6%", rotate: -2 },
  { label: "config.json",               type: "file",                     top: "13%",  left: "2.4%" },
  { label: "ETL_graveyard",             type: "folder", color: "#7a4a4a", top: "18%",  left: "2.8%" },
  { label: "draft_final_FINAL",         type: "folder", color: "#8a8a4a", top: "24%",  left: "1.0%", rotate: 1 },
  { label: "interview_prep.md",         type: "file",                     top: "29%",  left: "2.8%" },
  { label: "pipeline_v3_FINAL_v2",      type: "folder", color: "#5a72a8", top: "34%",  left: "0.5%" },
  { label: "kafka_logs.log",            type: "file",                     top: "39%",  left: "2.2%" },
  { label: "DO_NOT_DELETE",             type: "folder", color: "#a84a4a", top: "44%",  left: "3.1%" },
  { label: "regression_results.csv",    type: "file",                     top: "49%",  left: "0.8%", rotate: -1 },
  { label: "cursed_csv.csv",            type: "file",                     top: "54%",  left: "1.6%" },
  { label: "untitled_folder",           type: "folder", color: "#5a5a6a", top: "59%",  left: "2.7%" },
  { label: "technical_debt",            type: "folder", color: "#7a6a3a", top: "64%",  left: "0.3%" },
  { label: "tuning_notes.md",           type: "file",                     top: "69%",  left: "2.4%" },
  { label: "ideas_probably_bad",        type: "folder", color: "#7a8096", top: "74%",  left: "2.5%" },
  { label: "old_school",                type: "folder", color: "#6a7a8a", top: "79%",  left: "0.8%" },
  { label: "misc",                      type: "folder", color: "#5a5a6a", top: "83%",  left: "2.0%" },
  { label: "things_to_install.txt",     type: "file",                     top: "88%",  left: "0.6%", rotate: 2 },
  { label: "backup_2024.zip",           type: "file",                     top: "93%",  left: "2.4%" },

  // ── Left far column (8–12%) ────────────────────────────────────────────────
  { label: "Finances",                  type: "folder", color: "#5a6a4a", top: "3%",   left: "11.8%" },
  { label: "docker-compose.yml",        type: "file",                     top: "8%",   left: "10.0%" },
  { label: "spark_debugging",           type: "folder", color: "#4a6a9a", top: "13%",  left: "10.5%" },
  { label: "midterm_garbage",           type: "folder", color: "#7a5a4a", top: "18%",  left: "8.6%" },
  { label: "python_stuff",              type: "folder", color: "#4a7a5a", top: "23%",  left: "11.2%" },
  { label: "deployment.yml",            type: "file",                     top: "29%",  left: "9.6%" },
  { label: "model_v12_FINAL_final",     type: "folder", color: "#6b5aa8", top: "34%",  left: "8.2%"  },
  { label: "Screen Shot.png",           type: "file",                     top: "39%",  left: "11.4%", rotate: -2 },
  { label: "claude_stuff",              type: "folder", color: "#d97706", top: "44%",  left: "9.6%"  },
  { label: "metrics_dashboard.bi",      type: "file",                     top: "50%",  left: "11.0%", rotate: -2 },
  { label: "stackoverflow.txt",         type: "file",                     top: "55%",  left: "11.0%" },
  { label: "thesis_notes",              type: "folder", color: "#4a4a9a", top: "59%",  left: "8.4%" },
  { label: "stats_homework.pdf",        type: "file",                     top: "63%",  left: "8.8%" },
  { label: "assessment_final",          type: "folder", color: "#7a8096", top: "68%",  left: "10.8%" },
  { label: "cheatsheet.md",             type: "file",                     top: "73%",  left: "9.4%" },
  { label: "node_modules",              type: "folder", color: "#3a5a3a", top: "78%",  left: "9.3%"  },
  { label: "tableau_export.twbx",       type: "file",                     top: "83%",  left: "11.0%", rotate: 2 },
  { label: "draft_v2",                  type: "folder", color: "#7a4a6a", top: "88%",  left: "9.2%", rotate: 1 },
  { label: "spark_history",             type: "folder", color: "#3a6a8a", top: "93%",  left: "11.0%" },

  // ── Right edge column (0–3%) ───────────────────────────────────────────────
  { label: "definitely_not_prod",       type: "folder", color: "#a86a2a", top: "3%",   right: "2.4%" },
  { label: "Screenshot.png",            type: "file",                     top: "9%",   right: "1.0%", rotate: 3 },
  { label: "config_backup",             type: "folder", color: "#5a5a6a", top: "14%",  right: "2.5%" },
  { label: "airflow_dag_chaos",         type: "folder", color: "#4a7a9a", top: "19%",  right: "0.6%" },
  { label: "backup_oct.zip",            type: "file",                     top: "25%",  right: "2.6%" },
  { label: "old_models",                type: "folder", color: "#6a6a4a", top: "30%",  right: "1.8%" },
  { label: "schema_design_v8",          type: "folder", color: "#5a72a8", top: "35%",  right: "3.0%" },
  { label: "deploy.sh",                 type: "file",                     top: "40%",  right: "1.4%", rotate: -1 },
  { label: "secret_sauce.py",           type: "file",                     top: "45%",  right: "1.2%" },
  { label: "todo_v74.md",               type: "file",                     top: "50%",  right: "2.7%", rotate: 2 },
  { label: "BigQuery_costs.txt",        type: "file",                     top: "55%",  right: "2.8%" },
  { label: "data_dump.parquet",         type: "file",                     top: "60%",  right: "0.9%" },
  { label: "legacy_code",               type: "folder", color: "#8a4a2a", top: "65%",  right: "0.4%" },
  { label: "scratch.ipynb",             type: "file",                     top: "70%",  right: "2.2%", rotate: 1 },
  { label: "README_i_promise.md",       type: "file",                     top: "75%",  right: "2.1%" },
  { label: "feature_engineering",       type: "folder", color: "#4a7a6a", top: "80%",  right: "1.5%" },
  { label: "dotfiles",                  type: "folder", color: "#6a6a6a", top: "85%",  right: "2.9%" },
  { label: "trash_pile",                type: "folder", color: "#5a4a4a", top: "90%",  right: "1.0%" },
  { label: "vim_config.lua",            type: "file",                     top: "94%",  right: "2.6%" },

  // ── Right far column (8–12%) ───────────────────────────────────────────────
  { label: "Certifications",            type: "folder", color: "#5a72a8", top: "3%",   right: "10.2%" },
  { label: "openai_costs.csv",          type: "file",                     top: "8%",   right: "9.0%", rotate: -2 },
  { label: "not_overfitting.ipynb",     type: "file",                     top: "13%",  right: "10.8%" },
  { label: "thesis_chapter4.docx",      type: "file",                     top: "18%",  right: "8.6%" },
  { label: "GDP_data.xlsx",             type: "file",                     top: "23%",  right: "9.4%" },
  { label: "spotify_wrap.png",          type: "file",                     top: "28%",  right: "11.2%", rotate: 2 },
  { label: "tableau_dashboards",        type: "folder", color: "#3a5a7a", top: "33%",  right: "8.8%" },
  { label: "data_engineering",          type: "folder", color: "#3a6a9a", top: "38%",  right: "10.0%" },
  { label: "regression_v3",             type: "folder", color: "#4a6a8a", top: "43%",  right: "11.4%" },
  { label: "UCL_thesis_draft_v1",       type: "folder", color: "#4a4a9a", top: "48%",  right: "9.1%"  },
  { label: "old_resume.pdf",            type: "file",                     top: "53%",  right: "11.0%" },
  { label: "stations.csv",              type: "file",                     top: "58%",  right: "9.8%"  },
  { label: "lecture_slides.pdf",        type: "file",                     top: "63%",  right: "8.6%" },
  { label: "prod_but_local",            type: "folder", color: "#6a4a8a", top: "68%",  right: "11.2%" },
  { label: "claude",                    type: "folder", color: "#b45309", top: "73%",  right: "10.4%" },
  { label: "coffee_records.csv",        type: "file",                     top: "78%",  right: "8.8%"  },
  { label: "interview_notes",           type: "folder", color: "#4a6a7a", top: "83%",  right: "11.0%" },
  { label: "McDermott",                 type: "folder", color: "#6b8fa8", top: "88%",  right: "9.5%"  },
  { label: "presentation_v9.key",       type: "file",                     top: "93%",  right: "10.8%", rotate: -1 },

  // ── Games — app icons (clustered near edges, mixed sizes) ─────────────────
  { label: "Baldur's Gate 3",  type: "game", gameIcon: <GameIcon src="/images/games/bg3.webp"      alt="Baldur's Gate 3" />, top: "17%",  right: "2.2%" },
  { label: "Minecraft",        type: "game", gameIcon: <GameIcon src="/images/games/minecraft.png" alt="Minecraft" />,        top: "57%",  left: "2.4%" },
  { label: "Age_of_Empires II",type: "game", gameIcon: <GameIcon src="/images/games/aoe2.png"      alt="Age of Empires II" />,top: "73%",  right: "2.6%" },
  { label: "EA FC 25",         type: "game", gameIcon: <GameIcon src="/images/games/eafc25.png"    alt="EA FC 25" />,         top: "67%",  left: "0.6%" },
];

export function DesktopIcons() {
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      // Trigger a little BEFORE the footer hits the viewport so the fade
      // is already underway by the time the user can see it.
      { rootMargin: "120px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: footerInView ? 0 : 1,
        transition: "opacity 0.45s ease-out",
      }}
      className="hidden xl:block"
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          style={{
            position: "absolute",
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            width: "72px",
            opacity: 0.32 + (i % 4) * 0.07,
            transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
          }}
        >
          {item.type === "folder" ? <FolderIcon color={item.color} />
            : item.type === "game" ? item.gameIcon
            : <FileIcon />
          }
          <span style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            lineHeight: 1.3,
            wordBreak: "break-all",
            textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.6)",
            maxWidth: "72px",
          }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

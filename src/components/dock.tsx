"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const dockItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 10h16M4 14h8M4 18h6" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
];

const dockExternal = [
  {
    href: "https://github.com/slbrooks20",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/samuel-lawrence-brooks/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Dock() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScale = (index: number, total: number) => {
    if (hoveredIndex === null) return 1;
    const dist = Math.abs(index - hoveredIndex);
    if (dist === 0) return 1.55;
    if (dist === 1) return 1.25;
    if (dist === 2) return 1.1;
    return 1;
  };

  return (
    <div className="dock-wrapper">
      <div className="dock">
        {/* Main nav items */}
        {dockItems.map((item, i) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
          const scale = getScale(i, dockItems.length);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="dock-item"
              style={{ transform: `scale(${scale}) translateY(${scale > 1 ? -6 * (scale - 1) : 0}px)` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={item.label}
            >
              <div className={`dock-icon ${isActive ? "dock-icon--active" : ""}`}>
                {item.icon}
              </div>
              <span className="dock-label">{item.label}</span>
              {isActive && <span className="dock-dot" aria-hidden="true" />}
            </Link>
          );
        })}

        {/* Separator */}
        <div className="dock-sep" aria-hidden="true" />

        {/* External links */}
        {dockExternal.map((item, i) => {
          const idx = dockItems.length + 1 + i;
          const scale = getScale(idx, dockItems.length + dockExternal.length + 1);

          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="dock-item"
              style={{ transform: `scale(${scale}) translateY(${scale > 1 ? -6 * (scale - 1) : 0}px)` }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={item.label}
            >
              <div className="dock-icon">
                {item.icon}
              </div>
              <span className="dock-label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

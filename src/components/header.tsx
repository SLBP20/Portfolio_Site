"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const rotatingPhrases = [
  "builds data pipelines",
  "based in London",
  "bilingual: English & Spanish",
  "Brighton & Hove Albion fan",
  "works with AI systems",
  "likes lifting and travelling",
  "analytics engineering",
  "avid reader and gamer",
  "BBA MIS, cum laude",
  "MSc Business Analytics",
];

export function Header() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: number | undefined;
    const interval = window.setInterval(() => {
      setIsVisible(false);
      timeoutId = window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % rotatingPhrases.length);
        setIsVisible(true);
      }, 280);
    }, 2800);
    return () => {
      window.clearInterval(interval);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="titlebar">
      {/* Apple logo */}
      <span className="titlebar-apple" aria-hidden="true"></span>

      {/* App name + rotating phrase — takes all remaining space */}
      <div className="flex items-center min-w-0 flex-1">
        <Link href="/" className="titlebar-appname shrink-0" aria-label="Go to home">
          samuel.brooks
        </Link>
        <span className="titlebar-phrase min-w-0 truncate">
          &nbsp;— <span
            aria-live="polite"
            style={{ opacity: isVisible ? 1 : 0, transition: "opacity 280ms ease" }}
          >
            {rotatingPhrases[activeIndex]}
          </span>
        </span>
      </div>

      {/* Nav items — anchored to the right, never shifts */}
      <nav aria-label="Primary" className="shrink-0">
        <ul className="flex items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`titlebar-menuitem ${isActive ? "titlebar-menuitem--active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

    </div>
  );
}

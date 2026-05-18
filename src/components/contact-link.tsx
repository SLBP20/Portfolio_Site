type ContactLinkProps = {
  href: string;
  label: string;
  className?: string;
  iconClassName?: string;
};

function ContactIcon({ label, className }: { label: string; className?: string }) {
  const baseClass = `h-3.5 w-3.5 shrink-0 text-[var(--foreground)] ${className ?? ""}`;

  if (label === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={baseClass}>
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.1.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42a3.18 3.18 0 0 0-1.34-1.75c-1.1-.76.08-.74.08-.74a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.63 4.63 0 0 1 1.23-3.22 4.3 4.3 0 0 1 .12-3.18s1-.32 3.3 1.23a11.35 11.35 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 0 1 .12 3.18 4.62 4.62 0 0 1 1.23 3.22c0 4.61-2.8 5.62-5.48 5.92a2.87 2.87 0 0 1 .82 2.22v3.29c0 .32.21.69.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={baseClass}>
        <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9.75h3.96V21H3V9.75Zm7.02 0H13.8v1.54h.06c.53-1 1.83-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-3.96v-4.97c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.64V21h-3.96V9.75Z" />
      </svg>
    );
  }

  if (label === "UCL Email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={baseClass}>
        <path d="M4.5 6.75h15v10.5h-15z" />
        <path d="m6 8.25 6 4.5 6-4.5" />
        <path d="M8.25 4.5h7.5" />
      </svg>
    );
  }

  if (label.includes("Email")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={baseClass}>
        <path d="M3 6.75h18v10.5H3z" />
        <path d="m4.5 8.25 7.5 6 7.5-6" />
      </svg>
    );
  }

  if (label.startsWith("Phone")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={baseClass}>
        <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V18a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1L6.6 10.8Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={baseClass}>
      <path d="M7.5 3.75h6l3 3v13.5h-9A2.25 2.25 0 0 1 5.25 18V6A2.25 2.25 0 0 1 7.5 3.75Z" />
      <path d="M13.5 3.75V7.5h3" />
      <path d="M8.25 11.25h5.25" />
      <path d="M8.25 14.25h5.25" />
    </svg>
  );
}

export function ContactLink({ href, label, className, iconClassName }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition-all duration-200 ${className ?? ""}`}
    >
      <ContactIcon label={label} className={iconClassName} />
      <span className="border-b border-transparent group-hover:border-[var(--accent)] transition-colors duration-200">{label}</span>
    </a>
  );
}

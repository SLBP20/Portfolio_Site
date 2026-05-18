import { ContactLink } from "@/components/contact-link";
import { contactLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-6">
      <div className="content-grid py-7 px-4 sm:px-6 lg:px-0 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        {/* Brand block */}
        <div className="space-y-1.5 shrink-0">
          <p className="font-mono text-sm text-[var(--foreground)] tracking-[0.04em] font-semibold">
            Samuel Brooks
          </p>
          <p className="text-[0.7rem] text-[var(--muted-bright)] opacity-70 tracking-[0.14em] uppercase">
            Data Engineer · London
          </p>
        </div>

        {/* Contact section */}
        <div className="sm:text-right">
          <p className="font-mono text-[0.65rem] text-[var(--muted-bright)] opacity-60 tracking-[0.22em] uppercase mb-3">
            <span className="text-[var(--accent)] opacity-60 mr-1.5">//</span>
            contact
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:flex sm:flex-wrap sm:justify-end sm:gap-x-5 sm:gap-y-1.5 text-[0.8rem] text-[var(--muted-bright)]">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <ContactLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

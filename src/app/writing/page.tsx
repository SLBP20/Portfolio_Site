import { SectionHeading } from "@/components/section-heading";
import { notes } from "@/lib/site-data";

export default function WritingPage() {
  return (
    <div className="content-grid py-16 sm:py-24">
      <SectionHeading
        eyebrow="Writing"
        title="Short notes from building and debugging data work."
        description="This section stays intentionally lightweight: brief writing that supports the portfolio's engineering-first tone."
      />
      <div className="mt-10 grid gap-8">
        {notes.map((note) => (
          <article key={note.slug} className="reading-column border-t border-[var(--border)] pt-5">
            <h2 className="font-[var(--font-heading)] text-3xl">{note.title}</h2>
            <p className="mt-3 text-lg leading-8 text-[var(--muted)]">{note.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

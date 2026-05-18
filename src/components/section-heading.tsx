type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="reading-column space-y-3">
      <p className="eyebrow">{eyebrow}</p>
      <div className="space-y-2">
        <h2 className="font-bold text-3xl leading-tight text-[var(--foreground)] sm:text-4xl tracking-tight">
          {title}
        </h2>
        {description ? <p className="max-w-2xl text-base leading-7 text-[var(--muted-bright)]">{description}</p> : null}
      </div>
    </div>
  );
}

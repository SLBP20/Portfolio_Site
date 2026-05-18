export default function PipelineNotebookPage() {
  return (
    <>
    <div className="fixed inset-0 z-[1] bg-[var(--background)]" aria-hidden="true" />
    <div className="relative z-[2] content-grid py-10 sm:py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <p className="eyebrow">Notebook</p>
          <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl">Indie Game Pipeline Notebook</h1>
        </div>
        <a
          href="/notebooks/pipeline_notebook.html"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          Open standalone view
        </a>
      </div>
      <div className="overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
        <iframe
          src="/notebooks/pipeline_notebook.html"
          title="Indie Game Pipeline Notebook"
          className="h-[80vh] w-full bg-transparent"
        />
      </div>
    </div>
    </>
  );
}

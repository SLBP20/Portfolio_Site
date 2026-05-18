import Image from "next/image";

const figures = [
  {
    src: "/images/projects/premier-league/feature_pipeline.png",
    alt: "Feature pipeline diagram",
    title: "Feature pipeline",
    caption:
      "The project combines bookmaker odds, Elo ratings, expected goals, transfer spending, and manager tenure into model-ready seasonal features.",
  },
  {
    src: "/images/projects/premier-league/metrics_comparison.png",
    alt: "Metrics comparison",
    title: "Model comparison",
    caption:
      "The strongest comparison is against bookmakers, not against a weak baseline. This figure summarises the walk-forward performance across model variants.",
  },
  {
    src: "/images/projects/premier-league/calibration.png",
    alt: "Calibration plot",
    title: "Calibration",
    caption:
      "Calibration matters in a probability project. The pipeline includes post-processing and blending so that probability quality is part of the evaluation, not an afterthought.",
  },
  {
    src: "/images/projects/premier-league/feature_importance.png",
    alt: "Feature importance chart",
    title: "Feature importance",
    caption:
      "The feature layer is one of the strongest parts of the project: Elo, form, odds-derived probabilities, and recency-aware signals drive the modelling work.",
  },
  {
    src: "/images/projects/premier-league/predicted_2025_26.png",
    alt: "Predicted 2025-26 league table",
    title: "Season forecast",
    caption:
      "The project extends beyond single-match prediction into full-season simulation using a Dixon-Coles approach and Monte Carlo forecasts.",
  },
  {
    src: "/images/projects/premier-league/walk_forward_schematic.png",
    alt: "Walk-forward schematic",
    title: "Walk-forward structure",
    caption:
      "This is a good example of disciplined evaluation design: season-by-season expanding-window validation instead of random splits that would leak temporal information.",
  },
];

const highlights = [
  "15 seasons of Premier League data covering roughly 5,700 matches",
  "Best single model: Neural Network with 19 features at 0.9678 log-loss",
  "Bet365 benchmark: 0.9686 log-loss",
  "Pinnacle benchmark: 0.9682 log-loss",
  "Best blend: Neural Network 10% plus Pinnacle 90%, beating Bet365 with p=0.007",
  "Position prediction: 6.7 of 20 exact positions via multi-target Ridge blend",
];

export default function PremierLeagueDeepDivePage() {
  return (
    <div className="content-grid py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,var(--reading-width))_minmax(16rem,20rem)] lg:items-start">
        <article className="space-y-10">
          <header className="space-y-5 border-b border-[var(--border)] pb-10">
            <p className="eyebrow">Deep Dive</p>
            <div className="space-y-4">
              <h1 className="max-w-4xl font-[var(--font-heading)] text-4xl leading-tight sm:text-6xl">
                Premier League Predictive Analytics
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
                A deeper look at the modelling workflow, evaluation discipline, and outputs behind the Premier League project. This page is built directly from the actual project repository rather than from a polished summary alone.
              </p>
            </div>
          </header>

          <section className="space-y-4 border-b border-[var(--border)] pb-8">
            <h2 className="font-[var(--font-heading)] text-2xl">What the project is doing</h2>
            <p className="text-lg leading-8 text-[var(--muted)]">
              The project predicts three-way Premier League match outcomes across 15 seasons, benchmarks those probabilities against bookmaker markets, then extends the workflow into league table simulation. It combines feature engineering, walk-forward validation, calibration, and probability blending rather than stopping at a raw classification score.
            </p>
          </section>

          <section className="space-y-4 border-b border-[var(--border)] pb-8">
            <h2 className="font-[var(--font-heading)] text-2xl">Why it matters</h2>
            <p className="text-lg leading-8 text-[var(--muted)]">
              The interesting part is not just building a predictive model. It is building an evaluation pipeline that respects time, compares against realistic baselines, and shows where the model actually adds value beyond bookmaker odds.
            </p>
          </section>

          <section className="space-y-6">
            {figures.map((figure) => (
              <figure key={figure.src} className="space-y-4 border-b border-[var(--border)] pb-8 last:border-b-0">
                <div className="overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.02)]">
                  <Image
                    src={figure.src}
                    alt={figure.alt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="font-[var(--font-heading)] text-2xl">{figure.title}</h2>
                  <p className="text-lg leading-8 text-[var(--muted)]">{figure.caption}</p>
                </div>
              </figure>
            ))}
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <p className="eyebrow">Highlights</p>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            {highlights.map((item) => (
              <li key={item} className="border-t border-[var(--border)] pt-3">
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

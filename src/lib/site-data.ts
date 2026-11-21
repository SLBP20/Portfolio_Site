export const heroContent = {
  name: "Samuel Brooks",
  title: "I build data pipelines and analytics systems.",
  intro:
    "Most of the work here is about taking messy source data and making it usable. I am currently completing an MSc in Business Analytics at UCL in London.",
};

export const contactLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samuel-lawrence-brooks/" },
  { label: "Email", href: "mailto:samuellawrencebrooks@gmail.com" },
  { label: "Phone (US)", href: "tel:+18323358189" },
  { label: "Phone (UK)", href: "tel:+447771939292" },
  { label: "CV/Resume", href: "/cv.pdf" },
  { label: "GitHub", href: "https://github.com/slbrooks20" },
  { label: "UCL Email", href: "mailto:samuel.penaloza.25@ucl.ac.uk" },
];

export const notes = [
  {
    slug: "spark-pipeline-lessons",
    title: "Lessons from building a Spark pipeline",
    summary:
      "What broke, what became clearer, and what changed once the work had to run repeatedly rather than just succeed once in a notebook.",
  },
  {
    slug: "reproducible-data-pipelines",
    title: "Designing reproducible data pipelines",
    summary:
      "Some thoughts on traceable movement, storage boundaries, and why quiet documentation habits matter more than people admit.",
  },
];

export const projects = [
  {
    slug: "geopolitical-crisis-narrative-tracker",
    title: "Geopolitical Crisis Narrative Tracker",
    logo: null,
    summary:
      "A polyglot data engineering system that ingests global news from 43 outlets in 17 languages, stores it across four database paradigms, and exposes a LangChain agent that analyses how different countries and media outlets frame the same geopolitical crisis. Usable from a user-friendly interface built using the tkinter Python library. ",
    blurb:
      "Built to a UCL Data Engineering brief requiring RAG, graph databases, LLM agents, data lineage, and API deployment — all against live, real-world news pipelines.",
    meta: [
      "43 RSS outlets · 17 languages",
      "PostgreSQL · MongoDB · Neo4j · ChromaDB",
      "5,500+ article embeddings",
      "Neo4j: 2,500+ actors · 10k+ relationships",
      "LangChain agent with 7 tools",
      "Airflow orchestration",
      "OpenLineage / Marquez lineage",
      "FastAPI + MCP (12 endpoints)",
      "Docker Compose (8 services)",
      "spaCy NER · sentence-transformers · LibreTranslate",
      "216 tests across ingestion, storage, API, agent",
    ],
    links: [
      { label: "GitHub repo", href: "https://github.com/slbrooks20" },
    ],
    gallery: [
      {
        src: "/images/projects/geopolitical/pipeline_architecture.png",
        alt: "Geopolitical tracker pipeline architecture",
        caption: "End-to-end ingestion: GDELT + 43 RSS feeds → spaCy NER → entity resolution → four polyglot stores → FastAPI + LangChain agent.",
      },
      {
        src: "/images/projects/geopolitical/pipeline_runner_gui.png",
        alt: "Pipeline Runner — Tkinter GUI controlling the eight Docker services and ingestion jobs",
        caption: "Pipeline Runner GUI — live Docker service health, one-click ingestion (RSS · GDELT · daily enrichment), and streaming output log. Captured mid-run: RSS pipeline at 900/1799 articles, 8 containers healthy.",
      },
      {
        src: "/images/projects/geopolitical/polyglot_schema.png",
        alt: "Polyglot persistence schema across PostgreSQL, MongoDB, Neo4j, ChromaDB",
        caption: "Polyglot schema — each database chosen for a specific access pattern, not coverage.",
      },
      {
        src: "/images/projects/geopolitical/actor_cooccurrence_network.png",
        alt: "Actor co-occurrence network from Neo4j",
        caption: "Actor co-occurrence network (Neo4j) — entity-resolved actors connected by shared article appearances.",
      },
      {
        src: "/images/projects/geopolitical/tone_by_outlet.png",
        alt: "GDELT tone distribution by outlet",
        caption: "GDELT tone distribution per outlet — quantifies framing differences across BBC, Al Jazeera, TASS, Fox News, Xinhua.",
      },
      {
        src: "/images/projects/geopolitical/regional_bias_heatmap.png",
        alt: "Regional bias heatmap across outlets and conflict topics",
        caption: "Regional bias heatmap — same conflict, different outlets, different tone signatures.",
      },
      {
        src: "/images/projects/geopolitical/attention_vs_reality.png",
        alt: "Media attention versus humanitarian severity",
        caption: "Attention-vs-reality gap — media coverage volume plotted against ReliefWeb humanitarian severity.",
      },
    ],
    galleryNote: [
      { storage: "PostgreSQL 16", contents: "GDELT events, tone scores, sources, conflicts, actors", size: "Time-series + structured analytics", purpose: "Referential integrity and date-range queries for tone trajectories" },
      { storage: "MongoDB 7", contents: "3,500+ raw articles, 44 UN documents", size: "Flexible per-outlet schemas", purpose: "Aggregation pipelines for cross-outlet coverage comparison" },
      { storage: "Neo4j Community", contents: "Actors · events · sources · countries", size: "2,500+ actors · 10k+ relationships across 3,400+ articles", purpose: "Multi-hop traversals, centrality analysis, ego networks" },
      { storage: "ChromaDB", contents: "Article-chunk embeddings (sentence-transformers)", size: "5,500+ vectors with stance / region / language metadata", purpose: "Semantic RAG retrieval for the LangChain agent" },
    ],
    sections: [
      {
        title: "Problem",
        content:
          "The system addresses a question that matters in finance, intelligence, and journalism: how do BBC, Al Jazeera, Xinhua, Fox News, and TASS differ in covering the same conflict — and what do those patterns reveal about narrative, bias, and escalation risk?",
      },
      {
        title: "Data sources",
        content:
          "Six source categories feed the pipeline across 17 languages: GDELT DOC 2.0 + GKG APIs (event data and tone scores), 43 RSS outlets spanning every continent (BBC, Al Jazeera, TASS, Xinhua, Fox News, Le Monde, NDTV and others) scraped via feedparser, Wikipedia and ReliefWeb APIs for context, and a UN Security Council BeautifulSoup scraper for resolutions.",
      },
      {
        title: "Architecture",
        content:
          "Airflow DAGs orchestrate ingestion on 15-minute, hourly, and daily schedules. Python ETL applies spaCy NER, LibreTranslate for 17-language normalisation, and entity resolution before routing records to the appropriate storage layer. OpenLineage instruments every transformation and emits provenance events to a Marquez lineage store.",
      },
      {
        title: "Storage",
        content:
          "Four databases handle different access patterns: PostgreSQL 16 for structured GDELT event data and tone time-series, MongoDB 7 for raw article documents with flexible per-outlet schemas, Neo4j Community for the actor–event–source–country relationship graph (2,500+ actors and 10,000+ relationships), and ChromaDB for sentence-transformer embeddings (5,500+ chunks) supporting semantic RAG retrieval.",
      },
      {
        title: "Agent tools",
        content:
          "The LangChain agent exposes seven tools backed by the four databases: semantic narrative search (ChromaDB), tone timeline queries (PostgreSQL), variable-depth actor graph traversal (Neo4j), cross-outlet coverage comparison (MongoDB aggregation), live humanitarian context (ReliefWeb), Wikipedia background lookup, and GeoJSON conflict-hotspot retrieval for the Leaflet map. Supports Ollama, OpenAI, Anthropic, Gemini, and Together AI providers.",
      },
      {
        title: "API",
        content:
          "FastAPI exposes twelve REST endpoints plus an MCP tool-discovery interface, containerised in Docker Compose alongside the eight-service stack (Postgres, Mongo, Neo4j, Chroma, Airflow, LibreTranslate, Marquez, FastAPI). Includes a Leaflet conflict map at /map served from PostgreSQL GeoJSON. The stack is deployable to GCP Cloud Run.",
      },
      {
        title: "Testing",
        content:
          "216 tests covering ingestion correctness, storage schemas, every API endpoint, agent tool contracts, OpenLineage lineage event emission, and Airflow DAG integrity. Run via `docker exec geo_fastapi python -m pytest tests/ -v`.",
      },
      {
        title: "Key takeaway",
        content:
          "The strongest signal from this project is the architectural judgement: each database was chosen for a specific access pattern, not for coverage. The tooling follows the problem — a principle that holds up under interview scrutiny.",
      },
    ],
  },
  {
    slug: "indie-game-success-data-pipeline",
    title: "Indie Game Success Data Pipeline",
    logo: {
      src: "/images/steam.png",
      alt: "Steam logo",
      asciiSrc: "/images/steam-ascii.png",
    },
    summary:
      "An end-to-end data engineering project analysing the commercial success of indie games on Steam through a reproducible multi-source pipeline.",
    blurb:
      "Built around 1,216 indie games and eight data sources, this project moves from collection and scraping through Spark processing into a dataset that is actually usable for analysis.",
    meta: [
      "1,216 indie games",
      "8 integrated data sources",
      "PostgreSQL + MongoDB storage",
      "Apache Spark processing",
      "Parquet + DuckDB analytics",
      "Success tier classification",
    ],
    links: [
      { label: "View notebook", href: "/projects/indie-game-success-data-pipeline/notebook" },
      { label: "GitHub repo", href: "https://github.com/orestismet99/indie_game_pipeline" },
    ],
    gallery: [
      {
        src: "/images/projects/steam/pipeline_architecture.png",
        alt: "Indie Game Survival Guide — Pipeline Architecture diagram",
        caption: "5-stage pipeline: 8 sources → JSON → PostgreSQL + MongoDB → Spark → Parquet + DuckDB → Notebook.",
      },
      {
        src: "/images/projects/steam/postgres_schema.png",
        alt: "PostgreSQL schema diagram",
        caption: "PostgreSQL star schema — 11 data tables + 2 Spark output tables + 1 view.",
      },
      {
        src: "/images/projects/steam/mongodb_schema.png",
        alt: "MongoDB schema diagram",
        caption: "MongoDB document schema — steam_reviews and reddit_posts collections.",
      },
    ],
    galleryNote: [
      { storage: "PostgreSQL", contents: "11 data tables + 2 Spark output tables + 1 view", size: "~150,000 rows", purpose: "Structured data, normalised dimensions, time series" },
      { storage: "MongoDB", contents: "steam_reviews, reddit_posts", size: "2,432 docs / ~113,000 nested records", purpose: "Nested reviews and posts with sub-documents" },
      { storage: "Parquet", contents: "master_dataset, sentiment_scores, pre_launch_signals", size: "1,216 rows each", purpose: "Columnar output for DuckDB queries" },
    ],
    sections: [
      {
        title: "Problem",
        content:
          "The project set out to analyse what commercial success looks like for indie games on Steam using a pipeline that could handle multiple external signals and keep the final dataset analytically useful.",
      },
      {
        title: "Data sources",
        content:
          "The pipeline combines eight sources, including Steam data, Steam Charts scraping, Google Trends, Reddit sentiment, and additional metadata sources so the final dataset reflects both platform and external demand signals.",
      },
      {
        title: "Architecture",
        content:
          "The system follows a practical engineering structure: collect and scrape source data, standardise and process it in Spark, persist intermediate and final data in storage layers, then expose clean analytical outputs for downstream use.",
      },
      {
        title: "Pipeline / processing",
        content:
          "Apache Spark handled the main processing workflow. Samuel focused on debugging and building the Spark pipeline so the data could move from raw source collection into a consistent feature-ready dataset.",
      },
      {
        title: "Storage",
        content:
          "PostgreSQL and MongoDB were used as storage layers, with Parquet and DuckDB supporting the analytics layer. This gave the project a clear split between operational storage and analysis-friendly formats.",
      },
      {
        title: "Analytics outputs",
        content:
          "The result was a master dataset with roughly 62 features and a classification approach that grouped games into three success tiers based on estimated owner counts at 20k, 200k, and 1M.",
      },
      {
        title: "Samuel's contribution",
        content:
          "Samuel was responsible for Google Trends data collection, Steam Charts scraping, and substantial Spark pipeline debugging and build work. The portfolio should emphasise these direct contributions rather than the work of the broader group.",
      },
      {
        title: "Key takeaway",
        content:
          "The strongest signal from this project is not a headline metric. It is the ability to build and stabilise a real multi-source pipeline that turns messy external data into a decision-ready analytical dataset.",
      },
    ],
  },
  {
    slug: "premier-league-predictive-analytics",
    title: "Premier League Predictive Analytics",
    logo: {
      src: "/images/premier_league.png",
      alt: "Premier League logo",
      asciiSrc: "/images/pl-ascii.png",
    },
    summary:
      "A predictive analytics project built on 15 seasons of Premier League data, combining match prediction, bookmaker benchmarking, and season simulation.",
    blurb:
      "The project focuses on disciplined evaluation rather than inflated forecasting claims, using walk-forward validation, calibration, and model-odds blending to test whether the pipeline adds signal beyond the market.",
    meta: [
      "15 seasons, 5,700 matches",
      "Bet365 and Pinnacle benchmarks",
      "Best single model: 0.9678 log-loss",
      "Best blend beats Bet365, p=0.007",
      "Dixon-Coles season simulation",
      "6.7/20 exact positions",
    ],
    links: [
      { label: "View notebook", href: "/projects/premier-league-predictive-analytics/notebook" },
      { label: "Deep dive", href: "/projects/premier-league-predictive-analytics/deep-dive" },
    ],
    gallery: [
      {
        src: "/images/projects/premier-league/feature_pipeline.png",
        alt: "Premier League feature pipeline diagram",
        caption: "Feature pipeline from raw football data through engineered features and model-ready tables.",
      },
      {
        src: "/images/projects/premier-league/metrics_comparison.png",
        alt: "Premier League model metrics comparison",
        caption: "Walk-forward comparison between model variants and bookmaker baselines.",
      },
    ],
    sections: [
      {
        title: "Problem",
        content:
          "The aim was to predict three-way match outcomes in the Premier League while testing the models against the strongest baseline in the space: bookmaker-implied probabilities.",
      },
      {
        title: "Data sources",
        content:
          "The data stack combines 15 seasons of match data with ClubElo ratings, transfer spending, expected goals data, and manager tenure information.",
      },
      {
        title: "Architecture",
        content:
          "The workflow runs from source ingestion and feature engineering into walk-forward training, probability calibration, ensemble blending, and season-level simulation.",
      },
      {
        title: "Pipeline / processing",
        content:
          "The processing stage builds rolling form, goal difference, days rest, Elo momentum, shots-on-target, and implied probability features before training Logistic Regression, LightGBM, and MLP models with temporal decay weighting.",
      },
      {
        title: "Storage",
        content:
          "This project is best understood as a reproducible analytics workflow rather than a storage-heavy data engineering system. The value lies in pipeline structure, feature design, and honest evaluation.",
      },
      {
        title: "Analytics outputs",
        content:
          "Outputs include calibration plots, feature importance, model comparison metrics, league table forecasts, and Dixon-Coles Monte Carlo simulations for full-season outcomes.",
      },
      {
        title: "Samuel's contribution",
        content:
          "Samuel's contribution sits across the full modelling workflow: assembling and cleaning inputs, engineering and testing features, evaluating models against bookmaker baselines, and presenting the results through reproducible figures and comparisons.",
      },
      {
        title: "Key takeaway",
        content:
          "The strongest signal from the project is not a claim of beating the market outright. It is the ability to build a disciplined predictive pipeline, benchmark it correctly, and identify where blending or simulation adds real analytical value.",
      },
    ],
  },
  {
    slug: "marketing-analytics-segmentation",
    title: "Marketing Analytics Segmentation",
    logo: null,
    summary:
      "A segmentation-oriented analytics project focused on turning raw customer data into clearer groupings for decision-making.",
    blurb:
      "A supporting analytics project focused on the less glamorous but more useful work of cleaning structure, shaping features, and producing interpretable segments.",
    meta: ["Customer segmentation", "Analytics workflow", "Feature framing", "Decision-ready outputs"],
    links: [],
    gallery: [],
    sections: [
      {
        title: "Problem",
        content:
          "The objective was to identify useful structure in customer data so that analysis could move from broad averages to more actionable groupings.",
      },
      {
        title: "Data sources",
        content:
          "The project works with customer or marketing data shaped into a form suitable for segmentation analysis and downstream interpretation.",
      },
      {
        title: "Architecture",
        content:
          "This is best represented as a clean analytics workflow: prepare the dataset, create segment-relevant features, test clustering or grouping logic, and present interpretable outputs.",
      },
      {
        title: "Pipeline / processing",
        content:
          "The emphasis is on reproducible preparation and careful feature design so that segmentation results remain understandable rather than opaque.",
      },
      {
        title: "Storage",
        content:
          "Storage detail should stay lightweight here, since the portfolio value lies more in analytical structure than in infrastructure complexity.",
      },
      {
        title: "Analytics outputs",
        content:
          "Outputs focus on segment definitions, comparative patterns between groups, and the practical use of those distinctions in analysis.",
      },
      {
        title: "Samuel's contribution",
        content:
          "Samuel's contribution should be framed around analytics design, feature work, and interpretation rather than claims about dramatic commercial uplift.",
      },
      {
        title: "Key takeaway",
        content:
          "This project reinforces Samuel's ability to translate raw data into decision-ready structure, which aligns well with analytics engineering roles.",
      },
    ],
  },
];

export const featuredProject = projects[0];
export const supportingProjects = projects.slice(1);

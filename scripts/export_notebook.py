#!/usr/bin/env python3

from __future__ import annotations

import argparse
import base64
import html
import json
from pathlib import Path

import mistune


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_NOTEBOOK_PATH = Path("/Users/papichulo/indie_game_pipeline/notebooks/pipeline_notebook.ipynb")
DEFAULT_OUTPUT_PATH = ROOT / "public" / "notebooks" / "pipeline_notebook.html"


def render_source(source: list[str] | str) -> str:
    if isinstance(source, list):
        return "".join(source)
    return source


def render_output(output: dict) -> str:
    output_type = output.get("output_type")
    data = output.get("data", {})

    if output_type == "stream":
        text = render_source(output.get("text", ""))
        return f"<pre class='nb-output-text'>{html.escape(text)}</pre>"

    if "image/png" in data:
        image_data = data["image/png"]
        if isinstance(image_data, list):
            image_data = "".join(image_data)
        return f"<img class='nb-output-image' src='data:image/png;base64,{image_data}' alt='Notebook output image' />"

    if "text/html" in data:
        html_block = data["text/html"]
        if isinstance(html_block, list):
            html_block = "".join(html_block)
        return f"<div class='nb-output-html'>{html_block}</div>"

    if "text/plain" in data:
        text = data["text/plain"]
        if isinstance(text, list):
            text = "".join(text)
        return f"<pre class='nb-output-text'>{html.escape(text)}</pre>"

    return ""


def render_cell(markdown: mistune.Markdown, cell: dict) -> str:
    source = render_source(cell.get("source", []))

    if cell["cell_type"] == "markdown":
        return f"<section class='nb-cell nb-markdown'>{markdown(source)}</section>"

    outputs = "".join(render_output(output) for output in cell.get("outputs", []))
    return (
        "<section class='nb-cell nb-code'>"
        "<div class='nb-cell-label'>Code</div>"
        f"<pre class='nb-code-block'><code>{html.escape(source)}</code></pre>"
        f"{outputs}"
        "</section>"
    )


def build_html(notebook: dict, title: str, description: str) -> str:
    markdown = mistune.create_markdown()
    cells = "\n".join(render_cell(markdown, cell) for cell in notebook.get("cells", []))

    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)}</title>
    <style>
      :root {{
        --bg: #15171b;
        --panel: #1b1f24;
        --panel-soft: #20262d;
        --text: #f3eee6;
        --muted: #abb1bb;
        --border: rgba(243, 238, 230, 0.12);
        --accent: #5f87c7;
      }}

      * {{
        box-sizing: border-box;
      }}

      body {{
        margin: 0;
        background: linear-gradient(180deg, #17191d 0%, #14161a 100%);
        color: var(--text);
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.65;
      }}

      .nb-shell {{
        width: min(100% - 2rem, 76rem);
        margin: 0 auto;
        padding: 3rem 0 4rem;
      }}

      .nb-header {{
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border);
      }}

      .nb-kicker {{
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.78rem;
      }}

      h1, h2, h3, h4 {{
        font-family: "Iowan Old Style", "Palatino Linotype", serif;
        line-height: 1.15;
      }}

      .nb-header h1 {{
        margin: 0.5rem 0 0.75rem;
        font-size: clamp(2.4rem, 6vw, 4.75rem);
      }}

      .nb-header p {{
        max-width: 42rem;
        color: var(--muted);
        font-size: 1.05rem;
      }}

      .nb-cell {{
        margin-bottom: 1.5rem;
        padding: 1.25rem;
        border: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.02);
      }}

      .nb-markdown {{
        background: transparent;
        border: 0;
        border-top: 1px solid var(--border);
        padding: 1.5rem 0 0;
      }}

      .nb-markdown h1:first-child,
      .nb-markdown h2:first-child,
      .nb-markdown h3:first-child {{
        margin-top: 0;
      }}

      .nb-markdown p,
      .nb-markdown li {{
        color: var(--muted);
        font-size: 1rem;
      }}

      .nb-markdown table {{
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
      }}

      .nb-markdown th,
      .nb-markdown td {{
        border: 1px solid var(--border);
        padding: 0.65rem 0.75rem;
        text-align: left;
      }}

      .nb-code {{
        background: var(--panel);
      }}

      .nb-cell-label {{
        margin-bottom: 0.75rem;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.72rem;
      }}

      .nb-code-block,
      .nb-output-text {{
        overflow-x: auto;
        padding: 1rem;
        border: 1px solid var(--border);
        background: #101318;
        color: #d8dee9;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.88rem;
        line-height: 1.55;
      }}

      .nb-output-text {{
        margin-top: 1rem;
        white-space: pre-wrap;
      }}

      .nb-output-image {{
        display: block;
        width: 100%;
        height: auto;
        margin-top: 1rem;
        border: 1px solid var(--border);
        background: white;
      }}

      .nb-output-html {{
        overflow-x: auto;
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid var(--border);
        background: var(--panel-soft);
        color: var(--text);
      }}

      a {{
        color: var(--text);
      }}

      @media (max-width: 640px) {{
        .nb-shell {{
          width: min(100% - 1rem, 76rem);
          padding-top: 1.5rem;
        }}

        .nb-cell {{
          padding: 1rem;
        }}
      }}
    </style>
  </head>
  <body>
    <main class="nb-shell">
      <header class="nb-header">
        <div class="nb-kicker">Notebook View</div>
        <h1>{html.escape(title)}</h1>
        <p>{html.escape(description)}</p>
      </header>
      {cells}
    </main>
  </body>
</html>
"""


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", dest="input_path", default=str(DEFAULT_NOTEBOOK_PATH))
    parser.add_argument("--output", dest="output_path", default=str(DEFAULT_OUTPUT_PATH))
    parser.add_argument("--title", default="Indie Game Pipeline Notebook")
    parser.add_argument(
        "--description",
        default="Static export of the pipeline notebook used for the indie game data engineering project. This version preserves markdown, code, and key notebook outputs for portfolio viewing.",
    )
    args = parser.parse_args()

    notebook_path = Path(args.input_path)
    output_path = Path(args.output_path)
    notebook = json.loads(notebook_path.read_text())
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(build_html(notebook, args.title, args.description))
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()

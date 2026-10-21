# Plan: the data viewer

Status: v1, 2026-10-19. Executor: an external coding model working in this folder (C:\projects\Progetti\RB). Read first: `README.md`, `project/project_memory.md`, `project/data_schema.md` (the contract: every table, column and allowed value). Do not read the research result files; the viewer works only on `data/*.csv`.

## 0. Goal
One local file, **`viewer/atlas.html`**, that Leonardo opens with a double click and uses to see ALL collected data in an extremely well-organised, holistic way: tables, a geographic map and a concept map (how data items connect), plus a data-quality overview. View only: no editing in the page (corrections are made in the CSV files by Claude/the research model, then the page is rebuilt). Today only Leonardo uses it; one day it may be shown to others, so quality information (evidence type, confidence, source status) is always visible, never hidden.

Leonardo is not a programmer and dislikes the terminal: he must never need to type a command. Everything is built and rebuilt by a script that he can start by double-clicking a `.bat` file.

## 1. Fixed constraints
1. **Self-contained:** `atlas.html` contains all data (embedded as JSON), all code and all libraries inline. No server, no internet at runtime, no CDN, no map tiles. It works from `file://` in Chrome/Edge.
2. **Build:** `viewer/build_viewer.py` (Python 3, standard library only for the build; no pip installs) reads `data/*.csv` and `viewer/src/*` and writes `viewer/atlas.html`. `viewer/rebuild_viewer.bat` runs it on double click and keeps the window open showing "OK" or the first error in plain words.
3. **Libraries:** keep to a minimum; if one is used (e.g. d3-force for the concept map), copy its minified file into `viewer/lib/` with its licence and inline it at build time. Prefer plain JavaScript and SVG over frameworks.
4. **Size:** atlas.html under 10 MB with 50,000 fact rows; the tables must stay fast (virtual scrolling or pagination).
5. **Tidy:** no duplicate files, no versions in file names. Source in `viewer/src/`, libs in `viewer/lib/`, output `viewer/atlas.html`, validator `viewer/validate_data.py`, sample data `viewer/sample_data/` (same schema, small, clearly fake, used only for tests; never copy sample rows into `data/`).
6. **Language:** English interface, plain wording (no jargon: "Evidence" not "provenance").
7. **Look:** calm, high-contrast, readable at laptop size; light and dark follows the system; colours encode only evidence quality and Red Bull involvement, with a legend; colour is never the only signal (also text or icon).
8. **Do not touch** `atlas_scene_movimento_v0.xlsx`, `research/results/*`, or anything under `data/` (read-only for you).

## 2. Stages (each ends with a check; do not start the next before the check passes)

### V0. Foundations
- Create `viewer/sample_data/` with every CSV of the schema (header + 5-30 plausible fake rows covering: 6 places, 4 disciplines, both evidence types, all `red_bull_involvement` values, `not_found` rows, a relation, a source with `blocked`).
- Write `viewer/validate_data.py` implementing section 4 of the schema; messages in plain English, one line per problem with file, row, column. Exit code 0 only when there are no errors. Warnings (not errors) for: sources never opened; facts with confidence L; places with no facts.
- Write `viewer/rebuild_viewer.bat` (runs validate, then build, prints OK/error, `pause`). Add a switch: if the folder `data/` has no CSV, the build uses `viewer/sample_data/` and the page shows a visible banner "SAMPLE DATA".
- **Check:** `python viewer/validate_data.py viewer/sample_data` returns 0; a deliberately broken copy (in the scratch area, not in the repo) returns the right messages.

### V1. Shell and tables
- Left menu: Overview, Tables, Grid, Geographic map, Concept map, Sources, About.
- **Tables:** one tab per CSV. Search box, per-column filters, sort, column show/hide, row count, "copy as CSV". Fixed-position header. Each `source_id` is shown as a clickable link (opens the URL in a new tab) with a badge for `access_status`. Each `place_id`, `disc_id` etc. shows its name, not only the code. Click a row to open a side panel with all columns, the linked source, and "related rows" (same place, same event series, same org).
- **Check:** with sample data, every column of every table is visible and filterable; opening a row shows the correct source; text in all columns is selectable; the page works with 50,000 generated rows (generate them in a scratch folder, delete after).

### V2. Overview (data quality) and Grid
- **Overview:** counts per table; facts by `evidence_type` and `confidence` (bar charts in SVG); sources by `access_status`; list of "gaps" = place x discipline combinations of the `deep` and `benchmark` places with no fact or only `not_found` rows; list of conflicts = same place/discipline/signal/period with different values; the last 20 lines of `review_log.csv`.
- **Grid:** rows = places (grouped by `region` and `role`), columns = disciplines (`pilot_main` first, `pilot_light` after, `adjacent` collapsed), one cell per combination. A cell shows **counts only, no scores**: number of facts, number of events, number of orgs; small colour band for the share of `found` + `stated_by_organiser` vs `not_found` vs `inferred`; a red-bull marker if there is at least one event with `red_bull_involvement = found`, a grey marker for `not_found`, an empty marker for `not_checked`. Switch above the grid: "all signals" or one signal (COM, SCH, ...). Click a cell: panel with the facts, events, orgs and sources of that cell.
- **Check:** counts in cells equal counts computed by a plain filter in the Tables view for 5 random cells; Red Bull markers match events.csv.

### V3. Geographic map
- No tile server. Draw a simple map in SVG: country outlines from a public-domain dataset (Natural Earth 1:110m or 1:50m, simplified; store the file in `viewer/lib/` with its licence note) with an equal-area or Mercator projection; zoom and pan with mouse and buttons; presets "Europe", "World".
- Points = places that have lat/lon. Size = number of events (or facts), selectable by a drop-down: *facts*, *events*, *organisations*, *Red Bull events*. Filters: discipline, evidence type, year range, Red Bull involvement. Hover shows the name and counts; click opens the same side panel as the Grid.
- Event points can be shown at their own venue place if the place exists; routes are not needed.
- **Check:** every place with lat/lon appears; filter results match the Tables view; map works offline with the network disabled.

### V4. Concept map
- Graph of how data items connect. **Nodes:** places, disciplines, organisations, events/series (events collapsed into their `series`, expandable), signals (as small hubs), Red Bull (one node, all `series` with Red Bull involvement connect to it), sources (hidden by default, a toggle shows them). **Edges** are derived automatically from foreign keys (event -> place, event -> organiser, org -> place, org -> discipline, fact -> place+discipline+signal, athlete -> place) plus all rows of `relations.csv`. Edge style carries `evidence_type` (solid = found, dashed = stated_by_organiser or inferred, dotted = not_found).
- Layout: force-directed with the minified d3-force (or equivalent), plus a mode "layered" (disciplines | cities | organisations | events). Controls: search a node; click a node to highlight its neighbours and open the side panel; filter by node type, discipline, region; limit to N nodes (default 300) with a clear warning when the graph is cut.
- **Check:** a node's edges equal the related rows shown in its side panel; no overlapping labels at default zoom for the sample data; works with 2,000 nodes without freezing (levels of detail / clustering by place if needed).

### V5. Sources view and About
- **Sources:** all `sources.csv` with status, date opened, number of facts relying on it, "used by" list. Filter "never opened" and "blocked". Group by `source_type`.
- **About:** how to read the page; legend; definition of each `evidence_type`, `confidence`, `access_status`, `red_bull_involvement` (taken from the schema); date of the build; counts; the line "No scores are shown: raw evidence only".
- **Check:** legend text equals the schema text.

### V6. Real data (after the research is done)
- When the research team has filled `data/`, remove the "SAMPLE DATA" fallback, run the validator on `data/`, fix every viewer problem it reveals (not data problems: those go to `viewer/problems.md` for the research model), rebuild.
- Adapt views to what the real data shows (e.g. columns that are always empty, grid ordering). Write what was adapted in `project/project_memory.md` (section 7).

## 3. Acceptance criteria for the whole viewer
1. A person with no technical knowledge can: double-click `rebuild_viewer.bat`, then double-click `viewer/atlas.html`, and see the data.
2. From any number shown, one click leads to the underlying rows, and from any row one click leads to its source URL.
3. The page never shows a value without its evidence type and confidence next to it (or in the side panel one click away).
4. Nothing on the page is computed as a score or ranking.
5. The validator and the build are deterministic: same CSV -> same page.
6. The page works offline.

## 4. Reporting
After each stage write 5 lines in `viewer/progress.md` (update in place): what was built, what was tested and how, what is missing, any question for Leonardo. Update `README.md` (structure) and `project/project_memory.md` at the end of V0 and at the end of V6. If a design choice in this plan turns out wrong or impossible (e.g. a library cannot be inlined), choose the simpler alternative, say so in `viewer/progress.md`, and continue; do not stop for questions unless data or schema must change (in that case propose the change in `viewer/progress.md` and do not edit `project/data_schema.md` yourself).

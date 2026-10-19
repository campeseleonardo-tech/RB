# Viewer progress (updated in place)

Status (2026-10-19): V0 to V5 built and checked on sample data. V6 (real data) waits until the research team has finished `data/`. `data/` is still being filled and currently fails the validator (see `viewer/problems.md`), so `rebuild_viewer.bat` stops on purpose until the data is fixed.

## V0. Foundations
- **Built:** fake sample data in `viewer/sample_data/` (11 CSV, 61 rows, all marked SAMPLE DATA); validator `viewer/validate_data.py`; build `viewer/build_viewer.py`; double-click file `viewer/rebuild_viewer.bat`.
- **Tested:** validator on the sample exits 0 (4 expected warnings). A broken copy in the scratch area gave one plain message per problem (file, row, id, column): bad value, duplicate id, missing source, `not_found` without notes, bad date, unknown place id, place_type mismatch, bad URL, `confirmed_absent` without notes, header typo. The build is deterministic (same data, same file). The `.bat` ran end to end in a scratch copy: good data gives OK; header-only CSVs fall back to the sample with the banner.
- **Choices:** the build uses `data/` only when at least one CSV there has a data row; the pseudo-discipline `ALL` may have an empty scope; `source_id` is required for every row except `not_found` (schema rule 4), also for `inferred` rows and events; `inferred` and `not_found` rows need notes; the validator checks that a fact's `place_type` matches `places.csv` (not in the schema, but a plain mismatch).

## V1. Shell and tables
- **Built:** left menu (Overview, Tables, Grid, Geographic map, Concept map, Sources, About), hash links. Tables view: one tab per CSV, search over all columns, per-column filter, sort, show/hide columns, row count, "Copy as CSV" (falls back to a box to select the text). Source links open the URL in a new tab and show an access badge; ids show the name of the place, discipline, source, etc. Click a row for a side panel: all columns, evidence and confidence at the top, the source block, and related rows (same place, series, organiser, source), each clickable.
- **Tested:** in the in-app browser on a local http copy (file:// is not supported there): every table opens, sort, search, filter, row panel and related-row navigation work; the source link of EV000001 is its own source S00001. A 50,000-fact copy (generated, in the scratch area, deleted after the test) loads with 45 rows in the DOM (virtual scrolling), search takes about 150 ms, page size 7.4 MB.
- **Missing / simplified:** column headers are the schema names (no friendlier labels); long text is cut in the table and shown in full in the side panel.

## V2. Overview and Grid
- **Built:** Overview: counts per table, facts by evidence type and confidence, sources by access status (bars drawn with HTML/CSS instead of SVG, same information), gaps (deep and benchmark places × pilot and adjacent disciplines with no fact or only not_found), conflicts (same place, discipline, signal, period with different values; both kept), last 20 review-log lines. Grid: places grouped by region and role × disciplines (pilot first; adjacent on a switch; "not discipline-specific" last); cell shows F/E/O counts, an evidence bar and a Red Bull marker; signal switch; click a cell for its rows and sources.
- **Tested:** all 40 grid cells on the sample match a plain filter on the tables (counts); Red Bull markers match `events.csv` (0 mismatches); the overview gaps and conflict match the sample data.
- **Missing:** the grid has no sort or hide for empty rows (all places shown).

## V3. Geographic map
- **Built:** SVG map drawn from Natural Earth 1:110m country outlines (public domain; `viewer/lib/countries_110m.json`, licence in `viewer/lib/LICENCES.md`). Equirectangular projection (not equal-area). Pan (drag), zoom (wheel and buttons), presets World and Europe. Circles for places with coordinates; size by facts, events, organisations or Red Bull events; filters: discipline, evidence, Red Bull involvement, years. Hover for counts; click for the place panel. Places without coordinates are listed under the map.
- **Tested:** all 5 places with coordinates appear; tooltip counts match the table filter; no external requests (the page loads nothing from the internet).
- **Simplified:** 110m outlines are coarse and keep only the outer ring of each country (no holes or small islands); the evidence filter applies to facts and organisations only (events have no evidence column; their Red Bull value is filtered instead).

## V4. Concept map
- **Built:** nodes for places, disciplines, organisations, event series (events collapsed into their series), signals, athletes, one Red Bull node (linked to series with found or stated involvement) and sources (toggle). Edges are derived from the links between rows plus `relations.csv`; line style = evidence (solid found, dashed stated or inferred, dotted not_found). Own force layout (no d3, to avoid a library) for up to 400 nodes; layered layout above that (automatic, or choose it). Filters by node type, discipline and region; search; limit (default 300, most connected kept, with a clear warning); isolated nodes hidden; labels placed greedily so they do not overlap; click a node to highlight its neighbours and open the list of linked items.
- **Tested:** 2,000-node limit on a 1,018-node copy renders in about 1 s; limit 300 shows the warning; zero overlapping labels on the sample (checked with getBBox); node panel lists the same neighbours that the lines connect.
- **Simplified:** plain layout code instead of d3-force; the sources toggle is off by default.

## V5. Sources and About
- **Built:** Sources: every source grouped by type, with status, date opened, the tables that use it (clickable), filters "never opened", "blocked", "opened or rendered", and a search. About: how to read the page, the legend, and the definitions of evidence type, confidence, access status and Red Bull involvement, read from `project/data_schema.md` at build time (so the text is the schema text), counts, and the line "No scores are shown".
- **Tested:** the legend text is read from the schema file during the build (no copy typed by hand); no horizontal scroll at phone width (375 px) on any view.
- **Note:** all views are real now (no stub). The `.bat` stops when `data/` has errors, which is the intended behaviour: it never builds a page from data that fails the checks.

## Open questions for Leonardo and the schema (not changed by me)
1. ID formats for events, organisations, athletes, finance, relations and the log are not in `data_schema.md`; I used `EV`, `ORG`, `ATH`, `FIN`, `REL`, `LOG` + 6 digits. The validator checks only `F` + 6 digits and `S` + 5 digits. Please confirm, or the research model should keep one style.
2. Signal definitions in `data/signals.csv` are not in the schema (only the codes are). Who writes them?
3. `data/` now fails the validator (112 errors, 13 with cell counts): see `viewer/problems.md` for the research model.
4. The prompt asked to update README and project memory at the end of V0 and V5; the plan says V0 and V6. Done at V0 and V5 now; they will be updated again when V6 is done.

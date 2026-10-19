# RB: Dance Scene Atlas (Red Bull open application)

Single source of truth for this project. Language: English. Keep one copy of every file; update in place.

## Structure
- README.md: this file. Update it whenever the structure changes.
- atlas_scene_movimento_v0.xlsx: the data workbook (currently in the folder root; to be renamed `dance_scene_atlas.xlsx` and moved to `data/` when convenient). One workbook only, edited in place: no v1, v2, "copy" or "final" versions. History goes into the Decisions sheet.
- project/project_memory.md: everything decided so far, what is taking shape, verified facts, to-do list. Update in place.
- research/research_brief.md: the list of research tasks to hand to the research model.
- research/results/ (create when results arrive): one file per task, named `<task ID>_<short_name>.md`, for example `A1_redbull_event_inventory.md`.

## Plans and handover (2026-10-19)
- project/data_schema.md: the data contract (CSV tables, columns, allowed values). Both plans depend on it.
- research/plan_data_collection.md: plan to fix, finish and complete the data collection (executed by a research model).
- research/manual_collection_list.md: what Leonardo collects by hand.
- project/plan_viewer.md: plan for the local data viewer (executed by a coding model).
- project/prompts/: the two prompts to give to the models (prompt_data_collection.md, prompt_viewer.md).
- Created by the executors: data/ (CSV tables), archive/quarantine/, research/logs/, research/progress.md, viewer/ (see below).

## Data viewer (viewer/)
- To look at the data: double-click `viewer/atlas.html` (one self-contained page, works offline).
- To update it after data changes: double-click `viewer/rebuild_viewer.bat`. It checks the data first and rebuilds the page, or stops with the messages to fix.
- viewer/validate_data.py: checks data/*.csv against project/data_schema.md (section 4). Run by the `.bat`.
- viewer/build_viewer.py and viewer/src/ (page.html, core.js, views.js): build script and page source. viewer/lib/ holds the map outlines with their licence (LICENCES.md).
- viewer/sample_data/: fake data for tests only; the page shows a SAMPLE DATA banner whenever it is not built from data/.
- viewer/progress.md: what each viewer stage built, tested and left open. viewer/problems.md: data problems found by the validator, for the research model.
- Status (2026-10-19): stages V0 to V5 done on sample data; V6 (real data) waits until data/ passes the validator. The `.bat` stops on purpose while it does not.

## Planned (create only when needed)
- data/: the CSV tables of the data schema (the workbook is kept as legacy, read-only for now).
- outputs/: shareable map, report, one-page summary for the application.
- archive/: superseded material, only if something must be kept.

## Rules
1. No duplicate files. If a file changes, edit it; do not save a new copy.
2. English file names, lowercase, underscores, no spaces.
3. Every number in the workbook needs a source URL and an access date.
4. Public sources only; no personal data of private individuals.
5. Open to-dos live in project/project_memory.md (section 8).

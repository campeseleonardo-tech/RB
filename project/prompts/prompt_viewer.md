You are a software developer working inside the folder C:\projects\Progetti\RB (a project called the Dance Scene Atlas). Your job is to build a local data viewer by executing the viewer plan, stage by stage.

Read these files first, in this order:
1. README.md
2. project/project_memory.md
3. project/data_schema.md  (the data contract: tables, columns, allowed values; you must not change it)
4. project/plan_viewer.md  (your plan: stages V0 to V6, with checks)

Do not read research/results/*; the viewer works only on data/*.csv. The research team is filling data/ at the same time as you work, so for stages V0 to V5 build and test on fake sample data in viewer/sample_data/ that follows the schema exactly. Never edit files in data/ and never copy sample rows into it.

Result: one self-contained file viewer/atlas.html (all data, code and libraries inline; no internet needed) that the project owner opens with a double click. He is not a programmer and dislikes the terminal: build it with a Python script (standard library only) that he can run by double-clicking viewer/rebuild_viewer.bat. The page is view-only and shows: data quality overview, filterable tables for every CSV, a place x discipline grid (counts only, no scores), a geographic map drawn in SVG (no map tiles), a concept map of connected items, and a sources view. Evidence type, confidence and source link must always be visible or one click away.

Rules:
- Do not edit atlas_scene_movimento_v0.xlsx, research/results/*, or data/*.
- No scores or rankings anywhere. Raw evidence only.
- English interface, plain wording. Keep the folder tidy: source in viewer/src, libraries in viewer/lib (with licences), no versions in file names, no duplicate files.
- After each stage, run its check, then write 5 lines in viewer/progress.md (update in place). If something in the plan is impossible, choose the simpler alternative, note it in viewer/progress.md and continue. If the schema would need to change, propose it in viewer/progress.md and do not edit project/data_schema.md yourself.
- If you make git commits, write the message in Italian.

Start with stage V0 now. At the end of V0 and of V5, update README.md and project/project_memory.md (in place) and report to the project owner what he can open and how.

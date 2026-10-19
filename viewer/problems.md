# Data problems found by the viewer validator (for the research model)

Snapshot on 2026-10-19 while `data/` was still being filled. Re-run `python viewer/validate_data.py` (or double-click `viewer/rebuild_viewer.bat`) to see the current list. The viewer does not edit `data/`; each item below is for the research team to fix in the CSV files, then the page is rebuilt.

Counts from the snapshot (325 rows in 11 files, 112 errors, 203 warnings):

1. **places.csv: rows with the wrong number of cells (13 rows).** Some place names or notes contain a comma without double quotes. Fix: wrap such cells in double quotes. Expected: 11 cells per row.
2. **events.csv: `organiser_org_id` points to an id that is not in organisations.csv (69 rows, all `O00001`).** Either the organisation row is missing from organisations.csv, or the id differs. Use the org_id of an existing row, or add the organisation row (source needed).
3. **events.csv: `date_start` is empty (21 rows).** Use at least the year (`YYYY`) when the day is unknown; use `not_found` in notes if the date was searched and not found.
4. **events.csv: `place_id` not in places.csv (SYD, RIO, ZUR, SPG, GNT).** Add these places to places.csv (with role and region) or use an existing place.
5. **sources.csv: `source_type` = `venue` (2 rows).** Not an allowed value. Use one of: official_redbull, organiser, federation, public_statistics, press, wikipedia, platform, registry, academic, other. A venue page is usually `organiser`.
6. **Warnings (203):** mostly `place has no facts` (expected while data is incomplete) and sources never opened. These do not block the page.

Schema questions (not data problems) are in `viewer/progress.md`.

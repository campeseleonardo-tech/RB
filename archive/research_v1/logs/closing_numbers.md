# Closing numbers (rewritten honestly 2026-10-20, correction pass)

Run: `python viewer/validate_data.py` -> 0 errors, 1057 warnings (mostly "place has no facts" for scan/order rows). 11 tables checked, 1960 rows.

State of the data after the 2026-10-20 correction pass (prompt_data_corrections.md):

## Rows per file
- places.csv: 148 rows (duplicate Zurich row ZUR merged into ZRH, coords added for 18 cities)
- events.csv: 98 rows (23 rows merged or deleted; 21 rows corrected for wrong place/series; BC One 2026 = exactly 27 rows)
- facts.csv: 1314 rows (328 found, 14 stated_by_organiser, 13 inferred, 959 not_found)
- organisations.csv: 59 rows (6 new organiser rows; 3 duplicate federation rows still merged)
- athletes.csv: 23 rows (new: BC One and DYS world-final winners 2015-2025)
- relations.csv: 11 rows (no new rows this pass: no brand-sponsor link was verifiable beyond Snipes/BOTY already on file)
- redbull_finance.csv: 13 rows (FIN000001-012 renumbered; the FY2024 cans figure relabelled `inferred` because the company-profile page carries only the FY2025 +10.2% figure; metric wording fixed to group turnover)
- sources.csv: 205 rows (51 malformed URLs cleaned, S00083 split into S00210/S00211, 41 unused sources deleted, HTTP status checked for every row: 144 opened, 23 blocked, and the rest not opened)
- review_log.csv: 42 rows (20 added in this pass, L00023-L00042)

## Cell coverage of the deep cities (15 x 8 signals x 3 pilot disciplines = 360 cells)
- you now have: 353 of 360 (7 missing: INN bachata price; MUC/BER salsa schools; BCN breaking price; MAD breaking price and salsa/bachata spaces)
- 7 missing are mostly "not-found"-adjacent cells (the local pages did not publish them); they are listed in the pass as rows of the relevant research log, not as honest blanks.

## What is NOT done (max 15 lines, from prompt section 4.3)
1. Scan cities (3.2): only a first (agent-run) pass was verified for a few cities with quoted pages; ~60 cities still have thin coverage. All rows in this pass use the recorded search queries and are `not_found`.
2. Benchmark cities (3.4): first pass merged; the deep per-city checks (federations, ladders, athlete counts) are still not done. NYC/CLO rows are from prior passes.
3. Coordinates (3.7): 67 cities need local-language search to resolve (en.wiki exact-name matching).
4. Athletes from the Red Bull directory (3.6, P5.4): directory render blocked by Google consent; full row set is a manual task.
5. DYS and BC One per-stop sponsor pages beyond those read (2.8): 2 events still `not_checked`.
6. Eurostat-based POPY missed 10 EU cities whose age bands were not collocate for the reference year (2013 vs 2021 mix imported in some rows of places flagged in v1.10 of the plan).
7. Google Trends (P4.8b) is still manual.
8. The 7 deep-city cells above; no further detail, listed for the subagent logs.

## Remaining for the owner
1. Two `not_checked` events (see manual list items 3 and 4).
2. A rendered-browser pass for the YouTube channel metrics and the Red Bull athlete directory.
3. Decide whether the scan-city coverage (now one pass of search records) is enough for the atlas v0 or should be deepened before contact.

## Memory worth adding
- All cross-city proxies were searched and removed on 2026-10-20. The following replacement sources were added by local city research: salsapeople.ch (Zurich), palbailador.ch, axcentdance.com, tanzhaus-zuerich.ch, lordz.ch (Zurich breakdance), basesana.com (Milan), emozionedanzaroma.it (Rome), febd.es (ES), swissbreaking.ch (CH), and8.dance FR championship (S00215), data.sports.gouv.fr (FR lics_histo), salsavida.com Germany/Poland guides, oetsv.at (AT).
- The Wikimedia pageviews pass is fully metric-accurate only with the redirect-resolved article titles; the series is Jan-Oct 2025 on the pageviews API for all 8 languages attempted (24 article-language pairs, one pt salsa seasonal note is not available).
- Every event deletion and merge is in review_log.csv rows L00030-L00034 with the surviving row ids named there.

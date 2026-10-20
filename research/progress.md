# Progress (rewritten honestly 2026-10-20 after the data-correction pass)

State after prompt_data_corrections.md (independent review pass): Blocks 1-2 executed end to end; Block 3 done for the automatable parts plus agent-run first passes; Block 4 checks run and closing numbers rewritten.

## Blocks of the correction pass - what status
1. Block 1 (wrong facts): **done with 3 exceptions**
   - F000054 pageviews fixed (real article "Breakdancing", 127,345 views Jan-Oct 2025); all 8 languages recomputed where article exists.
   - Zurich/Milan/Rome prices re-sourced to real local pages (Tanzhaus Zuerich, LORDZ, Salsa People, PalBailador, AXcent, Basesana, Emozione Danza).
   - Ladder facts re-stated per country with named rung examples (febd.es, swissbreaking.ch, and8.dance FR, ministry dataset for FR licences, tanzsport.de factsheet).
   - YouTube metrics renumbered F000351-354 (inferred L, GLOBAL). Finance renumbered FIN000001-012, cans 2024 figure relabelled `inferred`.
   - Country participation: ISTAT/CBS/DTV/FR-ministry verified; DE-26000/CH-17clubs/ES-3000teachers rows now `not_found` with searches.
   - sources.csv cleaned (51 malformed URLs, 41 unused deleted), every URL HTTP-checked.
   - Exceptions: STSV member count not verifiable; ffdanse.fr JS-walled (FR figures came from the ministry dataset instead).
2. Block 2 (events): **done with 2 items open**
   - Duplicates and wrong-place rows fixed (23 rows merged or deleted; BC One 2026 = 27 rows; DYS 2026 verified 17 official stops on redbull.com rendered).
   - Series names fixed; 21 organiser ids filled (6 new orgs); scale values set where the organiser page states them.
   - Open: E000081 Flavourama and E000115 BCN Dance Life red_bull_involvement (sponsor pages unreachable; manual list).
3. Block 3 (missing coverage): **partly done**
   - POP/POPY/STU/TOU collected for the EU places via the Eurostat dissemination API (130 rows); non-EU benchmark cities missing.
   - ONL pageviews: 3 disciplines x 8 languages with real article titles.
   - Lat/lon filled for 18 cities; duplicate Zurich row merged.
   - Scan cities and benchmark cities: agent-run first passes merged (806 rows), but 92 of 98 "value" claims by the agents failed a cross-check of the quoted pages and were downgraded to `not_found` with the searches recorded; 6 survived verification.
   - Not done: deep second scans for the scan cities, benchmark-city deep checks, 67 coordinates, Red Bull directory athletes, Google Trends.
4. Block 4 (close): **done** with the checks below.

## Block 4 check results (run at close)
- No fact cites a source-host country different from the place (checked: only international WDSF/and8/Eurostat hosts remain, as allowed).
- Notes naming other cities: scanned after the proxy pass; the remaining mentions are inside `not_found` rows describing WHAT WAS Searched, not values.
- No source URL with spaces; no event with `not_checked` after the two manual-list exceptions.
- Every deep city x signal cell for breaking, salsa and bachata: 353/360 present (7 documented gaps, listed in closing_numbers.md).
- BC One 2026 = exactly 27 rows.
- Validator: `python viewer/validate_data.py` -> 0 errors, 1057 warnings.

## Final numbers
- facts: 1314 rows - 328 found, 14 stated_by_organiser, 13 inferred, 959 not_found.
- events: 98 rows; places: 148; orgs: 59; athletes: 23; sources: 205; relations: 11; review_log: 42.
- 5 source conflicts recorded on file (kept as separate rows, never averaged) - see the conflict notes on F000271/F000272, F000041, F000113 vs E000113 style rows, the AISA 2,000 vs 2,500 pair.

## Remaining (max 15 lines, all listed also in manual_collection_list.md)
1. Two `not_checked` sponsor pages (manual list items 3, 4).
2. Rendered-browser pass: BC One athlete directory (item 1), YouTube channel metrics (item 2).
3. Google Trends onl per city (item 5).
4. Non-EU benchmark city context (POP/STU/TOU etc., item 6).
5. 67 coordinates by local-language search (item 7).
6. STSV member-club count (item 8).
7. Second scans/second pass for the scan and benchmark cities.
8. Note: the subagent first passes are kept as search-records only; their non-verified value claims are all downgraded to not_found.

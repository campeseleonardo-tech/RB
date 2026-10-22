## Part A

### A1: Brussels population and age share
- Source: citypopulation.de, Brussels-Capital Region page (https://www.citypopulation.de/en/belgium/brussels).
- Added two rows with city "Brussels": C1_population 1,255,834 (2026) and C2_young_adults_share 31.96% (2026), notes "Brussels-Capital Region, pass 2; use this one". The City of Brussels rows (198,674; 34.2%) are kept.

### A2: Prague population and age share
- citypopulation.de still returned its human check. Used the Czech Statistical Office page for Prague (csu.gov.cz/pha/latest-statistical-data-capital-city-of-prague), notes "exception: other source".
- Added C1_population 1,409,528 (30 June 2026). The CSU page shows only the total; the 20-39 age bands were not on the page, so no C2 row was written (empty rather than an unverified value).

### A3: London air passengers and tourism nights
- C3: UK Civil Aviation Authority, Table 09 (annual 2024), terminal passengers summed for Heathrow 83,882,140; Gatwick 43,249,282; Stansted 29,694,316; Luton 16,939,902; London City 3,573,250; Southend 287,758 = 177,626,648. Notes "exception: UK source, not Eurostat".
- C5: ONS ad hoc 3423 (overseas nights in London 2024: 116,441,000) + VisitBritain/GLA domestic overnight nights London 2024 (37,285,000) = 153,726,000. Notes "exception: UK source, not Eurostat"; the ONS series includes all accommodation types, so the definition differs from Eurostat.

### A4: Red Bull office for Prague, Athens, Budapest, Bucharest, Brussels
- CZ: Red Bull Česká republika, Italská 2584/69, Praha 2 -> 1.
- GR: Red Bull Hellas, 59-61 Agiou Konstantinou, Marousi (Athens metro) -> 1.
- HU: Red Bull Hungária, Bécsi út 68-84, 1034 Budapest -> 1.
- RO: Red Bull Romania, Bd Corneliu Coposu 6-8, Bucharest -> 1.
- BE: no Red Bull office found; the market is handled by Jet Import NV, Lauwe (Menen), and Red Bull Belgium press contact sits there -> 0 for Brussels. Notes name the page.
- Sources: policies.redbull.com country imprints (CZ, GR, HU, RO) and red-bull-belgium.prezly.com.

### A5: Red Bull dance events 2024-2026 (C9_rb_dance_events)
- 15 project cities: counted from data/events.csv, events 2024-2026 with Red Bull involvement found or stated (not_checked and not_found excluded), cross-checked on redbull.com DYS/BC One pages.
- 9 other cities: 2 searches each ("Red Bull Dance Your Style <city>", "Red Bull BC One <city>") plus the redbull.com DYS 2026 event-dates page.
- Values: Salzburg 1, Innsbruck 1, Vienna 1, Graz 0, Munich 0, Berlin 1, Zurich 1, Milan 0, Rome 0, Barcelona 1, Madrid 1, Paris 1, London 3, Amsterdam 1, Warsaw 0, Prague 1, Athens 0, Budapest 1, Bucharest 1, Hamburg 1, Malaga 0, Cologne 0, Girona 0, Brussels 1.
- Athens: the 2026 Greek final is in Thessaloniki; qualifiers in Athens are mentioned in press but no redbull.com page with an Athens date was found, so 0 with the note.
- Prague: the 2025 Czech final was in Prague; the 2026 final moved to Brno.

## Summary (parts A and B)
- Part A: 5 fixes done. Brussels-Capital Region rows added (1,255,834; 31.96%); Prague population added (1,409,528), Prague age share not found; London C3 177,626,648 and C5 153,726,000 from UK sources; Red Bull offices added for Prague, Athens, Budapest, Bucharest (1) and Brussels (0); C9 for all 24 cities.
- Part B1: 104 events targeted, 104 visited/blocked (86 visited, 18 blocked); 91 of 149 in-scope events now have a full-pass price (was 84); 21 have a known price tier; 61 have a line-up (was 58); 49 still have neither.
- New line-ups: K00766 (8), K00714 (16), K00745 (5 DJs), K00683 (7 couples), K01479 (30). 750 artist rows, 536 distinct artists.
- Part B2: top 60 artists, 26 with a public Instagram follower count; base_country filled for 51 of 60.
- Still missing: 49 events without price or line-up; 34 of 60 artists without a verified follower count (private profile, no account found, or login wall).
- Part C: research/economics/cost_benchmarks.csv, 76 rows, K1-K14 all present (some items only one country or a single benchmark).
- Public pages only; no login; data/ untouched; research/manual_input.ods untouched.

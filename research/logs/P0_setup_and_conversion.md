# P0 - set-up and legacy conversion (2026-10-19)

No web searches in this phase. Mechanical work only:

- P0.1: data/ (11 header CSVs from viewer/sample_data), archive/, archive/quarantine/, research/logs/ created.
- P0.2: disciplines.csv - 30 rows (ALL synthetic + 29 disciplines; URB-WAA/URB-VOG/AFR-ZOUK/CAR-SAL-CL added per C1/C2; tricking/aerial/pole = out).
- P0.3: signals.csv - 18 rows (9 existing from workbook SignalDefs + 9 new per schema).
- P0.4: places.csv - 147 rows (15 deep, 36 scan, event-only cities, 50 country rows, GLOBAL; 3 duplicates removed).
- P0.5: sources.csv 73 rows; events.csv 75 (52 workbook RedBull + 18 A2 world finals + 10 B1 minus 4 duplicates removed, F-01..F-05 applied inline); organisations.csv 19; facts.csv 59; relations.csv 2; review_log.csv 13.
- P0.6: D7, C3, B5 NOT converted (quarantined in Phase 1 first).

Hand checks per data_schema section 4: 0 problems (own checker script; viewer/validate_data.py does not exist yet).

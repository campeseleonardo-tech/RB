ON HOLD (2026-10-20): do not run. Superseded by the research questions RQ1-RQ5 in project/project_memory.md (section 3); will be rewritten (to-do 1).

You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). This round tests one question: in 15 European cities, how large is the salsa/bachata world compared with the breaking world, measured the same way for both? Read first: project/analysis_and_plan.md (sections 3-5), project/data_schema.md (the data contract), README.md. Do not read the 49 result files unless a task names one.

THE 15 CITIES (place_id): SBG Salzburg, INN Innsbruck, VIE Vienna, GRZ Graz, MUC Munich, BER Berlin, MIL Milan, ROM Rome, BCN Barcelona, MAD Madrid, PAR Paris, AMS Amsterdam, LON London, WAW Warsaw, ZRH Zurich.
THE 3 DISCIPLINES (disc_id): URB-BRK breaking, CAR-SAL salsa, CAR-BCH bachata.
THE WINDOW: events and activity between 2025-11-01 and 2026-10-31. If a platform shows only upcoming events, use the next 12 months from the day you open it and write the exact dates in `period`.

RULES FOR THIS ROUND
- Same method for both worlds in every city. A count is only useful if the breaking count and the Latin count in that city were made the same way, on the same day, with the same window. If one side cannot be measured, write a `not_found` row for it with the reason; never mix methods.
- Use the exact `unit` strings given below, letter for letter. The viewer compares rows by unit.
- `task_id` = the task code (M1 ... M6). One row = one city x one discipline x one indicator.
- Never use one city's data for another (no "nearest", "regional", "same as"). Suburbs inside the city's metro area count for the city; say so in notes.
- Open the page and read the number; a search snippet alone is `confidence = L`, `access_status = not_opened`. Use a rendered (JavaScript) browser when needed and mark the source `rendered`. A login or consent wall = `blocked` + a line in research/manual_collection_list.md.
- Names of schools, events and organisations go in `notes` (they let a person check the count). No names of private individuals, no contact details.
- Never invent a number, a name or a URL. Search budget: 8 searches per cell, then `not_found` listing the searches.
- Log corrections in data/review_log.csv. Run `python viewer/validate_data.py` after each task. Keep IDs, never reuse them. English only. Git commits in Italian.

TASKS
M1 - Events listed on the reference platforms (signal EVT).
  Latin: goandance.com, filter by city and by style (salsa, bachata). Breaking: and8.dance, events with the city as location.
  units: `events listed on goandance.com (12 months)` for CAR-SAL and CAR-BCH; `events listed on and8.dance (12 months)` for URB-BRK.
  An event tagged salsa and bachata counts in both rows; write in notes how many are shared. List up to 10 event names in notes. 45 rows (15 cities x 3).
M2 - Schools with a weekly class in the style (signal SCH).
  Fixed search, the same for every city and style: (a) "<style> classes <city>" in English, (b) the same in the local language (e.g. "Salsa Kurs Wien", "corso salsa Milano", "clases de bachata Madrid", "cours de breakdance Paris", "kurs breakdance Warszawa"), (c) "<style> school <city>" in the local language. For each query read the first 20 results. Count distinct schools or studios whose OWN website shows a weekly class in that style in the current timetable (one-off workshops do not count). Breaking: search both "breaking" and "breakdance".
  unit: `schools with a weekly class (fixed search)`. Notes: the school names and the three queries. 45 rows.
M3 - Recurring socials and jams (signal EVT).
  Latin: weekly or monthly salsa/bachata socials (parties) in the city. Breaking: weekly or monthly jams, open practice sessions or training sessions open to all. Sources: organiser pages, city dance guides, school pages, public event pages. Count named recurring events active in 2026.
  unit: `recurring socials or jams (named, active 2026)`. Notes: names and frequency. 45 rows.
M4 - Largest events in or near each city (events.csv).
  For each city and world, the largest salsa/bachata congress or festival and the largest breaking battle or festival held in the city or its metro area in 2025 or 2026. Size from the organiser page with `scale_type` (participants vs attendees vs seats: do not mix). Read the official sponsor/partner page and set `red_bull_involvement`. Check first whether the event is already in events.csv (update instead of adding).
M5 - Audience of video content (signal MED, place GLOBAL).
  The 5 largest YouTube channels for breaking (include Red Bull BC One) and the 5 largest for salsa/bachata dance (dance channels, not music channels). For each: channel name in notes, subscribers and total views as shown on the channel page on the day.
  units: `YouTube subscribers (channel page)` and `YouTube total views (channel page)`. If YouTube is blocked, use a third-party statistics page as source, `evidence_type = inferred`, confidence L, and add the channel to the manual list.
M6 - Re-check flagged rows.
  Rows of the 15 cities x 3 disciplines whose notes start with `REVIEW 2026-10-20` (45 rows; see review_log L00043-L00048). For each: open the source; keep it (remove the REVIEW prefix, set the right confidence, fix unit and period) only if the page shows exactly that value for that city; otherwise turn it into `not_found` with the searches. Log each decision.

DONE WHEN
- M1, M2, M3: 45 rows each (a value or a `not_found` with the reason), all with the exact unit strings.
- M4: at least one Latin and one breaking event checked per city (row added, updated, or a `not_found` fact).
- M5: 10 channels or a manual-list entry for each one missing.
- M6: every flagged row decided.
- research/progress.md rewritten honestly for this round (max 30 lines): rows per task, cities where one side could not be measured and why, problems met.

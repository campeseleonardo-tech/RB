You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). This is round T: the smaller tasks left after round R, chosen in project/project_memory.md section 6b. Read first, in this order: project/project_memory.md (sections 2-6b), research/data_summary.md (what is on file now), project/data_schema.md (the data contract). Do not read research/results/. Everything outside this prompt is out of scope. A review by Claude follows this round: every number will be checked against its source.

SCOPE (unchanged)
- Cities: SBG, INN, VIE, GRZ, MUC, BER, MIL, ROM, BCN, MAD, PAR, AMS, LON, WAW, ZRH. Countries: AT, DE, IT, ES, FR, NL, UK, PL, CH.
- Disciplines: URB-BRK breaking (reference), CAR-SAL salsa and CAR-BCH bachata (case). Kizomba, zouk, dancehall and other hip hop styles: skip.

HOW TO WORK WITHOUT GETTING STUCK (the last round blocked several times)
1. Tasks T1 to T7 are independent. Do them in order, one at a time. Commit after each task (Italian message naming the task), so the work survives an interruption.
2. Keep a running log in research/logs/T_round.md: one line per item done or skipped (task, item, result, source id or reason). If you are interrupted, re-read the log and continue from the first item not in it.
3. Hard limits: 8 searches per item, then write the `not_found` row (searches in notes) and move on. One blocked page never stops a task: mark it `blocked`, add a line to research/manual_collection_list.md, continue with the next item.
4. If a whole task is impossible (e.g. YouTube refuses every page), write that in the log and in progress.md and go to the next task.

DATA RULES (same as round R)
- Exact `unit` strings in quotes below, letter for letter. `task_id` = the task code (T2.1 ...).
- Open the page and read the number; snippet only = confidence L, `access_status = not_opened`. Use a rendered browser where needed (`rendered`).
- Never use one place's data for another. Never invent a number, a name or a URL. Competitors are counted, never named.
- Before adding an event, organisation or source, search the CSV (name + place + date); update instead of adding.
- Log corrections and deletions in data/review_log.csv. Run `python viewer/validate_data.py` after each task. IDs never reused. English in the data, Italian in commits.

T1 - CLEAN-UPS (quick)
T1.1 E000033 (DYS Vienna 28 Jun 2026) and E000034 (DYS Spielberg 28 Jun 2026): open the official redbull.com Dance Your Style 2026 page (rendered). If they are not there and no other official Red Bull page confirms them, delete both rows and log it. Then re-run the R5.1 count for VIE and recount the fact if it changes.
T1.2 E000132 Campeonato de Espana de Breaking 2026 (FEBD): date, venue and number of competitors from the FEBD site, the host festival page or the and8.dance event page. If the results are published, add the CMP fact for ES URB-BRK (unit "competitors in the national championship (results list)", task T2.1).
T1.3 Population, city proper, for AMS (CBS or Eurostat urb_cpop1 code NL002C) and WAW (GUS or Eurostat PL001C): signal POP, disc ALL, unit "persons", `period` = reference year, notes = "city proper" + dataset code.
T1.4 Salsa ladder rows (LAD) cover bachata too: do not copy them. Add one sentence to each CAR-SAL LAD row's notes: "covers salsa and bachata (same circuit); no separate bachata row".

T2 - RQ2: NATIONAL CHAMPIONSHIP COMPETITORS (the main task of this round)
Goal: for each of the 9 countries x 2 worlds, the number of competitors in the last national championship (2025 or 2026), counted from the published results or start lists. Signal CMP, place = country, unit "competitors in the national championship (results list)", task T2.1.
Rules: count each person once per championship (a couple = 2 people; a person in several categories counts once if names allow it, otherwise count entries and say "entries, not people" in notes). Notes: event name, date, categories counted, couples vs solos, link to the results page. For Latin write one row for CAR-SAL and one for CAR-BCH; if the source does not split them, the same total in both rows and say so (as for Spain F001334/F001335). If there are rival national championships (federation and private), one row each, named in notes. Add or update the event in events.csv (level `national`, scale_type participants).
Missing cells (fill these):
- Breaking: CH (Swiss Breaking Championship), IT (Campionati Italiani Assoluti Breaking, E000134), ES (T1.2), NL (NK Breaking, NADB), UK (Breaking GB National Championships, E000122), PL (Mistrzostwa Polski Breaking, PZST).
- Salsa/bachata: AT (search for an Austrian salsa/bachata championship: federation or private), DE (DAT Deutsche Meisterschaft Latino-Taenze, E000129: 21 segments), CH (SFBT championship), IT (FIDS Campionati Italiani Assoluti Danze Caraibiche, E000135: 54 segments on TopTurnier), NL (NADB or private salsa/bachata championship), UK (UK salsa/bachata championships, private), PL (Polish salsa/bachata championship, federation or private).
T2.2 Script for segmented results (Italy, Germany): where results are split into many segment pages (TopTurnier exports, PDFs), write a small Python script in research/scripts/count_competitors.py (standard library only, plus the PDF tool already installed if any) that reads the saved pages or PDFs from research/scripts/input/ and prints: segments read, entries, distinct names, couples, solos. Save the pages by hand or by a permitted download (no scraping against the site's terms; one request per page, no bursts). Put the script output in the fact notes. If the pages cannot be saved, `not_found` with the reason.
T2.3 Breaking national championships already counted (AT 59, DE 107, FR 125): open each source once more and confirm the number (no change if it matches; log the check).

T3 - RQ3: MAIN EVENTS PER COUNTRY
Goal: per country and world, the 3 to 5 largest events of 2025 or 2026: Latin = congresses, festivals, weekenders (social or with a competition section); breaking = battles, festivals, championships with an international field. Use organiser pages first; to find candidates use goandance.com country listings, salsa/bachata festival calendars, and8.dance major events, national federation calendars, press.
For each event: events.csv row (update if present) with city (add the place to places.csv with role `scan` if it is not there, with a source for its coordinates if available), dates, organiser, `scale_value` + `scale_type` (participants, attendees or seats; never mixed; if the organiser gives both participants and spectators, put participants in the row and spectators as a fact, signal MED, unit "spectators stated"), `scale_evidence`.
Facts per event, place = the event's country, disc = the event's discipline, event id in notes, task T3.1:
- signal PRC, unit "EUR full pass, main event" (lowest regular full-pass price on the official ticket page; early-bird in notes; other currencies converted at the ECB rate of the access day, original in notes);
- signal EVT, unit "countries of participants stated, main event" (only if the organiser states it).
Up to 5 events per country and world (maximum 90 events). Stop a country after 8 searches per world if no size is published, and record what was found.

T4 - RQ5: SPONSORS
T4.1 For every event of T2 and T3 and every event with `red_bull_involvement = not_checked`: read the official sponsor or partner page (not a search); set `red_bull_involvement`; one relations.csv row `sponsors` per named brand (create the brand in organisations.csv, org_type brand_sponsor, scope as stated, with the source).
T4.2 Then write the 30 Latin rows of R5.1 (15 cities x CAR-SAL, CAR-BCH): signal ORG, unit "Red Bull dance events 2024-2026", value 0 only if no Red Bull event or sponsorship was found on the pages read in T3/T4 and on redbull.com (search "salsa", "bachata" on the national redbull.com sites of the 9 countries); otherwise the count with the event ids. Notes: the pages checked.

T5 - RQ4: VIDEO AUDIENCE
For each competition below, find the official video of the latest final (2025 or 2026) and the most viewed final video of the competition. Place GLOBAL, signal MED, task T5.1, discipline as noted:
- Red Bull BC One World Final (URB-BRK); Red Bull Dance Your Style World Final (URB-BRK, note "all styles");
- World Latin Dance Cup, World Salsa Summit or The Summit Championships, Euroson Latino, WDSF World Caribbean Dance Championships (CAR-SAL; CAR-BCH when the video is a bachata final); the largest bachata championship found in round R or T2.
Units: "YouTube views, latest final video" and "YouTube views, most viewed final video" (title, upload date and URL in notes; the channel name in notes). Also "YouTube subscribers (channel page)" for every channel not yet on file. If YouTube shows a consent wall in the rendered browser, try once with the consent accepted; if still blocked, use one third-party statistics page as `inferred`, confidence L, and add the video to the manual list.

T6 - RQ1: PILOT IN TWO CITIES (Vienna, Milan)
Purpose: test whether a school count is possible before doing 15 cities. Do it carefully rather than fast.
T6.1 Schools with a weekly class: fixed queries, the same for both cities and the three styles: (a) "<style> classes <city>" in English; (b) local language ("Salsa Kurs Wien", "Bachata Kurs Wien", "Breakdance Kurs Wien"; "corso salsa Milano", "corso bachata Milano", "corso breakdance Milano"); (c) "<style> Tanzschule Wien" / "scuola di <style> Milano". Breaking: also with "breaking". Read the first 20 results of each query. Count distinct schools whose OWN website shows a weekly class in that style in the current timetable (workshops do not count; branches count once). Signal SCH, unit "schools with a weekly class (fixed search)", task T6.1. Notes: school names and the queries. 6 rows.
T6.2 Weekly class slots: for the schools of T6.1 (all of them, up to 25 per cell), sum the weekly classes of that style shown in their timetables. Signal SCH, unit "weekly class slots (schools of R1.1)", task T6.2. Notes: slots per school. 6 rows.
T6.3 Recurring socials (Latin) and jams / open practice sessions (breaking), weekly or monthly, active in 2026. Signal COM, unit "recurring socials or jams (named, active 2026)", task T6.3. Notes: names and frequency. 6 rows.
T6.4 In the log, write the time spent per city and per style, and what made counting hard. This decides whether to scale to 15 cities.

T7 - CLOSE
1. `python viewer/validate_data.py` (0 errors).
2. `python research/build_data_summary.py` (regenerates research/data_summary.md).
3. research/progress.md rewritten honestly for round T (max 30 lines): rows per task, cells still missing and why, what blocked, time spent on T6, open questions for Leonardo (max 5).
4. research/manual_collection_list.md: remove the items done, add the new blocked ones.
5. Commit and `git push origin main`. The round is not finished until the push is done.

DONE WHEN
- T1: four items done or logged. T2: the 20 missing cells filled or `not_found` with reason; the 3 existing counts confirmed. T3: every country x world has at least one event checked (row or `not_found`). T4: no event of T2/T3 left `not_checked` unless its page is blocked (manual list); 30 Latin R5.1 rows. T5: every listed competition has its rows or a manual-list line. T6: 18 rows plus the time log. T7: pushed.

You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Round Y builds a CENSUS of the event market in Europe for three worlds: Latin (salsa, bachata), breaking, and Hyrox as a reference (a participation market where Red Bull already plays). Read first: project/project_memory.md, project/data_schema.md (sections 2, 3, 5). Do not read archive/ or outputs/. Claude merges the lists and computes the results afterwards.

WHY
So far each world was seen through one platform (goandance, and8.dance). Before saying which market is bigger or growing, we need the lists of several sources per world, crossed with each other: the overlap tells how much each source covers and how many events exist in total. We also want the trend over the last 24 months.

SCOPE
- Europe = the EU, UK, Switzerland, Norway, Iceland, the Western Balkans, Ukraine, Moldova. Excluded: Russia, Belarus, Turkey (write them in a list only if a source mixes them in; mark notes "outside scope").
- Window: events starting 2024-11-01 to 2027-10-31 (past 24 months + next 12).
- Latin: congresses, festivals, weekenders of salsa and/or bachata (not weekly socials, not classes; skip kizomba/zouk-only). Breaking: battles, jams with a battle, festivals and championships (all-styles events if breaking is a category). Hyrox: every Hyrox race (and official Hyrox-format events) in Europe.
- Red Bull events are listed like the others, with notes "Red Bull".

BUDGET (important: keep it cheap)
- Collect LISTS, not event pages: one listing page gives many events. Open single event pages only in Y4.
- Y1 discovery: at most 12 searches per world.
- Never more than 3 attempts on a blocked page; mark it and move on.
- One-line notes. No downloads kept except the CSV lists below. One line per source and per step in research/logs/Y_round.md, so the work can resume after an interruption.
- Leonardo commits and pushes.

Y1 - FIND THE SOURCES (per world, 3 to 5 sources)
Look for public listing pages that cover many events in Europe: event platforms, festival and congress calendars, ticket platforms with a dance category (e.g. Eventbrite category pages), federation and circuit calendars (WDSF, national federations), battle calendars and ranking sites, the official Hyrox race calendar and its results pages. goandance.com (Latin) and and8.dance (breaking) are already known; add at least two independent sources per world. In the log, for each source: URL, what it covers, whether it shows past events, roughly how many events, whether its pages can be read without login.

Y2 - HARVEST THE LISTS
For each source, one CSV in research/census/ named <world>_<source>.csv (e.g. latin_goandance.csv, breaking_and8.csv, hyrox_official.csv) with exactly these columns:
source, world, name, city, country_iso2, date_start, date_end, price_eur, listing_url, notes
- world = latin | breaking | hyrox. date_start ISO (YYYY-MM-DD; YYYY-MM if the day is not shown). price_eur only if the listing shows it (convert other currencies at the ECB rate of the access day; original in notes). One row per event edition as listed; do not merge across sources (the script does that).
- Read every page of the listing (pagination) inside the window. If a list stops loading, write in notes and in the log how many were read and how many the counter says.
- Past events: if a source removes them (goandance does), use its past editions or archives where public. Do not reconstruct events from memory.
- The existing frames research/frames/latin_frame.csv and breaking_frame.csv may be copied into the new format as latin_goandance.csv and breaking_and8.csv (same events, columns mapped), to save time.

Y3 - TREND FROM ARCHIVED SNAPSHOTS (cheap and consistent)
For the main listing page of each source (goandance country or Europe listings, and8.dance upcoming events, the Hyrox race calendar, and any other source with a stable URL), open the Internet Archive's snapshots (web.archive.org) closest to 2024-10-21 and 2025-10-21, and the live page today. Record the number of upcoming events the page shows (its counter, or the count of cards on the page) at each date. Facts: place GLOBAL or the country of the listing, disc CAR-SAL / URB-BRK / ALL (Hyrox: ALL with "Hyrox" in notes), signal EVT, unit "events listed on <source>, snapshot", period = the snapshot date, notes = the snapshot URL and what was counted. `not_found` if no snapshot exists for that date.

Y4 - DEPTH ON THE LARGEST EVENTS (30 per world, Hyrox 15)
Pick the largest events of the window from the lists (by stated size where known, otherwise by Instagram followers already on file, otherwise by the number of sources listing them; write the rule used in the log). For each, one visit to the official site (home, tickets, partners) and reuse what is on file:
- events.csv row (update if present): name, city, dates, organiser, scale_value + scale_type (participants, attendees or seats; never mixed), scale_evidence.
- Facts with the standard units: EVT "participants stated (dancers)" (Hyrox: athletes), MED "spectators stated", EVT "event days (stated)", EVT "editions held (stated)", PRC "EUR full pass, main event" / "EUR spectator ticket, main event" / "EUR competitor entry fee", ORG "drinks brands named as sponsors (event)" (brands as organisations + relations `sponsors`), MED "Instagram followers (profile page)" only if not already on file.
- Past editions: if the site or press states the size of earlier editions (e.g. 2024, 2025), one fact per edition with `period` = that year: this shows growth.

Y5 - BUSINESS CASE, LIGHT (only what is public and quick)
- Red Bull's role in Hyrox and similar participation formats: official announcements (partner, official drink, organiser, sampling), one fact or event note per role found.
- Public sponsorship offers of Latin congresses and breaking events (sponsor packs, "become a partner" pages with tiers or prices): one fact per document, unit "sponsorship tier price stated" (EUR), notes = tier name and what it includes. Stop after 10 documents per world or 15 searches in total.

CLOSE
1. `python scripts/census_merge.py` (prints the merge, the overlaps and the estimated totals; writes research/census/merged_events.csv).
2. `python scripts/validate_data.py` (0 errors) and `python scripts/build_data_summary.py`.
3. research/logs/Y_round.md ends with a summary (max 20 lines): sources per world and their coverage, listings and distinct events per world, snapshot counts per date, what was blocked. No conclusions: Claude analyses.
4. Delete temporary files. Tell Leonardo it is ready to commit.

DONE WHEN: at least 3 sources per world harvested (or the reason why not); merged_events.csv written; snapshot counts for the main sources at 3 dates (or not_found); 30 + 30 + 15 largest events with depth rows; light business-case rows; validator 0 errors.

You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). This is a long overnight round (AB) in three parts. Do them in order: A (short fixes), B (second pass on the events), C (public cost benchmarks). You only COLLECT; Claude analyses afterwards.

Read first: project/project_memory.md (sections 1-3 and 8). Do not read archive/ or outputs/.

GENERAL RULES (all parts)
- Public pages only. No login, no paywall, no quote requests, no contact forms. A page that does not load after 2 tries: write "blocked" in notes and go on.
- Write only what the page shows. Never guess or estimate. Empty is fine; say in notes what was missing.
- Artists are public professional figures: stage name, kind, styles, the country shown publicly, public follower counts. Nothing else.
- Prices in EUR; other currencies at the ECB rate of the day (original in notes).
- NEVER delete or overwrite a value already filled. Fill only empty cells, and add "pass 2" to the notes of every row you change.
- Log one line per step (or per 20 events) in research/logs/AB_log.md and save the files after each step, so the next session can continue from the log if you stop.
- Do not commit or push: Leonardo does it. Never touch research/manual_input.ods.

PART A - FIXES TO THE CITY INDICATORS (research/cities/city_indicators.csv; about 30 page reads)
Add rows or fill empty values; keep the columns of the file.
A1 Brussels population: the value on file (198,674) is the City of Brussels municipality only. Add the Brussels-Capital Region from the same source (citypopulation.de) as a second row with indicator C1_population and notes "Brussels-Capital Region, pass 2; use this one". Same for C2 (age shares of the Region) if citypopulation.de shows them.
A2 Prague population and age shares (C1, C2): citypopulation.de had a human check; try again; if it still blocks, use the Czech Statistical Office (csu.gov.cz) and write the source in notes ("exception: other source").
A3 London air passengers (C3) and tourism nights (C5): Eurostat has no UK 2024 data. Use the UK Civil Aviation Authority annual airport statistics 2024 (sum Heathrow, Gatwick, Stansted, Luton, City, Southend) and, for C5, ONS or VisitBritain nights for London (latest year). Notes: "exception: UK source, not Eurostat".
A4 Red Bull office (C10) for Prague, Athens, Budapest, Bucharest, Brussels: the Red Bull country website imprint or contact page of CZ, GR, HU, RO, BE (1 if the office is in the city or metro, 0 if elsewhere, empty if not found).
A5 Red Bull dance events 2024-2026 (C9): for the 9 cities not in the project list (Prague, Athens, Budapest, Bucharest, Hamburg, Malaga, Cologne, Girona, Brussels), 2 searches each: "Red Bull Dance Your Style <city>" and "Red Bull BC One <city>". Value = number of distinct Red Bull dance events in the city 2024-2026 found on redbull.com pages (count only pages that name the city and a date). For the 15 project cities copy the count from data/events.csv (events with red_bull_involvement not empty, disc breaking or mixed street styles, 2024-2026, place = the city) with notes "on file". Write all 24 rows with indicator C9_rb_dance_events.

PART B - SECOND PASS ON THE EVENTS (about 250 page reads)
B1 Events without a price or without a line-up. In research/prices/latin_events_detail.csv, take the in-scope rows (notes not "out of scope") where full_pass_eur is empty OR the event has no artist rows with a kind in research/artists/lineups.csv (about 100 events). Most were read only on a listing page. Now find the OFFICIAL website of the event (link on the listing page, or search "<event name> 2026" / "<event name> 2027"), and read at most 3 pages: home, tickets or passes, artists or line-up.
- Fill the empty cells of the same row (full_pass_eur, full_pass_tier, full_pass_max_eur, party_pass_eur, hotel_package..., venue_name, venue_type, artists_count, djs_count, competition, live_band, size_stated) and add "pass 2" in notes.
- Write the full_pass_tier every time a price table shows it (early_bird, regular, door).
- competition and live_band: write "no" when the full programme is readable and shows none (so that absence is recorded, not only presence).
- Line-ups: add rows to research/artists/lineups.csv as in AA1 (same columns, same artist_norm spellings; new merges in research/artists/name_map.csv). Replace the old "line-up not listed" row of that event only if you now found the line-up (delete that single placeholder row).
B2 Instagram of the most booked artists. Recount events per artist_norm after B1 (couples and solo teachers, not DJs). For the top 60: if artist_reach.csv has no follower value, find the official Instagram account from the artist's own website, their goandance artist page, or a search "<artist name> instagram bachata/salsa", open the public profile and write followers. Add the rows for the new artists (top 41-60) to research/artists/artist_reach.csv with the same columns, plus a new last column base_country (the country the artist states publicly on their site or profile; empty if not stated). Fill base_country for the existing 40 too.
- If Instagram asks for a login, wait and try once more later; if it still asks: leave empty, notes "login wall".
B3 At the end of part B, add to research/logs/AB_log.md: rows now with a price, with a tier, with a line-up; artists with followers (of 60); events still without anything.

PART C - PUBLIC COST BENCHMARKS
Run project/prompt_aa3_costs.md exactly as written (items K1-K14, output research/economics/cost_benchmarks.csv, log research/logs/AA3_log.md). Its rules apply.

END
- research/logs/AB_log.md ends with a summary of max 15 lines for parts A and B; AA3_log.md has its own table.
- Run `python scripts/validate_data.py` (data/ untouched: 0 errors). Delete temporary files. Tell Leonardo it is ready to commit.

DONE WHEN: A1-A5 written (or "not found" with sources tried); every B1 event visited once more (or "blocked"); artist_reach.csv with 60 rows; part C done as in its prompt.

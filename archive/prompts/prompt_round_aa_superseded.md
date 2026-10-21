You are the research agent of the Dance Scene Atlas project (repository campeseleonardo-tech/RB), in a cloud session with full web access. Round AA studies the Latin congress market from the inside, on one random sample of events read once:
- AA1 PRICES: what a Latin event costs a dancer, and what makes the price go up (days, line-up, venue, country, size).
- AA2 ARTISTS: which artists the congresses book, how concentrated the circuit is, and whether a few artists connect most events.
Why it matters: for Red Bull, the circuit is fragmented (hundreds of organisers); if a small group of artists appears at most congresses, they are the network that connects it. For an organiser, prices and line-ups show which format sells.

Read first: project/project_memory.md (sections 7e, 7f, 8), outputs/analysis.md sections 10-12, project/data_schema.md section 1. Do not read archive/.

GIT (overrides CLAUDE.md for this round)
- Work on the branch your session gives you (if none: `round-aa`). Commit in Italian after each step, push that branch. Do NOT push to main, no pull request: Claude checks and merges. Never touch research/manual_input.ods.

RULES
- Public pages only; no login, no paywall, no unofficial APIs. Blocked after 3 tries: write blocked, move on.
- Artists are public professional figures: record only their public stage name, kind (couple, solo, DJ, band, MC), styles, the country stated on the event page, and public follower counts. Nothing else about any person.
- Searched and not found is a result: leave the cell empty and write what was missing in notes. Never guess a value.
- Prices in EUR; other currencies at the ECB rate of the access day (original in notes).
- Log one line per 10 events in research/logs/AA_round.md, so the work can resume after an interruption.
- Budget: about 350 page reads and searches. Do not put new CSVs in research/census/.

THE SAMPLE (already drawn, do not redraw)
- research/frames/aa_latin_frame_sample.csv: 150 Latin events drawn at random (seed 20261021) from the 450 Latin congresses and festivals of the next 12 months in the census (frame: research/frames/aa_latin_frame.csv). Listing URLs are in research/census/latin_goandance.csv, latin_latindancecalendar.csv and latin_salsavida.csv (match by name and date).
- Plus the Latin events of research/sizes/large_events.csv with in_comparison = yes (12 events, sample = large; event_key = L01 to L12 in the order of that file), so that size can be linked to price and line-up. If a large event is also in the random sample, keep one row (sample = random) and say so in notes.

STEP 1 - ONE VISIT PER EVENT (cap 2 reads per event: the official site or ticket page, then the listing if the site fails)
Write research/prices/latin_events_detail.csv, one row per event, columns:
event_key, sample (random | large), name, city, country_iso2, date_start, date_end, days, party_nights_stated, venue_name, venue_type (hotel | convention_centre | club_or_dance_school | other | unknown), full_pass_eur, full_pass_tier (early_bird | regular | door | only_price | unknown), full_pass_max_eur (highest tier shown, if a price table shows several), party_pass_eur, day_pass_eur, hotel_package (yes | no | unknown), hotel_package_eur, hotel_package_basis (notes what the price covers: nights, per person or room, pass included), workshop_rooms_stated, workshop_hours_stated, artists_count (couples and solo teachers in the line-up), djs_count, live_band (yes | no | unknown), competition (yes | no | unknown), size_stated, size_year, styles (salsa | bachata | both | other mix), source_url, access_date, notes
- days = date_end - date_start + 1 from the event page (not from the census).
- If the event page is gone or moved to the next edition, read the current edition and say so in notes.
- If the event is cancelled or not a congress/festival (a weekly party, a class series), write the row with notes "out of scope" and leave the fields empty.

STEP 2 - LINE-UPS (from the same visit, no extra reads)
research/artists/lineups.csv, one row per artist per event:
event_key, artist_as_listed, artist_norm, kind (couple | solo | dj | band | mc), styles, country_stated, notes
- artist_norm: one spelling per artist across events (a couple keeps the order shown most often; "&", "and", "y" become " & "; accents kept). Keep a short mapping file research/artists/name_map.csv (artist_as_listed, artist_norm) for every variant you merged.
- If the line-up is an image you cannot read or not yet announced, write one row with kind empty and notes "line-up not readable" or "not announced".

STEP 3 - THE MOST BOOKED ARTISTS (cap 60 searches)
For the 40 artists (couples and solo teachers, not DJs) with the most events in lineups.csv: their Instagram followers. Instagram blocks cloud sessions: use a search result that shows the count (search "<name> instagram followers"), or the artist's own website; write the date shown if any, else "snippet, date unknown". File research/artists/artist_reach.csv: artist_norm, events_in_sample, instagram_followers, source_url, access_date, notes. Also reuse data/athletes.csv and the facts in data/facts.csv (unit "Instagram followers (profile page)") when the artist is already on file: write "on file" in notes.

STEP 4 - ANALYSIS SCRIPTS (standard library only; numpy allowed if installed)
a) scripts/price_study.py reads latin_events_detail.csv and prints, then writes outputs/price_study.md:
   - coverage: events read, in scope, with a full pass price, with a line-up;
   - full pass: median, 25th and 75th percentile, 90% bootstrap interval of the median (10,000 resamples, seed 20261021), overall and by: days (1-2, 3, 4+), country (only countries with 8+ events, else "other"), venue_type, styles, artists_count tercile, presence of at least one top-20 artist (from step 5), size class where stated (under 300, 300-999, 1,000+);
   - price per day (full pass / days), same groups;
   - Spearman correlation of full pass with days, artists_count, djs_count, size_stated (with n);
   - a simple linear model of log(full pass) on days, artists_count, hotel venue (0/1), and region (South: ES, IT, PT, GR, HR, MT, CY; West: FR, BE, NL, LU, UK, IE, CH, AT, DE; Centre-East: the rest; North: DK, SE, NO, FI, IS), with coefficients and n; skip it and say so if fewer than 60 events have all values;
   - party pass and hotel package: median and share of events offering them;
   - early bird vs door: median difference where both are shown.
b) scripts/lineup_study.py reads lineups.csv and artist_reach.csv and writes outputs/lineup_study.md:
   - events with a readable line-up; artists per event (median); distinct artists;
   - the top 30 artists by number of events in the sample, with their followers;
   - concentration: share of events booking at least one of the top 10 / top 20 / top 40 artists;
   - reach of a few partnerships: the smallest set of artists (greedy set cover) that appears in 50% and in 80% of the events with a readable line-up, with the list;
   - by country: share of foreign artists (country_stated differs from the event country, where both are known);
   - link with step 1: median full pass and median stated size of events with vs without a top-20 artist.
Every number in the two reports shows its n. No conclusions beyond what the numbers say; Claude writes the reading.

CLOSE
1. `python scripts/price_study.py` and `python scripts/lineup_study.py` run without errors; `python scripts/validate_data.py` 0 errors.
2. research/logs/AA_round.md ends with a summary (max 20 lines): events read, in scope, with price, with line-up; distinct artists; blocked pages; reads used.
3. Delete temporary files, commit, push the branch, tell Leonardo the branch name.

DONE WHEN: all 162 events have a row (filled, out of scope, or not found); lineups.csv and name_map.csv written; artist_reach.csv for the top 40; both scripts and both reports written; branch pushed.

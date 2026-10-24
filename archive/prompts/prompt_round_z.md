You are the research agent of the Dance Scene Atlas project (repository campeseleonardo-tech/RB), running in a cloud session with full web access. Round Z answers three questions with data that can be found without excessive effort:
1. How many LARGE events does each world have per year (Latin vs breaking), by size class?
2. How many breaking events are there per year, counted with the same method as Latin (several sources crossed)?
3. How much attention (hype) do events get on social media, large and typical events, Latin vs breaking?

Read first: project/project_memory.md, project/business_case_model.md, project/data_schema.md (sections 1-5), outputs/analysis.md section 11 (the census). Do not read archive/.

GIT (overrides CLAUDE.md for this round)
- Work on the branch your session gives you (if none: `round-z`). Commit in Italian after each task (Z1, Z2...) and push that branch. Do NOT push to main, do not open a pull request: Claude checks and merges. Never touch research/manual_input.ods.

RULES
- Public pages only: no login, no paywall bypass, no unofficial APIs. If a page needs a login or blocks the session, max 3 attempts, then write it as blocked and move on.
- No personal data of private people: organisations and public professional figures only.
- Never write "Red Bull absent". Red Bull's own events are recorded with notes "Red Bull" but never used as the comparator.
- Searched and not found is a result: write the row with evidence not_found and what was searched.
- Every row: source URL and access date. One-line notes.
- Budget: about 300 page reads and searches in total; caps per task below. Log one line per step in research/logs/Z_round.md so the work can resume after an interruption.
- Do not put new CSVs in research/census/ except the breaking source lists of Z2 (the merge script reads every CSV there).

Z1 - SIZE OF THE LARGE EVENTS (cap 120 reads)
Window: events with an edition between 2025-10-21 and 2026-10-20 (the last 12 months). Size: the latest edition with a stated size (2024-2026).
a) Candidates, up to 60 per world, in this order of priority:
   Latin (salsa, bachata congresses and festivals): the Latin events of data/events.csv (sizes on file count: scale_value); the events with the most Instagram followers on file (facts MED "Instagram followers (profile page)"); 3 searches such as "biggest salsa congress Europe", "largest bachata festival Europe", the same in Spanish and Italian.
   Breaking (battles, jams with a battle, festivals, championships): the breaking events of data/events.csv; the series known to be large (e.g. Outbreak Europe, IBE, Battle Pro, BOTY, Undisputed, Freestyle Session Europe, WDSF and national championships, Summer Dance Forever); 3 searches such as "biggest breaking battle Europe 2026", "largest bboy event Europe".
   Write the list with its rank in research/sizes/candidates.csv (world, rank, name, city, country_iso2, why_candidate, census_event_key if found in research/census/merged_events.csv).
b) For each candidate in rank order: one search "<name> <year> dancers / participants / visitors / spectators" (also in the local language), then at most one read of the official site or a press article. Write research/sizes/event_sizes.csv with columns:
   world, name, city, country_iso2, edition_year, size_type, size_value, size_low, size_high, evidence_type, confidence, source_url, access_date, red_bull_event (yes/no), notes
   size_type, one of: participants (dancers or breakers taking part), attendees (all people stated, e.g. "6,000 visitors"), spectators, passes_sold, venue_capacity (main hall of the stated venue), battle_entries (count of a published participants list or bracket; top 16 is a lower bound: size_low), none. Never add types together; two types = two rows. evidence_type: found, stated_by_organiser, not_found.
c) Stopping rule per world: stop when 10 candidates in a row have no stated size of 300 or more (stated smaller, or not found). Note in the log where you stopped.

Z2 - BREAKING COUNTED LIKE LATIN (cap 60 reads)
Latin was counted from 3 independent listings crossed (capture-recapture). Breaking so far has one (and8.dance). Find 2-3 more independent listings of breaking events in Europe with past events visible, e.g. bboyrankingz.com (events and results), national federation or ranking calendars (France FFD, Germany DTV breaking ranking, Netherlands, Poland), battle calendar sites or accounts with a public web page. In the log for each: URL, coverage, events in window, readable or not.
For each usable source, one CSV research/census/breaking_<source>.csv with exactly the census columns:
source, world, name, city, country_iso2, date_start, date_end, price_eur, listing_url, notes
world = breaking; window 2024-11-01 to 2027-10-31; Europe as in the census (excluding Russia, Belarus, Turkey). One row per event edition; read every page of the listing.
A national calendar that covers only one country is still useful: it tells what share of that country's events and8.dance lists. Then run `python scripts/census_merge.py`.

Z3 - SOCIAL ATTENTION PER EVENT (cap 100 reads)
Events: (a) the events of Z1 with a stated size of 300 or more, both worlds; (b) the random samples of typical events already drawn: research/frames/size_frame_latin_sample.csv (40) and research/frames/size_frame_breaking_sample.csv (30).
For each event, the official Instagram profile (find it from the event site or the listing; skip the event if none):
- followers, posts, and, if visible without login, the likes and comments of the last 6 posts (average).
For the events of (a) only, also: the most viewed YouTube video of the event (views and upload date; search "<name> official" on YouTube) and TikTok followers if the event has an account.
Write research/social/event_social.csv with columns:
world, sample (large | random), name, platform (instagram | youtube | tiktok), metric (followers | posts | avg_likes_last6 | avg_comments_last6 | video_views | upload_date), value, profile_url, access_date, notes
If Instagram blocks the cloud session (login wall on every profile after 3 tries), stop Instagram, write it in the log, and use what is visible in search results or on the event site (follower counts shown there), with notes "search snippet".

Z4 - DRINKS BRANDS (no extra reads)
While reading event sites in Z1 and Z3, if a partners or sponsors section exists, note drinks brands: facts ORG "drinks brands named as sponsors (event)" (value = number of drinks brands, notes = brands, event, year) and, for an energy drink, BEV "energy drink role at event stated" (notes: role). Count in the log how many sites had a partners section.

Z5 - HYROX SIZE (cap 5 reads)
Finishers per European Hyrox race, latest complete season (e.g. hybridfitnessmedia.com season review, official results, press): research/sizes/hyrox_finishers.csv with columns season, race_name, city, country_iso2, date_start, finishers, source_url, notes. Facts EVT "races held (season, Europe)" and "finishers (season, Europe)" if stated.

CLOSE
1. `python scripts/validate_data.py` (0 errors) and `python scripts/build_data_summary.py`.
2. research/logs/Z_round.md ends with a summary (max 25 lines): per task rows written, found vs not_found; Z1 where each world stopped and how many events per size class; Z2 sources and their overlap with and8.dance as printed by census_merge; Z3 how many profiles read, whether Instagram blocked; reads used. No conclusions: Claude analyses.
3. Delete temporary files, commit, push the branch, and tell Leonardo the branch name.

DONE WHEN: candidates.csv and event_sizes.csv written with the stopping rule applied in both worlds; at least 2 new breaking sources harvested or the reasons why not, census_merge run; event_social.csv for the large events and the 70 sampled events (or the blocking documented); hyrox_finishers.csv written or not_found; validator 0 errors; branch pushed.

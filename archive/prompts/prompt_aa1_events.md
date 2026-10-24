You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Task AA1: read 162 Latin congresses and festivals once each and write down what each one publishes: prices, length, venue, line-up. Then the followers of the most booked artists. You only COLLECT; Claude analyses afterwards (what has enough data is used, the rest is set aside).

Read first: project/project_memory.md (sections 1-3 and 8). Do not read archive/ or outputs/.

RULES
- Public pages only. No login, no paywall. A page that does not load after 2 tries: write "blocked" in notes and go to the next event.
- Write only what the page shows. Never guess. An empty cell is fine; say in notes what was missing.
- Artists are public professional figures: write only their stage name, kind, styles, the country shown on the event page, and public follower counts.
- Prices in EUR. Other currencies: convert at the ECB rate of today and write the original in notes.
- Work in batches of 20 events. After each batch, add one line to research/logs/AA1_log.md (batch number, events done, blocked) and save the CSV files: if you stop, the next session continues from the log.
- Do not commit or push: Leonardo does it. Never touch research/manual_input.ods.

THE EVENTS (do not choose others)
1. research/frames/aa_latin_frame_sample.csv: 150 events drawn at random. Their listing pages are in research/census/latin_goandance.csv, latin_latindancecalendar.csv and latin_salsavida.csv (find the row with the same name and date; use its listing_url).
2. The 12 Latin events of research/sizes/large_events.csv with in_comparison = yes. For these, event_key = L01 to L12 in the order of that file. If one of them is also among the 150, write it once (sample = random) and say so in notes.

STEP 1 - ONE VISIT PER EVENT (at most 2 pages per event: the official site or its ticket page; if it fails, the listing page)
File research/prices/latin_events_detail.csv, one row per event, these columns in this order:
event_key, sample, name, city, country_iso2, date_start, date_end, days, party_nights, venue_name, venue_type, full_pass_eur, full_pass_tier, full_pass_max_eur, party_pass_eur, day_pass_eur, hotel_package, hotel_package_eur, hotel_package_basis, workshop_rooms, workshop_hours, artists_count, djs_count, live_band, competition, size_stated, size_year, styles, source_url, access_date, notes
- sample: random or large.
- days: from the dates on the event page (date_end minus date_start plus 1).
- party_nights: number of evening parties if the programme shows them.
- venue_type: hotel, convention_centre, club_or_dance_school, other, unknown.
- full_pass_tier: early_bird, regular, door, only_price, unknown (the tier of the price you wrote in full_pass_eur). full_pass_max_eur: the highest full pass price if a table shows several tiers.
- hotel_package: yes, no or unknown. hotel_package_basis: what the price covers (how many nights, per person or per room, pass included or not).
- live_band, competition: yes, no or unknown.
- size_stated: a number of dancers or participants only if the page states it; size_year: the edition it refers to.
- styles: salsa, bachata, both, or other mix.
- If the event is cancelled, or is not a congress or festival (a weekly party, a class series): write the row with notes "out of scope".
- If the page already shows the next edition, read that one and write "next edition" in notes.

STEP 2 - LINE-UPS (from the same pages, no extra visits)
File research/artists/lineups.csv, one row per artist per event:
event_key, artist_as_listed, artist_norm, kind, styles, country_stated, notes
- kind: couple, solo, dj, band, mc.
- artist_norm: the same spelling for the same artist across events. Couples: write "Name1 & Name2" in the order seen most often; keep accents.
- Every time you merge two spellings, add a line to research/artists/name_map.csv: artist_as_listed, artist_norm.
- If the line-up is an image you cannot read, or not announced yet: one row with kind empty and notes "line-up not readable" or "not announced".

STEP 3 - THE MOST BOOKED ARTISTS (at most 60 page visits)
Count the events per artist_norm in lineups.csv (couples and solo teachers, not DJs). For the 40 with most events, open their public Instagram profile (find it from the event page or a search) and write the followers.
File research/artists/artist_reach.csv: artist_norm, events_in_sample, instagram_url, instagram_followers, access_date, notes
- If the artist is already in data/athletes.csv with followers in data/facts.csv, copy the value and write "on file" in notes.
- If Instagram asks for a login, try once more later; if it still asks, leave followers empty and write "login wall".

END
- research/logs/AA1_log.md ends with a summary of max 10 lines: events read, out of scope, blocked; how many rows have a full pass price, days, venue type, line-up, size; distinct artists; artists with followers.
- Run `python scripts/validate_data.py` (data/ was not changed, so it must still say 0 errors).
- Delete temporary files. Tell Leonardo it is ready to commit.

DONE WHEN: 162 rows in latin_events_detail.csv (filled, out of scope or blocked); lineups.csv and name_map.csv written; artist_reach.csv with 40 rows.

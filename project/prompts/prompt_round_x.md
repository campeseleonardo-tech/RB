You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Round X tests the project's hypotheses against confirmation bias: a RANDOM sample of events, symmetric comparisons and a search for counter-evidence. Read first: project/project_memory.md, outputs/analysis.md section 9 (the tests written before this round), project/data_schema.md (sections 2, 3, 5). Do not read archive/. Claude reviews the round afterwards.

WHY
The 20 + 20 events of round W were the most visible ones we could find, not a random sample; the follower difference between the two sets is not significant (p = 0.17); the dancer/event comparison was asymmetric; we never looked for evidence against "breaking = spectacle, Latin = participation". This round fixes these points with cheap, public numbers.

BUDGET AND WAY OF WORKING (keep it cheap)
- Per event: one visit to the official site (home, tickets, line-up, partners) and one visit to its Instagram profile; take every number from those two visits. Maximum 3 extra searches per event.
- One-sentence notes. No downloads kept in the project. One line per event in research/logs/X_round.md (create it; it lets you resume after an interruption).
- Leonardo commits and pushes. Run `python scripts/validate_data.py` after each task.
- Rules as before: never invent; open the page and read the number (snippet only = confidence L, `not_opened`); say what a number counts (dancers, spectators, followers, listings); public pages only, no logins; third-party statistics only as `inferred` L; organisations, events and public professional figures only; update existing rows instead of duplicating (search by name first; Red Bull events are excluded from both worlds); exact units of project/data_schema.md section 5.

X1 - SAMPLING FRAMES AND RANDOM DRAW
1. Build two frames of events taking place in Europe between 2026-11-01 and 2027-10-31:
   - research/frames/latin_frame.csv: salsa and bachata congresses, festivals and weekenders (not weekly socials, not classes; skip kizomba/zouk-only events).
   - research/frames/breaking_frame.csv: breaking battles, jams with a battle, festivals and championships (all-styles events allowed if breaking is a category; skip Red Bull events).
   Columns: frame_id (L001..., B001...), world, name, city, country_iso2, date_start, listing_url, source_platform, exclude, notes.
2. Sources for the frames: goandance.com country listings (all European countries you can open; scroll each list to the end), salsavida.com festival calendars, other public Latin festival calendars; and8.dance upcoming events (Europe), national breaking federation calendars, other public battle calendars. Record which lists were complete and which stopped loading (notes, and the log). The same event from two lists is one row.
3. Mark exclusions in `exclude` with the reason (outside Europe, online, Red Bull, duplicate, not a dance event). Never exclude because an event looks small.
4. Draw: `python scripts/draw_sample.py research/frames/latin_frame.csv 30` and the same for breaking. Do not edit the frames after the draw. If a frame has fewer than 30 eligible rows, all are taken.
5. Every sampled event gets an events.csv row (update if present; task X1; notes "random sample X1, frame id L0xx/B0xx").

X2 - MEASURES FOR EVERY SAMPLED EVENT (60 events)
One row per number found (task X2; place = event's city or country; disc as the event; event id in notes). `not_found` in one line otherwise.
- MED "Instagram followers (profile page)", "Instagram posts (profile page)".
- MED "Instagram average likes, last 6 posts (profile page)": only if likes are visible without login; value = average of the 6 most recent posts; otherwise skip (no row).
- EVT "participants stated (dancers)"; MED "spectators stated"; EVT "editions held (stated)" (a number, never a year); EVT "event days (stated)".
- PRC "EUR full pass, main event" (Latin, or a breaking all-access/workshop pass); PRC "EUR spectator ticket, main event"; PRC "EUR competitor entry fee" (battle or competition registration).
- EVT "competition or battle section (yes/no)" and EVT "workshops offered (yes/no)": value 1 = yes, 0 = no, read on the programme.
- ORG "drinks brands named as sponsors (event)": from the partners section, the latest poster, or Instagram posts labelled "Paid partnership" / brand tags in the last 20 posts; brands as organisations (brand_sponsor, category in notes) and relations `sponsors`. Value 0 only if a partners section or poster was actually read.

X3 - SYMMETRIC COMPARISON OF ARTISTS (for H3)
Take the first 10 sampled events per world (by draw_order) that publish a line-up (artists, instructors, judges, DJs). For each, record up to 5 dance artists of the line-up (public professionals only; DJs excluded) as athletes.csv rows (level "line-up artist", task X3; reuse existing rows) and their MED "Instagram followers (profile page)" (place GLOBAL, athlete id in notes). Maximum 50 artists per world. This compares typical artists of typical events in both worlds, instead of the 30 most famous dancers.

X4 - COUNTER-EVIDENCE ON THE FLAGSHIP EVENTS (20 + 20 of round W, research/logs/W_round.md)
- Breaking flagship events: paid participation: competitor entry fee, number of battle entrants or registered dancers if stated, workshop passes and prices. Units as in X2.
- Latin flagship events: spectators: shows or competitions open to a paying public, spectator or party-only tickets and prices, stated spectator numbers. Units as in X2 (PRC "EUR spectator ticket, main event" also for Latin party-only or show tickets, notes say which).
- Reuse round W rows; add only what is missing.

X5 - OPTIONAL, ONLY IF BUDGET IS LEFT: FIVE MORE LATIN CITIES FOR H4
Valencia, Sevilla, Naples, Lisbon, Rotterdam: add the places (role `scan`), then only: Red Bull dance events 2024-2026 in the city (ORG, existing unit), Latin congress or festival in the city in the frame or on file (event rows), Red Bull office in the city (organisations on file). No other indicators.

CLOSE
1. `python scripts/validate_data.py` (0 errors) and `python scripts/build_data_summary.py`.
2. research/logs/X_round.md ends with a summary (max 15 lines): frame sizes and completeness per source, the two samples, numbers filled vs not_found per indicator, what was blocked.
3. Delete temporary files. Tell Leonardo it is ready to commit. Do not write conclusions on the hypotheses: Claude runs the tests of outputs/analysis.md section 9.

DONE WHEN: two frames and two samples saved; 60 sampled events with X2 rows (values or one-line not_found); up to 50 + 50 line-up artists with followers; X4 checked on the 40 flagship events; validator 0 errors.

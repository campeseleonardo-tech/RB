You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Round W is short and cheap: it measures the EVENT MARKET of breaking and of Latin (salsa/bachata) in Europe on equal terms, with numbers that are easy to read on public pages. Read first: project/project_memory.md (sections 2-6), research/data_summary.md (sections 4, 7, 8), project/data_schema.md section 2-3. Do not read research/results/, archive/, outputs/ or older prompts.

WHY THIS ROUND
Leonardo's review of outputs/one_page.md: comparing Red Bull Dance (a Red Bull media brand, 3m followers) with the largest Latin event account (58k) is not a fair comparison. The question is: how big is the independent event market of each world, in participation (dancers), audience (spectators) and social following? Red Bull's own events and accounts are NOT part of either comparison set (they are kept on file separately).

TOKEN AND TIME BUDGET (important)
- Reuse what is on file: before searching, check data/events.csv, data/organisations.csv and data/facts.csv (task U3.1, U2.2, T3.1) for each event; fill only the gaps.
- Maximum 3 searches per number. If not found after 3, write the `not_found` row in one line and move on. Do not write long notes: one sentence plus the source.
- Read each event's official site once (home, about, tickets, partners pages) and its Instagram profile page once; take every number you need from those visits.
- No downloads or screenshots kept in the project folder. Log one line per event in research/logs/W_round.md.
- Leonardo commits and pushes; you do not. Run `python viewer/validate_data.py` at the end of each task.

DATA RULES (unchanged)
- Never invent numbers, names or URLs. Open the page and read the number; a search snippet alone = confidence L, `access_status = not_opened`.
- Say what a number counts: dancers (participants), spectators (attendees, seats), followers. Never mix them in one row.
- Public pages only; no logins; third-party statistics pages only as `inferred`, confidence L.
- Organisations and events only; no private people.
- Update existing rows instead of adding duplicates (search by name first). Log corrections in data/review_log.csv. English in the data.

W1 - THE TWO COMPARISON SETS (20 + 20 independent events, Europe, editions 2025 or 2026)
- Latin set: the 20 largest independent salsa/bachata congresses and festivals in Europe. Start from those on file (Croatian Summer Salsa Festival, Amsterdam International Salsa Festival, Berlin Salsa Congress, BCN Dance Life, BIG Milan, Paris International Salsa Congress, Mambo City 5Star, El Sol, Bachata Sensual World Congress, Bachata Day, Grazy, Euroson Latino Europe events if any, Crazy 4 La Timba, Vienna Bachata Congress, Brux Bachata Congress, Bavarian Bachata Congress, Unified Dance Festival, Sensual Bachata Festival Romania) and complete or replace with larger ones found on goandance.com Europe listings.
- Breaking set: the 20 largest independent breaking events and battles in Europe: The Notorious IBE, Juste Debout (all-styles, note it), Battle of the Year (Europe/World final when in Europe), Outbreak Europe, Summer Dance Forever, Battle Pro, Undisputed (note if outside Europe), UK B-Boy Championships, Floor Wars, Breakin' Convention, Funkin' Stylez, BreaktheFloor, national breaking championships with an international field, WDSF European/World breaking events held in Europe, plus larger ones found on and8.dance.
- Exclude Red Bull events (BC One, Dance Your Style) from both sets.
- Write the two lists, with the reason each event is in, at the top of research/logs/W_round.md. Every event must have an events.csv row (update if present): name, series, city (add the place with role `scan` if missing), dates of the 2025 or 2026 edition, organiser, disc_id, level.

W2 - SIZE AND MONEY (per event, from the official site)
For every event of both sets, one row each where the site states it (task W2; place = the event's city or country; disc = the event's discipline; event id in notes):
- events.csv `scale_value` + `scale_type`: participants (dancers) if stated, otherwise attendees or seats.
- signal EVT, unit "participants stated (dancers)" and/or MED, unit "spectators stated", when the site gives the other kind too.
- signal EVT, unit "countries of participants stated, main event".
- signal EVT, unit "editions held (stated)" (e.g. "25th edition").
- signal PRC: Latin unit "EUR full pass, main event"; breaking unit "EUR spectator ticket, main event" (cheapest regular day ticket) and, if published, unit "EUR competitor entry fee". Convert other currencies at the ECB rate of the access day, original price in notes.
- Sponsors (this replaces task V1): every brand shown on the partners/sponsors section or footer: organisations.csv (org_type brand_sponsor, notes: category = energy drink, soft drink, beer, spirits/rum, water, apparel/shoes, travel/hotel, media, other) and relations.csv `sponsors` (event -> brand). Set `red_bull_involvement` on the event. Then one fact per event: signal ORG, unit "drinks brands named as sponsors (event)", value = count, notes = names (0 is a valid value only when a partners section was read).

W3 - SOCIAL FOLLOWING (per event, from the public profile pages)
For every event of both sets, read once per platform where the event has an account; reuse round U values if already on file for the same account (do not re-read):
- units "Instagram followers (profile page)", "Facebook page followers", "TikTok followers (profile page)", "YouTube subscribers (channel page)". Place = the event's country (GLOBAL only for touring series), event id in notes, task W3.
- One engagement number per event, only if a public third-party statistics page shows it without login: unit "Instagram engagement rate % (third-party)", `inferred`, confidence L, site named in notes. Skip if not available; no searching beyond one try.

W4 - SIZE OF THE CALENDAR (one number per world)
- Latin: number of salsa and bachata events listed on goandance.com for all of Europe for the next 12 months (one country filter at a time for the 9 countries is already on file; here use the Europe-wide listing or add up the countries shown, and say which). Unit "Latin events listed on goandance.com, Europe, next 12 months", place GLOBAL, disc CAR-SAL (and CAR-BCH if listed separately).
- Breaking: number of upcoming breaking events in Europe on and8.dance (or another public battle calendar if and8 cannot be counted). Unit "breaking events listed, Europe, next 12 months", place GLOBAL, disc URB-BRK, the calendar named in notes.
- One `not_found` row with the reason if a count is not possible.

W5 - QUICK CONFIRMATIONS (max 15 minutes in total)
- Red Bull national offices (organisations O00109-O00117, confidence L from search snippets): open the official source of each (jobs.redbull.com location pages, Companies House, company imprint) and update `confidence`, the source `access_status` and notes. Correct the city if wrong.
- Red Bull audience statements (old task V3): at most 3 searches in total for an official Red Bull statement on the age or type of audience of its events or activations. Unit "Red Bull audience statement", place GLOBAL, disc ALL, quote max 30 words. `not_found` if none.

CLOSE
1. `python viewer/validate_data.py` (0 errors). 2. `python research/build_data_summary.py`. 3. research/progress.md for round W (max 15 lines): events per set, numbers filled vs not_found per indicator, what was blocked. 4. Tell Leonardo it is ready to commit.

DONE WHEN: two sets of 20 events with rows; W2 and W3 numbers filled or `not_found` for each event (one line each); W4 two counts or reasons; W5 checked.

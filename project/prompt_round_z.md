You are the research agent of the Dance Scene Atlas project (repository campeseleonardo-tech/RB). Round Z fills the gaps of the business case and of the market story: event sizes, trends, the energy drink market, drinks brands at events, audience, rules. Read first, in this order: project/project_memory.md, project/business_case_model.md (the model and the input table: collect only what feeds it), project/data_schema.md (sections 1-5; section 5 lists the units to write letter for letter, including the new round Z units). Do not read archive/ or outputs/ (except outputs/analysis.md section 11 if you need the census numbers).

GIT (overrides CLAUDE.md for this round)
- Work on the branch your session gives you (if none: `round-z`). Commit in Italian, small commits per task (Z1, Z2...), and push that branch. Do NOT push to main and do not open a pull request: Claude checks the data and merges.
- Never touch research/manual_input.ods.

RULES
- Public sources only. No logins, no paywall bypass, no unofficial APIs, no scraping beyond reading pages one by one. Max 3 attempts on a blocked page, then `not_found` with the reason.
- No personal data of private people: only organisations and public professional figures.
- Never write "Red Bull absent": write what was searched and `not_found`.
- Searched and not found is a result: write the `not_found` row (notes = what and where you searched).
- Every number: place, period, evidence_type, confidence, source (new rows in data/sources.csv with access_date). Ranges in value_low/value_high. Other currencies to EUR at the ECB rate of the access day (original in notes).
- task_id = Z1 ... Z6. Continue the existing ID sequences (facts F..., sources S..., events E...).
- Budget: about 150 page reads/searches in total; per-task caps below. One line per source and step in research/logs/Z_round.md so the work can resume after an interruption. One-line notes.

Z1 - EVENT SIZES (most important; cap 80 reads)
Goal: the TYPICAL event size, not only the flagships. Use the random samples already drawn (seed 20261021, past events Nov 2024 - Oct 2026):
- research/frames/size_frame_latin_sample.csv (40 Latin events)
- research/frames/size_frame_breaking_sample.csv (30 breaking events)
For each event: at most 2 reads (official site or listing page; then one search "<name> <year> dancers / participants / Teilnehmer / bailarines / danseurs"). Write one row per event in research/census/event_sizes.csv with columns:
event_key, world, name, sample, size_type, size_value, size_low, size_high, edition_year, evidence_type, confidence, source_url, access_date, notes
- sample = random_latin | random_breaking | largest_latin | largest_breaking
- size_type, one of: participants (dancers or breakers stated), attendees (all people stated), passes_sold, venue_capacity (main hall of the stated venue: read the venue page), battle_entries (count the published participants list or the bracket: top 16 = 16 is a lower bound, write it in size_low), facebook_going (only if visible without login), none. Never add types together; if an event has two types, write two rows.
- Nothing found: size_type none, evidence_type not_found, notes = what was read.
Then the 30 Latin events (CAR-SAL, CAR-BCH) in data/events.csv without a scale_value that have the most Instagram followers on file (facts MED "Instagram followers (profile page)" linked by event name in notes; 59 events lack a size): one search each for a stated size of any edition 2023-2026 (press, organiser page). Same CSV, sample = largest_latin.
Z1c Hyrox: research/census/hyrox_finishers.csv with columns season, race_name, city, country_iso2, date_start, finishers, source_url, notes: finishers per European race, seasons 2023/24, 2024/25, 2025/26 where published (hybridfitnessmedia.com season reviews, official results or press). Plus facts EVT "races held (season, Europe)" and "finishers (season, Europe)" per season (place GLOBAL if Europe is not separable: say so in notes).

Z2 - TRENDS (cap 25 reads)
Z2a Wikipedia page views (free Wikimedia REST API, public and documented: https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{lang}.wikipedia/all-access/user/{article}/monthly/2016010100/2026093000, send a User-Agent with the repo URL). Articles: Salsa (dance), Bachata (dance), Breakdancing, Hyrox, in the languages en, de, fr, es, it, nl, pl (use each language's article title; if none exists, skip it and log). Write research/trends/wikipedia_pageviews.csv: lang, article, topic (salsa|bachata|breaking|hyrox), month (YYYY-MM), views. No facts: Claude computes the yearly series.
Z2b Spotify: the 2-3 largest official Spotify playlists for salsa, for bachata (e.g. "Salsa Hits", "Bachata Hits" or similar editorial playlists): saves shown on the public playlist page today and in Wayback snapshots closest to 2024-10-21 and 2025-10-21. Facts ONL "Spotify playlist saves (playlist page)", period = snapshot date, notes = playlist name and URL. Also one search for Spotify's own published statements on salsa/bachata/Latin streaming growth in Europe (facts ONL, evidence stated_by_organiser, notes = the claim).
Z2c Breaking after Paris 2024: one or two searches for stated numbers (federation members, clubs, battle participation) before and after the Games in FR, DE, NL, UK. Facts with the existing units or EVT "participants stated (dancers)" with notes; otherwise not_found.

Z3 - ENERGY DRINK MARKET (cap 20 reads, free sources only)
- Red Bull GmbH group figures 2019-2025: cans sold, net sales (EUR), employees, countries: data/redbull_finance.csv (scope group, one row per metric and year). Regional or country breakdown: one not_found row if not public.
- Monster Beverage annual report (10-K, public): net sales of the EMEA region, 2023-2025, same table (entity "Monster Beverage", scope region, currency USD).
- Europe market value and volume, latest year: 2-3 free summaries (IMARC, Mordor, Statista free text, press), each a BEV fact with confidence L and the publisher in notes; they disagree, keep all.
- Per country, energy drink consumption per person or volume, for ES, FR, DE, IT, NL, UK, AT, PL, PT, BE, CH: national industry associations (e.g. British Soft Drinks Association annual report, Wirtschaftsvereinigung Alkoholfreie Getraenke, ANFABRA, UNESDA) or EFSA/national surveys. BEV facts with the units of data_schema section 5. If places.csv lacks a country, add it (place_type country, role country).
- Brand shares (Red Bull, Monster, others) in Europe or by country if any free source states them.
- Retail price of a 250 ml Red Bull can in 3-4 of these countries (one supermarket online price each, period = access date): PRC "EUR retail price, energy drink 250 ml can".
- One public Instagram CPM benchmark for Europe (MED "Instagram CPM benchmark (EUR, Europe)", notes publisher and date).

Z4 - DRINKS AT DANCE EVENTS (cap 25 reads)
- For the 40 + 30 random-sample events, while reading the site in Z1, look at the partners/sponsors section (no extra reads). For each drinks brand named: fact ORG "drinks brands named as sponsors (event)" as before, plus BEV "energy drink role at event stated" if it is an energy drink (notes: role). Events with a partners section but no drinks brand: one ORG row value 0 with notes. Events with no partners section: nothing (count them in the log).
- Up to 10 searches for energy drink brands (Red Bull, Monster, Burn, Rockstar, Hell, Celsius, Prime, others) at salsa/bachata congresses, Latin parties or breaking battles in Europe: press, organiser posts, brand pages. One fact per case (BEV role, or ORG precedent), notes = event, year, brand, role.
- Up to 5 searches for stated sampling volumes at festivals or sport events (e.g. "X cans distributed"): BEV "cans or drinks sampled stated".
- Up to 5 searches for congress sponsor packs or "become a partner" pages with prices (Latin and breaking): PRC "sponsorship tier price stated" (notes: tier, what it includes). Also bar prices at event venues if a menu is public: PRC "EUR bar price, energy drink at event".

Z5 - AUDIENCE (cap 10 reads)
- Open-access studies (Google Scholar, university repositories) on salsa/bachata congress or dance-festival tourism in Europe: age, gender, spend, congresses per dancer per year, share from abroad. MED/EVT/PRC facts with the units of section 5, place = country or GLOBAL of the study, evidence found, notes = study, year, sample size.
- Organiser statements of age range, share from abroad, countries (sponsor packs, about pages): same units, evidence stated_by_organiser.

Z6 - RULES (cap 12 reads)
For ES, FR, DE, IT, NL, UK, AT, PL, PT, BE, CH and the EU level: rules in force on energy drinks (minimum sale age, labelling "high caffeine content", school or venue bans, rules on marketing to minors, rules on mixing with alcohol at events). BEV "rule on energy drink sale or marketing", value 1 (or 0 with notes if a search found nothing), notes = the rule and law name, period = year in force. Official or government pages preferred.

CLOSE
1. `python scripts/validate_data.py` (0 errors) and `python scripts/build_data_summary.py`.
2. research/logs/Z_round.md ends with a summary (max 25 lines): per task, rows written, found vs not_found, size coverage of the random samples (how many of 40 and 30 have any size), blocked sources, reads used. No conclusions: Claude analyses.
3. Delete temporary files, commit, push the branch, and tell Leonardo the branch name.

DONE WHEN: event_sizes.csv covers all 70 sampled events (found or not_found) and the 30 largest Latin events without size; hyrox_finishers.csv written (or not_found); wikipedia_pageviews.csv written; Z3-Z6 rows written within the caps; validator 0 errors; branch pushed.

You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Round U is a short, targeted round for the hypotheses H1-H3 of the project. Read first, in this order: project/project_memory.md (all of it: it was rewritten on 2026-10-21), research/data_summary.md, project/data_schema.md. Do not read research/results/ or older prompts. Everything outside this prompt is out of scope. Claude reviews every number afterwards.

GIT
Leonardo commits and pushes your work himself; you do not need to. Do not create branches.

HOW TO WORK
1. Tasks U1-U5 are independent; do them in order. Keep a running log in research/logs/U_round.md (one line per item: task, item, result, source id or reason) so that the work can resume after an interruption.
2. Limits: 8 searches per item, then a `not_found` row with the searches in notes, and move on. A blocked page never stops a task: mark the source `blocked`, add one line to research/manual_collection_list.md, continue.
3. Save disk space: do not keep downloaded pages, screenshots or browser caches in the project folder; delete temporary files when a task ends. Nothing new in the project root.
4. Exact `unit` strings in quotes below, letter for letter. `task_id` = the task code. Run `python viewer/validate_data.py` after each task.

DATA RULES
- Open the page and read the number; a search snippet alone = confidence L, `access_status = not_opened`. Rendered browser where needed (`rendered`).
- Public professional figures only (professional dancers, instructors, athletes with public professional profiles): name, follower count, public role. No private people, no contact details, no other personal data. Organisations and events: anything public.
- Social platforms: only what a public page shows without logging in; no scraping, no bypassing logins or consent walls. A third-party statistics page may be used as `evidence_type = inferred`, confidence L, naming the site. If a number needs a login, add the profile URL to research/manual_collection_list.md under "Instagram/Facebook for Leonardo" (he reads it by hand).
- Before adding an event, organisation or source, search the CSV; update instead of adding. Log corrections in data/review_log.csv. IDs never reused. English in the data.
- Place for global profiles and channels: GLOBAL. Discipline: URB-BRK, CAR-SAL or CAR-BCH (CAR-SAL when a Latin account covers both salsa and bachata; say so in notes).

U1 - PRECEDENTS: RED BULL AT PARTICIPATION EVENTS (hypothesis H2)
Goal: has Red Bull already been present (sponsor, partner, sampling, bar, "powered by", logo on the official poster or page) at events where people take part rather than watch: Latin dance congresses and festivals, social dance events, dance-fitness conventions, fitness festivals, multi-sport conventions? Period 2013-2026, the 9 countries first, then anywhere in Europe.
- Start with the lead from Leonardo: "Uragano" multi-convention (fitness, hip hop, Caribbean dance), Citta del Mare, Terrasini (Sicily), 3-5 May 2013, organiser Master Production: https://livesicilia.it/uragano-il-fitness-a-terrasini/ . Open the article and the organiser's pages or posters; record whether Red Bull is named and how.
- Then search national redbull.com sites and local press in the local language ("Red Bull" with salsa, bachata, festival latino, congresso, convention, fitness, Zumba, social dance; "Red Bull" "sponsor" "salsa festival", etc.), and the sponsor pages of the Latin events already in data/events.csv.
- Output: events.csv row per precedent (level `congress_festival` or `other`, `red_bull_involvement = found` only when an official page, poster or press report names Red Bull; notes: what form: sponsor, sampling, bar, title partner). Also experiential fitness or participation activations by Red Bull (e.g. "Sweat the Deck" with F45, Chicago 2025) as events with notes "participation activation". Maximum 20 precedents. A `not_found` fact (place = country, disc CAR-SAL, signal ORG, unit "Red Bull at Latin participation events (precedents)") for each country where nothing was found, with the searches.

U2 - CONGRESS MARKET AND SPONSORS (hypotheses H1, H2)
U2.1 Number of Latin congresses/festivals listed for the NEXT 12 months (forward window: from the access day to 12 months later), per country, on goandance.com (country filter; salsa and bachata; scroll to the end of the list; if the list stops loading, write the number reached and "at least"). Fact: place = country, disc CAR-SAL (salsa listing) and CAR-BCH (bachata listing), signal EVT, unit "Latin events listed on goandance.com, next 12 months". Notes: dates of the window, how many cards were loaded, whether the count is complete. 18 rows. For breaking, try the equivalent on and8.dance (upcoming events per country); if not countable, one `not_found` row per country with unit "breaking events listed on and8.dance, next 12 months".
U2.2 Sponsor packs and media kits: for the 10 largest Latin congresses or festivals in the 9 countries (use data/events.csv and U2.1 to pick them), look for a public sponsor or partner pack, media kit, "become a sponsor" page or press kit. Record what it states: attendance, share of foreign participants, age range, nights of parties, social media reach, existing sponsors (especially drinks brands). Facts: place = event's country, disc as the event, signal MED, units "congress attendance stated (sponsor pack)", "congress social reach stated (sponsor pack)", "congress age range stated (sponsor pack)"; sponsors as relations.csv `sponsors` rows (brand in organisations.csv, org_type brand_sponsor). Event id and the document URL in notes. If no pack is public, a `not_found` fact for that event with the pages checked.

U3 - SOCIAL REACH (hypothesis H3)
Public follower counts, read on the day, of:
U3.1 Latin congress and festival accounts: the 10 congresses of U2.2 plus the 5 largest international Latin events found (Instagram, Facebook page, TikTok, YouTube where they exist). Unit "Instagram followers (profile page)", "Facebook page followers", "TikTok followers (profile page)", "YouTube subscribers (channel page)". Place = event's country (GLOBAL for events outside the 9 countries), event id in notes.
U3.2 Breaking event accounts for comparison: Red Bull BC One, Red Bull Dance (Dance Your Style), The Notorious IBE, Juste Debout, Battle of the Year, Outbreak Europe. Same units, place GLOBAL or the event's country.
U3.3 Professional dancers: the 10 most followed Latin (salsa/bachata) dance professionals or couples active in Europe or internationally on the congress circuit (headliners of the U2.2 congresses are good candidates), and the 10 most followed breaking dancers (start with Red Bull BC One athletes and world champions already in data/athletes.csv). athletes.csv row per person (public_name, discipline, base country, level "professional", red_bull_athlete as found or not_checked, source) and one fact per platform: place GLOBAL, signal MED, the units above, athlete_id in notes. Public professional profiles only.
U3.4 Hashtag volumes, if accessible without login: TikTok Creative Center (public trend pages) for #salsa, #bachata, #breakdance, #breaking per country of the 9 where the tool shows them: posts and views as displayed, with the period shown. Unit "TikTok hashtag posts (Creative Center)" and "TikTok hashtag views (Creative Center)", place = country or GLOBAL. If the tool requires a login, `not_found` with the reason.

U4 - LATIN VIDEO AUDIENCE OUTSIDE COMPETITIONS (hypotheses H1, H3)
The 5 most viewed salsa or bachata dance videos on YouTube (dance performances, social dance or congress demos; not music videos) and the 5 most viewed breaking videos that are not Red Bull competition replays. Facts: place GLOBAL, signal MED, unit "YouTube views, top dance video (non-competition)", notes: title, channel, upload date, URL, and whether the uploader is a congress, a dancer or a media channel. If YouTube blocks, a third-party statistics page as `inferred` L, or the manual list.

U5 - CLOSE
1. `python viewer/validate_data.py` (0 errors).
2. `python research/build_data_summary.py`.
3. research/progress.md rewritten for round U (max 25 lines): rows per task, what was blocked, the items left for Leonardo (Instagram/Facebook numbers), open questions (max 3).
4. Delete temporary files. Tell Leonardo the round is ready to commit.

DONE WHEN
U1: the Uragano lead resolved and the 9 countries searched (precedents or `not_found`). U2.1: 18 Latin rows and 9 breaking rows. U2.2: 10 congresses checked. U3: every listed account, event or person has its rows or a manual-list line. U4: 10 videos or the reason. U5 done.

You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Round U is a targeted round for the hypotheses H1-H3 of the project. Social data (U3) are the priority. Read first, in this order: project/project_memory.md (all of it: it was rewritten on 2026-10-21), research/data_summary.md, project/data_schema.md. Do not read research/results/ or older prompts. Everything outside this prompt is out of scope. Claude reviews every number afterwards.

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
- Search national redbull.com sites and local press in the local language ("Red Bull" with salsa, bachata, festival latino, congresso, convention, fitness, Zumba, social dance; "Red Bull" "sponsor" "salsa festival", etc.), and the sponsor pages of the Latin events already in data/events.csv.
- Output: events.csv row per precedent (level `congress_festival` or `other`, `red_bull_involvement = found` only when an official page, poster or press report names Red Bull; notes: what form: sponsor, sampling, bar, title partner). Also experiential fitness or participation activations by Red Bull anywhere, as events with notes "participation activation". Maximum 20 precedents. A `not_found` fact (place = country, disc CAR-SAL, signal ORG, unit "Red Bull at Latin participation events (precedents)") for each country where nothing was found, with the searches.

U2 - CONGRESS MARKET AND SPONSORS (hypotheses H1, H2)
U2.1 Number of Latin congresses/festivals listed for the NEXT 12 months (forward window: from the access day to 12 months later), per country, on goandance.com (country filter; salsa and bachata; scroll to the end of the list; if the list stops loading, write the number reached and "at least"). Fact: place = country, disc CAR-SAL (salsa listing) and CAR-BCH (bachata listing), signal EVT, unit "Latin events listed on goandance.com, next 12 months". Notes: dates of the window, how many cards were loaded, whether the count is complete. 18 rows. For breaking, try the equivalent on and8.dance (upcoming events per country); if not countable, one `not_found` row per country with unit "breaking events listed on and8.dance, next 12 months".
U2.2 Sponsor packs and media kits: for the 10 largest Latin congresses or festivals in the 9 countries (use data/events.csv and U2.1 to pick them), look for a public sponsor or partner pack, media kit, "become a sponsor" page or press kit. Record what it states: attendance, share of foreign participants, age range, nights of parties, social media reach, existing sponsors (especially drinks brands). Facts: place = event's country, disc as the event, signal MED, units "congress attendance stated (sponsor pack)", "congress social reach stated (sponsor pack)", "congress age range stated (sponsor pack)"; sponsors as relations.csv `sponsors` rows (brand in organisations.csv, org_type brand_sponsor). Event id and the document URL in notes. If no pack is public, a `not_found` fact for that event with the pages checked.

U3 - SOCIAL REACH (hypothesis H3; the most important task of this round: do as much as possible)
Read every number on the same day per account, from the public profile page; where a login is needed, use one third-party statistics page (e.g. a public social statistics site) as `inferred`, confidence L, naming the site, and add the profile URL to the manual list for Leonardo. Units, letter for letter:
"Instagram followers (profile page)", "Instagram posts (profile page)", "TikTok followers (profile page)", "TikTok likes (profile page)", "YouTube subscribers (channel page)", "Facebook page followers", "Instagram average likes per post (third-party)", "Instagram engagement rate % (third-party)".
The last two only from a third-party statistics page, always `inferred`, confidence L.

U3.1 Event accounts: 20 Latin congresses and festivals (the U2.2 congresses, the largest Latin events in data/events.csv, the international circuits World Latin Dance Cup, World Salsa Summit / The Summit, Euroson Latino) and 20 breaking events and brands (Red Bull BC One, Red Bull Dance / Dance Your Style, The Notorious IBE, Juste Debout, Battle of the Year, Outbreak Europe, WDSF breaking, national championships, other large battles). Every platform where the account exists. Place = the event's country, or GLOBAL; event id (or organisation id) in notes.

U3.2 Professional dancers: the 30 most followed Latin (salsa/bachata) dance professionals or couples and the 30 most followed breaking dancers, active in Europe or internationally.
- How to build the candidate lists (write the method and all candidates looked at in research/logs/U_round.md): Latin = headliners and artists listed on the line-up pages of the congresses of U2.2 and U3.1, champions of World Latin Dance Cup, World Salsa Summit, Euroson Latino and WDSF Caribbean, and the creators of the top videos of U4; breaking = Red Bull BC One athletes and world champions (data/athletes.csv), Paris 2024 Olympic breaking finalists, winners of IBE, Juste Debout, BOTY, Outbreak, and the creators of the top videos of U4. Look at at least 50 candidates per world, then keep the 30 with most followers on their main platform.
- Couples with one shared account count as one entry. Public professional profiles only; no private accounts.
- athletes.csv row per entry: public_name (stage name as on the profile), disc_id, country_iso2 if public, level "professional dancer" or "professional couple" (add "instructor" where the profile says so), red_bull_athlete = found if a Red Bull page lists them, otherwise not_checked, source = the profile page.
- One fact per platform with the units above: place GLOBAL, discipline as the dancer, athlete_id in notes, task U3.2.

U3.3 Hashtag volumes:
- TikTok Creative Center (public trend pages, no login): #salsa, #bachata, #salsadance, #bachatadance, #breakdance, #breaking, #bboy, #bgirl, per country of the 9 where shown, and global: posts and views as displayed, with the period shown. Units "TikTok hashtag posts (Creative Center)", "TikTok hashtag views (Creative Center)", place = country or GLOBAL.
- Instagram and TikTok hashtag pages (post counts), only if visible without login: unit "Instagram hashtag posts", "TikTok hashtag views (hashtag page)", place GLOBAL. Otherwise one line in the manual list for Leonardo with the hashtags.
- Note in each row: #salsa and #breaking are ambiguous (food, news): prefer the dance-specific tags and say so.

U4 - VIDEO AUDIENCE OUTSIDE COMPETITIONS (hypotheses H1, H3)
The 10 most viewed salsa or bachata dance videos on YouTube (dance performances, social dance, congress demos; not music videos) and the 10 most viewed breaking videos that are not Red Bull competition replays. Facts: place GLOBAL, signal MED, unit "YouTube views, top dance video (non-competition)", notes: title, channel, upload date, URL, and whether the uploader is a congress, a dancer or a media channel. If YouTube blocks, a third-party statistics page as `inferred` L, or the manual list.

U5 - CLOSE
1. `python viewer/validate_data.py` (0 errors).
2. `python research/build_data_summary.py`.
3. research/progress.md rewritten for round U (max 25 lines): rows per task, what was blocked, the items left for Leonardo (Instagram/Facebook numbers), open questions (max 3).
4. Delete temporary files. Tell Leonardo the round is ready to commit.

DONE WHEN
U1: the 9 countries searched (precedents or `not_found`). U2.1: 18 Latin rows and 9 breaking rows. U2.2: 10 congresses checked. U3: 20 + 20 event accounts, 30 + 30 dancers (each with rows or a manual-list line), hashtags checked. U4: 20 videos or the reason. U5 done.

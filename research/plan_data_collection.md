# Plan: finish, fix and complete the data collection

Status: v1, 2026-10-19. Executor: an external research model working in this folder (C:\projects\Progetti\RB). Read first: `README.md`, `project/project_memory.md`, `project/data_schema.md` (the data contract), `research/results_review.md`, `research/results/INDEX.md`. Do NOT read the 49 result files in bulk: open each only when a task names it.

## 0. Goal and principles
The Dance Scene Atlas needs, for each **discipline x city**, raw evidence of how strong the dance scene is, and then what Red Bull does and does not do there. Red Bull is a comparison, not the base: collect scenes first (Phase 4), then overlay Red Bull (Phase 5).
- Pilot disciplines: **breaking (main effort)**; **other hip hop family styles (light effort)**; **salsa and bachata (main effort)**. Adjacent only if met on the way: kizomba, zouk, dancehall (outside both families). Tricking and other disciplines are out.
- No scores, no indexes, no "why" explanations. Collect values with evidence. Explanations come later.
- Public sources only; follow I1 (organisations yes, private individuals no, no scraping of platforms that forbid it, no bypassing logins or paywalls).
- You may and should use a **rendered (JavaScript-capable) browser** for pages that need it (redbull.com, YouTube, event sites). Mark such sources `access_status = rendered`. If a page still cannot be read, mark it `blocked` and add the item to `research/manual_collection_list.md` instead of guessing.
- Do not edit `atlas_scene_movimento_v0.xlsx` (read it only). Do not touch the E1 Salzburg pilot (on hold).
- All text in English. Commits, if any, in Italian, as in the existing history.

## 1. Working rules for the executor
1. **One task = one block below.** Do tasks in the order of the phases. Inside a phase, any order.
2. **Output only into `data/*.csv`** (schema in `project/data_schema.md`) plus one short search log per task in `research/logs/<task_id>_<short_name>.md` (what you searched, which sites, what failed). No new long prose reports.
3. **Search budget:** for any single cell (one signal for one discipline in one city) stop after 8 searches and write a `not_found` row listing them. For "deep" cities, don't stop earlier than 4 searches.
4. **Evidence rules:** read the page, then copy the number. If you only saw a search snippet, `confidence = L` and `access_status = not_opened`. Never combine numbers from different years without a `period`.
5. **Duplicates:** before adding an event/organisation/source, search the existing CSV by name + place + date. Update instead of adding.
6. **Progress file:** after each phase, update (in place) `research/progress.md`: tasks done, rows added per file, open problems, items moved to the manual list. Max 40 lines.
7. **Checks:** at the end of every phase run `python viewer/validate_data.py` if it exists (built by the viewer team); otherwise check by hand against section 4 of the data schema.
8. **Stop and report** (write in `research/progress.md` and stop) if: a source asks for payment or login; a task needs a person or a private document; two sources give different numbers for the same fact (record both as separate rows with notes, do not choose).
9. **README and memory:** at the end, update `README.md` (structure) and `project/project_memory.md` (section 7 and 8), in place.

## 2. Phase 0: set-up and legacy conversion
| ID | Task | Output |
|---|---|---|
| P0.1 | Create `data/` with one header-only CSV per table of the data schema; `archive/`; `research/logs/`. | empty CSVs |
| P0.2 | Fill `disciplines.csv` from workbook sheet `Disciplines` plus: URB-WAA, URB-VOG added; kizomba/zouk moved out of the Caribbean family; tricking = `out`. Scope: URB-BRK, CAR-SAL, CAR-BCH = `pilot_main`; URB-HIP, URB-HOU, URB-POP, URB-LOC, URB-KRU, URB-WAA, URB-VOG, URB-MIX = `pilot_light`; CAR-DHL, AFR-KIZ = `adjacent`. Use C1 and C2 for the style definitions. | disciplines.csv |
| P0.3 | Fill `signals.csv` (schema section 3). | signals.csv |
| P0.4 | Fill `places.csv`: workbook `Cities` (13 cities) plus the new places of Appendix A. Countries of every city go in as `country` rows. | places.csv |
| P0.5 | Convert the **reliable legacy tables** into rows, one file at a time, each row with a `source_id` (create `sources.csv` rows as you go; `access_status = not_opened` unless you re-open it now): workbook `RedBull` -> events.csv; A2 -> events.csv (world finals); B1 (after fix F-01..F-05) -> events.csv + organisations.csv; B2, D2 -> organisations.csv + facts.csv; E6 -> facts.csv (PRC, SPA); D5 -> facts.csv (POP etc.) only the cells without a documented defect; G4 -> organisations.csv + facts.csv; C1/C2 sub-style facts -> disciplines.csv notes; D4 Wikipedia pageviews -> facts.csv (ONL). Map each file's own status words to `evidence_type` as follows: "stated" from an organiser or Red Bull page -> `stated_by_organiser`; "stated" from a statistics office or federation figure -> `found`; "not found" -> `not_found`; "inferred"/"estimated" -> `inferred`. Confidence: copy the file's own H/M/L; "L/H" -> L. | CSV rows; one line per file in review_log.csv |
| P0.6 | Do NOT convert files listed in Phase 1 or the "re-source" list of Phase 2 until they are fixed. | - |

## 3. Phase 1: quarantine and salvage
Move to `archive/quarantine/` (keep the file name) and put this block at the top of each moved file: `ARCHIVED 2026-10-19 - NOT DELETED. Problems found: ... Why it matters: ... How it could be redone better: ... Useful content moved to: ...`. Log in `review_log.csv`. Remove the row from `research/results/INDEX.md` and add a line under a new heading "Archived (see archive/quarantine/)" with the one-line reason.

| ID | File | Problems to write in the block | Redo better (becomes a task) | Salvage into |
|---|---|---|---|---|
| P1.1 | D7_dance_market_studies.md | The "EU-funded 2019 survey, 15,000 adults, 12 countries, 12.3%" and the "WHO Europe 2021, 8-15%" have no URL, title or author; they look generated, not found. The Eurostat note (dance not separate in culture accounts; NACE 90.01) is plausible but unsourced. Conclusion "no authoritative per-capita study" is probably right but not proven. | Fragmented collection by country: national sport/culture participation surveys that name dance (e.g. national "sports participation" and "cultural participation" surveys), dance federation membership, tax/licence data (France 300k+ licences claimed), Eurostat `cult_pcs_*` tables. Task P4.1 + P4.9. | Method hints to P4.1; the Eurostat remark to P4.1 with a source check |
| P1.2 | C3_participation_segments.md | No sources at all; covers six disciplines incl. house and popping/locking against the decision; "243+ festivals in 2026" is unsourced; Red Bull compatibility judgements are opinion. | Count festivals per discipline from event calendars (P4.6, P4.7) and describe segments from those counts. | The idea of segments (competitive / social / fitness) to the `level` list of events.csv |
| P1.3 | B5_online_organisation.md | 122 table rows, almost no URLs; one URL typo (`meetuo.com`); group names look invented; member counts all "Not specified"; says nothing that was measured. | Public counts of Meetup/Facebook/Instagram pages by hand (manual list) plus public event-platform listings (P4.8). | Platform list (Meetup, Facebook groups, WhatsApp, Instagram) to E8/H1 notes |

Then **flag, do not move** these files: put a first line `SOURCE STATUS (2026-10-19): citations are bare domains or missing; re-sourced in task Px.y before any row is converted.` in B3, B4, E4, E7, E8, F3, H4, J1. Tasks that re-source them are in Phase 2.

## 4. Phase 2: corrections (mechanical list)
Each row: open the named file/row, apply the action, write the change in `review_log.csv`, then convert the corrected row (P0.5) if it passes. "Check" = open the live source (rendered if needed) and read it.

| ID | Where | Action |
|---|---|---|
| F-01 | B1 summary, INDEX | Replace "10 street-dance + 8 Latin events" with "10 events: 5 street (Juste Debout, BOTY, IBE, Hip Hop International, Outbreak Europe) and 5 Latin (Berlin, Amsterdam, Crazy 4 La Timba, Croatian Summer Salsa Festival, BCN Dance Life)". |
| F-02 | B1 Juste Debout | Keep only the organiser-stated "6,000 seats per day" (`scale_type = seats`). Drop ">10,000 participants" unless a source is found. Check juste-debout.com directly. |
| F-03 | B1 Berlin Salsa Congress | Check berlinsalsacongress.co (or .com). Record the organiser's figure as `stated_by_organiser`; if none, keep "~6,000" as `inferred`, confidence L. |
| F-04 | B1 Hip Hop International | World championship is in Phoenix (USA): `role` benchmark, not a European event. Check its site for the European qualifier. |
| F-05 | B1 coverage list | "Salsa Spain World Congress Dec 2026, Madrid": check the organiser page; if unconfirmed delete from coverage and log it. |
| F-06 | A3 | Delete the row "DYS Mexico 2026, 30 hours salsa/bachata/cumbia lessons" (no URL, not found on re-search). Re-search once on redbull.com/mx. |
| F-07 | A1 | Deduplicate: the same stop appears with a long name and with a `BC1-2026-xx`/`DYS-xxxx` code (e.g. USA National Final twice; Tampa twice; Thailand "second stop"). Produce one row per real stop with its official URL. Report the true count of BC One 2026 stops and of DYS 2026 national finals, with the list. Settle "27 stops" (A1/memory) vs "27 countries, 12 tour stops, 2025" (F3). |
| F-08 | A1/A2 | Check each 2026 stop on its redbull.com page (rendered). Set `city_certainty`-like info as `notes`; city from the venue is `inferred`. Note the two world finals still to come (DYS Zurich 24 Oct 2026; BC One Toronto 29 Nov 2026) as `future`, not `past`, in `notes`. |
| F-09 | A2 | Replace "L/H" with a real confidence. Check each world-final city 2004-2026 against redbull.com or the Red Bull BC One Wikipedia page's own citations. Specifically check 2017 Amsterdam, 2018 Zurich, 2021 Gdansk, 2022 New York. Add DYS 2019-2025 hosts with sources. |
| F-10 | D1 | Open Special Eurobarometer 525 (and the 2017 report). The figures labelled "dancing" (36%, AT 48%, IT 13%, ES 4%) look like the category "other physical activity". Check the exact question and category; relabel as what it is (probably not dance-specific). If dance is a separate item, take that. |
| F-11 | D5 | Add missing Amsterdam and Paris city-proper; remove the duplicated Graz row; label every population with its definition (`metro_definition`): city proper / FUA / NUTS3. One reference year per measure (see P4.1). |
| F-12 | J2 | Remove or mark `inferred` the unsupported historical claims (Zurich 2018 entry, Tokyo 2010, "Toronto 2026 saw subsequent athlete concentration" - the 2026 final has not happened). Athlete moves (Vienna to Berlin) are not causal evidence: say so. |
| F-13 | E5 | Relabel "20-40% of competitive dancers can be attributed to a city" as `inferred`. WDSF "Latin/Caribbean" lists are dancesport, not social salsa/bachata: add this in the notes. and8.dance covers breaking only. |
| F-14 | B2 | Fix the FIDS row (wrong CONI URL: find the real FIDS federation page). Find the Dutch dancesport/dance body (and the Dutch breaking body, if any). Add the Austrian, German, Italian, Spanish, Polish, Dutch, French, British breaking federations or equivalents with sources. |
| F-15 | F4 | Remove the internal contradiction (first table "not found" vs second table reused from B1). Re-collect with P4.6; until then mark the B1-derived numbers `stated_by_organiser`, confidence L/M. |
| F-16 | INDEX | Rewrite the statuses to match this plan; add a "Quality" column (solid / caveat / thin / archived) and the date. |
| F-17 | B3, B4 | Replace bare domains with full URLs (open and cite the page). B4: remove the Nike/Adidas/Puma rows unless a concrete dance sponsorship is found on an official page; keep Snipes (BOTY since 2016, Beyond Doubt 2024) with sources. |
| F-18 | E4 | Remove the unsourced local group names (e.g. "Urban Tribe", "Breakin' Station"), or source them. Replace with the real national/regional ladders (P4.7). |
| F-19 | E7 | List every claim; keep only those with a source opened in this pass. Others become `not_found`/`inferred` rows. Note the DE state-level rules as unverified. |
| F-20 | E8, F3, H4, J1 | Re-source: each claim gets a full URL or becomes `inferred`. J1 literature table: check that each study exists (title, year, publisher URL); remove those that cannot be found. |
| F-21 | G2 | Keep KSK (Germany) as a proxy, labelled; salary-site hourly rates stay confidence L and `inferred` in notes. |
| F-22 | E6 | Add Barcelona (and every new deep city) prices; note prices per hour vs per month. |
| F-23 | A5, A6 | Rebuild in P5.4 and P5.5 with a rendered browser. |
| F-24 | General | The URLs independently verified by the orchestrator (see INDEX weak-spot 5) get `access_status = opened`; every other URL is re-opened in Phase 3. |

## 5. Phase 3: re-verification of what we already hold
| ID | Task |
|---|---|
| P3.1 | Open every URL used in A1, A2, B1, B2, D2, E6, G4, I3 (rendered when needed). For each: set `access_status` and `access_date`; if the content differs from the stored value, correct the row and log it. |
| P3.2 | Percentage report in `progress.md`: URLs opened / rendered / blocked / not opened. |
| P3.3 | For each `blocked` URL needed for a P1 fact, add a line to `research/manual_collection_list.md`. |

## 6. Phase 4: scenes (discipline x city), Red Bull NOT considered yet
**Place levels** (list in Appendix A): *deep* = all signals; *scan* = EVT, CMP, ORG, ONL (+ ATH for breaking) only; *benchmark* = the same as deep, but only for breaking and salsa/bachata and only the points that matter for comparison.
**Disciplines:** breaking and salsa/bachata at full depth; other hip hop family styles: only EVT, CMP, ORG per city (one pass each).

| ID | Task | Method and sources | Output |
|---|---|---|---|
| P4.1 | **City context**: POP, POPY (15-34 share), STU (students), TOU (tourist nights) for every place in Appendix A. | Eurostat bulk tables (urb_cpop1 by age, urb_ceduc, urb_ctour; use the functional urban area where available, else city proper; one reference year = the latest year available for the most cities, and state it). Non-EU: national statistics offices. Write `metro_definition` and `period` on each row. | facts.csv (disc_id = ALL) |
| P4.2 | **Breaking, deep cities**: SCH, SPA, COM, EVT, CMP, ATH, LAD, PRC. | Event calendars per E3 (and8.dance, Battle of the Year, Hip Hop International, national breaking federations, organiser pages, Instagram/YouTube public event posts viewed manually only). Schools: school websites and timetables (not registry counts, see D3: registries undercount). Spaces: studio-rental pages and platforms (E6). Athletes: and8.dance city fields and federation rankings (public professional figures only). Ladder: which of the five rungs (class, social/jam, local battle, national, international) exist, with one named example each (E4 method). | facts.csv, events.csv, organisations.csv, athletes.csv |
| P4.3 | **Breaking, scan cities**: EVT, CMP, ORG, ONL, ATH only. | Same sources, one pass (max 8 searches per cell). | same |
| P4.4 | **Salsa/bachata, deep cities**: SCH, SPA, COM, EVT, CMP, ATH, LAD, PRC, split by sub-style where the scene differs (C2: Cuban, LA, New York, Puerto Rican; Dominican and sensual bachata). | School and club websites, event platforms (Meetup, Eventbrite, goandance, festival calendars - salsa/bachata congress calendars), federations. Keep dancesport (WDSF "Latin/Caribbean") rows separate: set `notes = dancesport` and a different `disc_id` (BAL-LAT). | same |
| P4.5 | **Salsa/bachata, scan cities**: EVT, CMP, ORG, ONL only. | Same. | same |
| P4.6 | **Major events** (big congresses, festivals, battles): rebuild B1 and F4 for all of Europe and the benchmark cities. For each: edition, dates, city, organiser, scale (with `scale_evidence`), countries claimed, sponsors listed on the **official sponsor page** (record the sponsor names in `notes`). Includes Juste Debout, BOTY, IBE, Outbreak Europe, Berlin Salsa Congress, Croatian Summer Salsa Festival, Amsterdam International Salsa Festival, BCN Dance Life, Crazy 4 La Timba, plus the same kind of event in every Appendix A city. | Official pages; organisers' press kits; stated figures are `stated_by_organiser`. | events.csv, organisations.csv |
| P4.7 | **Ladders and federations**: for each country of an Appendix A city, who runs the national championship in breaking and in salsa/bachata (or the dancesport equivalent), how a dancer qualifies, and where the national winner goes next. | Federation sites, WDSF/IDO member pages, national sport ministries. Replace E4. | organisations.csv, events.csv, relations.csv (qualifies_for) |
| P4.8 | **Online interest**: ONL for each discipline. | (a) Wikimedia pageviews API (method tested in D4): monthly views of the discipline's article per language, 12 months, for EN, DE, IT, ES, FR, PL, NL, PT. Automatic. (b) Google Trends is manual: see `research/manual_collection_list.md`. | facts.csv (period set) |
| P4.9 | **Participation and size (fragmented)**: replace D7/D1 gaps. | National surveys that name dance as an activity; federation membership; licence statistics; the Eurostat `cult_pcs_*` tables; studio counts via city business directories (public). Each number with its definition in `notes`. Never total up different definitions. | facts.csv |
| P4.10 | **Spaces and prices**: finish E6 for every deep city; rental platforms. | Studio sites and platforms (per hour). | facts.csv (SPA, PRC) |
| P4.11 | **Informal scenes**: use E8 protocol: geolocated public jam/session videos and public event posts. | Light pass for deep breaking cities only. | facts.csv (COM, EVT; evidence `inferred` where it is an observation) |

**Done when (Phase 4):** for every *deep* place and `pilot_main` discipline, every signal of the list has either a value or a `not_found` row with its searches; every scan place has its four signals.

## 7. Phase 5: what Red Bull does and does not do
Only after Phase 4, using the same places and disciplines.
| ID | Task | Output |
|---|---|---|
| P5.1 | **Events overlay**: for every event in events.csv (all editions we hold) set `red_bull_involvement` by reading the **official sponsor/partner page** of the event, not a web search. `not_found` only after sponsor page was read; `not_checked` otherwise. | events.csv |
| P5.2 | **Red Bull dance footprint 2024-2026, complete and deduplicated** (BC One incl. cyphers, camps, Studio Takeover; Dance Your Style; any other dance event: Red Bull Flying Bach, Breakin' Salsa 2012, Red Bull Music Academy, regional one-offs). Use redbull.com national pages (rendered). Output: one row per real event with city, date, level and official URL. | events.csv |
| P5.3 | **Per place and discipline summary** as facts: number of Red Bull events 2024-2026 (`found`), and a `not_found` row for each deep/benchmark place x `pilot_main` discipline with no Red Bull event, with the pages checked. | facts.csv |
| P5.4 | **Red Bull athletes in dance** (A5 redone): rendered pass of the Red Bull athlete directory filtered by dance/breaking; sponsored dancers also from Red Bull BC One pages. Public professional figures only. | athletes.csv |
| P5.5 | **Content footprint** (A6 redone): Red Bull dance channels/series on YouTube and redbull.com/Red Bull TV: title, URL, number of videos if displayed, subscribers/views as displayed that day (rendered or manual). | facts.csv (MED) |
| P5.6 | **Programmes** (A7/G4): verify the Performance Center, Basement and Next Generation facts again (rendered) and add any dance-related programme found. | organisations.csv, facts.csv |
| P5.7 | **USA check.** Compare Red Bull's dance footprint in the USA with Europe and the rest of the world, using what is public and countable: events per year 2024-2026 by country; athletes by country; content volume by country edition; sponsorship deals with US dance organisations. Present the numbers as a country table in facts.csv with periods. The conclusion goes in one sentence in `progress.md`: is the US footprint large, small or equal, relative to what? Do not assume the answer. | facts.csv |
| P5.8 | **Red Bull as a business (bounded task).** Find what Red Bull publishes: group revenue, cans sold, employee numbers, countries; what is in company registers (Austrian Firmenbuch: Red Bull GmbH, Red Bull Media House GmbH, Red Bull Sports/event entities; German Bundesanzeiger / Unternehmensregister for Red Bull Deutschland GmbH; Spanish, Italian, UK Companies House, US state filings for the national entities); annual reports or press releases. Goal: a department-level view (media, events, sport) if it exists. Expect that a breakdown by department or by dance is **not public**; if so, write `not_found` rows listing what was checked. Do not buy documents: if a register extract costs money, list the entity, the cost and the price in `manual_collection_list.md` and continue. | redbull_finance.csv |
| P5.9 | **Other brands' footprint in the same scenes**: for every event, who is the main sponsor (from P4.6). Aggregate by brand and discipline (Snipes, Adidas, Nike, Monster, Hennessy, local brands). | events.csv notes, relations.csv (sponsors) |

## 8. Phase 6: support gaps and context (lower priority)
| ID | Task |
|---|---|
| P6.1 | Redo G1 (funding) per country of the deep cities: public funders for street/Latin dance, with figures where public. |
| P6.2 | Redo E7 (teaching regulation) for each country of the deep cities, claims only with a source; mark DE state rules. |
| P6.3 | G2 and G3: keep what is sourced; add national artist-status data (e.g. Austria's künstlerische Selbständigkeit rules) where public. |
| P6.4 | F1/F2: audience and ticket data. Public sources first (organisers' ticket pages, event platforms, goandance); the rest goes to the manual list. |
| P6.5 | H1/H4: platforms and activity inventory only for cities that are *deep*, each item with a full URL. |

## 9. Phase 7: closing the batch
1. Run the validator (or the hand checks).
2. Regenerate `research/results/INDEX.md` (quality column).
3. Update `README.md` and `project/project_memory.md` (sections 7, 8) in place; no duplicate files; no new versions of the workbook.
4. In `research/progress.md` write: rows per CSV; % of cells with value vs `not_found`; list of conflicts between sources; the manual list status; open questions for Leonardo (max 10).

## Appendix A: places
Seed lists; the list is **not closed**. Add a place only if it meets at least two criteria: (1) capital or metro area above about 1 million inhabitants (Europe); (2) a world-class event or scene in breaking or salsa/bachata; (3) Red Bull holds an event there; (4) data exist to measure it. Record the criteria met in `inclusion_reason`.

**Deep (Europe, 15):** Salzburg (SBG), Innsbruck (INN), Vienna (VIE), Graz (GRZ), Munich (MUC), Berlin (BER), Milan (MIL), Rome (ROM), Barcelona (BCN), Madrid (MAD), Paris (PAR), Amsterdam (AMS), London (LON), Warsaw (WAW), Zurich (ZRH).
**Scan (Europe):** every other European capital and every other metro area above about 1 million: at least Lisbon, Porto, Valencia, Sevilla, Lyon, Marseille, Montpellier, Brussels, Rotterdam, Hamburg, Cologne, Frankfurt, Stuttgart, Dusseldorf, Turin, Naples, Prague, Budapest, Bratislava, Ljubljana, Zagreb, Belgrade, Bucharest, Sofia, Athens, Kyiv, Gdansk, Krakow, Copenhagen, Stockholm, Oslo, Helsinki, Dublin, Manchester, Birmingham, Lausanne, plus any other capital not listed (Baltic states, Balkans, Iceland, Luxembourg, Malta, Cyprus, Moldova, Belarus capitals can be marked `scan` with only EVT/CMP/ORG).
**Benchmark (outside Europe, max 14 to start):** New York (NYC), Los Angeles (LAX), Miami (MIA), Toronto (YTO), Seoul (SEL), Tokyo (TYO), Mexico City (MEX), Sao Paulo (SAO), Cali (CLO), Havana (HAV), Santo Domingo (SDQ), San Juan PR (SJU), Johannesburg (JNB), Mumbai (BOM). Add Medellin, Rio, Lagos, Casablanca only if the criteria are met in the first pass. Include the **USA at country level** (US) for the Red Bull footprint (P5.7).

# Dance Scene Atlas: project memory

Status as of 2026-10-21, rewritten in full after the clean-up. Single source of truth for the goal, hypotheses, results, decisions and open items. Language: English (chat with Leonardo in Italian).

## 1. Context
- Leonardo Campese prepares an open application to Red Bull (Product/Project Manager; Austria first, then Spain or Italy). The project shows product thinking: a problem, evidence, a decision, a proposal.
- Leonardo dances and teaches salsa and bachata in Salzburg. Latin is his field: congresses are long nights of dancing, drinking and moving.
- Second use of the same work: if Red Bull is not interested, Leonardo's own project (a congress or another dance event).
- Budget up to EUR 1,000-2,000 only if the idea proves valid; no deadline. Friends at Red Bull validate, they never source data.

## 2. Goal and question
> **Two dance markets.** Breaking is a *spectacle* market (few practise, many watch; Red Bull's model, Red Bull is in it). Latin (salsa, bachata) is a *participation* market (many dance, pay, travel, party until late; almost nobody watches its competitions; Red Bull is not in it). **Can Red Bull enter the Latin market, how, and where?**

Breaking is the reference (what Red Bull already knows); Latin is the case. Every comparison is made on equal terms: independent events with independent events, never Red Bull's own events or accounts as the comparator.

## 3. Hypotheses and where they stand

| # | Hypothesis | Status | Key evidence (details and ids: outputs/analysis.md) |
|---|---|---|---|
| H1 | Two markets: Latin larger in participation, breaking larger in audience | **Supported in a revised form (round X random samples)** | Breaking = a few global spectacle brands (plus Red Bull media) on top of a long tail of small one-day battles (typical event 1,641 Instagram followers, ticket about EUR 9, entry fee about EUR 10). Latin = a broad middle of multi-day congresses paid by dancers (typical event 4,461 followers, p = 0.02 vs breaking; 3 days; full pass about EUR 115, up to 245). Both worlds are participatory at the base; Latin monetises participation, breaking monetises attention at the top. Caveat: the two calendars come from different platforms (goandance vs and8) |
| H2 | Red Bull can enter Latin through product presence at congresses and socials, not a competition | **Plausible** | Red Bull runs participation activations (Dance Your Style zone at Open'er, DYS Weekender London workshops, fitness zone at Rock for People, Hyrox, F45 official energy drink with sampling, Wings for Life Run). No Red Bull presence found at Latin congresses in 9 countries. Sponsor pages of congresses rarely published; only drinks brand found: Freixenet (Croatian Summer Salsa Festival) |
| H3 | Latin reach sits with dancers and congresses as gatherings, not with event or competition brands | **Tendency, not proven** | Top 30 dancers equal (4.8m vs 4.1m); dancer/event ratio 5.4 vs 3.5 (flagships) and line-up artist/event 13 vs 8 (random samples, 12 + 8 artists): same direction, small samples |
| H4 | A Latin activation takes root where Latin is strong and Red Bull already operates | **Answered with data on file** | Paris, Barcelona, Madrid (5 of 6 criteria), Milan (4). Paris is the most robust (also first on city-only criteria). Salzburg 1 of 6 (Red Bull HQ in Fuschl am See): a home-region pilot, not a market choice |

Proposal that follows: **one pilot activation at one congress**, agreed with an organiser and measured (cans, contacts, dancers' feedback). Not a new competition; dancers are not proposed as sponsored influencers (their reach measures attention, it is not a channel to buy).

## 4. Scope
- Cities: Salzburg (SBG), Innsbruck (INN), Vienna (VIE), Graz (GRZ), Munich (MUC), Berlin (BER), Milan (MIL), Rome (ROM), Barcelona (BCN), Madrid (MAD), Paris (PAR), Amsterdam (AMS), London (LON), Warsaw (WAW), Zurich (ZRH). Countries: AT, DE, IT, ES, FR, NL, UK, PL, CH. Plus the cities of the 40 comparison events.
- Disciplines: breaking (URB-BRK; URB-MIX for all-styles events such as Dance Your Style and Juste Debout), salsa (CAR-SAL), bachata (CAR-BCH).
- Out: kizomba, zouk, dancehall, other hip hop styles; other cities; Wikipedia views and online-interest indexes; Red Bull finances; funding, regulation and income topics; city-level platform counts (not measurable). Their rows are in archive/data_v1/.

## 5. Method rules
1. Compare like with like; say whether a number counts dancers, spectators, followers or listings. Red Bull's own events and accounts are never the comparator.
2. Every number has a source and a date; estimates have ranges and confidence; `not_found` is a valid answer with the searches written.
3. Public sources only; organisations and public professional figures only (name, follower counts, public role); no private individuals.
4. Social platforms: only what a public page shows without login; no scraping; third-party statistics pages only as `inferred`, confidence L; numbers behind a login are read by Leonardo by hand.
5. Never write "Red Bull absent": `not_found` with the pages checked.
6. Units: the standard strings of project/data_schema.md section 5.

## 6. What exists (files)
- data/*.csv: the evidence (931 facts, 147 events, 125 organisations, 75 athletes, 77 relations, 411 sources, 114 places after the clean-up). research/data_summary.md: the evidence ordered by research question (generated).
- outputs/analysis.md (full analysis, every number with its id) and outputs/one_page.md (the one-page summary for Red Bull).
- research/manual_input.ods: the only file Leonardo fills by hand (Salzburg rows started: Salsa Studio, Latino Mio, Salsa Club Salzburg).
- research/census/: round Y lists (one CSV per source and world) and merged_events.csv. research/logs/: logs of rounds T, U, V, W, X, Y (and the R-round ladder log). research/frames/: round X sampling frames (goandance Latin 222 rows, and8 breaking 71 rows) and the two random samples of 30.
- Folder map and commands: README.md.

## 7. Open items
Leonardo (by hand):
1. Salzburg ground truth in research/manual_input.ods (rows SBG-S and SBG-X are enough).
2. Validation talks: 3-5 congress organisers (real attendance, share of full passes, current sponsors and bar, openness to a drinks partner) and 2-3 Red Bull contacts (sampling at participation events, who decides, how results are measured). Questions to be prepared by Claude.

Not public or blocked (only worth doing if a talk needs it):
3. Sponsor/partner pages of 37 of the 40 comparison events (JavaScript ticket pages): ask organisers instead.
4. YouTube channel subscribers (consent wall), Facebook followers of breaking events and dancers, TikTok and Instagram hashtag counts behind logins.
5. Segmented national championship results (Italy FIDS Caribbean and breaking, Germany DAT Latin): pages must be saved by hand into scripts/input/ and counted with scripts/count_competitors.py. Parked: competitions are small in both worlds.
6. Red Bull office rows for France and Switzerland stay confidence L (sources behind bot checks).

## 7b. Robustness review (plan A, 2026-10-21)
External critique: missing research, small samples, follower-only metrics, possible confirmation bias. Done: scripts/robustness.py (seeded bootstrap and permutation tests); outputs/analysis.md section 9 (results, confidence per conclusion, named biases, tests written before new data); H1 and H3 claims softened in the analysis and the one page. Found during the review: the clean-up had merged 7 rows of different accounts with equal values; restored (review_log). Plan B = round X (project/prompts/prompt_round_x.md): random samples of 30 + 30 events from full frames, symmetric artist comparison, counter-evidence on the flagship events, engagement; optional 5 Latin cities for H4. Plan C = talks with organisers and Red Bull contacts (Leonardo).

## 7c. Presentation (2026-10-21)
Web deck "Two Dance Markets", rebuilt 2026-10-21 as 10 slides in English (cover; the question; how we know; two markets, two business models; Latin is the larger, stable event market; audience at the top vs spread; Hyrox as the participation reference; the proposal "Be the energy of the nights"; where to start: Barcelona and Paris; how sure we are and next steps). Used both as a link read alone and presented live (speaker notes hold the details); no slide about Leonardo: https://claude.ai/artifact/UgT8MtrC8TBA43GG2hdGhm (private until shared from its Share menu). Built from outputs/analysis.md sections 2-10; every number on it is in data/. Leonardo's decision: the deck comes before the talks; Google Trends and engagement only later, if needed to validate.

## 7d. Decisions of 2026-10-21 (evening, after the first deck)
- Priority: a census of the European event market before any further conclusion: several sources per world, crossed (capture-recapture estimate of the total), window past 24 months + next 12 months, trend from archived snapshots of the same listing pages.
- Third world as reference: Hyrox (participation market where Red Bull already plays).
- Follow the market: cities come from where events cluster in the census, not from the fixed 15.
- Business case only as a light parenthesis (Red Bull's role in Hyrox and similar, public sponsorship tiers).
- Dropped: city-level class/school counts; national championships kept as one slide only; deck graphics refined only after the new data.
- Round Y prompt: project/prompts/prompt_round_y.md; merge and estimate: scripts/census_merge.py (writes research/census/merged_events.csv).

## 7e. Round Y census results (2026-10-21, analysis section 11)
- Latin: about 450-750 congresses/festivals a year in Europe (3 sources crossed), stable (0% over two years in the same source); Spain 21%, Germany 13%, Italy 10%, France 9%; Barcelona the largest Latin event city.
- Breaking: about 210 events a year on and8.dance (no second calendar exists), stable.
- Hyrox (reference): about 45-60 European races a year, growing (+22%), EUR 60-89 per athlete; Red Bull named on all 15 race pages read, partner or finish zone on 9.
- Key difference Latin vs Hyrox: fragmentation (hundreds of organisers vs one). Entry must reach many congresses at once (largest 20-30, a circuit or a platform) or start small.
- No public sponsor packs with prices; market volume in dancers not computable (sizes rarely published); only a scenario for talks.
- Scripts: scripts/census_merge.py, scripts/census_stats.py.

## 7f. Round Z results (2026-10-21, analysis section 12)
- Large events, Europe, last 12 months: Latin 10 events with >= 1,000 dancers taking part (2-3 with >= 3,000; about 23,000-26,500 dancers in total), breaking 1 (Outbreak Europe, about 2,000 breakers); breaking has 3 events with >= 3,000 spectators (IBE, Battle Pro, Outbreak), Latin none. Supports the two-markets thesis at the top. Figures are organiser claims (L-M), lower bounds.
- Breaking total: no second calendar can be harvested; still about 210 a year on and8.dance, probably above about 330 in reality; not comparable with Latin's 450-750 by the same method.
- Social: Instagram blocks cloud sessions; snippets only; no engagement data. Round X result stands.
- Hyrox 2025: 89 races, 779,073 finishers worldwide, about 8,750 per race (deck updated).
- Curated table: research/sizes/large_events.csv.

## 7g. Round AA1 results (2026-10-22)
- 162 Latin events read (150 random + 12 large): research/prices/latin_events_detail.csv. 84 full pass prices, 149 date ranges, 90 venue names, 58 line-ups, 9 stated sizes; 13 out of scope, 0 blocked. Notes say what each page did not show.
- research/artists/lineups.csv (684 artist rows, 416 distinct couples/solos), name_map.csv (184 merged spellings), artist_reach.csv (40 most booked; Instagram followers found for 11, 29 not linked with certainty).
- Limits: official/ticket page read for 54 events (4 did not render); line-ups are mostly go&dance cards, so counts are biased to events on that platform. Log: research/logs/AA1_log.md. Nothing committed; data/ unchanged, validate_data.py still 0 errors.

## 8. Next steps (2026-10-21, after round X)
0. Round Y executed (data + log); next: Claude analyses the census (merged_events.csv, overlaps, snapshots, Hyrox) and updates the deck.
1. Leonardo, 1-2 hours (optional now that round Y crosses sources): **coverage check of the two platforms in Austria** (and Salzburg): list every Latin congress/festival and every breaking battle he knows in Austria for the next 12 months, then mark which are on goandance and on and8.dance. The share listed tells how representative the two platforms are (answer to the main critique). Also the Salzburg rows (SBG-S, SBG-X) in research/manual_input.ods.
2. Leonardo, 2 weeks: talks in this order: 2-3 Latin congress organisers, 1 breaking organiser, 2-3 Red Bull contacts. Messages and questions: outputs/outreach_kit.md. Show outputs/one_page.md.
3. Claude: after the talks, update H2 (sponsors, bar, openness), the analysis and the one page; then a short deck and a pilot proposal (one congress, objectives, measures, cost).
4. No more desk-research rounds unless a talk raises a precise question.

9. Round Z (2026-10-21, revised with Leonardo): cloud agent with full web access, project/prompt_round_z.md. Z1 sizes of the large events in both worlds (size classes >= 300, >= 1,000, >= 3,000 people per year, participants and spectators apart); Z2 breaking counted like Latin (2-3 more breaking listings, capture-recapture); Z3 social attention per event (followers, likes, comments, video views) for large events and the random samples research/frames/size_frame_*_sample.csv; Z4 drinks brands seen on the way; Z5 Hyrox finishers per race. Dropped: Wikipedia, energy drink market, Red Bull and Monster figures, rules (not worth the effort now). Model: project/business_case_model.md. Deck fix pending: Hyrox size per event (2025: 89 races, 779,073 finishers worldwide, about 8,700 per race; slide says about 2,700).

10. Round AA (revised with Leonardo, 2026-10-21): local opencode agent COLLECTS only, Claude analyses and builds. Three prompts, independent: project/prompt_aa1_events.md (162 Latin events: prices, days, venue, line-ups; followers of the 40 most booked artists), project/prompt_aa2_cities.md (24 cities, research/cities/city_list.csv; indicators C1-C10, each with 5 candidate sources chosen by Claude, first source covering 18+ cities kept, else dropped), project/prompt_aa3_costs.md (public cost benchmarks K1-K14 for the congress model). Claude then builds: the congress model in Excel (no Red Bull sheet: not relevant until Red Bull's role at an event is known), the two city rankings (Red Bull entry, new congress) with weight-robustness test, the price and line-up analysis (what has enough data is used). Superseded prompts AA/AB moved to archive/prompts/.

## 9. Decisions log
- 2026-10-19: broad Dance Scene Atlas (discipline x city map, sections A-E, 148 places, 30 disciplines); first research run (49 result files); CSV data model; local viewer.
- 2026-10-20: correction pass; analysis of the folder: 73% of facts were `not_found`, city-level data not obtainable from desk research; focus Latin vs breaking in 15 cities; research questions RQ1-RQ5; round R.
- 2026-10-21 (late): round X: random samples of 30 + 30 events from full calendars; typical Latin events are more followed, longer and paid by dancers; breaking's audience advantage only at the top; H1 revised, H2 still untested on sponsors.
- 2026-10-21: round T (national championships, events, pilot schools); project redefined as the two-markets thesis with hypotheses H1-H4; round U (Red Bull precedents, congress market, social reach); round V (analysis and one page; V2 offices added in review); Leonardo's critique: compare independent event markets, not Red Bull Dance with a congress; round W (20 + 20 independent events); clean-up of data and documents (this file, README, data schema v2; archive/ for everything superseded; viewer archived).
- 2026-10-21 (night): round Y executed (census lists in research/census/: Latin 3 sources, breaking and8 + 2 weak, Hyrox 3; merged_events.csv; snapshot counts; depth on 8 new Latin events + 15 Hyrox races + official-page reads; Red Bull on all 15 Hyrox pages read). Analysis of the census still to do by Claude. Log: research/logs/Y_round.md.
- 2026-10-21: round X executed (frames, random samples of 30 + 30 events, symmetric line-up artists, counter-evidence on the 40 flagship events; data only, tests of outputs/analysis.md section 9 not yet run). Known limits: breaking frame = and8 registry only; line-up artists resolved mostly for the better known ones; no partner sections read for the 60 sampled events; X5 (five more Latin cities) not done.
- 2026-10-21 (night): round Z prepared: business case model with an input map (only data the model uses is collected); new signal BEV and units in data_schema section 5; size samples drawn from the census; prompt for a cloud agent working on its own branch. Free sources only.
- 2026-10-21 (night, later): round Z revised: focus on a comparable count (large events by size class, breaking counted with several sources) and social hype; market and Wikipedia research dropped. The earlier cloud test showed that a session with limited network can search but not open pages: round Z needs a cloud environment with full network access.
- 2026-10-21 (night): round Z executed on branch round-z and merged by Claude: CSV with one extra column fixed (event_sizes.csv); breaking_officialpages.csv moved out of research/census/ (flagship list, would bias capture-recapture); census unchanged. Deck: market slide shows large events by size class; Hyrox size corrected.
- 2026-10-21 (night): deck redesigned at Leonardo's request: 15 slides, Red Bull-like palette (red = Latin, blue = breaking, khaki = Hyrox, navy statements), point figures instead of wide ranges (traced in outputs/analysis.md section 12), new slides: three worlds, largest events, content, countries, business case light. Same link.
- 2026-10-21 (night): AA1 checked (analysis section 13): median full pass EUR 110 (n = 76, random); price barely rises with days; 14 artists appear at 81% of the 57 events with a line-up (bias: goandance, bachata, Spain). Size, competition and band fields not usable.

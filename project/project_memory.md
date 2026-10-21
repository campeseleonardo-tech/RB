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
| H1 | Two markets: Latin larger in participation, breaking larger in audience | **Partly supported; event-follower difference not significant (p = 0.17, n = 15 vs 17)** | Independent events (20 + 20): breaking median 30k Instagram followers per event, spectators (IBE 10,000), tickets EUR 35-40; Latin median 15k, paying dancers 1,000-5,000 per congress, full pass EUR 115-245. Same order of money per flagship event (computed about EUR 300k vs 350k). Competitions equally small (46-125 breaking, 65-123 Latin per national final). Calendar: about 160-220 Latin listings vs 64 breaking in Europe for the next 12 months (different platforms). Participation in classes: minimums only (Vienna, Milan) |
| H2 | Red Bull can enter Latin through product presence at congresses and socials, not a competition | **Plausible** | Red Bull runs participation activations (Dance Your Style zone at Open'er, DYS Weekender London workshops, fitness zone at Rock for People, Hyrox, F45 official energy drink with sampling, Wings for Life Run). No Red Bull presence found at Latin congresses in 9 countries. Sponsor pages of congresses rarely published; only drinks brand found: Freixenet (Croatian Summer Salsa Festival) |
| H3 | Latin reach sits with dancers and congresses as gatherings, not with event or competition brands | **Tendency, not proven** (dancer/event ratio 5.4 vs 3.5, intervals overlap; selection asymmetric) | Top 30 dancers: Latin 4.8m Instagram followers in total (median 81k), breaking 4.1m (median 105k). Median dancer / median event account: Latin 8.5x, breaking 1.25x (computed). Breaking's viral videos are battles, Latin's are couples' performances |
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
- research/logs/: logs of rounds T, U, V, W, X (and the R-round ladder log). research/frames/: round X sampling frames (goandance Latin 222 rows, and8 breaking 71 rows) and the two random samples of 30.
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

## 8. Next steps (proposed 2026-10-21)
0. Round X (local agent): project/prompts/prompt_round_x.md; then Claude runs the tests of analysis section 9.
1. Claude prepares the questions for organisers and Red Bull contacts (as rows in research/manual_input.ods, or a short list in chat if the file is being edited).
2. A concrete pilot proposal (one congress, objectives, measures, cost).
3. Slides and the application text, built on outputs/one_page.md and the results of the talks.

## 9. Decisions log
- 2026-10-19: broad Dance Scene Atlas (discipline x city map, sections A-E, 148 places, 30 disciplines); first research run (49 result files); CSV data model; local viewer.
- 2026-10-20: correction pass; analysis of the folder: 73% of facts were `not_found`, city-level data not obtainable from desk research; focus Latin vs breaking in 15 cities; research questions RQ1-RQ5; round R.
- 2026-10-21: round T (national championships, events, pilot schools); project redefined as the two-markets thesis with hypotheses H1-H4; round U (Red Bull precedents, congress market, social reach); round V (analysis and one page; V2 offices added in review); Leonardo's critique: compare independent event markets, not Red Bull Dance with a congress; round W (20 + 20 independent events); clean-up of data and documents (this file, README, data schema v2; archive/ for everything superseded; viewer archived).
- 2026-10-21: round X executed (frames, random samples of 30 + 30 events, symmetric line-up artists, counter-evidence on the 40 flagship events; data only, tests of outputs/analysis.md section 9 not yet run). Known limits: breaking frame = and8 registry only; line-up artists resolved mostly for the better known ones; no partner sections read for the 60 sampled events; X5 (five more Latin cities) not done.

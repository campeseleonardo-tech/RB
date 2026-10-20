# Project analysis and proposed redefinition (draft)

Status: draft v0, 2026-10-20. Written after reading the whole folder (README, project memory, brief, plans, 49 result files, INDEX, results review, progress, logs, the 11 CSV tables, the legacy workbook and the viewer status). Open decisions are marked **[Q]** and listed in section 7; the plan in section 6 changes depending on the answers.

## 1. What exists today

| Asset | State | Usable for the application? |
|---|---|---|
| 49 research files (A-J) | 15 solid, ~25 partial, 6 thin, 3 archived | As background and as a record of method verdicts |
| data/ (11 CSV, 1,960 rows) | Validator OK (0 errors) | Partly: see section 2 |
| Viewer (single HTML, map, grid, concept map) | V0-V5 done on sample data, V6 (real data) not built | Yes, once fed with a smaller, cleaner dataset |
| Legacy workbook | Read-only | No |
| Insider network at Red Bull | Not used yet | The most valuable asset, still untouched |

## 2. What the data really says (numbers from data/ on 2026-10-20)

1. **Most rows are "not found".** facts.csv: 1,314 rows, of which 959 (73%) are `not_found`, 328 `found`, 14 `stated_by_organiser`, 13 `inferred`.
2. **The "353 of 360 cells present" in closing_numbers.md counts `not_found` rows as present.** It measures search effort, not knowledge. It should not be quoted as coverage.
3. **Breaking, the main discipline and the calibration reference, is almost empty at city level.** In the 15 deep cities: 141 breaking rows, 18 usable, and 9 of those are Red Bull event counts. That leaves about 9 scene values for 15 cities. The calibration idea (J1/J2: "measure a strong scene where Red Bull is present, then look for similar ones") has no data to work on.
4. **Scan and benchmark cities are empty.** 68 scan cities: 1 discipline-specific usable fact. 14 benchmark cities: 0 usable out of 236 rows.
5. **Salsa/bachata values exist but measure the listing site, not the scene.** Examples: London "6 salsa organisations", Zurich "1 salsa class per week", Milan "6 class slots per week". These are counts of what one guide (Salsa Vida, Gone Dancing) lists. They cannot be compared across cities or read as scene size.
6. **Units are mixed inside the same signal.** PRC mixes EUR/session, EUR/month, CHF per 8-week course, GBP/session and room rental per hour. No comparison is possible without normalisation.
7. **Rows to re-check before any use** (internal evidence of errors, not yet verified online because these hosts are blocked from this environment):
   - F000148: Milan bachata EVT = 165, but the note says "in Rome".
   - Milan/Rome salsa CMP = 2: the note says "breaking-related competition entries" from and8.dance.
   - Zurich salsa/bachata EVT: the note says "Graz socials counted for ZRH".
   - The same school names appear in different cities (e.g. "Bachata Bliss" in Graz and Warsaw; "Bachata Paradise" in Paris, Amsterdam and London; "Bachata Extravaganza" in Paris and London). This pattern suggests generated names. 12 Gone Dancing facts were never opened.
   - Warsaw/Zurich "national bachata championships via PZST/DSCH": unverified.
   - US Red Bull breaking count (4) includes Toronto, which is in Canada.
8. **The dataset is Red Bull-centric despite the principle.** 66 of 98 events are Red Bull events. Non-Red Bull scene events in the deep cities are few.
9. **What is solid:** Red Bull dance footprint 2026 (BC One 27 stops, DYS 17 stops, world-final history); Eurostat city context (POP, POPY, STU, TOU); national federation and licence figures (DTV, FR ministry, ISTAT, WDSF member pages); Wikipedia pageviews (but per language, so they cannot rank cities); method verdicts.
10. **Method verdicts already answered the feasibility question.** Registry counts: No (D3). Informal scenes: Partly, only with manual video checks or informants (E8). Competitor attribution to cities: Partly, breaking only, via and8.dance (E5). Enumeration: Partly (E2). National participation: partial and non-comparable (D1). In short: **a discipline x city strength map cannot be built reliably from public desk research alone at European scale.** That is a valid result, and it should drive the redefinition.

## 3. Analysis of the problem definition

### 3.1 Two goals are mixed and only one is written down
- **Goal A (the real one):** get a Product/Project Manager role at Red Bull (Austria first) through an open application.
- **Goal B (the vehicle):** build the Dance Scene Atlas.
- The project has success criteria only for B (rows, cells, validator). Nothing says what B must achieve for A: who must see it, what reaction is expected, by when. A hiring manager does not need 1,960 rows; they need to see how the candidate finds a problem, frames it, tests it cheaply, decides and delivers.

### 3.2 There is no user and no decision
"Estimate what territories and disciplines where Red Bull is absent could be worth to it" has no owner inside Red Bull. Each possible owner needs different data:

| Possible user at Red Bull | Decision the atlas would support | Data it needs |
|---|---|---|
| BC One / Dance Your Style series team | Where to place cyphers, qualifiers, camps | Competitive scene per city: battles, competitors, results (countable via and8.dance and federations) |
| Athlete / talent team (dance) | Where to scout, whom to support | Competitors and results, ladders, missing rungs |
| Country marketing (e.g. Austria) | Which local scenes to activate | Local supply: schools, jams, spaces (Salzburg pilot) |
| Media House / digital product | How to turn viewers into participants | Discovery of local classes and events (section E idea) |
| Business development | Whether to enter a new discipline (Latin) | Audience, brand fit, competitive structure |

Without picking one, the collection tried to serve all of them, which is why it went wide and thin.

### 3.3 "Worth to Red Bull" is not defined
There is no value model: is value audience reach, content, talent pipeline, brand fit, local activation, cost? F1 and F2 (audience, sponsorship value, event economics) are thin. Any "potential" score would therefore be arbitrary.

### 3.4 Five sections are five different projects
A (atlas), B (gap view), C (support programme), D (discipline scorecard), E (watch-to-try). Each could be a project of its own. With a budget of one month and EUR 1,000-2,000, at most one core plus one demo is realistic.

### 3.5 Scope drifted against the original risk mitigation
The memory says "two pilot disciplines, funnel from coarse scan to a few deep dives, go/no-go gates". The plan then expanded to 148 places (15 deep, 68 scan, 14 benchmark, 50 countries) and 30 disciplines, and no gate was applied. The 2-3-day feasibility check effectively happened: its answer (section 2.10) was not used to cut scope.

### 3.6 The Latin dance hypothesis is untested and may be a weak fit
Red Bull's dance properties are competitive, spectacular, youth-oriented battles. Salsa/bachata scenes are mainly social partner dancing organised around schools and congresses, with no Red Bull touchpoint found (A3) and no unified competitive circuit (B2: social scene ungoverned; WDSF "Caribbean" is dancesport). The absence may be a deliberate choice by Red Bull, not a gap. This deserves a short, honest opportunity assessment rather than half of the data effort. **[Q2]**

### 3.7 The strongest assets are unused
- **The insider network:** I4 has 10 questions ready, none asked. Talking to 3-5 people first would tell which user and decision matter (3.2) before more collection.
- **Salzburg:** Red Bull's home region, a BC One world-final host (2020), a DYS qualifier city (2026), and the candidate's own pain point (hard to find a place to teach). The E1 pilot is "the only real test of bottom-up counting" (results review) and is still on hold.
- **Timing:** DYS World Final, Zurich, 24 Oct 2026 (in 4 days); BC One World Final, Toronto, 29 Nov 2026; breaking out of LA28 with a Brisbane 2032 push (B3). The post-Olympic gap in breaking is a timely, concrete context.

### 3.8 Collection ran without a question
The rule "no scores, no why, collect everything first" was meant to avoid bias. Without a hypothesis to test, it produced mostly `not_found` rows. The next round should collect only what answers a stated question.

## 4. Proposed redefinition

### 4.1 Problem statement (proposal, to confirm)
> Breaking lost its Olympic path after Paris 2024 (LA28 decision). Red Bull BC One is the main global property left in the scene, with 27 stops in 2026. Where in Europe are there active competitive breaking scenes without a Red Bull stage, and what would a light, low-cost Red Bull entry look like there? Salzburg serves as a hands-on test of how to measure a local scene from the ground up.

Why this framing: it has a clear owner (BC One / dance team), a decision (where to place the next cyphers or activations), countable public data (battles and results on and8.dance, national federations, the solid Red Bull footprint already in data/), a timely context, and a home-city demo. Latin dance becomes a one-page opportunity assessment that shows prioritisation. Alternatives are in 4.3.

### 4.2 Objectives

| # | Objective | Measure of success | Target date **[Q4]** |
|---|---|---|---|
| O1 | Career: turn the project into conversations with the right Red Bull teams | At least 3 conversations with people in dance/events/athlete/product teams; 1 referral or request for the material | +4 weeks |
| O2 | Validate the problem before building more | 3-5 insider talks (reworked I4); one user and one decision chosen and written down | +1 week (Gate 1) |
| O3 | A credible, small evidence base | 15-25 European cities with a comparable breaking scene profile (battles per year, competitors, ladder rungs, Red Bull presence), each value with source, range and confidence; untrustworthy rows flagged or removed | +2.5 weeks |
| O4 | Prove the bottom-up method in one city | Salzburg pilot in about 8 hours: schools, classes, jams, spaces, prices, rungs, with measured coverage and time per step | +2 weeks |
| O5 | Shareable outputs | Viewer V6 on the cleaned data; 1-page brief; 5-7 slide case (problem, method, findings, whitespace list, Salzburg demo, next steps); Latin one-pager; application letter | +4 weeks |
| O6 | Reusability (secondary) | A 1-page method note showing how the same model applies to another discipline or sport | +4 weeks |

### 4.3 Alternative framings (if the insiders point elsewhere)
- **Watch-to-try (section E):** a Salzburg discovery map for dance classes and events, tested with real users; best if the target is a digital product role at Red Bull Media House.
- **Athlete support / Basement-like programme (section C):** best if the target is athlete or talent management; needs the gaps data (G1-G3), which is thin today.
- **Latin dance entry case:** only if insiders signal real interest.

## 5. Data hygiene before any analysis (Phase 0)
1. Stop quoting "353/360 cells"; report usable values per signal and city instead.
2. Flag or remove the rows in section 2.7 (suspected generated names, notes naming another city, mismatched discipline); re-open the 12 Gone Dancing sources.
3. Normalise PRC into separate units (rental EUR/h; class EUR per single lesson), with currency conversion and a date.
4. Mark listing-site counts with a note "count of listings on X, not scene size".
5. Fix the US/Toronto count; recount Red Bull events per country.
6. Shrink the active place list for the next round to the cities the problem needs; keep the rest in the files as `scan` without more effort.

## 6. Action plan (4 weeks, with gates)

| Phase | When | What | Output | Gate |
|---|---|---|---|---|
| 0. Decide and clean | Days 1-3 | Answer section 7; freeze scope; data hygiene (section 5); optional: attend DYS World Final Zurich 24 Oct as field observation and networking | Updated project_memory; flagged data | - |
| 1. Validate | Week 1 | 3-5 insider talks with reworked I4 questions (which decisions, which teams, what data they lack; no confidential information) | 1-page interview notes (no personal data); chosen user and decision | **Gate 1:** a real user and decision exist? If not, switch framing (4.3) or stop |
| 2. Targeted collection | Weeks 1-2 | Breaking: and8.dance events and results per city 2024-2026, national federation calendars and ladders, for the chosen 15-25 cities. Salzburg pilot E1 (go). Latin: sponsor pages of the main congresses + 1-page assessment | Clean rows in data/; E1 file; Latin one-pager | **Gate 2:** are there at least 15 cities with comparable values? If not, present the method plus Salzburg only |
| 3. Analysis | Week 3 | Simple, transparent profile per city (no single opaque score): scene indicators vs Red Bull presence; whitespace list with ranges and confidence; sensitivity check; circularity caveat (J2) | Whitespace table; 3-5 findings | - |
| 4. Outputs and outreach | Week 4 | Viewer V6; 1-page brief; slide case; application letter; send to contacts | Shareable package | **Gate 3:** feedback from at least 2 insiders before the formal application |

Budget (up to EUR 1,000-2,000, only if Gate 1 passes): travel for field observation (Zurich or a BC One stop), possibly one month of a paid trends/data tool, printing. Nothing is needed before Gate 1.

## 7. Open questions for Leonardo
- **[Q1] Target team and role.** Which team at Red Bull is the first target (BC One/DYS events, athlete management, Media House digital product, country marketing Austria, other)? In which teams are your contacts?
- **[Q2] Latin dance.** Is it essential (your own background and advantage) or can it become a 1-page opportunity assessment?
- **[Q3] Your link to the scenes.** Do you dance or teach, which style, and are you based in Salzburg? This decides how credible the Salzburg pilot and the informant route are.
- **[Q4] Timing.** Is there a target date for the application? Will you attend DYS Zurich (24 Oct) or a BC One event?
- **[Q5] Audience of the output.** A hiring manager (5-minute story) or a team that would use a tool? This decides how much tool versus how much narrative.
- **[Q6] Insider access.** Can you hold 3-5 short talks in the next 7-10 days?
- **[Q7] Data clean-up.** Should the suspicious rows (section 2.7) be flagged now, or removed?

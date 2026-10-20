SUPERSEDED (2026-10-21): the project is now the two-markets thesis in project/project_memory.md sections 2-3. This file is kept only for the diagnosis of 2026-10-20.

# Project analysis and plan

Status: v1, 2026-10-20. NOTE (fourth session, same day): sections 2 and 3 (diagnosis) still hold; the goal, research questions and scope are now in project/project_memory.md sections 2-4, which replace sections 4 and 5 below (Wikipedia, Google Trends and the M1-M6 indicators are dropped; the collection prompt is project/prompts/prompt_rq_collection.md). v0 (same day) analysed the whole folder and proposed a breaking-only framing; Leonardo answered and v1 replaces it. Section 2 keeps the diagnosis of the data, which still holds.

## 1. What Leonardo decided (2026-10-20)
- **Focus on Latin (salsa, bachata).** Leonardo dances and teaches salsa and bachata in Salzburg. His hypothesis: the Latin world is a large market, larger than breaking. The research must test this, not assume it.
- **Breaking stays as the comparison**, and as the Red Bull question: where Red Bull is not yet present.
- **Output wanted:** enough data to say, per city, "Red Bull could enter here" or "it makes no sense here, the scene is not popular enough", for breaking and for Latin.
- **15 comparable cities**, not 148: the 15 deep cities already on file.
- **Two uses of the same data:** (a) the Red Bull application; (b) if Red Bull is not interested, Leonardo's own project (a congress, an event, another dance project).
- **No deadline.** Within 1-2 weeks: is the project worth continuing and does it lead somewhere?
- **Use what exists:** summarise the data and make it usable, mainly through the viewer.

## 2. What the data on file says (unchanged from v0, numbers of 2026-10-20)
1. facts.csv: 1,314 rows, 959 (73%) `not_found`. The "353/360 cells present" in closing_numbers.md counts `not_found` as present; do not quote it.
2. Breaking in the 15 deep cities: 18 usable rows, 9 of them Red Bull event counts. Scan and benchmark cities: almost nothing.
3. Salsa/bachata values exist for 11-13 of 15 cities, but they count entries on one listing site (Salsa Vida, Gone Dancing), not the scene, and units are mixed (prices in 6 different units). The viewer now shows this per signal ("City comparison" view).
4. **45 rows flagged for review on 2026-10-20** (confidence set to L, notes start with `REVIEW`, logged as L00043-L00048, nothing deleted): the whole Paris/Amsterdam/London/Warsaw salsa-bachata block of one agent batch (generic or repeated school names, weekly counts stored as yearly, GBP stored as EUR, scene sizes implausibly small); salsa rows that count breaking competitions; Milan bachata value that belongs to Rome; Rome's 165 events counted twice; Zurich values that include Graz; the US count that includes Toronto.
5. Solid: Red Bull dance footprint (BC One, Dance Your Style), Eurostat city context, federation and licence figures, Wikipedia pageviews, the large-event sizes stated by organisers, the method verdicts.

## 3. What the data already says about the hypothesis

| Evidence on file | Breaking | Salsa + bachata | Reading |
|---|---|---|---|
| Wikipedia views Jan-Oct 2025 (per language) | EN 127k, DE 18k, FR 14k, ES 18k, IT 8k | EN 214k, DE 43k, FR 61k, ES 85k, IT 20k | Latin 1.7x (EN) to 4.6x (ES) breaking in every language with both values. Caveats: some articles also cover the music; 2025 is a post-Olympic year; this is interest, not dancers |
| Largest events (organiser-stated) | Juste Debout 12,000 attendees; IBE 10,000; BOTY 5,000-6,000; Outbreak 2,000 participants | Croatian Summer Salsa Festival 5,000 participants; Amsterdam Int. Salsa Festival 2,000-2,500; Berlin Salsa Congress ~6,000 (inferred) | Same order of magnitude. Breaking events count spectators; Latin events count paying dancers. Different markets |
| National figures | DE: 62 clubs offering breaking, 17 breaking athletes on the WDSF list; NL 7; AT 6 | No national figure for salsa/bachata dancers anywhere | Latin is not organised in federations, so it is invisible in official statistics |
| Red Bull | 66 event rows (BC One, Dance Your Style) | 0 | Red Bull is absent from Latin, by choice or by gap: unknown |

**Provisional reading:** the hypothesis is plausible but not proven. It probably holds for **people who dance** (classes, socials, congresses), while breaking is probably stronger for **people who watch** (battles as a show, Red Bull content). The word "market" must always say which of the two it means: Red Bull cares mostly about the second, Leonardo's own event idea about the first.

## 4. The project, redefined

### 4.1 Main question
> In 15 comparable European cities, how large is the salsa/bachata world compared with the breaking world, measured the same way for both? Where does this leave room for Red Bull: breaking in cities without a Red Bull stage, and Latin, if an entry makes sense at all?

### 4.2 Hypotheses to test
- **H1 (participants):** in most of the 15 cities, more people dance salsa/bachata than breaking (Latin above breaking on at least 3 of the 4 participant indicators in section 4.3, in at least 10 of the 15 cities).
- **H2 (audience):** breaking reaches an audience at least as large as Latin, so "bigger market" depends on the market.
- **H3 (breaking room):** some of the 15 cities have an active breaking scene and no Red Bull stage in 2024-2026.
- **H4 (Latin fit):** a Red Bull entry into Latin needs a competitive or show format (battle, Jack and Jill, show competition). Such formats exist in the scene but are small and scattered, so there is room to own one.

### 4.3 Indicators: one method, applied the same way to both worlds in every city
Comparing **inside each city** (Latin divided by breaking) removes most of the city-size problem: a small city and a big city can be compared on their ratios.

| ID | Indicator | Market | Method | Who |
|---|---|---|---|---|
| I1 | Events listed in the city, 12 months | participants | goandance.com (Latin) and and8.dance (breaking): count of events with the city as location, same window | collection model |
| I2 | Schools with a weekly class in the style | participants | Fixed search (same 3 queries per style per city), count distinct schools whose own timetable shows the style | collection model |
| I3 | Weekly socials / jams | participants | Recurring Latin socials vs breaking jams or open practice sessions listed by organisers or city guides | collection model |
| I4 | Largest public community group | participants | Member count shown publicly on Meetup and Facebook groups for "<city> salsa / bachata / breaking"; counts only, no names | Leonardo (manual) |
| I5 | Google Trends ratio | interest | Trends, 12 months, compare the dance topics (salsa, bachata, breakdance) and read the city breakdown per country | Leonardo (manual) |
| I6 | Size of the largest events | participants / audience | Organiser-stated size, with type (participants vs spectators) | on file, extend |
| I7 | Audience of video content | audience | Views and subscribers of the main breaking channels (Red Bull BC One) and the main salsa/bachata channels | collection model or Leonardo |
| I8 | Red Bull presence 2024-2026 | - | on file | done |
| C1 | Salzburg ground truth | calibration | Leonardo lists the Salzburg Latin (and, as far as he knows, breaking) schools, weekly classes, socials and events per year; compared with what I1-I3 find, this measures how much the platforms miss | Leonardo |

### 4.4 Decisions at the end of each week
- **End of week 1 (feasibility):** do I1, I2 or I3, and I5 have values for both worlds in at least 12 of the 15 cities? If not, the project shrinks to the method plus Salzburg/Austria, which is still a good story for an application and for a local event.
- **End of week 2 (verdict):** H1-H4 marked supported / not supported / unclear, with the numbers. **Go** if the data is comparable and gives a clear story (for example "Latin is X times bigger in Y cities and Red Bull is absent: here is a format", or "breaking has room in cities A, B, C"). **No-go** or a pivot to Leonardo's own event if not.

### 4.5 Outputs (only after a Go)
- Viewer with the new indicators ("City comparison" and "Breaking vs Latin" views already exist and will read them).
- 1-page summary: the main question, the answer per hypothesis, the table of 15 cities.
- For Red Bull: a short case (problem, method, findings, proposed format, Salzburg pilot).
- For the own event: the same table read as a market map (where the Latin calendar is full, where it is empty, prices, event sizes).

## 5. Two-week plan

| When | Who | What |
|---|---|---|
| Day 1 | Leonardo | Read this plan; give the prompt `project/prompts/prompt_market_comparison.md` to the collection model; start C1 (Salzburg) |
| Days 1-4 | Collection model | I1, I2, I3, I6, I7 for the 15 cities, both worlds, into data/ (prompt rules) |
| Days 1-4 | Leonardo | I5 Google Trends (about 1 hour), I4 group counts (about 1 hour), C1 Salzburg (2-3 hours); steps in `research/manual_collection_list.md` (items 9-11) |
| Day 5 | Claude (coding) | Validator, viewer rebuild, ratio tables per city, feasibility check (decision of week 1) |
| Days 6-9 | Model + Leonardo | Fill the gaps found on day 5; re-check the flagged rows that matter; 2-3 questions to a Red Bull contact on H2/H4 (what audience and formats they look for), optional |
| Day 10 | Claude + Leonardo | Verdict on H1-H4, Go or No-go, 1-page summary |

Budget: none needed in these two weeks.

## 6. Open points (not blocking)
- Which Red Bull contact could answer two questions on audience and formats (H2, H4)? Only when the numbers exist.
- Kizomba, zouk and dancehall stay out unless the Latin scenes found mix them in (record them as `adjacent`).
- Whether the scan and benchmark cities are ever needed: not for the two-week test.

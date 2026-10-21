# Business case model (light) and the data it needs

Purpose: a short business case for the deck, as a side note ("a parenthesis"). It is not a forecast. Every number is a range (low, central, high) built from data on file, round Z data, organiser answers, or a stated assumption. This file defines the model first, so that round Z collects only data the model can use.

## 1. The model in eight steps

| # | Step | Formula | Output |
|---|---|---|---|
| M1 | Dancer-visits per year (Latin, Europe) | events per year x median attendees per event | dancer-visits |
| M2 | Unique dancers reached | M1 / congresses per dancer per year | people |
| M3 | Product occasions | M1 x nights per event | dancer-nights |
| M4 | Volume | M3 x cans per dancer-night | cans |
| M5 | Direct sales value | M4 x Red Bull net sales per can | EUR (small; the case is brand, not sales) |
| M6 | Media reach | event + headline artists' followers, and posts per event | impressions; value at a public CPM |
| M7 | Reference: Hyrox | races x finishers per race (Europe), price, Red Bull role | athletes per year, compared with M1 |
| M8 | Where first | per country: Latin events, Hyrox races, energy drink use per person, Red Bull office, rules | ranked list of countries and cities |

Pilot (one congress): attendees x nights x cans per dancer-night; cost = a stated sponsor tier or bar set-up; measures = cans, contacts, dancers' feedback.

## 2. Inputs: what we have and what is missing

| Input | Used in | Status | Where it comes from / goes |
|---|---|---|---|
| Latin events per year, Europe | M1 | have: 450-750 | census (analysis section 11) |
| Median attendees per event (random sample, not only flagships) | M1, M3, pilot | **gap** | round Z1, research/census/event_sizes.csv |
| Size of the largest events | M1 high case, pilot | partial (1,000-5,000 stated) | events.csv, round Z1 |
| Congresses per dancer per year | M2 | **gap** | round Z5 (studies, organiser statements); else assumption 2-4 |
| Nights per event | M3 | have: median 3 days | facts EVT "event days (stated)" |
| Cans per dancer-night | M4 | **gap** | round Z4 (stated sampling volumes); organiser talks; else assumption 0.3-1.0 |
| Red Bull net sales per can | M5 | have in notes: EUR 12.2bn / 13.97bn cans (2025) | round Z3 writes it to redbull_finance.csv |
| Retail and bar price of a can | M5, pilot | **gap** | round Z3 (retail), Z4 (event bar) |
| Followers of events and artists | M6 | have | facts MED |
| Public CPM benchmark (Instagram, Europe) | M6 | **gap** | round Z3, one public benchmark with date |
| Hyrox finishers per race, Europe, by season | M7 | **gap** (only global totals) | round Z1c, research/census/hyrox_finishers.csv |
| Hyrox price, Red Bull role | M7 | have | facts PRC, ORG |
| Breaking battle entries per event | M1 comparison | **gap** | round Z1, event_sizes.csv |
| Energy drink use per person, by country | M8 | **gap** | round Z3 (free sources only) |
| Market value and leaders in Europe (Red Bull, Monster) | context | partial | round Z3 |
| Rules on sale and marketing (age limits, labelling) | M8, risks | **gap** | round Z6 |
| Drinks brands present at events, and their role | proposal, competition | partial (top 30 mostly not stated) | round Z4 on the random samples |
| Sponsor tier prices | pilot cost | almost none | round Z4; organiser talks |
| Trend: interest over time | story, M1 growth | partial (snapshots) | round Z2: Wikipedia page views, Hyrox seasons, playlists |
| Audience age, gender, travel share | fit with Red Bull target | partial (one age range, Berlin 75% from abroad) | round Z5 |

## 3. Rules that keep the data usable

- One unit string per measure (data_schema.md section 5). No mixed units in one column: attendees, passes sold, venue capacity and battle entries are separate size types, never added together.
- Every number has a period (year or date), a place, an evidence type and a source. Ranges go in value_low and value_high.
- Searched and not found is a result: a `not_found` row with what was searched.
- Random samples (research/frames/size_frame_*_sample.csv, seed 20261021) give the typical event; the largest events give the top. They are reported separately.
- Paid sources: only what is free to read (snippets marked confidence L).
- Organisers' answers (talks) fill the gaps that the web cannot: they go into facts with evidence `stated_by_organiser` and task_id TALK.

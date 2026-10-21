# Business case model (light) and the data it needs

Purpose: a short business case for the deck, as a side note. It is not a forecast. Every number is a range (low, central, high) from data on file, round Z data, organiser answers (talks) or a stated assumption. Decision 2026-10-21: research only data that can be found without excessive effort (event sizes, a comparable breaking count, social engagement); market data (energy drink market, Red Bull and Monster figures, rules) is not researched now: public figures already found are quoted, the rest is an assumption.

## 1. The model

| # | Step | Formula | Output |
|---|---|---|---|
| M1 | Comparable market size | events per year, same method in both worlds; events with >= 300, >= 1,000, >= 3,000 people | events per year by size class, Latin vs breaking |
| M2 | People per year at large events | sum of stated sizes of the large events | people (participants and spectators kept apart) |
| M3 | Product occasions | M2 (Latin participants) x nights per event | dancer-nights |
| M4 | Volume, pilot | attendees x nights x cans per dancer-night (assumption 0.3-1.0) | cans |
| M5 | Attention | followers, average likes and comments, engagement rate, video views per event | hype per event, Latin vs breaking, large and typical events |
| M6 | Reference: Hyrox | races x finishers per race (Europe), price, Red Bull role | athletes per year, compared with M2 |
| M7 | Where first | per city: Latin events, large events, Hyrox races, Red Bull event or office | short list of cities |

Pilot (one congress): attendees x nights x cans per dancer-night; cost = organiser's offer (talks); measures = cans, contacts, dancers' feedback.

## 2. Inputs

| Input | Used in | Status | Where it comes from / goes |
|---|---|---|---|
| Latin events per year, Europe | M1 | have: 450-750 (3 sources, capture-recapture) | census, outputs/analysis.md section 11 |
| Breaking events per year, same method | M1 | **gap**: about 210 from one calendar only | round Z2: second sources, research/census/breaking_<source>.csv |
| Sizes of the largest events, both worlds | M1, M2, pilot | partial (11 Latin stated) | round Z1, research/sizes/event_sizes.csv |
| Nights per event | M3 | have: median 3 days (Latin), 1 (breaking) | facts EVT "event days (stated)" |
| Cans per dancer-night | M4 | assumption 0.3-1.0 | organiser talks |
| Red Bull net sales per can | M4 value | have: about EUR 0.87 (EUR 12.2bn / 13.97bn cans, 2025, press) | quoted, not researched further |
| Social engagement per event | M5 | partial (followers of 60 typical + 40 flagship events; few likes) | round Z3, research/social/event_social.csv |
| Hyrox finishers per race, Europe | M6 | **gap** (2025 worldwide: 89 races, 779,073 finishers) | round Z5, research/sizes/hyrox_finishers.csv |
| Hyrox price, Red Bull role | M6 | have | facts PRC, ORG |
| Drinks brands at events and their role | proposal | partial | round Z4, facts ORG/BEV |
| Cities of large events | M7 | from Z1 + census | Claude |

## 3. Rules that keep the data usable

- Size types are never added together: participants (dancers or breakers who take part), attendees (all people stated), spectators, passes sold, venue capacity, battle entries. Latin counts are mostly participants, breaking mostly spectators: always shown apart.
- Every number has the edition year, the evidence type and a source URL with access date.
- Searched and not found is a result (`not_found` with what was searched).
- Red Bull's own events are recorded but never used as the comparator (method rule 0).
- Organisers' answers fill the gaps the web cannot: facts with evidence `stated_by_organiser`, task_id TALK.

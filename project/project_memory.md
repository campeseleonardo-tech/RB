# Red Bull open application: Dance Scene Atlas (project memory)

Status as of 2026-10-20 (rewritten in full after the third session). Language of the whole project: English. Single source of truth for goals, research questions and decisions; the plans and prompts follow from this file.

## 1. Context
- Leonardo Campese plans an open application to Red Bull (target: Product/Project Manager, secondarily technical; Austria first, then Spain or Italy). The project shows product/project thinking and must be specific to Red Bull but reusable.
- Leonardo dances and teaches salsa and bachata in Salzburg. Latin is his field and his advantage.
- Hypothesis behind the project: the Latin world (salsa, bachata) is a large market, larger than breaking. To be tested, not assumed.
- Second use of the same data: if Red Bull is not interested, Leonardo's own project (a congress, an event or another dance project).
- Budget: up to EUR 1,000-2,000 only if the idea proves valid. No deadline; within 1-2 weeks of collection we decide whether to continue.
- Friends in many parts of Red Bull: they validate later, they never source data.

## 2. Goal
For each of 15 comparable European cities, have enough comparable, sourced data on **participation, competitions, events, audience and brands**, for breaking and for Latin, to say later where an entry makes sense and where it does not.

- **Breaking is the reference**: Red Bull knows it and is already in it (BC One, Dance Your Style). Its values show what a scene that Red Bull invests in looks like.
- **Latin is the case under investigation**: Red Bull is not in it. Its values are read against the breaking reference.
- **Every research question is answered for both**, with the same method, in every city.
- **The form of an entry** (a Red Bull event or competition, or sponsoring existing events) is a strategic question asked only after the participation data exists. It is not a research question of this phase.

## 3. Research questions
Each question: what we want to know, what we count (same way for breaking and Latin), and how breaking calibrates it.

| # | Question | What we count, per city (or country where noted) | Breaking as reference |
|---|---|---|---|
| RQ1 | **Participation: how many people dance it?** | Schools/studios with a weekly class in the style; weekly class slots; weekly or monthly socials (Latin) and jams/open sessions (breaking). Estimated dancers = schools x students per school, as a range, calibrated on Salzburg (Leonardo's ground truth) | Size of the breaking base in cities with a Red Bull stop vs without |
| RQ2 | **Competitions: is there a circuit to plug into?** | Per country: federations and private circuits active in the style; competitions per year in the city; competitors in the national championship; where the winner goes next (ladder) | National breaking championships and the BC One / DYS qualifier route |
| RQ3 | **Events: how big is the event market?** | Congresses, festivals, weekenders (Latin) and battles, festivals (breaking) in or near the city per year: size (participants vs spectators, never mixed), ticket price, international reach, organiser | Large breaking events with and without Red Bull |
| RQ4 | **Audience: does anyone watch?** | Live spectators of competitions and shows; video views of the main competitions and shows (e.g. Latin world and European competitions vs BC One / DYS); size of the main channels | BC One / DYS audience as the benchmark Red Bull already accepts |
| RQ5 | **Brands: who is already there?** | Red Bull events per city 2024-2026; sponsors named on the official pages of the RQ3 events; brands that own a format | Red Bull's own footprint (already on file) |

### Leads to verify for RQ2 (not facts yet)
The earlier research said the Latin scene is "ungoverned": that was wrong or at least incomplete. Leads to check: WDSF and IDO Caribbean / salsa / bachata competitions; national federations with a Caribbean sector (e.g. FIDS in Italy, FEBD in Spain, others per country); private circuits (e.g. World Latin Dance Cup, Euro Salsa Summit, national and world bachata championships); competition sections inside congresses.

### Reading the answers (to be calibrated once data exists)
- An entry looks sensible where there are together: a large dancing base (RQ1), an existing competitive or show format (RQ2, RQ3), an audience that watches (RQ4), and no dominant sponsor or Red Bull already there (RQ5).
- For Leonardo's own event, RQ1 and RQ3 matter most.
- "Market" always says which one: people who dance or people who watch.

## 4. Scope
- **Cities (15):** Salzburg (SBG), Innsbruck (INN), Vienna (VIE), Graz (GRZ), Munich (MUC), Berlin (BER), Milan (MIL), Rome (ROM), Barcelona (BCN), Madrid (MAD), Paris (PAR), Amsterdam (AMS), London (LON), Warsaw (WAW), Zurich (ZRH). Population is kept only as a denominator.
- **Disciplines:** breaking (URB-BRK) as reference; salsa (CAR-SAL) and bachata (CAR-BCH) as the case. Latin covers both competitions and social congresses.
- **Out (parked, kept in the files, no more effort):** kizomba, zouk, dancehall and the other hip hop styles; scan and benchmark cities (83 places); Wikipedia pageviews and online-interest indexes; Red Bull finances; public funding, teaching regulation, income and support programmes (old sections C, D, E); students and tourist nights.

## 5. Method rules
1. One countable source per indicator, the same for breaking and Latin in every city; a value is only compared with values measured the same way.
2. Ranges and a confidence level for every estimate; every number with a source and a date; `not_found` is a valid answer when the search is documented.
3. Salzburg is the calibration city: Leonardo's own count shows how much the online sources miss.
4. Platforms that need a login or a real browser (goandance, and8.dance, Google Maps, Instagram, YouTube) are read with a rendered browser or by hand, never guessed.
5. Public sources only; organisations and public professional figures only; no personal data of private individuals.
6. Never write "Red Bull absent": use `not_found` with the pages checked (schema rule 8).

## 6. What we already have, per research question (data/ on 2026-10-20)
- RQ1: weak. Salsa/bachata counts come from single listing sites and are not comparable; breaking almost empty. 45 suspicious rows flagged (confidence L, notes start with `REVIEW`, review_log L00043-L00048), none deleted.
- RQ2: breaking ladders per country partly on file; Latin competitions barely looked at (see leads above).
- RQ3: about 14 large events with organiser-stated sizes (e.g. Juste Debout, IBE, BOTY, Outbreak; Croatian Summer Salsa Festival 5,000, Amsterdam International Salsa Festival 2,000-2,500). No ticket prices, no city-level counts.
- RQ4: nothing usable (YouTube figures are aggregator estimates, L).
- RQ5: solid for Red Bull (BC One 2026: 27 stops; DYS 2026: 17 stops; world finals history; 0 Latin events found). Sponsors of non-Red Bull events checked only for a few.
- Why so little: no official statistic splits dance by style; registries do not classify schools by style; the useful sources are platforms the models could not read; the previous plan asked for everything everywhere instead of one countable number per question.

## 7. Verified facts worth keeping (access date 2026-10-19/20)
- Red Bull BC One 2026: 27 stops, World Final Toronto 29 Nov 2026. Dance Your Style 2026: 17 stops, World Final Zurich 24 Oct 2026; Austria: Salzburg qualifier 4 Jul, national final Vienna 28 Aug. Sources in data/events.csv.
- BC One world final in Salzburg in 2020; DYS world finals 2019 Paris, 2022 Johannesburg, 2023 Frankfurt, 2024 Mumbai, 2025 Los Angeles.
- Breaking is not in the LA 2028 programme (LA28's own decision, WDSF statement 16 Oct 2023); WDSF pushes Brisbane 2032; breaking at the Dakar 2026 Youth Olympic Games.
- No dedicated Red Bull salsa/bachata event or athlete found (one-off "Red Bull Breakin' Salsa", Havana 2012).
- Red Bull Next Generation: athletes 15-25, Malaysia and Indonesia first, all sports, no Europe. Red Bull Basement: student innovation programme. Athlete Performance Center: Salzburg and Los Angeles, 900+ athletes, invitation only.

## 8. Decisions log (short)
- 2026-10-19: project started as a broad Dance Scene Atlas (discipline x city strength map, sections A-E); data moved to data/*.csv (project/data_schema.md); local viewer built; data collection and correction passes run by external models (prompts in project/prompts/).
- 2026-10-20 (morning): correction pass; validator OK; 1,314 facts of which 73% `not_found`.
- 2026-10-20 (third session): analysis of the whole folder (project/analysis_and_plan.md); focus moved to Latin vs breaking; 15 cities only; suspicious rows flagged; viewer rebuilt on real data with two analysis views (to be replaced later).
- 2026-10-20 (fourth session): research questions RQ1-RQ5 fixed (section 3), each answered for breaking (reference) and Latin (case); entry form postponed to after the data; kizomba/zouk out; everything outside the 15 cities and RQ1-RQ5 parked; the viewer will be rebuilt later as one much simpler page; project/prompts/prompt_market_comparison.md and research/manual_inputs.md section A are on hold until rewritten for RQ1-RQ5.

## 9. To-do list (in order)
1. Rewrite the collection prompt around RQ1-RQ5 (one countable source per indicator, both disciplines, 15 cities), replacing prompt_market_comparison.md.
2. Revise research/manual_inputs.md for RQ1-RQ5 (Salzburg ground truth stays; Google Trends dropped).
3. Run the collection; Leonardo fills the Salzburg ground truth.
4. Feasibility check after week 1, verdict after week 2.
5. Later: rebuild the viewer as one simple page (15 cities x RQ1-RQ5, verified values only, raw tables apart).
6. Later, after the data: the strategic question (own Red Bull event vs sponsoring existing events) and insider validation.

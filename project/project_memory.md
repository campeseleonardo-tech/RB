# Red Bull open application: Dance Scene Atlas (project memory)

Status as of 2026-10-21 (rewritten in full after round T). Language of the whole project: English. Single source of truth for goals, hypotheses and decisions; plans and prompts follow from this file.

## 1. Context
- Leonardo Campese plans an open application to Red Bull (target: Product/Project Manager, secondarily technical; Austria first, then Spain or Italy). The project shows product/project thinking: a problem, evidence, a decision, a proposal.
- Leonardo dances and teaches salsa and bachata in Salzburg. Latin is his field and his advantage: congresses are long nights of dancing, drinking and moving, a natural context for Red Bull.
- Second use of the same data: if Red Bull is not interested, Leonardo's own project (a congress, an event or another dance project).
- Budget: up to EUR 1,000-2,000 only if the idea proves valid. No deadline.
- Friends in many parts of Red Bull: they validate, they never source data.

## 2. The project, redefined (2026-10-21)
From "a 15-city atlas" to **a thesis with evidence**:

> **Two dance markets.** Breaking is a *spectacle* market: few practise, many watch; it is Red Bull's model and Red Bull is in it. Latin (salsa, bachata) is a *participation* market: many dance, pay classes and congresses, travel, party until late; almost nobody watches its competitions. Red Bull is not in it. **Can Red Bull enter the Latin market, how, and where?**

Why the change: three collection rounds showed that city-by-city participation counts cannot be obtained from desk research (platforms cannot be counted, schools are too fragmented), while the national and international evidence already tells a clear story. Cities stay as examples and as the "where" of hypothesis H4, not as a grid to fill.

Deliverable (after the next round): a one-page summary plus about 6 slides (problem, two markets, evidence, how Red Bull could enter, where, Salzburg pilot), with research/data_summary.md as the data appendix. The viewer is optional.

## 3. Hypotheses
| # | Hypothesis | Evidence that would support or reject it |
|---|---|---|
| H1 | **Two markets.** Latin is larger in participation; breaking is larger in audience | RQ1 participation (classes, socials), RQ3 events (paying dancers vs spectators), RQ4 audience (channels, views, social reach) |
| H2 | **Red Bull can enter Latin through product presence at congresses and socials** (sponsorship, sampling, bars, energy for night-long dancing), not by creating a competition | Precedents of Red Bull at participation events (Latin, fitness, social dance conventions); who sponsors congresses today (drinks brands?); congress profiles from sponsor packs (attendance, age, nights, reach) |
| H3 | **The marketing reach of the Latin scene sits in congresses and in dancers' and instructors' social profiles, not in competitions.** Dancers themselves are not the vehicle (they dance, they are not influencers to sponsor), but the reach of profiles and congress accounts measures where attention is | Followers of the main Latin congress accounts and of the most followed Latin dance professionals vs breaking (battle accounts, Red Bull BC One athletes); hashtag volumes |
| H4 | **If Red Bull did a Latin event, it would take root best where Latin is strong AND Red Bull already operates** (logistics, local team, existing events to join) | Derived from data already on file: Red Bull dance events per city, Latin congresses and schools per city/country, Latin competitive circuit per country, population. No new research: an analysis step |

The research questions RQ1-RQ5 (participation, competitions, events, audience, brands) remain the evidence blocks behind the hypotheses; each is measured for breaking (reference) and Latin (case).

## 4. Scope
- **Cities:** the 15 of before (SBG, INN, VIE, GRZ, MUC, BER, MIL, ROM, BCN, MAD, PAR, AMS, LON, WAW, ZRH), used for H4 and as examples. **Countries:** AT, DE, IT, ES, FR, NL, UK, PL, CH. National and European aggregates are welcome where city data does not exist.
- **Disciplines:** breaking (reference), salsa and bachata (case). Kizomba, zouk, dancehall, other hip hop styles: out.
- **Parked:** scan and benchmark cities, Wikipedia views, Red Bull finances, funding/regulation/income topics, city-level platform counts, further national championship counts (competitions turned out small in both worlds).

## 5. Method rules
1. Compare like with like: a value is only compared with values measured the same way; say whether a number counts dancers or spectators.
2. Every number with a source and a date; ranges and confidence for estimates; `not_found` is a valid answer when the search is documented.
3. Public sources only. Organisations and **public professional figures** (professional dancers, instructors, athletes with public professional profiles): name, follower counts and public role only. No private individuals, no contact details, no personal data beyond that.
4. Social platforms: only what a public page shows without bypassing a login or the terms. No automated scraping. Third-party statistics pages are allowed as `inferred`. Where a login is needed, Leonardo reads the number by hand (research/manual_input.xlsx).
5. Never write "Red Bull absent": `not_found` with the pages checked.

## 6. Evidence so far (after rounds R and T, 2026-10-21)
Full tables: research/data_summary.md (re-run research/build_data_summary.py after every round).

| Block | Breaking (reference) | Latin (case) | Reading |
|---|---|---|---|
| RQ4 Audience | BC One channel 1.21m subscribers; latest World Final replay 980k views, 2019 replay 4.8m; Red Bull Dance 991k | Competition channels: World Salsa Summit 104k, Euroson 17.8k, World Latin Dance Cup 7.45k, The Summit 6.74k (10-170x smaller) | Supports H1 (audience side) |
| RQ2 Competitions | National championships 46-125 competitors (ES, AT, DE, FR); full ladder in 9/9 countries | 65 (FR), 123 (ES); real circuit (FIDS, FEBD, FFDanse SBK, DAT, SFBT; WDSF Caribbean, WLDC, World Salsa Summit, Euroson) | Same small size in both: competitions are not where the Latin mass is |
| RQ3 Events | Spectator events: IBE 10,000; Juste Debout 6,000-12,000 | Paying dancers: Amsterdam festival 2,000-2,500; full pass EUR 120 (Graz), 160 (BCN Dance Life), 190 (Warsaw El Sol); Berlin congress dancers from 60+ countries | Different markets. Computed: 2,000 dancers x EUR 120-190 = about EUR 240k-380k in passes for one congress |
| RQ1 Participation | Vienna: at least 1 school, 2 weekly slots; Milan nf | Vienna: at least 3 schools, 30 salsa + 5 bachata weekly slots; Milan: at least 8 salsa + 3 bachata | Minimums, confidence L; points to H1 (participation side) |
| RQ5 Brands | Red Bull dance events 2024-2026 in 9 of 15 cities (none in SBG, GRZ, MUC, MIL, ROM, WAW) | No Red Bull Latin event found in research; sponsors of congresses barely checked | H2 untested |

Round U (2026-10-21), see research/data_summary.md sections 7-8:

| Block | Breaking | Latin | Reading |
|---|---|---|---|
| Dancers' reach (Instagram, top 30 each) | Total 4.1m followers, median 105k; Neguin 795k, Terra 340k, Lil Zoo 244k | Total 4.8m, median 81k; Ataca y La Alemana 900k, Daniel y Desiree 734k, Kike y Nahir 436k | **Equal.** Latin attention is as large as breaking's, but it sits with the dancers (mostly bachata couples/instructors) |
| Event accounts (Instagram) | Red Bull Dance 3m, BC One 957k; non-Red Bull: Summer Dance Forever 283k, HHI 238k, BOTY 162k, Juste Debout 152k | Largest: Euroson 58k, Croatian Summer Salsa Festival 45k, BIG and BCN Dance Life 34k | **Breaking events are brands, Latin events are not** (3-5x smaller even without Red Bull) |
| Hashtags (Instagram reels, global) | #breakdance 13m | #bachata 38m (includes music), #salsadance 3.1m, #bachatadance 875k | Latin larger, ambiguous tags |
| Top videos outside Red Bull competitions | Battles: 100m, 91m, 51m | Performances/music videos with dancers: 291m (music video), 99m (TV talent show), 42m | Breaking's viral content is battles; Latin's is performance by couples |
| Congresses listed next 12 months (goandance, partial) | (and8.dance: DE 19, CH 9, FR 9) | ES 61 salsa / 59 bachata, DE 16/38, IT 12/16, FR 4/12; AT 1/3 | Latin congress market concentrated in Spain, Germany, Italy |
| Red Bull precedents (H2) | - | No Red Bull presence found at Latin congresses in the 9 countries | But Red Bull runs participation activations: DYS dance zone at Open'er, DYS Weekender workshops London, fitness zone at Rock for People, Hyrox, official energy drink of F45 (sampling), Sweat the Deck, Wings for Life Run |
| Congress profile | - | Croatian Summer Salsa Festival: over 5,000 dancers, 90 countries, ages 20-60, 8 days of parties; Amsterdam 2,000; Paris 1,500+ | No public sponsor packs found |

Reading after round U: H1 supported (participation and reach comparable or larger for Latin; competition and event brands much larger for breaking). H3 supported: Latin reach lives in dancers' profiles, not in event or competition brands. H2 plausible: Red Bull already does participation activations of the same kind; no Latin precedent yet. H4 to do (analysis).

## 7. Verified facts worth keeping (access date 2026-10-19/21)
- Red Bull BC One 2026: 27 stops, World Final Toronto 29 Nov 2026. Dance Your Style 2026: 17 stops, World Final Zurich 24 Oct 2026; Austria: Salzburg qualifier 4 Jul, national final Vienna 28 Aug.
- BC One world final in Salzburg in 2020; DYS world finals 2019 Paris, 2022 Johannesburg, 2023 Frankfurt, 2024 Mumbai, 2025 Los Angeles.
- Breaking is not in the LA 2028 programme (LA28's decision); WDSF pushes Brisbane 2032.
- WDSF World Caribbean Dance Championships: Istanbul Dec 2025, Alicante Oct 2026 (with FEBD).
- Red Bull Next Generation (athletes 15-25, Malaysia/Indonesia, no Europe); Red Bull Basement (student innovation); Athlete Performance Center (Salzburg, Los Angeles).

## 8. Decisions log (short)
- 2026-10-19: broad Dance Scene Atlas started; data in data/*.csv (project/data_schema.md); viewer built; collection by external models (prompts in project/prompts/).
- 2026-10-20: correction pass; analysis of the folder (project/analysis_and_plan.md); focus Latin vs breaking, 15 cities; research questions RQ1-RQ5; round R; data put in order (research/data_summary.md).
- 2026-10-21: round T reviewed (pilot values are minimums only). Project redefined as the two-markets thesis with hypotheses H1-H4 (sections 2-3); national championship counts parked; social reach (congress accounts, 30 Latin and 30 breaking professional dancers' profiles, hashtags, top videos) made the main evidence for H3; H4 is an analysis of existing data; targeted round U written (project/prompts/prompt_round_u.md); manual items in research/manual_input.xlsx.
- 2026-10-21 (evening): round V reviewed; analysis and one page ready apart from V1/V3.
- 2026-10-21 (later): round U reviewed; H1 and H3 supported, H2 plausible (participation activations exist, no Latin precedent); next step is the analysis (H4) and the write-up.

## 9. To-do list (in order)
1. Done 2026-10-21: round U run and reviewed (8 duplicate athletes merged; summary sections 7-8 added).
2. Leonardo, in research/manual_input.xlsx: Salzburg schools and estimates (SBG-S, SBG-X); Instagram follower counts where the model is blocked (IG rows); 2-3 conversations with Red Bull contacts (RB-Q rows).
3. Done 2026-10-21: round V run (analysis in outputs/analysis.md and outputs/one_page.md; V1 and V3 not run: no web access in that session). Review by Claude: all 123 cited ids checked; V2 Red Bull offices added from search snippets (O00109-O00117, L); H4 ranking updated: Paris, Barcelona, Madrid (5 of 6), Milan (4); Paris the most robust.
3b. Open: V1 (sponsors of 15 congresses) and V3 (Red Bull audience statements) in a session with web access or by hand; confirm the office rows on official pages.
4. Claude reviews round V; then Claude + Leonardo: slides and the application text.
5. Later: clean duplicated documents and data (one file per purpose); decide whether the viewer is still needed.

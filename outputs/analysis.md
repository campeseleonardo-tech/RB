# Dance Scene Atlas: can Red Bull enter the Latin dance market, how, and where?

Status: round V, 2026-10-21; reviewed by Claude the same day (all 123 cited ids checked against data/; V2 offices added). Evidence base: data/*.csv only (ids in brackets: F = fact, E = event, A = athlete, O = organisation). **computed** = calculated here, formula next to it.
**Important:** the three research tasks of this round (V1 congress sponsors, V2 Red Bull offices, V3 Red Bull audience statements) could not be run: the working session had no access to the open web (see section 7 and research/logs/V_round.md). Every part of the analysis that depends on them is marked **pending**. Nothing was estimated to fill the gap.

## 1. The question and the answer in 5 lines

1. Question: can Red Bull enter the Latin (salsa, bachata) dance market, with what format, and where?
2. Two markets (H1, **supported in a revised form**, round X random samples, section 10): breaking is a few global spectacle brands (and Red Bull's media) on top of a long tail of small, one-day, cheap battles (median 1,641 Instagram followers, tickets about EUR 9, entry fees about EUR 10); Latin is a broad middle of multi-day congresses paid by the dancers (median 4,461 followers, 3 days, full pass median EUR 115). The typical Latin event is more followed than the typical breaking event (p = 0.02); only at the very top is breaking bigger.
3. Attention (H3, **a tendency, not proven**): line-up artists have more followers than their events in both worlds (median ratio 13 in Latin, 8 in breaking); the samples are small and the resolved artists are the better known ones (sections 9-10).
4. Entry (H2, **plausible, not proven**): Red Bull runs participation activations (dance zones, fitness zones, sampling), and no Red Bull presence at a Latin congress was found in 9 countries (all confidence L). Who else sponsors congresses is **pending** (V1). Best fit: product presence at the largest congresses, not a new competition.
5. Where (H4): Paris, Barcelona, Madrid (5 of 6 criteria), then Milan; Paris is the most robust (top also without country-level data). Red Bull office locations were added in the review (confidence L).

## 2. H1 - Two markets

Counts below are of different kinds; the kind is in each cell.

| Block | Breaking (reference) | Latin (case) | Reading |
|---|---|---|---|
| Participation: national championship competitors (dancers) | FR 125 (F001331), DE 107 (F001330), AT 59 (F001336), ES 46 (F001344) | ES 123 (F001334, M), FR 65 (F001332) | Same small size: competitions are not where the mass is |
| Participation: pilot schools, weekly slots (minimums, L unless noted) | Vienna: at least 1 school (F001654), 2 slots (F001660, H) | Vienna: at least 3 schools (F001652, F001653), 30 salsa + 5 bachata slots (F001658, F001659); Milan: at least 8 salsa + 3 bachata slots (F001661, F001662, H) | Latin larger, but only 2 cities, minimums |
| Events: largest stated size | Spectators: IBE 10,000 attendees (E000109), Juste Debout 12,000 (E000107), 6,000 seats per day (F001572) | Paying dancers: Croatian Summer Salsa Festival over 5,000 (E000074), Amsterdam 2,000-2,500 (E000072, E000113), Paris more than 1,500 (F001966) | Different kinds: spectators vs participants. Not additive |
| Events: full pass (EUR, dancers) | not applicable (spectator events) | 120 Graz (F001594), 160 BCN Dance Life (F001598), 190 Warsaw El Sol (F001602) | Latin events are paid participation |
| Audience: YouTube subscribers (followers of channels) | BC One 1,210,000 (F001580), Red Bull Dance 991,000 (F001581) | World Salsa Summit 104,000 (F001649), Euroson 17,800 (F001650), WLDC 7,450 (F001648), The Summit 6,740 (F001651) | Breaking 10-170x larger (channels) |
| Audience: event accounts, Instagram followers | Red Bull Dance 3,000,000 (F001729), BC One 957,000 (F001670), Summer Dance Forever 283,000 (F001737) | Euroson 58,000 (F001675), Croatian 45,000 (F001688), BIG 34,000 (F001694) | Breaking events are brands |
| Reach of dancers, Instagram followers, top 30 each | total 4,087,700; median 105,000; Neguin 795,000 (F001847), Terra 340,000 (F001873), Lil Zoo 244,000 (F001851) | total 4,842,000; median 81,000; Ataca y La Alemana 900,000 (F001759), Daniel y Desiree 734,000 (F001761), Kike y Nahir 436,000 (F001763) | Equal order of size (**computed** from the 30 + 30 facts, script scripts/analysis_v.py) |
| Top videos outside Red Bull competitions (views) | 100m, 91m, 51m (F001919-F001921), battles | 291m (F001909, possibly audio-led), 99m (F001910), 42m (F001911), performances | Different content |
| Hashtags (Instagram reels) | #breakdance 13m (F001888) | #bachata 38m (F001885, includes music), #salsadance 3.1m (F001886), #bachatadance 875k (F001887) | Latin larger, ambiguous tags |

**Event markets compared on equal terms (round W, added in the review).** Two sets of 20 independent European events, Red Bull events and accounts excluded (lists and selection in research/logs/W_round.md; "largest" cannot be measured exactly because most sizes are unpublished).

| Indicator (unit) | Breaking set | Latin set | Reading |
|---|---|---|---|
| Instagram followers per event account (followers) | 15 accounts: total 1,233,784, median 30,000 (WDSF all-dancesport account excluded) | 17 accounts: total 296,203, median 15,000 | Breaking events tend to be more followed (median 2x), but the difference is not robust: 90% intervals 14k-152k vs 9k-25k, two-sided p = 0.17 (section 9). The breaking top are global touring brands (Summer Dance Forever 283k, World Breaking Classic 210k, BOTY 162k, Freestyle Session 158k) |
| Size stated by the organiser | Spectators: IBE 10,000 visitors, Juste Debout 6,000 seats; competitors: Outbreak 2,000, national finals 107-125 | Dancers: Croatian 5,000, Amsterdam 2,000, Paris 1,500+, Luxembourg Unified 1,500+, SoulDance 1,000+ | Breaking publishes spectators, Latin publishes paying dancers |
| Price per person (EUR) | Spectator ticket: Juste Debout 35, Check The Style 40 (2 of 20) | Full pass: 115 to 245 (9 of 20; e.g. BCN Dance Life 160, BSWC 180, El Sol 210, BIG Milan 245) | A Latin attendee pays about 4x a breaking spectator |
| Calendar, Europe, next 12 months (listings) | and8.dance: 64 | goandance: 158 salsa + 220 bachata (overlapping lists) | Latin events are more numerous; different platforms, read as order of magnitude only |
| Editions | IBE 25th, Juste Debout 20th | Croatian 23rd, El Sol 21st, Festival de Cuba 21st | Both markets are mature |
| Drinks sponsors (partners pages read) | IBE 0, Breakin' Convention 0 | Croatian: Freixenet | Partners pages mostly not published; Red Bull named nowhere |

**Computed**, per flagship event: Latin 2,000 dancers x EUR 150 (middle of the passes on file) = about EUR 300,000; breaking 10,000 visitors x EUR 35 = about EUR 350,000. Same order of money, different source: participants vs spectators (plus sponsors and media for breaking, not measured).

**Verdict: partly supported.** Audience: breaking clearly larger for competition channels; for independent event accounts only a tendency (section 9). Dancers' reach: equal. Participation: Latin larger in the only two cities measured and in congress sizes, but those are minimums and organiser statements, and competition sizes are equal. **Weakest evidence:** participation (two cities, confidence L, minimums) and the 291m video (may be an audio-led upload).

## 3. H3 - Where Latin attention lives

Revised in the robustness review (section 9): the first version compared the top 30 dancers with a mixed list of event accounts and gave 8.5 (Latin) vs 1.25 (breaking). With the two equal event sets of round W:

| World | Top 30 dancers, median followers (90% CI) | Event accounts, W set, median (90% CI) | Ratio dancer / event (**computed**, 90% CI) |
|---|---|---|---|
| Latin | 81,000 (56,000-114,500) | 15,000 (9,085-25,000), n = 17 | **5.4** (3.1-10.9) |
| Breaking | 105,000 (76,000-118,000) | 30,000 (14,000-152,000), n = 15 | **3.5** (0.7-7.5) |

Unit: Instagram followers (accounts, not unique people). **Reading:** in both worlds the most followed dancers have more followers than the events; the gap looks larger in Latin, but the intervals overlap, so this is a tendency. A further bias: the top 30 dancers are the maximum of a very large population of accounts, while events are a few dozen; a fair test compares dancers and events drawn in the same way (round X). For a brand this says where attention may be, not who to pay (see section 4).
**Limits:** Instagram only; counts are rounded by the platform (K/M, confidence M); the Latin list is bachata-heavy (18 of 30 are bachata, 12 salsa, per disc_id in athletes.csv, task U3.2) and most dancers have no country on file; the top Latin video is a music video; the event-account list is partial (accounts that were blocked are not_found, F001895, F001896).

## 4. H2 - How Red Bull could enter Latin

**Evidence on file**
- Red Bull participation activations (round U, events.csv): Dance Your Style zone at Open'er 2026 (E000144), DYS Weekender London (E000145), fitness zone at Rock for People (E000146), Hyrox Vienna (E000147), Sweat the Deck (E000149), F45 sampling partnership (E000150), Wings for Life World Run (E000151). None is Latin.
- Red Bull at Latin congresses: no sponsor, partner, sampling or bar found in AT, DE, CH, IT, ES, FR, NL, UK, PL (F001970-F001978, confidence L, only the pages searched).
- Other sponsors of congresses (V1): **pending**. Known from round U: Croatian Summer Salsa Festival lists Freixenet (sparkling wine), Maistra, City of Rovinj, tourist boards (relations of E000074); 10 congresses had no public sponsor pack (F001956-F001965). So whether a drinks brand or an energy competitor is already there is **unknown**.
- Congress profile (organiser statements, dancers): Croatian over 5,000 dancers, 90 countries, ages about 20-60, 8 days of parties (F001967, E000074); Amsterdam 2,000 (F001965); Paris more than 1,500 (F001966); El Sol 4 nights (E000142 notes).
- Red Bull's own audience statements (V3): **pending**.

**Entry formats to evaluate** (not to assume)

| Format | Why it fits the evidence | What it needs | Main risk |
|---|---|---|---|
| A. Product presence at the largest congresses (sampling, night bar, energy partner of the socials) | Congresses are long nights of dancing; 1,500-5,000+ paying dancers each; Red Bull already samples at F45 studios (E000150) | Agreement with the organiser; stock and staff at the event; a measure (cans, contacts) | The sponsor field is unknown (V1 pending); organisers publish no packs, so price and availability are unknown |
| B. A Red Bull night or showcase inside an existing congress, built around the most followed couples | Attention sits with the couples (section 3); the congress already brings the crowd | A congress partner, a fee for performers who are already booked as artists | Reads as influencer marketing if badly done; the 291m reach number is partly music |
| C. A Latin zone inside an existing Red Bull dance event | Precedent: Dance Your Style zone at Open'er (E000144), Weekender London (E000145); no new event to build | A Red Bull event that already has a public (Vienna, Paris, Madrid, Barcelona, London per H4 table) | Breaking audience is not Latin audience; Latin dancers may not travel to a breaking event |

Dancers are **not** proposed as sponsored influencers. They dance; the reach of their profiles is a measure of where attention is, not a channel to buy.

## 5. H4 - Where it would take root

Criteria (each 1 point): (1) Red Bull dance event 2024-2026 in the city; (2) Red Bull national office in the city or its metro (V2, added by Claude in the review from web search snippets: organisations O00109-O00117, confidence L); (3) Latin congress or festival on file in the city or its metro; (4) country has at least 10 Latin listings on goandance in the next 12 months (salsa + bachata, 10 = median of the 9 countries, **computed**); (5) a national Latin championship with competitors on file; (6) at least one top-30 Latin dancer based in the country (athletes.csv). Columns 4-6 are **(country)**.

| City | RB dance events 2024-26 | RB office | Latin congress/festival on file (stated size) | Latin listings in country, salsa+bachata (country) | National Latin championship competitors (country) | Top-30 Latin dancers based in country (country) | Population (city proper) | Met |
|---|---|---|---|---|---|---|---|---|
| Paris | E000011 | O00113 (L) | E000140 (more than 1,500) | 16 (F001933, F001942) | 65 (F001332) | 0 | no city-proper value; 13,125,142 is a FUA (F000047, L) | **5 of 6** |
| Barcelona | E000125 | no (Madrid) | E000075 (Santa Susanna, near BCN; size nf; pass 160) | 120 (F001932, F001941; L) | 123 (F001334) | 1 (A00037) | 1,729,963 (F000043) | **5 of 6** |
| Madrid | E000001 | O00112 | none | 120 | 123 | 1 | 3,339,931 (F000045) | **5 of 6** |
| Milan | none | O00111 | E000139 (Sesto San Giovanni, adjacent; size nf) | 28 (F001931, F001940) | nf | 1 (A00051) | 1,349,930 (F000041) | **4 of 6** |
| Amsterdam | E000124 | O00114 | E000072, E000113 (2,000-2,500) | 6 (F001934, F001943) | nf | 0 | 873,338 (F001583) | **3 of 6** |
| London | E000004, E000028 | O00115 | E000141 (size nf) | 3 (F001935, F001944) | nf | 0 | 8,866,541 (F001163) | **3 of 6** |
| Berlin | E000002 | no (Munich) | E000071 (size nf) | 54 (F001930, F001939; L) | nf | 0 | 3,685,265 (F000039) | **3 of 6** |
| Warsaw | none | O00116 | E000142 (size nf; pass 190) | 10 (F001936, F001945) | nf | 0 | 1,863,056 (F001584) | **3 of 6** |
| Munich | none | O00110 | none on file (Bavarian Bachata Congress O00103 is an account, no event row) | 54 | nf | 0 | 1,505,005 (F000036) | **2 of 6** |
| Rome | none | no (Milan) | none | 28 | nf | 1 | 2,770,226 (F001162) | **2 of 6** |
| Salzburg | none (F001315) | O00109 (Fuschl am See, metro) | none | 4 | nf | 0 | 157,000 (F000033) | **1 of 6** |
| Vienna | E000031 | no (Fuschl) | none | 4 (F001929, F001938) | nf | 0 | 2,040,914 (F000030) | **1 of 6** |
| Innsbruck | E000006 | no (Fuschl) | none | 4 | nf | 0 | 131,358 (F000034) | **1 of 6** |
| Graz | none | no (Fuschl) | E000086 (size nf; pass 120) | 4 | nf | 0 | 302,749 (F000035, L) | **1 of 6** |
| Zurich | E000027 | no (Baar, Zug: O00117) | none | 1 (F001937, F001946) | nf | 0 | 700,889 (F001190) | **1 of 6** |

Notes: counts are listings, not unique events (an event may be in both salsa and bachata); "nf" = not found or not measurable. Santa Susanna and Sesto San Giovanni are separate municipalities (places SSN, SSG), counted as metro with that caveat. 24 of the 30 Latin dancers have no country on file, so criterion 6 is weak. E000032 (a "Salzburg" Dance Your Style row) was corrected to Basel in the data (F001315).

**Top 3-5** (updated in the review with the office criterion)
1. **Paris (5 of 6).** Logistics: Red Bull France office (O00113, L) and BC One cypher in Aubervilliers (E000011). Latin: a congress with more than 1,500 dancers in the city (F001966), a national circuit with 65 competitors (F001332). The only city at the top in both the full and the city-only view.
2. **Barcelona (5).** Logistics: Dance Your Style national final on 5 Sep 2026 (E000125) to attach to; the office is in Madrid. Latin: Spain is the strongest country on every country column; a bachata congress nearby with a 160 EUR pass (F001598).
3. **Madrid (5).** Logistics: Red Bull Spain office (O00112) and BC One Cypher Spain (E000001). Latin: same Spanish market, 123 championship competitors (F001334); no congress in the city on file.
4. **Milan (4).** Logistics: Red Bull Italy office (O00111), but no Red Bull dance event 2024-2026. Latin: Italy third in listings (28) and an adjacent congress (E000139).
5. **Amsterdam and London (3).** Office, a Red Bull dance event and a congress in the city, but thin Latin listings in their countries; strong at city level (see sensitivity).

**Sensitivity: remove the country columns (4-6).** Only criteria 1-3 remain: Paris, Amsterdam and London score 3; Barcelona, Madrid, Milan, Berlin and Warsaw 2; the rest 1 or 0. Paris stays at the top in both views; Barcelona and Madrid owe their rank to Spain's country-level strength; Amsterdam and London rise when only city facts count. Barcelona's congress point rests on Santa Susanna being counted as its metro. The office criterion rests on search snippets (confidence L) and should be confirmed on official pages.

**Salzburg.** Red Bull's home region (group headquarters in Fuschl am See, O00109, counted as Salzburg metro) and Leonardo's scene, but on file it scores 1 of 6: no Red Bull dance event 2024-2026 (F001315), no Latin congress, Austria thin (4 Latin listings). Leonardo's own data (research/manual_input.ods, Salzburg rows) is **pending**: the file has not been filled, so nothing is stated about Salzburg schools or socials. An activation in Salzburg would be a home-region pilot rather than a market choice.

## 6. For Leonardo's own project: congress economics

Stated sizes (dancers, organiser statements; lower bounds where "over") and full passes on file:

| Congress | Dancers | Source |
|---|---|---|
| Croatian Summer Salsa Festival | over 5,000 | F001967 |
| Amsterdam International Salsa Festival | 2,000 (2026), 2,500 (2025) | F001965, E000113 |
| Paris International Salsa Congress | more than 1,500 | F001966 |

Full passes (EUR): 120 Graz (F001594), 160 BCN Dance Life (F001598), 190 El Sol Warsaw (F001602). The three passes belong to different congresses, so they are a range, not the price of one event.

**Computed** gross pass revenue = dancers x lowest or highest pass on file (120 / 190), a theoretical ceiling if every dancer paid a full pass:
- Amsterdam 2026: 2,000 x 120 = EUR 240,000 to 2,000 x 190 = EUR 380,000. 2025: 2,500 x 120 = 300,000 to 2,500 x 190 = 475,000.
- Paris: 1,500 x 120 = 180,000 to 1,500 x 190 = 285,000 (lower bound on dancers).
- Croatia: 5,000 x 120 = 600,000 to 5,000 x 190 = 950,000 (lower bound on dancers).

**Calendar (listings next 12 months, salsa + bachata, goandance, partial, ES and DE bachata page counters L):** crowded: Spain 120, Germany 54, Italy 28; thin: Switzerland 1, UK 3, Austria 4. France 16, Poland 10, Netherlands 6.

**Not known (questions, no estimates):** venue and hotel costs; artist and instructor fees; staff and sound costs; share of dancers on discounted or party-only passes; sponsor income; how many of the 2,000 are foreign (12 countries among the first 24 pre-registered, F001965 notes); repeat rate; costs of a smaller congress in a thin market such as Austria.

## 7. What we could not measure and why

- Round V research tasks: no open web access in the working session; V1 (congress sponsors) and V3 (Red Bull audience statements) not run (manual list items 34, 36); V2 done afterwards in the review (O00109-O00117).
- City-level participation: platforms and schools cannot be counted from desk research; only Vienna and Milan minimums (confidence L).
- Social platforms: no logins; TikTok, Facebook and YouTube mostly not read; Instagram counts rounded.
- Missing sponsor packs: none public for 10 congresses (round U).
- Red Bull offices: added in the review from search snippets (L), to confirm on official pages. Salzburg manual data: pending.
- Paris city-proper population not verified (F000048).

## 8. Evidence index

- Section 2: F001331, F001330, F001336, F001344, F001334, F001332, F001654, F001660, F001652, F001653, F001658, F001659, F001661, F001662, E000109, E000107, F001572, E000074, E000072, E000113, F001966, F001594, F001598, F001602, F001580, F001581, F001649, F001650, F001648, F001651, F001729, F001670, F001737, F001675, F001688, F001694, F001847, F001873, F001851, F001759, F001761, F001763, F001909-F001911, F001919-F001921, F001885-F001888.
- Section 3: F001729, F001670, F001895, F001896, athletes A00024-A00026 (U3.2 list).
- Section 4: E000144-E000147, E000149-E000151, F001970-F001978, F001956-F001965, F001967, E000142, E000075.
- Section 5: E000125, E000001, E000011, E000002, E000027, E000004, E000028, E000006, E000031, E000124, E000071, E000139, E000140, E000141, E000142, E000086, E000072, E000113, E000075, F001929-F001946, F001334, F001332, A00037, A00051, F000030, F000033-F000036, F000039, F000041, F000043, F000045, F000047, F000048, F001162, F001163, F001190, F001583, F001584, F001315, O00103, O00109-O00117.
- Section 6: F001965, F001966, F001967, E000113, F001594, F001598, F001602, F001929-F001946.

## 9. Robustness, limits and possible bias (review of 2026-10-21)

Numbers from `python scripts/robustness.py` (seeded bootstrap, 10,000 resamples; permutation test, 10,000 shuffles; data/ only).

| Comparison | Latin | Breaking | Test | Reading |
|---|---|---|---|---|
| Event accounts (W sets), median Instagram followers | 15,000 (90% CI 9,085-25,000), n = 17 | 30,000 (14,000-152,000), n = 15 | P(breaking event > Latin event) = 0.71; p = 0.17 | Tendency, not robust |
| Top 30 dancers, median Instagram followers | 81,000 (56,000-114,500) | 105,000 (76,000-118,000) | P = 0.54; p = 0.35 | No difference |
| Dancer / event ratio | 5.4 (3.1-10.9) | 3.5 (0.7-7.5) | intervals overlap | Tendency, not robust |
| Price per person | full pass, n = 8 of 20: median 152, range 115-245 | spectator ticket, n = 2 of 20: 35, 40 | too few breaking prices | Direction clear, sample thin |
| Stated size | dancers, n = 5 of 20: 1,000-5,000 | dancers n = 3 (107, 125, 2,000), spectators n = 2 (6,000, 10,000) | too few | Reporting conventions differ |

**Confidence per conclusion**

| Conclusion | Confidence | Why |
|---|---|---|
| Red Bull's breaking media (BC One, Red Bull Dance) dwarf every Latin channel | High | 10-170x, many sources |
| Competitions are small in both worlds | Medium | 6 national finals counted |
| Latin congresses sell participation at EUR 115-245 per person | Medium | 8 prices, organiser pages |
| Independent breaking events are more followed than Latin events | Rejected for typical events (round X, p = 0.02 the other way); true only for flagships | random samples of 30 + 30 |
| Latin attention sits with dancers more than in breaking | Low | overlapping intervals, selection bias |
| Same order of money per flagship event | Low | two examples, computed |
| Red Bull is absent from Latin congresses | Medium-low | not found in 9 countries; partner pages rarely published |
| Paris, Barcelona, Madrid as entry points | Medium | depends on country-level columns and office rows |

**Possible confirmation bias (named, not hidden)**
1. Selection: the 20 + 20 events are the most visible ones we could find, not a random sample; the breaking top are global touring brands, the Latin ones mostly local congresses.
2. Asymmetric comparison: top-30 dancers (maximum of thousands of accounts) against a few dozen events.
3. Reporting conventions: Latin organisers state dancers, breaking organisers state spectators; part of "participation vs spectacle" may come from how each scene communicates.
4. No search for counter-evidence yet: paid participation in breaking (battle entry fees, workshop passes; Outbreak states 2,000 participants) and spectators in Latin (shows, finals with an audience).

**Tests written before new data (round X), with what would weaken each hypothesis**
- H1 weakens if, in a random sample of events, breaking events show paid participant numbers or prices close to Latin ones, or Latin events show spectator audiences close to breaking ones.
- H1 (audience) is confirmed only if the follower difference between random samples of 30 + 30 events is significant (two-sided p < 0.05).
- H3 weakens if, with dancers drawn from the line-ups of randomly sampled events, the dancer / event ratio is the same in both worlds.
- H2 weakens if drinks or energy brands already sponsor most large congresses, or if organisers say a drinks partner is not wanted.

## 10. Round X: random samples and the tests of section 9 (review of 2026-10-21)

**Sampling.** Frames of events in Europe from 2026-11-01 to 2027-10-31 (research/frames/): Latin from goandance.com, all salsa and bachata listings read page by page (222 events, 188 eligible); breaking from and8.dance (71, 51 eligible; and8 is a battle registry, not the full European calendar). 30 events drawn per world with scripts/draw_sample.py (seed 20261021); frames not edited after the draw. Numbers from `python scripts/robustness.py` (section "Round X").

| Measure | Latin (30 random events) | Breaking (30 random events) | Test |
|---|---|---|---|
| Instagram followers per event, median (90% CI) | 4,461 (3,527-7,528), n = 17 | 1,641 (420-3,017), n = 23 | P(breaking > Latin) = 0.26; p = 0.02 |
| Same, events without an account counted as 0 | 2,455 (n = 29) | 1,257 (n = 26) | direction unchanged |
| Event days, median | 3 (range 1-7) | 1 (range 1-6) | |
| Price per person | full pass: median EUR 115 (45-179), n = 23; party-only ticket EUR 59-89, n = 4 | no full pass found; spectator ticket median EUR 8.50 (0-14), n = 6; entry fee median EUR 10 (0-25), n = 5 | |
| Competition or battle section | 14 of 21 read | 28 of 28 read (battles by definition of the frame) | |
| Workshops | 22 of 23 read | 5 of 6 read | |
| Stated participants / spectators | 1 / 0 | 0 / 0 | sizes are almost never published |
| Line-up artists, Instagram followers, median | 59,000, n = 12 | 13,000, n = 8 | p = 0.20 |
| Frame size (listings, next 12 months, Europe) | 188 eligible | 51 eligible | different platforms |

**The tests written before the data (section 9)**
- *H1, audience side ("confirmed only if random samples differ significantly")*: they differ significantly, **in the opposite direction**: the typical Latin event is more followed than the typical breaking event. Breaking's audience advantage exists only at the top (global touring brands, Red Bull media). **Rejected for typical events; holds for flagships.**
- *H1, participation side ("weakens if breaking shows paid participation close to Latin")*: it does not: breaking events are mostly one day, with tickets around EUR 9 and entry fees around EUR 10; Latin events last 3 days and sell passes around EUR 115. But breaking events are participatory too (every sampled event is a battle where dancers compete, most with workshops). **Supported in a revised form: both worlds are participatory at the base; Latin monetises participation, breaking monetises attention at the top.**
- *Counter-evidence for Latin*: 14 of 21 Latin events read have a competition section, and 5 of 20 flagship congresses sell show or party-only tickets (EUR 15-65, round X4). Latin is not purely social.
- *H3 ("weakens if line-up artists show the same ratio in both worlds")*: ratios 13 (Latin) vs 8 (breaking): same direction as H3, but 12 + 8 artists and the better known ones resolved: **not proven**.
- *H2 (sponsors)*: partners sections were not readable for the 55 new events (JavaScript pages): **untested**; only talks with organisers can settle it.

**Remaining biases.** The two frames come from different platforms (a ticket marketplace for Latin, a battle registry for breaking): goandance lists mainly paid multi-day events, and8 also small jams. A fair reading is "the typical listed event" in each world. 12 of 29 Latin and 3 of 26 breaking sampled events have no Instagram account found; counting them as 0 does not change the direction. BIG Milan full pass: EUR 245 (round W) vs EUR 170 (round X re-read), both kept.

**What this changes for Red Bull.** The Latin market has a broad, followed middle: many multi-day events where paying adults dance for 3 days and nights. Breaking's middle is thin: small one-day battles, with the audience concentrated on a few global brands, one of them Red Bull's own. That strengthens H2 as a format (product presence across many mid-size congresses) and weakens any idea of a single big Latin "show" event.

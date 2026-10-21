# Results review (2026-10-19)

Review of research/results/ (49 files + INDEX.md). Files read in full or in part: INDEX, A3, B1, G4 (first part), D5, J2, E5 (first part), project_memory, workbook (Disciplines, Cities). Other files taken from INDEX only. Nothing here replaces the INDEX; it adds corrections and the collection plan.

## 1. How far each result can be trusted

Usable as they are (method or verified facts): A1, A2, B3, C1, C2, G4, I1, I2, I4, D3 (verdict), D4 (method), E2, E3, E8, D6.

Usable with a caveat:
- A3 and B1 ("Red Bull absent"): the claim rests on not finding a Red Bull sponsor in search results. Sponsor pages of the events were not checked. Label as "not found", not "absent". Needs insider validation (I4).
- J1 (scoring recipe): a design, not a measurement. Blocked by D5 gaps.
- J2 (circularity): a method sketch. Its historical claims (Zurich 2018 entry, Tokyo 2010, "Toronto 2026 saw subsequent athlete concentration") are not backed by data and some are impossible (2026 final not yet held). Athlete-mobility examples (Vienna to Berlin) do not show causation.
- E5: the "20-40% of competitive dancers can be mapped to a city" is an estimate, not a count. WDSF "Latin/Caribbean" lists are dancesport, not social salsa/bachata. and8.dance covers breaking only; no equivalent found for Latin.
- D5: see section 3.

Thin or partial: see INDEX (A5, A6, B5, F1, F2, H2 thin; most others partial).

## 2. Errors found in the results

1. B1 summary and INDEX say "10 street-dance + 8 Latin events". The B1 table has 10 rows in total: 5 street (Juste Debout, BOTY, IBE, Hip Hop International, Outbreak Europe) and 5 Latin (Berlin, Amsterdam, Crazy 4 La Timba, Croatian Summer Salsa Festival, BCN Dance Life).
2. B1 Juste Debout: ">10,000 participants" and "6,000 seats per day" in the same row. Use the organiser-stated seats figure; the 10,000 is unsourced.
3. B1 Berlin Salsa Congress: "~6,000 (inferred)" but confidence H. Downgrade to L/M until the organiser figure is seen.
4. B1 Hip Hop International: the world championship is in Phoenix, not Europe. Anchor only.
5. B1 pilot-city coverage: "Salsa Spain World Congress Dec 2026 Madrid" is unconfirmed.
6. A3: the row "DYS Mexico 2026, 30 hours of salsa/bachata/cumbia lessons" has no source URL. A new search on 2026-10-19 found nothing supporting it. Do not use until sourced.
7. Two direct checks (juste-debout.com, berlinsalsacongress.co) were blocked by a permission prompt and are still unverified.
8. D5: Amsterdam and Paris city-proper figures missing; Graz listed twice; Salzburg and Innsbruck "metro" figures are NUTS3 regions, not functional urban areas; 15-34 share found for no city; students for 2 cities; reference years 2020-2025 mixed.
9. Workbook: Signals, Events, Ladder and Athletes sheets are still empty; Cities population column empty; Disciplines does not yet include URB-WAA, URB-VOG, kizomba/zouk reclassification (C1/C2) and still lists tricking as "Proposed" pilot.

## 3. Data still to collect (priority order)

P1: blocks the scoring
- Eurostat bulk tables (public): urb_cpop1 by 5-year age band (15-34 share), urb_ceduc (students), urb_ctour (tourist nights), for all candidate cities, one reference year. Add Amsterdam and Paris.
- Google Trends via public UI, 5 cities, keyword list from D4 (manual; ToS-safe).
- Salzburg pilot (E1): schools, classes, spaces, events, ladder rungs. On hold until Leo says go. It is the only real test of whether bottom-up counting works.
- Sponsor pages of the B1 events (who does sponsor Latin congresses and battles): needed to say anything about "Red Bull absent" and about brand fit.
- Insider validation of the "absence" claims (I4 questions).

P2: strengthens the argument
- Red Bull athletes in dance (A5): rendered browser pass.
- Red Bull YouTube/platform metrics for dance content (A6): manual.
- Ticket prices and attendance for events (F2, F4): goandance and organisers.
- Event calendars per pilot city (E3 procedure), to fill the Events sheet.
- Dutch dancesport federation and correct FIDS URL (B2).
- Reference-year harmonisation (D5).
- Local-expert check of teaching regulation (E7), only for the cities that stay.

P3: later
- Online organisation counts (B5), viewing-to-participation studies (H2), audience and sponsorship valuation (F1).

## 4. Architecture notes (proposed, not applied)

See the chat reply of 2026-10-19 for the full list; summary: add evidence-type column ("found", "not found", "stated by organiser", "inferred"); map events to metro areas instead of exact city names; load B1 and A1 into Events; decide hip hop family vs breaking; make the Latin gap view independent of Red Bull's footprint; move the workbook to data/ with an English name; update README.

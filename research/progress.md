# Progress - R-round (prompt_rq_collection.md), 2026-10-20

## Rows written (facts unless said)
- R5.1: 15/45 (URB-BRK; every 2026 stop checked on redbull.com rendered). CAR rows missing: they need the R2/R3 event pages checked first (rule of the task).
- R2.1: 11 orgs + 37 relations + 28 sources; every 9x3 country cell has an organiser or a documented search.
- R2.2: 27/27. Competitor counts from results for 6 cells (DE brk 107, FR brk 125, FR sal/bch 65 entries, ES sal/bch 123); 21 not_found (results split in per-segment pages or PDF).
- R2.3: 45/45, all limited: breaking side not measurable (and8 has no location filter or archive, notes document it); Latin side = 0 at listing level, 2 not_found (MAD capture).
- R2.4: 11 relations + research/logs/R2.4_ladders.md (27 lines).
- R3.1: 45/45 - and8 side not measurable (same platform limit); goandance side: values are events still listed in the window (platform delists the past - the notes name the beyond-window listings); 2 not_found (MAD).
- R3.2: 45 cells: 8 named events (6 breaking, 2 Latin) + 37 not_found; 1 countries fact found (BER 60+), 0 prices found.
- R1.3: 4/45 (PAR, LON x salsa/bachata, from opened Salsa Vida guides).
- R1.1, R1.2, R1.4: 0/45 each - not started (see open questions).
- R1.5: 45/45 decided: 45 converted to not_found (agent-invented city averages, wrong cities/disciplines, 2 contradicted PZST claims); log L00054-L00056.
- R4.1: 6 facts (Basel DYS 1,000+ spectators, Juste Debout 6,000 seats/day; 4 not_found). R4.2: 3 channels done (BC One 1.21m, Red Bull Dance 991k, WDSF 292k), video views skipped on instruction.
- R5.2: partial: 7 events red_bull_involvement set (not_found), 2 sponsor relations (Freddy, Make Up For Event); the rest stays not_checked (manual list item 18).

## Where one side could not be measured, and why
- and8.dance (all 15 cities, R2.3 + R3.1 breaking): no location filter, no pagination; q-search is full-text.
- goandance.com: past events delisted; city filter interaction failed; lazy-load stops at ~17 cards (Madrid never captured).

## What failed / corrections
- E000032 corrected Salzburg -> Basel (official DYS calendar); E000033/E000034 flagged (not on the official calendar).
- goandance country code is GB, not UK (UK filter silently returned the global list).
- Two ID-format batches (F+7 digits) were written and fixed in place; validator OK.

## Open questions for Leonardo (max 5)
1. R1.1/R1.2 (school searches, 3 fixed queries x 45 cells) and R1.4: shall I run them in a dedicated session city by city? They are the biggest gap.
2. R5.1 CAR rows + R5.2 rest: after a pass on the sponsor pages of the R2/R3 events - approve the not_checked -> manual list trade-off?
3. The DYS Vienna/Spielberg 28 Jun rows (E000033/E000034): keep hunting or mark wrong?
4. A scripted count of the FIDS/TopTurnier per-segment results (IT, DE) would fill 4 R2.2 count cells - worth a small script?
5. The viewer's unit labels must match the new unit strings ("Red Bull dance events 2024-2026" etc.) - rebuild needed.

Validator: 0 errors, 1317 warnings. Final counts: facts 1,582 (1,173 not_found), events 113, orgs 72, relations 61, sources 267, review_log 56.

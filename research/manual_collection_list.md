# Manual collection list (2026-10-20, correction pass)

Items that this pass could not finish with the plain HTTP fetch tools. Each line: what, the exact URL(s), what failed.

1. Red Bull BC One athlete directory (roster of Red Bull breaking athletes, needed for P5.4 and the ATH signal).
   URL: https://www.redbull.com/gb-en/athletes
   Failure: the page renders through JS; a plain fetch gets only the first hand of sample cards; the discipline filter needs an interactive multi-step click-through, and the directory view in the rendered browser shows only a handful of entries before it stops paginating at no session.
2. Red Bull BC One YouTube channel metrics (subscribers, video count, total views) for the MED facts F000351-F000353.
   URL: https://www.youtube.com/@redbullbcone/about
   Failure: consent login-page (Google cookie wall) in both the plain fetch and the rendered browser; the numbers now on file are third-party aggregator figures kept as `inferred`, confidence L.
4. Flavourama organiser page (E000081 red_bull_involvement and the exact 2026 date).
   URL: http://flavourama.at (https site shows an expired certificate)
   Failure: certificate expired; domain flavourama-battle.com (the domain used in the earlier pass) does not resolve at all.
5. Google Trends per city and discipline (ONL, relative index).
   Method: manual search in the Trends UI; not automatable in this environment.
6. Population, students and tourist nights for the non-EU benchmark cities (LAX, MIA, NYC, YTO, SEL, TYO, MEX, SAO, CLO, HAV, SDQ, SJU, JNB, BOM).
   Method: national statistics offices (US Census, StatCan, KOSIS, e-Stat, INEGI, IBGE, CUBAINFO, ONE, Jcommunity, SSA, StatsSA, Census India); not done in this pass - the Eurostat setup covers only the EU/EEA places.
7. Coordinates (lat/lon) still missing for most scan cities whose English Wikipedia article name differs from the name used in places.csv (67 of 85 needed city rows resolved nothing by exact title match).
   Method: search the local-language article title per city, then re-query the same coordinates API.
8. STSV (Swiss dancesport) member-club total (the F000279 row is a `not_found` after checks).
   URL: https://www.dancesport.ch/en/jahresbericht (no member-club count published there); try the German-language report and the STSV club directory if it exists.

## Added 2026-10-20 (R-round, prompt_rq_collection.md) - open items of this round
12. R4.2 video views were skipped on instruction during the R round. T5.1 later checked the listed competitions; unresolved official finals remain item 23.
13. and8.dance archive: no location filter and no paginated archive (past lists truncated: AT 7 events, main list ~70); q=<city> search is full-text. A per-city 12-month breaking count needs the and8 team or manual browsing. Affects all 15 URB-BRK rows of R2.3 and R3.1.
14. goandance.com: the location filter cannot be driven reliably (Google Places autocomplete); the country listings lazy-load and only the first ~17 cards render in the browser; past events are delisted. Madrid city events were never captured (affects R3.1 MAD rows); all R3.1 values cover only the window dates still listed.
16. Campeonato de Espana de Breaking 2026 (E000132): results and competitor count collected from the FEBD PDF (S00314), but the PDF omits the exact date and venue; host page compostelastreet.gal remains blocked (HTTP 403).
17. Italian and German segmented results: the FIDS Breaking PDF returned “Service unavailable” and then HTTP 403 on the single corrected request (source S00317); do not retry. The 54+ Italian Caribbean and 21 DAT German TopTurnier result segments were not saved to research/scripts/input, so count_competitors.py reports zero saved segments and no totals. Manual collection is still needed for F001339-F001343.
18. R5.2 remaining sponsor pages: E000081 Flavourama (item 4), E000138 Ultimate Latin Dance Championship 2026 (the current source S00309 is an unrelated Euroson results article; no official event page was verified), and E000143 Salsa Festival Biel/Bienne (item 19). Other T2/T3 event pages were checked in T4.1.
19. T3.1 Switzerland Salsa Festival Biel/Bienne 2026 (E000143): the organizer URL salsa.ch returned a transport error; Switzerland Tourism returned HTTP 406 and Tourisme Bienne Seeland HTTP 410. The event appears in search results for 17-18 Oct 2026, but no official page, size or ticket price could be read.
20. T3.1 BIG International Milan 2026 (E000139): official page lists USD 275 full pass, but the ECB EUR/USD API for 2026-10-20 returned HTTP 503 (S00329); the required EUR conversion is pending.
21. T4.1 Ultimate Latin Dance Championship 2026 (E000138): its stored source S00309 is an unrelated Euroson article; no official organizer/sponsor page was identified, so `red_bull_involvement` remains `not_checked`.
22. T4.2 Latin Red Bull footprint: the localized Red Bull event pages have no usable free-text Salsa/Bachata search (AT `/search?q=salsa` returned Page Not Found; the DE/UK pages did not render event lists). The 30 city/style ORG rows are `not_found`, not zero; a manual search of Red Bull's localized archives is still needed.
23. T5.1 official YouTube finals still missing: Dance Your Style World Final 2025; World Latin Dance Cup 2025/2026; World Salsa Summit 2025/2026; Euroson Latino 2025/2026; WDSF Caribbean final-specific video (only a 2026 Day 1 stream found); FEBD Campeonato de Espana de Bailes Caribenos 2026 bachata final. Opened official channel pages/search results are in S00311, S00344-S00351; these are recorded as not_found, not inferred view counts.

## Added 2026-10-20 (market comparison round, project/analysis_and_plan.md)
Leonardo fills the tables in research/manual_inputs.md; Claude converts them into data/.
9. Google Trends per city: salsa, bachata and breaking compared as dance topics, past 12 months, city breakdown in each of the 9 countries (indicator I5). About 45 minutes.
10. Largest public community group per city and style on Meetup and Facebook: name and public member count only (indicator I4). About 1 hour.
11. Salzburg ground truth: schools, weekly classes, socials, events per year and estimates, from Leonardo's own knowledge as a local teacher (calibration C1). 2-3 hours.
24. T6 fixed-search school counts in Vienna/Milan: only confirmed minima are on file (F001652-F001656); the first 20 results for all three fixed queries per city/style were not reviewed. Search-result pagination and full named-school reconciliation are deferred; the counts must not be presented as exhaustive.
25. T6.3 socials/jams: six rows are limited not_found (F001664-F001669); dedicated searches for named recurring events active in 2026 were deferred. Revisit before using the pilot to decide whether to scale.
26. T6.4 time spent: the interrupted pass did not track minutes separately by city/style; do not infer durations from the log. The task log records this limitation.

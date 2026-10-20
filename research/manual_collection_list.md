# Manual collection list (2026-10-20, correction pass)

Items that this pass could not finish with the plain HTTP fetch tools. Each line: what, the exact URL(s), what failed.

1. Red Bull BC One athlete directory (roster of Red Bull breaking athletes, needed for P5.4 and the ATH signal).
   URL: https://www.redbull.com/gb-en/athletes
   Failure: the page renders through JS; a plain fetch gets only the first hand of sample cards; the discipline filter needs an interactive multi-step click-through, and the directory view in the rendered browser shows only a handful of entries before it stops paginating at no session.
2. Red Bull BC One YouTube channel metrics (subscribers, video count, total views) for the MED facts F000351-F000353.
   URL: https://www.youtube.com/@redbullbcone/about
   Failure: consent login-page (Google cookie wall) in both the plain fetch and the rendered browser; the numbers now on file are third-party aggregator figures kept as `inferred`, confidence L.
3. BCN Dance Life sponsor page (E000115/E000075 red_bull_involvement).
   URL: https://bcndancelife.com/
   Failure: blocked / not reachable by plain fetch; keep `not_checked` until a rendered visit.
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
12. YouTube video-view facts for R4.2 (most viewed / latest final video per channel): skipped on instruction in this round. Channels verified: @RedBullBCOne (1.21m), @RedBullDance (991k), @wdsfdancesport (292k). Still to check: World Latin Dance Cup, World Salsa Summit, Euroson Latino, and the largest bachata championship channel.
13. and8.dance archive: no location filter and no paginated archive (past lists truncated: AT 7 events, main list ~70); q=<city> search is full-text. A per-city 12-month breaking count needs the and8 team or manual browsing. Affects all 15 URB-BRK rows of R2.3 and R3.1.
14. goandance.com: the location filter cannot be driven reliably (Google Places autocomplete); the country listings lazy-load and only the first ~17 cards render in the browser; past events are delisted. Madrid city events were never captured (affects R3.1 MAD rows); all R3.1 values cover only the window dates still listed.
15. events.csv E000033 (DYS Vienna 28 Jun 2026) and E000034 (DYS Spielberg 28 Jun 2026): not on the official redbull.com 2026 calendar (28 Jun = Lagos) - manual check needed.
16. Campeonato de Espana de Breaking 2026 (E000132): compostelastreet.gal blocked (HTTP 403); date and results needed.
17. FIDS Breaking results PDF (federdanza.it/images/gare/2019_2020/GARE_NAZIONALI_WDSF/Breaking Results.pdf) and the per-segment TopTurnier exports for the Danze Caraibiche (54+ segments): need a manual or scripted count for R2.2 IT facts.
18. R5.2 sponsor pages not checked for: E000131, E000132, E000133 and the R3.2 events (only FIDS/FebD/Ffdanse pages read); E000081 Flavourama sponsor page still unreachable (item 4 above).

## Added 2026-10-20 (market comparison round, project/analysis_and_plan.md)
Leonardo fills the tables in research/manual_inputs.md; Claude converts them into data/.
9. Google Trends per city: salsa, bachata and breaking compared as dance topics, past 12 months, city breakdown in each of the 9 countries (indicator I5). About 45 minutes.
10. Largest public community group per city and style on Meetup and Facebook: name and public member count only (indicator I4). About 1 hour.
11. Salzburg ground truth: schools, weekly classes, socials, events per year and estimates, from Leonardo's own knowledge as a local teacher (calibration C1). 2-3 hours.

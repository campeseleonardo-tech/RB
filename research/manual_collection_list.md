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

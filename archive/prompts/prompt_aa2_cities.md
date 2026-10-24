You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Task AA2: collect city indicators for 24 European cities, to rank them as places for (a) Red Bull's first Latin activation and (b) a new Latin congress. You only COLLECT; Claude builds the rankings.

Read first: project/project_memory.md (sections 1-3 and 8). Do not read archive/ or outputs/.

RULES
- Public pages and public statistical databases only. No login, no paywall.
- For each indicator below there are up to 5 candidate sources, in order of preference. Try them in that order. Keep the FIRST source that gives a value for at least 18 of the 24 cities, and use it for all cities (one source per indicator makes cities comparable). A source that does not load or has no city data after 2 tries: write that in the log and try the next. If none of the 5 works: write "indicator dropped" in the log and go on. Do not look for other sources.
- Never mix sources inside one indicator. A city the chosen source does not cover stays empty (notes: "not in source").
- Write the year of each value. Prefer the latest full year.
- One line per indicator in research/logs/AA2_log.md: sources tried, source kept, cities filled. Save after each indicator, so the next session can continue.
- Do not commit or push: Leonardo does it. Never touch research/manual_input.ods.

THE CITIES: research/cities/city_list.csv (24 cities; do not add or remove).

OUTPUT: research/cities/city_indicators.csv, one row per city and indicator:
city, country_iso2, indicator, value, unit, year, source_name, source_url, access_date, notes

THE INDICATORS AND THEIR CANDIDATE SOURCES

C1 population (inhabitants, city proper)
1. Eurostat City statistics, table urb_cpop1 (ec.europa.eu/eurostat, data browser: "Population on 1 January by age groups and sex - cities and greater cities")
2. citypopulation.de (city pages)
3. the national statistics office of each country
4. Wikipedia city infobox (only if it names its source and year; write both in notes)
5. OECD Metropolitan areas database (functional urban areas; write "FUA" in notes)

C2 young_adults_share (percent of inhabitants aged 20-39)
1. Eurostat urb_cpop1 (age groups; sum 20-24 to 35-39, divide by total)
2. Eurostat urb_lpop1 (functional urban areas)
3. national statistics office city profiles
4. citypopulation.de (age structure, where shown)
5. OECD regional statistics (TL3 region of the city; write "region" in notes)

C3 air_passengers (passengers a year at the airports serving the city)
1. Eurostat table avia_paoa (passengers by reporting airport)
2. ACI Europe airport traffic report (latest annual)
3. each airport operator's annual traffic figure
4. Wikipedia "List of the busiest airports in Europe"
5. Eurostat news release on air passengers (top airports)
Notes: which airports you summed (e.g. Paris CDG + Orly; Milan MXP + LIN + BGY; Girona airport alone for Girona).

C4 hotel_price (average price per night, EUR)
1. trivago Hotel Price Index (tHPI), latest published edition with a European city list
2. Amex GBT Hotel Monitor (latest; city average rates)
3. HRS hotel price report or barometer (city averages)
4. hotels.com / Expedia Hotel Price Index (only if a current edition exists)
5. a European city hotel price comparison published by a national tourism board or by the press that covers at least 18 of the cities (write publisher and date)

C5 tourism_nights (nights spent in tourist accommodation a year)
1. Eurostat City statistics, table urb_ctour (culture and tourism)
2. Eurostat tour_occ_nin3 (NUTS 3 region of the city; write "region" in notes)
3. national statistics office (city tourism nights)
4. city tourism board annual report
5. European Cities Marketing benchmarking report (press summary)

C6 latin_schools_listed (salsa and bachata schools listed for the city)
1. goandance.com schools pages (salsa schools and bachata schools for the city; write both counts in notes and the larger in value, since a school can appear in both)
2. salsavida.com city guides (schools listed)
3. latindancecalendar.com city pages (schools or classes listed)
4. salsorro.com directory (Spain and Portugal; only if it covers 18 cities, otherwise skip)
5. poidata.io "salsa classes" reports (only the free top-city figures)

C7 dance_venues_osm (all dance schools and dance venues in OpenStreetMap)
1. Overpass API (overpass-api.de, public): count features tagged amenity=dancing_school, education=dancing_school or leisure=dance inside the city's administrative boundary; write the query in notes once
2. overpass-turbo.eu (same query, by hand)
3. taginfo.openstreetmap.org (only if it allows a count by area; otherwise skip)
4. and 5. none: if the Overpass API does not answer, drop the indicator

C8 cost_level (cost of living index of the city)
1. Numbeo Cost of Living Index by city (latest; also write the restaurant price index in notes)
2. Mercer cost of living city ranking (press summary)
3. Expatistan city cost of living
4. Eurostat price level index (country value; write "country" in notes)
5. UBS Prices and Earnings (latest archived edition)

C9 rb_dance_events (Red Bull dance events held in the city or its metro, 2024-2026)
1. data/events.csv (already on file for the 15 project cities: copy, notes "on file")
2. redbull.com event pages (search the city name with "Dance Your Style", "BC One")
3. redbullbcone.com event pages
4. Red Bull Dance Your Style country pages
5. press search "<city> Red Bull Dance Your Style 2025" or "<city> Red Bull BC One 2025"

C10 rb_office (1 if Red Bull has a national or regional office in the city or its metro, else 0)
1. data/organisations.csv (O00109-O00117, 9 countries: copy, notes "on file")
2. the Red Bull country website imprint or contact page
3. jobs.redbull.com office locations
4. Wikipedia "Red Bull GmbH" (subsidiaries)
5. the national company register (public search page)

Indicators Claude computes from files already on file (do NOT collect): Latin events per city, Latin events with 1,000+ dancers within 150 km, Hyrox races, Latin events per country, typical pass price.

END
- research/logs/AA2_log.md ends with a table: indicator, source kept, cities filled (out of 24), or "dropped".
- Run `python scripts/validate_data.py` (0 errors). Delete temporary files. Tell Leonardo it is ready to commit.

DONE WHEN: every indicator C1-C10 has either a source kept with values for the cities it covers, or "dropped" with the 5 sources tried.

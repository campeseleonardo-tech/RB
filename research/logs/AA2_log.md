# AA2 log — city indicators, 24 European cities (one line per indicator)

- 2026-10-22 start: 24 cities from research/cities/city_list.csv; access date 2026-10-22; public sources only.
- C1 population: tried Eurostat urb_cpop1 (city proper, 2024; only 17/24 cities have a city-proper value — AT, UK, CZ, EL, RO missing; capitals only as "greater city"); then citypopulation.de city pages (23/24, Prague has a human check; value = city proper, latest national estimate 2021-2026). Source kept: citypopulation.de, 23 cities.
- C2 young_adults_share: tried Eurostat urb_cpop1 (age bands, 2024; 17/24), Eurostat urb_lpop1 (functional urban areas; 15/24), national statistics office profiles (would mix 24 different offices, against the one-source rule), citypopulation.de city pages (age distribution, 23/24). Source kept: citypopulation.de, 23 cities; share = (20-29 + 30-39) / all age bands, age year 2021-2026 (Germany 2022 census).
- C3 air_passengers: tried Eurostat avia_paoa (annual, passengers carried, all airports serving the city; 23/24, London absent because Eurostat has no 2024 UK airport data). Source kept: Eurostat avia_paoa, 23 cities. Airports summed written in notes.
- C4 hotel_price: tried trivago tHPI (no public city table for these 24 cities), Amex GBT Hotel Monitor (report/registration, no free city table), HRS price report (no current city table found), hotels.com/Expedia HPI (no current edition), press/national tourism comparison (no single current article covering 18 cities). No source met 18 cities: indicator dropped.
- C5 tourism_nights: tried Eurostat urb_ctour (CR2001V; only 3-4/24 cities have data), then Eurostat tour_occ_nin3 (NUTS3 region; 23/24, London absent). Source kept: tour_occ_nin3, 23 cities; values are the NUTS3 region of the city, written in notes.
- C6 latin_schools_listed: tried goandance school pages (city pages exist for 12/24 cities only: Salzburg 1, Berlin 5, Hamburg 2, Milan 3, Rome 6, Barcelona 346, Madrid 291, Malaga 58, Girona 39, Paris 1, Budapest 0, Bucharest 0; other URLs return country/region totals), salsavida city guides (events calendar, no school list), latindancecalendar city pages (no school count), salsorro (Spain/Portugal only, at most 5 of 24), poidata.io (paid). No source met 18 cities: indicator dropped.
- C7 dance_venues_osm: Overpass API (overpass-api.de) count of amenity=dancing_school OR education=dancing_school OR leisure=dance inside the city's administrative OSM relation (24/24; Athens 0). Source kept: Overpass API, 24 cities; query and relation id in notes.
- C8 cost_level: tried Numbeo (HTTP 429 "Access Restricted"), Mercer (press ranking, no free city index), Expatistan (HTTP 403), Eurostat price level index tec00120 (country value, 24/24). Source kept: Eurostat tec00120, 24 cities, country value (EU27_2020=100, 2024) written in notes.
- C9 rb_dance_events: tried data/events.csv (Red Bull dance events on file for 16 cities, 2024-2026; below 18), redbull.com event pages (individual pages, no per-city list), redbullbcone.com (no city index), Red Bull Dance Your Style country pages (no city-level table), press search (not a single comparable source). No source met 18 cities: indicator dropped.
- C10 rb_office: data/organisations.csv O00109-O00117 (19/24 cities covered: office city = 1, other cities in the same 9 countries = 0; Prague, Athens, Budapest, Bucharest, Brussels empty). Source kept: data/organisations.csv, 19 cities; notes "on file"; Salzburg counts Fuschl am See in its metro, Zurich does not count Baar.
- File: research/cities/city_indicators.csv, 159 rows (C1 23, C2 23, C3 23, C5 23, C7 24, C8 24, C10 19; C4, C6, C9 dropped).
- validate_data.py run after writing: data/ untouched, 0 errors.

## Final table

| indicator | source kept | cities filled (of 24) |
|---|---|---|
| C1 population | citypopulation.de | 23 |
| C2 young_adults_share | citypopulation.de | 23 |
| C3 air_passengers | Eurostat avia_paoa | 23 |
| C4 hotel_price | — | dropped |
| C5 tourism_nights | Eurostat tour_occ_nin3 | 23 |
| C6 latin_schools_listed | — | dropped |
| C7 dance_venues_osm | OpenStreetMap via Overpass API | 24 |
| C8 cost_level | Eurostat tec00120 (country) | 24 |
| C9 rb_dance_events | — | dropped |
| C10 rb_office | data/organisations.csv | 19 |

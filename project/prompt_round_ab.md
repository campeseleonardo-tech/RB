You are the research agent of the Dance Scene Atlas project (repository campeseleonardo-tech/RB), in a cloud session with full web access. Run this round AFTER round AA has been merged into main (it uses research/prices/latin_events_detail.csv and outputs/price_study.md). Round AB builds two decision tools:
- AB1 CITY RANKING: a transparent, tested ranking of European cities for (a) Red Bull's first Latin activation and (b) a new Latin congress, from the same indicators with two sets of weights.
- AB2 CONGRESS MODEL: an economic model of a Latin congress (revenue, costs, break-even) with a Red Bull module, as a spreadsheet Leonardo can edit and a script that reproduces it.

Read first: project/project_memory.md, project/business_case_model.md, outputs/analysis.md sections 5, 11 and 12, outputs/price_study.md, project/data_schema.md section 1. Do not read archive/.

GIT (overrides CLAUDE.md): work on the branch your session gives you (if none: `round-ab`); commit in Italian after each step; push that branch; never push to main, no pull request; never touch research/manual_input.ods.

RULES: public sources only; no login, no paywall, no unofficial APIs; blocked after 3 tries: write blocked and move on. Every value has year, source URL and access date; searched and not found = empty value with notes. One source per indicator for all cities (the same source makes cities comparable; a missing city stays empty, never filled from another source without saying so in notes). Log one line per step in research/logs/AB_round.md. Budget: about 200 page reads and searches.

AB1 - CITY RANKING

Step 1, the city list (no reads). The 15 project cities (data/places.csv, role deep) plus every city with 8 or more Latin events in research/census/merged_events.csv (all periods; Russia, Belarus, Turkey excluded; merge spellings such as Wien/Vienna, Milano/Milan, Praha/Prague, Koeln/Cologne). Write research/cities/city_list.csv: city, country_iso2, lat, lon (from data/places.csv, else Wikipedia), why_included.

Step 2, indicators. research/cities/city_indicators.csv, long format: city, country_iso2, indicator, value, year, source_url, access_date, notes. Compute from files on file where possible (no reads):
- I1 latin_events_3y: Latin events naming the city in the census, Nov 2024 - Oct 2027.
- I2 large_latin_150km: Latin events with 1,000+ dancers (research/sizes/large_events.csv, in_comparison yes) within 150 km (haversine; add event-city coordinates as needed).
- I3 hyrox_races_3y: Hyrox races in the city, census.
- I4 latin_price_median: median full pass of the events of AA in the same country (country value; n in notes; empty if n < 5).
Collect with reads:
- I5 rb_dance_events_2024_2026: Red Bull dance events in the city or metro (redbull.com event pages; the 15 cities are on file in data/events.csv: reuse).
- I6 rb_office_metro: 1 if a Red Bull national or regional office is in the metro (data/organisations.csv O00109-O00117 for 9 countries; extend with the Red Bull company pages for the other countries).
- I7 population: city proper, Eurostat urb_cpop1 latest year (data/facts.csv POP rows for the 15 cities: reuse if from Eurostat).
- I8 airport_passengers: passengers of the airports serving the city, latest full year (Eurostat avia_paoa, or the airport operator's annual figure; notes: which airports).
- I9 hotel_price: average hotel room price per night from ONE public source that covers all cities (e.g. a published city hotel price index); empty if no single source covers them.
- I10 latin_scene_listings: number of Latin schools, clubs and socials listed for the city on ONE city-guide source that covers most cities (e.g. salsavida.com city guides, or latindancecalendar.com city pages); notes: what was counted.
- I11 latin_competition_next12: Latin events in the same country in the next 12 months (census; country value), as a measure of crowding for a new congress.

Step 3, scripts/city_ranking.py (standard library; numpy allowed) writes outputs/city_ranking.md:
- Each indicator turned into a percentile rank between 0 and 1 across the cities (missing = median, flagged in the table). I9 and I11 count negatively in the organiser view.
- Two views, each the mean of blocks, each block the mean of its indicators:
  Red Bull entry: scene (I1, I2, I10), Red Bull base (I3, I5, I6), access (I7, I8).
  New congress (organiser): demand (I10, I7, I8, I4), room in the market (I11 negative, I2 negative: no large congress nearby), cost (I9 negative).
- Robustness: 2,000 random weight sets (Dirichlet with all parameters 1 over the blocks, seed 20261021): for each city the median rank and the share of draws in which it is in the top 3 and top 5; plus leave-one-indicator-out ranks.
- Output tables: the full indicator table with sources (short), both rankings with median rank, P(top 3), P(top 5), and the cities whose rank moves most.

AB2 - CONGRESS MODEL

Step 1, public benchmarks (cap 40 reads). research/economics/benchmarks.csv: item, country_iso2, value, unit, year, source_url, access_date, notes. Collect:
- VAT rate on event tickets (dance events, concerts or sports events) for ES, FR, DE, IT, NL, AT, PL, PT, UK, BE, CH (official tax pages).
- Ticket platform fees: goandance, Eventbrite, one other event platform used by congresses (their published pricing pages); card payment fees (Stripe or similar published EU pricing).
- Hotel congress packages: from latin_events_detail.csv (AA), median per night per person where the basis is clear.
- Venue: any published price list for a ballroom or event hall day rate in 3-5 of the cities of AB1 (hotel or convention centre pages that publish prices); sound and light rental: 2-3 published price lists. If none is public, write not_found.
- Artist costs: fees are almost never public; write only what is published by the artist or organiser (e.g. a stated fee range on an artist's booking page); never estimate. Flights: one public average fare statistic for European short-haul flights (e.g. an airline's or Eurostat's average), with year.
- Red Bull: revenue per can (Red Bull 2025, EUR 12.2bn / 13.97bn cans, already in outputs/analysis.md section 12; confirm the press source).

Step 2, the spreadsheet outputs/congress_model.xlsx (openpyxl; formulas, not pasted values; it must open in LibreOffice):
- Sheet Inputs: every input in one column with its unit, value, and a column "basis" = source (benchmarks.csv or price_study.md) / assumption / to fill from organiser talks. Assumptions in yellow cells. Defaults: dancers 300 / 800 / 2,000 (three scenarios); share of full passes vs party passes; full pass and party pass from price_study.md (median, by country if chosen); hotel package commission (assumption, to fill); artists (couples, solo, DJs) and their fee, flights and hotel nights per artist (to fill; placeholder values clearly marked); venue (rooms x days); sound and light; staff and volunteers; marketing (% of revenue); platform and payment fees (from benchmarks); VAT (from benchmarks, by country); insurance and contingency (% of costs).
- Sheet Model: revenue, costs, result for the three scenarios.
- Sheet Breakeven: dancers needed to break even for each scenario's cost base, and the break-even full pass price at 300, 800 and 2,000 dancers.
- Sheet RedBull: dancer-nights (dancers x party nights), cans at 0.3 / 0.5 / 1.0 cans per dancer-night, revenue for Red Bull at the revenue per can, and the cost per dancer-night of a stated sponsorship fee (input, to fill).
- Sheet Sources: the benchmarks with links.
Step 3, scripts/congress_model.py: the same model in Python, reading the same inputs from research/economics/model_inputs.csv (item, value, unit, basis), printing the results of the three scenarios; its numbers must match the spreadsheet (check and say so in the log).
Step 4, outputs/congress_model.md (max 1 page): what the model computes, the inputs that are evidence vs assumption, the results of the three scenarios, and the five inputs that move the result most (change each by plus and minus 20 percent, one at a time).

CLOSE
1. Scripts run without errors; `python scripts/validate_data.py` 0 errors.
2. research/logs/AB_round.md ends with a summary (max 20 lines): cities and indicators filled (count per indicator), sources blocked, benchmarks found vs not found, reads used.
3. Delete temporary files, commit, push the branch, tell Leonardo the branch name.

DONE WHEN: city_list.csv, city_indicators.csv, city_ranking.py, city_ranking.md; benchmarks.csv, congress_model.xlsx, model_inputs.csv, congress_model.py, congress_model.md; branch pushed.

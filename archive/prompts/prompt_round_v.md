You are the analyst of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Round V closes the project: three small research tasks, then the full analysis of hypotheses H1-H4, then the write-up. Read first, in this order: project/project_memory.md (all of it), research/data_summary.md, project/data_schema.md. Use data/*.csv as the only evidence base. Do not read research/results/, archive/ or older prompts. Claude reviews the round afterwards.

GIT AND FILES
- Leonardo commits and pushes; you do not. No branches.
- Research rows go into data/*.csv (schema rules). Analysis texts go into a new folder `outputs/` (create it): exactly two files, `outputs/analysis.md` and `outputs/one_page.md`. Any calculation script goes into `research/scripts/`. No other new files; delete temporary files at the end.
- Keep a running log in research/logs/V_round.md (one line per item done or skipped) so the work can resume after an interruption.

RULES
1. Never invent a number, a name or a URL. Every number in the analysis cites the fact, event or athlete id it comes from (e.g. F001580, E000072, A00071) or is marked **computed** with the formula written next to it.
2. Say whether a number counts dancers, spectators or followers. Never add or compare numbers of different kinds without saying so.
3. Country-level values used for a city must be marked "(country)".
4. Confidence matters: a conclusion resting on confidence L values or on a single source must say so.
5. Public sources only; organisations and public professional figures only. For new research: 8 searches per item, then `not_found` with the searches; a blocked page goes to research/manual_collection_list.md; rendered browser where needed.
6. English in files. No scores hidden in a single number: every ranking shows the criteria behind it.

PART 1 - THREE SMALL RESEARCH TASKS (do them first, max about 2 hours in total)

V1 Who sponsors Latin congresses today (for H2: is there a competitor or a gap?)
For the 15 largest Latin congresses and festivals on file (events.csv, CAR-SAL and CAR-BCH, level congress_festival, plus the event accounts of round U), open the official sponsor / partner / "collaborators" page, the footer logos or the latest official poster. Record every named brand as organisations.csv (org_type brand_sponsor) plus relations.csv `sponsors` (event -> brand), with the source. In the brand's notes give its category: energy drink, soft drink, beer, spirits/rum, water, dance shoes/apparel, hotel/travel, media, other. Set `red_bull_involvement` on each event. If no sponsor is shown, note it in the event row. Then one fact per event checked: place = event's country, signal ORG, unit "drinks brands named as sponsors (congress)", value = count, notes = brand names.

V2 Where Red Bull operates (for H4: logistics)
For each of the 9 countries (AT, DE, IT, ES, FR, NL, UK, PL, CH): the city of Red Bull's national company or main office (company page, imprint/"Impressum", jobs.redbull.com locations, official press pages). organisations.csv row (org_type other, name "Red Bull <country> office", place_id = that city if in places.csv, else add the place with role `scan`), with the source. Also note in the log any Red Bull venue or hub in the 15 cities that is public (e.g. a Red Bull Media House site, a Red Bull studio).

V3 Red Bull's target audience in its own words (for H2: fit check)
Public statements by Red Bull on the audience of its events and activations (age group, "participation", "experiential", youth, students, fitness). Official pages, annual or press statements, interviews with Red Bull managers in reliable press. One fact per statement: place GLOBAL, disc ALL, signal MED, unit "Red Bull audience statement", value empty or the age range, quote in notes (max 30 words), source. Maximum 5 statements; `not_found` if none.

Then: `python viewer/validate_data.py` (0 errors) and `python research/build_data_summary.py`.

PART 2 - ANALYSIS (outputs/analysis.md)
Write it for a reader at Red Bull who has 15 minutes. Tables first, short text after each table. Sections:

1. **The question and the answer in 5 lines.**

2. **H1 - Two markets.** One table, breaking vs Latin, rows: participation (national championships competitors; Vienna/Milan pilot schools and weekly slots, flagged as minimums, confidence L), events (largest stated sizes, type: participants vs spectators; full pass prices), audience (channels, event accounts, top videos), reach of dancers (top 30 each: total, median, top 3), hashtags. Verdict: supported / partly / not supported, and why. Name the evidence that is weakest.

3. **H3 - Where Latin attention lives.** Compare dancers' reach vs event/competition accounts for each world (ratio of the median dancer to the median event account, **computed**). What this means for a brand: in Latin the audience follows people and congresses as social gatherings, in breaking it follows event brands. Note the limits (Instagram only, rounded counts, bachata-heavy Latin list, one music video at the top).

4. **H2 - How Red Bull could enter Latin.** Evidence: Red Bull's participation activations (round U precedents), sponsors found at congresses (V1: are drinks brands already there? which?), congress profile (nights of parties, ages, international participants), Red Bull's own audience statements (V3). Then 2-3 concrete entry formats, each with: what it is, why it fits the evidence, what it would need, the main risk. Examples to evaluate, not to assume: product presence at the largest congresses (sampling, night bar, energy partner of the socials); a Red Bull night or showcase inside an existing congress built around the most followed couples; a Latin zone inside an existing Red Bull dance event (as the Dance Your Style zone at Open'er). State clearly that dancers are not proposed as sponsored influencers (Leonardo's view: they dance; the reach of their profiles is a measure of attention, not a channel to buy).

5. **H4 - Where it would take root.** A table of the 15 cities with these columns, all from data/: Red Bull dance events 2024-2026 in the city (ids); Red Bull national office in the city (V2); Latin congress or festival in the city or metro on file (ids, stated size); Latin events listed in the country, next 12 months (goandance, salsa + bachata, **(country)**); national Latin championship competitors **(country)**; most-followed Latin dancers based in the country (count from athletes.csv, **(country)**); population (city proper). Then: the number of criteria met per city, written as "x of 6" with the list, and the top 3-5 cities with two lines of reasoning each (logistics: an existing Red Bull dance event or office to attach to; Latin strength). Then a sensitivity check: does the top list change if the country-level columns are removed? Salzburg gets one paragraph of its own (Red Bull's home region, Leonardo's scene; use his data only if research/manual_input.xlsx has been filled, otherwise say it is pending).

6. **For Leonardo's own project: congress economics.** From events.csv and facts: stated sizes and full pass prices; **computed** pass revenue ranges (participants x lowest and highest full pass on file, formula shown); where the Latin calendar is crowded (Spain, Germany, Italy) and where it is thin (Austria, Switzerland, UK) by the next-12-months counts; what is NOT known (costs, artist fees, venue): list it as questions, do not estimate.

7. **What we could not measure and why** (max 10 lines): city-level participation, platform limits, logins, missing sponsor packs.

8. **Evidence index**: every id cited, grouped by section.

PART 3 - ONE PAGE (outputs/one_page.md)
Maximum one A4 page: title, the problem (3 lines), the two-markets finding with 4-5 numbers, how Red Bull could enter (the best format), where (top 3 cities), what Leonardo proposes as a next step (a pilot: one congress activation, measured), and a line on method and sources. Plain language, no jargon, every number with its id in a footnote line at the bottom.

DONE WHEN
V1: 15 congresses checked. V2: 9 countries. V3: up to 5 statements or `not_found`. Validator 0 errors, summary regenerated. outputs/analysis.md with the 8 sections; outputs/one_page.md within one page. research/progress.md rewritten for round V (max 20 lines). Temporary files deleted. Tell Leonardo it is ready to commit.

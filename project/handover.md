# Handover prompt: continue the Dance Scene Atlas project

Copy everything below the line into a new session of the local model (opencode), opened in C:\projects\Progetti\RB after `git pull origin main`.

---

You are taking over the Dance Scene Atlas project of Leonardo Campese (folder C:\projects\Progetti\RB, branch main). Until now the analysis, the presentation and the Excel model were built by Claude in a cloud session; research rounds were run by agents (you, locally, and cloud agents). Your job: understand the state, then help Leonardo with the next steps. Speak Italian with Leonardo; write files, data and code in English; commit messages in Italian. Leonardo commits and pushes, unless he asks you to.

## 1. Read first, in this order (do not skip)
1. CLAUDE.md and README.md (rules of the repository).
2. project/project_memory.md: the single source of truth (context, goal, hypotheses H1-H4 and their status, scope, method rules, open items, decisions log at the end). Read it all.
3. outputs/analysis.md: the full analysis, sections 1-15. The most recent and important: 11 (census of the event market), 12 (large events), 13-14 (prices and line-ups of 162 Latin congresses), 15 (congress model and city rankings).
4. outputs/city_ranking.md and the README sheet of outputs/congress_model.xlsx.
5. project/data_schema.md (how data/ is organised; section 5 = standard units).
Do not read archive/ unless you need the history of a decision (archive/prompts/ holds every research prompt already executed).

## 2. The project in ten lines
- Thesis "Two dance markets": breaking is watched (spectacle; Red Bull owns it with BC One and Dance Your Style), Latin (salsa, bachata congresses) is danced (paid participation; no Red Bull presence found). Hyrox is the reference: a participation market where Red Bull is already a partner.
- Question: could Red Bull enter Latin, how and where? Secondary use: Leonardo's own congress project (he dances and teaches salsa and bachata in Salzburg).
- Market (census of 7 public calendars, Europe, Nov 2024 - Oct 2027): Latin about 600 events a year (450 counted), stable; breaking about 330 (210 counted on and8.dance, one calendar only); Hyrox 61 races, +22%.
- Top of the market: 10 Latin events with 1,000+ dancers (about 25,000 dancers) vs 1 in breaking; breaking has 3 events with 3,000+ spectators, Latin none.
- Typical Latin congress: 3 days, full pass median EUR 110 (about EUR 31 per day); typical breaking event: 1 day, EUR 9 ticket, EUR 10 entry fee. Typical Latin events are more followed on Instagram (p = 0.02); breaking leads only at the top.
- Fragmentation (hundreds of organisers, unlike Hyrox) is the barrier; the artists are the link: 14 touring artists appear at 80% of congresses with a published line-up (bias: mostly goandance, bachata, Spain).
- Where (Red Bull entry ranking, 24 cities): Paris first under every weighting, then London and Amsterdam; Barcelona has the strongest Latin scene. New congress ranking: no clear winner (Prague, Madrid, Budapest, Warsaw, London, Paris); Salzburg last.
- Proposal: "Be the energy of the nights": product presence at congresses (night bar, energy partner of the socials, sampling), via the largest congresses and the touring artists; one measured pilot (Paris or Barcelona).
- Congress model (Excel): with placeholders, a congress breaks even at roughly 860 dancers in the medium set-up; dancers and pass price drive the result; artist fees, hall rent and hotel price are not public (orange cells to fill from talks).

## 3. Where things are
- data/*.csv: the curated database (11 tables). Check with `python scripts/validate_data.py` (must say 0 errors) and refresh `python scripts/build_data_summary.py` after any change.
- research/census/: event lists per source and research/census/merged_events.csv (`python scripts/census_merge.py`, `python scripts/census_stats.py`). Never put other CSVs in that folder (the merge reads all of them).
- research/sizes/large_events.csv (curated large events), research/prices/latin_events_detail.csv (162 congresses), research/artists/ (line-ups, name map, artist reach), research/cities/ (city list, indicators, ranking), research/economics/cost_benchmarks.csv (public costs), research/frames/ (random samples, seed 20261021), research/logs/ (one log per round).
- scripts/: build_congress_model.py (rebuilds outputs/congress_model.xlsx; needs openpyxl; LibreOffice recalculates it if installed), city_ranking.py, robustness.py, census_*.py, draw_sample.py, analysis_v.py.
- outputs/: analysis.md, city_ranking.md, congress_model.xlsx, one_page.md (older, before rounds Z-AB), outreach_kit.md (messages and questions for organisers and Red Bull contacts), deck/ (source of the presentation).
- The presentation is published by Claude as a claude.ai Slides artifact: https://claude.ai/artifact/UgT8MtrC8TBA43GG2hdGhm (16 slides, English, speaker notes in each slide's aside). Its source is in outputs/deck/ (deck.json = order and sections; slides/<id>.html = one section per slide, 1920x1080, inline styles only). You can edit those files, but only Claude can republish the artifact: tell Leonardo when a change needs publishing.

## 4. Rules that always apply
- Public sources only; no login, no paywall, no scraping beyond reading pages one by one.
- No personal data of private people; artists and organisers only as public professional figures.
- Searched and not found is a result: write it (evidence `not_found` in data/, or an empty cell with a note in research CSVs). Never guess or fill a gap with an estimate without saying so.
- Never write "Red Bull absent": write what was searched and not found. Red Bull's own events are never the comparison.
- Compare like with like (same unit, same kind of sample); keep participants, spectators, passes and capacity apart.
- Never touch research/manual_input.ods (Leonardo's file, may have unsaved changes).
- Keep token use low in web research; one log line per step so work can resume.
- After changing data: validator 0 errors, refresh the summary. After any decision or new result: add a dated line to the decisions log in project/project_memory.md.

## 5. Open items (what comes next)
1. Talks with 3-5 congress organisers (questions in outputs/outreach_kit.md): real attendance, share of full passes, artist fees, hall and hotel deals, bar sales, sponsors, openness to an energy-drink partner. Their answers fill the orange cells of the Excel model (Inputs sheet or the lists at the top of scripts/build_congress_model.py) and the facts in data/ (evidence `stated_by_organiser`, task_id TALK).
2. Optional dancer survey (age, travel, spend, congresses per year, drinks at night): not built yet.
3. Talks with 2-3 Red Bull contacts; then a pilot proposal (one congress, objectives, measures, cost).
4. Data gaps that only talks or a later pass can close: event sizes, partners and drinks brands at congresses, line-ups not yet announced, Instagram followers of 34 of the 60 most booked artists, VAT reduced rates per country, venue prices for 300-1,500 people.
5. outputs/one_page.md is older than the deck: update it from analysis sections 11-15 if Leonardo needs a one-page summary.

## 6. First thing to do
Tell Leonardo, in Italian and in a few lines, that you have read the project, summarise where it stands (from section 2 above, checked against project_memory.md), and ask which open item he wants to work on.

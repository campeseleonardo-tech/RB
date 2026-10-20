# What Leonardo does by hand

Updated 2026-10-20. In order of priority. Each item says: what, how, where to save, and the time it takes. When an item is done, tell Claude in the chat: Claude checks it, converts it into data/ and ticks it here.

General rules for everything below:
- Write only organisations, events and numbers. No names of private people (dancers, teachers as persons): use the school or event name.
- For every number you take from a web page, keep the link and the date you read it.
- Never edit data/*.csv by hand: Claude converts your notes.

---

## 1. Save the model's work on GitHub (each time a round or a task ends, 2 minutes)
The research model on opencode refuses to commit on `main`. You do it:

```
cd C:\projects\Progetti\RB
git status
git add -A
git commit -m "Round T: <what was done, e.g. T1-T3>"
git push origin main
```

`git status` first: it lists the changed files; if you see something strange (thousands of files, files outside data/, research/, project/, viewer/), stop and ask Claude.
Do this before every `git pull`, otherwise the pull can stop on the uncommitted changes.

## 2. Salzburg ground truth (high priority, 2-3 hours)
- **What:** schools and weekly classes, socials, events, competitions, your estimates, for salsa, bachata and (as far as you know) breaking in Salzburg.
- **How:** from what you know as a teacher and dancer; check websites only where you are unsure. Estimates are fine: write "est.".
- **Where:** fill the tables in `research/manual_inputs.md` directly, then commit as in item 1.
- **Why:** it tells us how much the online search misses, so we know whether the Vienna/Milan school counts of the model can be trusted.

## 3. National championship results (high priority, 30-60 minutes)
The model could not download the results pages, so it could not count the competitors (round T, task T2). Only the most important ones:

| # | Championship | Where to find the results |
|---|---|---|
| a | Italy, Campionati Italiani Assoluti 2026, Danze Caraibiche (FIDS, Feb 2026) | federdanza.it > gare/risultati, or the TopTurnier results pages (one page per category) |
| b | Germany, DAT Deutsche Meisterschaft Latino-Taenze 2026 (12 Sep 2026) | DAT / BDT site, results per category |
| c | Italy, Campionati Italiani Assoluti 2026, Breaking (FIDS, Jan 2026) | federdanza.it results, often a PDF |
| d | Any other national championship whose link the model wrote in research/logs/T_round.md as "results not downloadable" | the link in the log |

- **How:** open each results page in the browser. Web page: Ctrl+S, type "Web page, HTML only". PDF: download it. Save every category page; do not rename the content, only the file.
- **Where:** `research/scripts/input/<country>_<style>/`, for example `research/scripts/input/IT_caribbean/` and `research/scripts/input/DE_latino/`. File names: `01.html`, `02.html` ... or the PDF name as it is.
- **Then:** commit (item 1) and tell Claude or the model: "count the competitors in research/scripts/input". The script `research/scripts/count_competitors.py` does the counting.

## 4. YouTube views (only if the model's task T5 fails, 30 minutes)
- **What:** for each competition, the video of the latest final and the most viewed final video: views, upload date, link.
- **Competitions:** Red Bull BC One World Final; Red Bull Dance Your Style World Final; World Latin Dance Cup; World Salsa Summit / The Summit Championships; Euroson Latino; WDSF World Caribbean Dance Championships.
- **Where:** the YouTube table at the end of `research/manual_inputs.md`.

## 5. Two sponsor checks in your area (low priority, 15 minutes)
- **Flavourama (Salzburg breaking):** is Red Bull a sponsor or partner? Look at the event page, posters or the official social account of the event. If you know it from the scene, write how you know it.
- **BCN Dance Life (bachata congress):** sponsor/partner list on bcndancelife.com.
- **Where:** the "Sponsor checks" table at the end of `research/manual_inputs.md`.

## Not for you (the model or Claude does them)
Everything else in `research/manual_collection_list.md` is either out of scope now (Red Bull athlete directory, STSV, benchmark cities, coordinates) or for the model.

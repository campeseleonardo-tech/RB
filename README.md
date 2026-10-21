# Dance Scene Atlas (Red Bull open application)

Can Red Bull enter the Latin dance market (salsa, bachata), how, and where? A thesis with evidence: breaking is a spectacle market, Latin a participation market. Goal, hypotheses, results and open items: **project/project_memory.md**. The result in one page: **outputs/one_page.md**.

Language of files and data: English. Chat with Leonardo: Italian. Commit messages: Italian.

## Folders
| Path | What it is |
|---|---|
| project/project_memory.md | The single source of truth: goal, hypotheses H1-H4 and their status, scope, method rules, open items, next steps, decisions |
| project/data_schema.md | The data contract: tables, columns, allowed values, quality checks, standard units (section 5) |
| data/*.csv | The evidence of the current project (11 tables). Edit only through a documented round; every change is logged in data/review_log.csv |
| outputs/analysis.md | The full analysis of H1-H4, every number with its id in data/ |
| outputs/one_page.md | The one-page summary for Red Bull |
| research/data_summary.md | The evidence ordered by research question, with coverage per indicator (generated; do not edit) |
| research/manual_input.ods | The only file Leonardo fills by hand (Salzburg ground truth; later the answers of the validation talks) |
| research/logs/ | Logs of the collection rounds T, U, V, W |
| scripts/ | validate_data.py (checks data/), build_data_summary.py (writes research/data_summary.md), analysis_v.py (numbers of the analysis), count_competitors.py (+ input/ for saved results pages) |
| archive/ | Everything superseded, kept as history: see archive/README.md |
| CLAUDE.md | Working rules for Claude (push to main, pull commands for Leonardo) |

## Commands (in C:\projects\Progetti\RB)
- Check the data: `python scripts/validate_data.py`
- Refresh the summary: `python scripts/build_data_summary.py`
- Get the latest version: `git pull origin main`
- Save work: `git add -A`, `git commit -m "..."`, `git pull --no-rebase --no-edit origin main`, `git push origin main`

## Rules
1. One copy of every file; update in place. Superseded material goes to archive/, not deleted.
2. Every number has a source and a date; `not_found` rows document the searches.
3. Public sources only; organisations and public professional figures only.
4. Compare like with like (dancers, spectators, followers, listings); Red Bull's own events are never the comparator for Latin.

# Manual collection list (for Leonardo)

Things a research model cannot reliably do (login walls, platform rules, charts that do not render, paid documents). Each item says where to look and what to write down. Do them in any order; the research model adds items here when a page is `blocked`. Record results in the sheet/table you prefer (a text note is fine); Claude converts them to `data/*.csv` rows. Always note the **date** and the **URL** of the page you read. Public pages only; no logins into other people's accounts.

Time estimates are rough. Priority: **A** = blocks the first comparison, **B** = strengthens it, **C** = later.

| # | Priority | What | Where | What to write down | Time | Task |
|---|---|---|---|---|---|---|
| 1 | A | **Google Trends**, interest by city for the keyword list in workbook sheet `Keywords` (or D4 file) | trends.google.com, public UI, region filter by country/city, period "past 5 years", same period for all | Relative index (0-100) per keyword and place, period, a screenshot is enough | 2-3 h | P4.8 |
| 2 | A | **Red Bull dance athletes** if the model cannot render the directory | redbull.com athlete directory (filter dance/breaking), each country site | Public name, discipline, country/base city, URL | 1 h | P5.4 |
| 3 | A | **Red Bull YouTube dance channels/series**: subscribers and views as displayed | YouTube pages: Red Bull BBoy / BC One, Red Bull Dance, Dance Your Style playlists | Channel/playlist name, URL, subscribers, total videos, views of the 10 latest videos, date | 1 h | P5.5 |
| 4 | A | **Number of dance schools per city** by hand-count of results | Google Maps search "breakdance class", "hip hop dance school", "salsa school", "bachata class" in each *deep* city | Count of distinct schools in the first 3 result pages, date, search words | 2 h | P4.2, P4.4 |
| 5 | A | **Red Bull company accounts**: what each register costs | Austrian Firmenbuch (Red Bull GmbH, Red Bull Media House GmbH), Bundesanzeiger / Unternehmensregister (Germany), Companies House (UK, free), other national registers | Entity name, register number, whether a balance sheet extract exists, price | 1 h | P5.8 |
| 6 | B | **Ticket prices** for the big events (BC One finals, Dance Your Style, Juste Debout, congresses) | organiser sites, Eventim, Eventbrite, goandance | Event, edition, ticket types and prices, date | 1-2 h | P6.4 |
| 7 | B | **Facebook/Meetup/Instagram public counts**: followers/members for the main local organisations | public pages only | Org name, platform, URL, count, date | 2 h | P4.2, P4.4 |
| 8 | B | **Event attendance figures** claimed on organiser pages that require scrolling or are in images/PDF | organisers' press kits, social posts | Event, edition, figure, where it is stated | 1 h | P4.6 |
| 9 | B | **Federation membership numbers** requested from public annual reports | national dance sport / breaking federation reports | Federation, year, members/licences, URL | 1-2 h | P4.9 |
| 10 | B | **Eurostat/ national statistics tables** if the model cannot download them | ec.europa.eu/eurostat (urb_cpop1, urb_ceduc, urb_ctour); national statistics offices | Place, measure, year, value, definition | 1-2 h | P4.1 |
| 11 | B | **Sponsor pages of events** that are images/PDF | organiser sites | Sponsor names per edition | 1 h | P5.1 |
| 12 | B | **Studio rental prices** for cities missing in E6 (Barcelona, Warsaw, London, Rome...) | studio sites, Peerspace-like platforms | Studio, price per hour, size, date | 1 h | P4.10 |
| 13 | C | **Viewing-to-participation studies** | Google Scholar: "sport spectatorship participation" "dance television" | Title, year, finding, URL | 1 h | H2 |
| 14 | C | **Local-expert check** of teaching regulation in the deep cities | a trade office page or a teacher you know | Rule, source, date | per city | P6.2 |
| 15 | C | **Insiders** (see below): people inside Red Bull who can confirm or correct our findings | your contacts | Answers to the questions in I4_validation_questions.md | later | after Phase 5 |

## What "insider" means
An insider is a person who works inside Red Bull (or close to it) and can say from experience whether our findings are right, e.g. "Red Bull has no Latin dance programme" or "this event is not ours". We use them only to **validate** what we found in public sources, never as the source of the data. The 10 questions are in `research/results/I4_validation_questions.md`. Not now: after the public data is collected and the main findings are written.

### Aggiornato 2026-10-20 (passo di correzione dei dati)
- Red Bull BC One directory atleti (JS-rendering): collegamento attivo (rendering parziale: solo 5-6 schede di prova), richiede rimozione checkout cookie; schede visibili: https://www.redbull.com/gb-en/athletes.
- Metriche canale YouTube Red Bull BC One: pagina canale https://www.youtube.com/@redbullbcone/about (consent login checkout); numeri aggregati di terzi annotati in notasce delle righe fact F000351-F000353.
- Sponsor/partner 2026 ufficiali DYS per ogni stop nazionale: pagine serie (https://www.redbull.com/int-en/event-series/red-bull-dance-your-style, print era 404) hanno l'elenco a blocchi di 17 fermate ufficiali ufficiali verificato 2026-10-20.

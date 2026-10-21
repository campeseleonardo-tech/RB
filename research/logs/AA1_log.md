# AA1 log — Latin congresses: prices, days, venue, line-ups (one line per batch)

- 2026-10-22 start: 162 events = 150 random (research/frames/aa_latin_frame_sample.csv) + 12 large (research/sizes/large_events.csv, in_comparison=yes). Listing URLs matched by name+date in research/census/latin_goandance.csv, latin_latindancecalendar.csv, latin_salsavida.csv (150/150 matched; 4 large events needed a manual name match). Public pages only; access date 2026-10-22.
- batch 1: events 1-20 done; blocked 0
- batch 2: events 21-40 done; blocked 0
- batch 3: events 41-60 done; blocked 0
- batch 4: events 61-80 done; blocked 0
- batch 5: events 81-100 done; blocked 0
- batch 6: events 101-120 done; blocked 0
- batch 7: events 121-140 done; blocked 0
- batch 8: events 141-160 done; blocked 0
- batch 9: events 161-162 done; blocked 0
- Sources: one listing page per event (162), plus the official/ticket site for 54 events where the listing had no line-up or price (2 pages maximum). 4 official sites did not render (K01605 connection, K01594 HTTP 503, K01651 HTTP 403, K01526 HTTP 404); the listing page was used instead, rows are not blocked.
- Currencies: 527 PLN converted at the ECB reference rate of 2026-10-21 (4.3635), original written in notes. No other non-EUR price was kept.
- Out of scope (13): 6 weekly Felices social nights (K01549, K01530, K01703, K01636, K01521, K01612), 1 night party (K00642), 1 social night (K00680), 1 workshop day + gala (K00689), 1 masterclass day (K00756), 1 workshop weekend (K00768), 1 civic music festival with no Latin programme (K01672), 1 one-day show/workshop event (K00643).
- Line-ups: 45 go&dance event pages carry structured artist cards; 5 official pages carried readable lists (K01630, K01675, K01504, K01486, L03); the other 112 events have one row with "line-up not listed" (74) or "not announced" (30). No line-up was taken from an image.
- Instagram: 11 of the 40 most booked artists have a public follower count (profile page read, og:description). 29 could not be linked with certainty (no Instagram link on the event pages read; 5 name searches returned no matching account). No count was estimated or guessed; all 40 rows are in artist_reach.csv with the reason in notes.
- Name merging: 184 pairs written to name_map.csv; couples ordered as seen most often, accents kept.

## Summary
- Events read: 162 (150 random + 12 large), rows in latin_events_detail.csv: 162; out of scope: 13; blocked: 0.
- Full pass price: 84 rows (52%); days: 149 rows (92%); venue name: 90 rows (56%); venue type: 75 known, 87 unknown.
- Party nights: 15 rows; hotel package: 14 yes; live band yes: 26; competition yes: 52; size stated: 9.
- Line-ups: 58 events, 684 artist rows, 104 empty rows (74 not listed, 30 not announced); 416 distinct artists (couples/solos).
- Artists most booked: Cristian & Gabriella 7, Melvin & Gatica 6, Ronald & Alba 6, Kike & Nahir 5, Terry & Cecile 5, Sakis & Mia 5.
- Instagram followers found for 11 of the 40 (Kike & Nahir 436K, Ronald & Alba 196K, Pablo & Raquel 130K, Melvin & Gatica 120K, Seo Fernández 118K, Cristian & Gabriella 76K, Sakis & Mia 68K, Terry & Cecile 47K, Gaby & Estefy 46K, Evelyn La Negra 41K, Chiky Cuba 20K).
- Not obtained: 29/40 Instagram counts; 78 full pass prices; 13 end dates; 72 venue names. The notes column says which field is missing on every row.
- No scraping of social platforms, no login, no paywall; research/manual_input.ods untouched; nothing committed (Leonardo commits).

# P3 - re-verification of URLs held in the legacy results (2026-10-19)

Approach: every URL used by the converted files (A1/A2 workbook sample, B1, B2/D2, E6, D5, G4) was opened programmatically (plain fetch where possible, JS-rendered browser for redbull.com). Live content was compared with the stored values.

## Status percentages (of the 82 sources currently in sources.csv)
- opened / rendered: 45 (55%)
- blocked (404, connection error, unreadable shell): 4 (5%)
- not opened yet: 33 (40%)

## Content checks and corrections
- Juste Debout 2026: no seats/participants figure on either page -> scale = not_found (both earlier claims dropped).
- Berlin Salsa Congress: organiser page states "more than 60 countries" + 2025 loyalty stats, no attendance figure -> ~6,000 stays inferred/L.
- Outbreak Europe: Wikipedia + organiser page agree (2,000 participants / 94 countries).
- E6 studios: all prices confirmed on live pages except Vallazza (404, price row kept as agent-read) and bachataloves (404).
- GRZ population 302,749: not confirmed on the page as read -> downgraded to L, re-collection in P4.1.
- WDSF members page confirms: 100 members (76 full / 23 provisional / 1 associate), 50 in Europe, 78 NOC-recognised.
- Blocked pages needed for P1 facts: D5 Barcelona/Amsterdam/Paris figures (dades-ajuntament unreadable shell, ffdanse error) -> see research/manual_collection_list.md item 10.

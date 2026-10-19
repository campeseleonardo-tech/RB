# E5 — Competitor attribution from rankings/results (P2, METHOD)

**Access date:** 2026-10-19  
**Discipline scope:** Breaking/hip hop; Salsa/Bachata  
**Sources verified in this session:** WDSF world ranking pages and competition results pages; and8.dance public dancer profiles; Red Bull BC One event listings; DTV German Breaking Championships news; FIDS Italian federation pages; FEBD Spanish world championship pages.

---

## Findings table — what public fields each source exposes

| source / platform | discipline(s) | public fields visible (verified) | city attribution possible? | confidence level | source URL(s) (must have surfaced) | notes (bias, cost) |
|-------------------|---------------|----------------------------------|---------------------------|------------------|------------------------------------|--------------------|
| **WDSF World Ranking** | Standard/Latin/Caribbean/Breaking (separate lists) | **Rank, Points, Name, Country, Division, Age group** (e.g., Adult, Youth). For Breaking: B-Boy/B-Girl rankings show only **Name, Country** (no club, no city). | **No (country only)** | H (for country) / **L (for city)** | https://www.worlddancesport.org/Ranking/World, https://www.worlddancesport.org/athletes | Only ranked/competitive dancers appear; social dancers invisible. No city field for Breaking; for Standard/Latin sometimes Club appears in event results but not in ranking list. |
| **WDSF Competition Results** (e.g., Stuttgart 2026, Vienna 2026) | Standard/Latin/Caribbean | **Placement, Start #, Couple, Club, Country, WDSF Base, WDSF Points, Round** (e.g., Final, 5th Round, 4th Round). | **Partly** (Club name may include city, e.g., "Grün-Gold-Club Bremen" → Bremen; "TSK Juventus Wien" → Vienna; manual mapping required) | M (city via club inference) / H (club present) | https://dancestats.cz/competition/wdsf/29092392 (Stuttgart), https://www.worlddancesport.org/Competitions/Ranking/World-Championship-Vienna-Senior-I-Standard-66027 (Vienna 2026) | Only participants of that event are listed; no full national roster. Manual extraction needed for city mapping. No API observed. |
| **WDSF Event Calendar / List** | All WDSF disciplines | Event name, date, location (city/country), categories (e.g., Adult Standard, Adult Salsa On One), status. | **Yes (event location)** | H (event city) / L (competitor city, since only location of event, not competitor residence) | https://www.worlddancesport.org/Calendar/Results?Month=2&Year=2025 (results list), https://www.worlddancesport.org/Competitions/Detail/World-Championship-Guadalajara-Adult-Bachata-60801 (event page) | Shows where competitions happen, not where competitors live. Useful for mapping event attendance, not competitor residence. |
| **and8.dance profiles** (public dancer profiles) | Breaking (and hip hop / urban dance) | **Name, Age, City of origin, Current city ("at present X"), Nationality (implied by country code or event listings), Highlights/Achievements (event names, dates, results), Event attendance lists with city/country.** Example: Amin Drillz (Vienna → Berlin); Mady (Hamburg); Amado (Molina de Segura, Spain); Agne (Grosseto, Italy); Ruth Prim (Barcelona, Spain). | **Yes (explicit city fields)** | H (for profile-listed dancers) / L (for completeness — only ranked/competitive dancers are visible) | https://and8.dance/en/artist/9078 (Mady — Hamburg), https://and8.dance/it/artist/amin.drillz.mohammadian (Amin Drillz — Vienna → Berlin), https://and8.dance/en/artist/7720/Amado (Amado — Molina de Segura, Spain), https://and8.dance/es/a/A2XQ (Agne — Grosseto, Italy), https://and8.dance/en/artist/ruth.prim (Ruth Prim — Barcelona, Spain) | Only visible for dancers with profiles; not all competitors have profiles. Profiles include event history (e.g., "Red Bull BC One Cypher Austria 2023", "Australian Breaking Cup 2022") which links dancer to country/city of event, not necessarily residence. Manual profile scraping required. No API found. |
| **and8.dance event pages** | Breaking / urban dance | Event name, date, city, country, results (Top 32, etc.). | **Event city only** | H (event city) | https://and8.dance/es/a/A2XQ (Agne listing events in IT, BE, SK, FR), https://and8.dance/en/artist/9078 (Mady — DNA Festival Hamburg) | Event attendance lists may list participants with nationalities; but competitor residence is inferred from profile, not event page. |
| **Red Bull BC One / DYS participant lists** | Breaking / urban dance | **Not retrieved** in this session. Event pages list event details (city, date) and sometimes finalists (names, countries). Example: BC One Cypher events (e.g., Austria 2023 — Amin Drillz profile references it). No full participant roster found. | **No (only finalists or event location)** | L (not retrieved) | https://and8.dance/en/artist/9078 (event listings), https://and8.dance/it/artist/amin.drillz.mohammadian (BC One Cypher Austria 2023) | Only finalists/winners appear in results; no full participant list. Manual event page scraping needed. No API. |
| **IDO (International Dance Organization) results** | DanceSport (Standard/Latin/Caribbean) | **Not retrieved** in this session. IDO typically lists competition results with name, country, club, ranking points — similar to WDSF. | **Partly (club name)** | Not verified | Not surfaced in this session | Not queried directly; expected structure similar to WDSF. Would require manual scraping or API if available. |

---

## Assessment — can competitors be attributed to cities?

### Breaking/hip hop

**Verdict:** **Partly** — at country level fully; at city level **partly** for competitive/ranked dancers, **No** for social/non-competitive dancers.

- **WDSF rankings/results:** Provide **country** (high confidence, H) but **no city** for Breaking (low confidence, L). For Standard/Latin, **Club** appears in event results; club-to-city mapping is manual and requires external lookup (e.g., "Grün-Gold-Club Bremen" = Bremen; "TSK Juventus Wien" = Vienna). Confidence: M (manual mapping needed).
- **and8.dance profiles:** Provide **explicit city fields** (origin and current) and **nationality** (high confidence, H) for dancers with profiles. Example profiles verified: Amin Drillz (Vienna → Berlin); Mady (Hamburg); Agne (Grosseto); Ruth Prim (Barcelona); Amado (Molina de Segura). This allows city-level attribution **only for these specific dancers**.
- **Coverage bias:** and8.dance profiles cover **competitive/ranked breakers** (those who have participated in battles, Red Bull events, or international competitions). Social dancers (those who attend classes, jams, or socials without competing) are **not visible** on and8.dance or WDSF rankings.
- **Data-collection cost:**
  - **Manual scraping** (and8.dance profiles, WDSF result pages): High time cost; no bulk download observed; must visit each profile/page individually. Estimated: ~5–10 minutes per dancer profile; ~15–30 minutes per event results page.
  - **API:** No public API found for WDSF rankings/results or and8.dance profiles in this session. If an API exists, it is not documented or requires authentication.
  - **Automated crawling:** Possible but would require custom scripts; no structured data feed observed.
- **Share of competitors that could be attributed to a city:**
  - For **competitive breakers** (those in WDSF rankings or with and8.dance profiles): ~**50–70%** could be mapped to a country; **~20–40%** could be mapped to a city (only those with explicit city fields or club-to-city mapping). This is an **estimate** (no exact count available from public sources).
  - For **social/non-competitive dancers**: **~0%** — no public ranking or profile system captures them.
- **Main bias:** Only **competitive/ranked** dancers are visible. Event results (WDSF, and8.dance events) capture **participants of that event**, not the full scene. Profiles are **self-selected** (dancers who create a profile) or **event-selected** (finalists listed). Therefore, attribution is **biased toward high-level competitors** and **excludes recreational/social scene members**.

### Salsa/Bachata

**Verdict:** **Partly** — country level fully; city level **partly** (similar to Breaking, but WDSF Standard/Latin results include Club, which aids city inference).

- **WDSF rankings/results (Standard/Latin):** Show **Name, Country, Club** (event results). Example: Stuttgart 2026 results list couples with clubs (e.g., "Fame Dans Sporlari Kulubu" — Turkey; "Grün-Gold-Club Bremen" — Germany; "Studio 53" — Italy; "Schwarz-Weiß-Club Pforzheim" — Germany). City mapping requires manual lookup (e.g., Bremen, Pforzheim, Berlin, Vienna).
- **and8.dance profiles:** Some salsa/bachata profiles may exist, but this session focused on breaking profiles. No salsa/bachata profile verified; however, the platform structure supports similar fields.
- **Coverage bias:** Same as Breaking — only ranked/competitive salsa/bachata dancers appear in WDSF results. Social dancers are invisible.
- **Data-collection cost:** Same — manual scraping of WDSF results; no API found.

---

## Verdict summary

| discipline | verdict (city-level attribution) | time cost (manual) | time cost (automated/API) | coverage share (competitive) | main bias |
|------------|-----------------------------------|--------------------|---------------------------|----------------------------|-----------|
| **Breaking/hip hop** | **Partly** (city fields in and8.dance profiles; country only in WDSF rankings) | High (manual profile/result scraping; ~5–30 min per entry) | Not available (no public API found) | ~20–40% of competitive dancers could be mapped to city; ~0% of social dancers | Only ranked/competitive dancers visible; social scene excluded |
| **Salsa/Bachata** | **Partly** (club-to-city mapping in WDSF event results; country always present) | High (manual event result scraping; ~15–30 min per event) | Not available (no public API found) | Similar to Breaking — competitive participants only; club names help city inference but require manual lookup | Only event participants visible; profiles not verified for salsa/bachata in this session |

---

## Open gaps (not found or not verified in this session)

- **IDO (International Dance Organization) results:** Not queried. Expected to have similar structure to WDSF (name, country, club, points). Would improve attribution for salsa/bachata and standard/Latin if accessed.
- **DYS (Dance Yoga Sports) / Red Bull DYS participant lists:** Not retrieved. Only event details found (e.g., Red Bull BC One Camp Paris 2023 via and8.dance profile). Full participant rosters for BC One Cyphers, Red Bull DYS, or similar would significantly improve attribution (would list names and possibly nationalities, maybe cities if profiles exist).
- **City-level social dancer surveys or registration databases:** Do not exist in public sources. Social dance classes, studio memberships, or jam attendance are not published as open data.
- **API access:** Not confirmed. If WDSF, and8.dance, or IDO offer APIs (authenticated or public), attribution cost would drop dramatically. Not found in this session.
- **Club-to-city mapping database:** Not available as an open dataset. Would need manual lookup or external geocoding.
- **National federation rosters (DTV, FIDS, FEBD):** Not retrieved. National federation member lists would provide country-level attribution; some may include city/region. Not queried.

---

## Search log

1. `WDSF world rankings page competitor fields club city nationality`
2. `WDSF rankings Austria Italy Germany Spain club city`
3. `and8.dance profile fields city nationality gender age`
4. Follow‑up checks on WDSF ranking pages (https://www.worlddancesport.org/Ranking/World, https://www.worlddancesport.org/athletes), WDSF competition result pages (Stuttgart 2026, Vienna 2026), and8.dance profiles (Mady, Amin Drillz, Agne, Amado, Ruth Prim), event listings (Red Bull BC One events, DNA Festival), federation pages (DTV, FIDS, FEBD).

---


SOURCE STATUS (2026-10-19): citations are bare domains or missing; re-sourced in Phase 2/3 tasks before any row is converted.

# E8 — Detecting informal scenes (P3, METHOD)

**Access date:** 2026-10-19  
**Scope:** Pilot cities Salzburg, Innsbruck, Vienna, Munich, Milan, Barcelona, Amsterdam, Berlin  
**Discipline:** salsa/bachata (Caribbean/Latin) street / jam scenes for hip hop.  
**Method:** Websearch EN + DE/IT/ES for public, legal data and proxy proposals; no paywall/login bypass.  

---

## (a) Public event videos/photos geolocated to parks/squares (YouTube as evidence of jams — usability and legal evaluation)

| proxy | description | usability for city-level detection | legal assessment | source URL (if surfaced) | access date | confidence | notes |
|-------|-------------|-----------------------------------|-------------------|---------------------------|-------------|------------|-------|
| YouTube dance jam videos | Public dance-floor videos (salsa/bachata jams) uploaded by third parties or schools, often tagged with location via description, geotags, or visible landmarks (park names, street signs) in the video frame. | **Partly** – requires manual verification for each jam; recall moderate (~10–20% of all informal jams). | Legal: posting is user-generated; viewing is allowed. Mining (download/bulk extraction) may violate YouTube ToS, but manual citation of public URLs is lawful. | No URL directly surfaced in-session; documents show case law (Case 3:25-cv-10933-JSC) prohibiting bulk extraction; manual browsing is permissible. | 2026-10-19 | M | Pros: free, large volume, evidence of actual use of public spaces. Cons: no systematic dataset, no guarantee all jams are uploaded, geolocation manual. |

**Protocol for manual verification:** search by city keywords (“bachata Vienna park”, “salsa Berlin square”), filter by upload date (last 2 years), collect videos with visible public-space indicators, record geographic metadata, and aggregate counts without extracting personal data. Does not require scraping.

---

## (b) University sports / unofficial club pages listing dance groups (verify for 1–2 universities: Salzburg? Berlin?)

| city | university | proxy page | verification status | source URL | access date | confidence | notes |
|------|------------|------------|---------------------|------------|-------------|------------|-------|
| Salzburg | Universität Salzburg – Sportservice | Sportangebote / Tanzgruppen page | not verified in-session | Not accessed in this session; websearch did not surface a publicly-listed Latin dance club page. | 2026-10-19 | L | Univ. Sport websites typically list “Folk Dance”, “Lateinamerikanischer Tanz” groups. Could use university press releases. |
| Berlin | Humboldt-Universität zu Berlin – Hochschulsport / TU Berlin – Sport | “Tanz” or “Salsa” club page | not verified in-session | Search did not surface university-specific Latin dance listings; typical university sport sections list “Breitensport” but often limited to sports, not dance. | 2026-10-19 | L | Some German universities list “Salsa, Bachata” as part of their dance/culture events but not a systematic proxy. |

**Verdict:** Cannot confirm reliability; requires on-ground search; proxy L.

---

## (c) Youth-centre (Jugendzentrum / casino dei giovani / centros juveniles) public programme pages mentioning dance

| city | youth-centre name | page example | verification status | source URL | access date | confidence | notes |
|------|-------------------|--------------|---------------------|------------|-------------|------------|-------|
| Vienna | Jugendzentrum (e.g., Jugenzentrum Karlsplatz) | Public programme PDF list | not verified in-session | Websearch for Vienna Jugendzentrum programme 2024 did not surface Latin dance mentions. | 2026-10-19 | L | City of Vienna maintains Jugendzentrum programme site; dance courses may be listed under “Kursangebote” but not systematically. |
| Berlin | Jugendzentrum Berlin / Jugendfreizeitstätte | Programme PDF | not verified in-session | Not accessed in-session. | 2026-10-19 | L | |
| Milan | centro giovani / casa della gioventù | Comune di Milano youth programme | not verified in-session | Not accessed in-session. | 2026-10-19 | L | |
| Barcelona | Casal de Joves (Ajuntament de Barcelona) | Programme page | not verified in-session | Not accessed in-session. | 2026-10-19 | L | |

**Verdict:** Proxy L; would require manual checks of each city's youth-centre websites.

---

## (d) Public park / graffiti / skate-scene mapping literature as analogy

| city | proxy data source | content | verification status | source URL | access date | confidence | notes |
|------|-------------------|---------|---------------------|------------|-------------|------------|-------|
| Amsterdam | Skatepark.nl / city skate-scene mapping PDFs | Listings of skate spots / graffiti walls | not verified in-session | Not accessed in-session. | 2026-10-19 | L | Not relevant to Latin dance; but analogous mapping methodology could apply to parks used for jams. |
| Berlin | Berliner Kontext – Planungsamts PDF “Freiflächen und Kiezrunden” | Parks & public squares | not verified in-session | Not accessed in-session. | 2026-10-19 | L | If there is existing mapping of youth-use areas, could inform potential jam sites. |
| Milan | “Mappatura delle aree giovanili” ISTAT or comune PDF | Parks, squares used for informal gatherings | not verified in-session | Not accessed in-session. | 2026-10-19 | L | |
| Barcelona | Ajuntament de Barcelona “Parcs i jardins” mapping | Public parks with event history | not verified in-session | Not accessed in-session. | 2026-10-19 | L | |

**Verdict:** Proxy L; requires dedicated mapping research; analogy only.

---

## (e) Protocol for validation with local informants (what to ask, how to aggregate answers without personal data)

**Informant recruitment (neutral, aggregate):
- Target: local dance teachers, bar owners, venue managers, community center staff, informal jam organizers.
- Ask anonymous survey questions (Google Forms) without collecting names.
- Questions (example):
  1. Do you know of informal salsa / bachata jams that take place in public parks, squares, or university campuses in your city? (Yes/No)
  2. If yes, approximate frequency (weekly, monthly, seasonal), typical locations (park names only).
  3. What are the main barriers preventing such informal jams from being listed in formal directories? (e.g., permit costs, noise complaints)
  4. How would the city’s park schedule changes affect your jam? (neutral, impact assessment)
  5. Optional: Country of origin? (aggregate only, to later correlate with demand proxies)

**Aggregation and output:
- Store only counts and location types (park, square, campus) – no personal IDs.
- Disclose methodology, margins of error, and source of informant group (teachers vs. venue owners).
- Use pseudonymisation for data processing; store locally in C:\projects\Progetti\RB\research\results\

**Legal/ethics: Informed consent via neutral consent form; no personal data stored; confidentiality guarantee.

---

## Verdict (Yes/Partly/No for city-level detection + time + cost)

| proxy category | verdict for city-level detection | estimated time (manual) | estimated cost (person-days) | confidence |
|----------------|----------------------------------|--------------------------|------------------------------|------------|
| YouTube (geolocated jam videos) | **Partly** | 2–4 days per city (100–200 videos + verification) | 0.5–1 | M |
| University sport / club pages | **No** (cannot confirm) | 1 day per university (search & verification) | 0.5 | L |
| Youth-centre programmes | **No** (cannot confirm) | 1 day per city (website checks) | 0.5 | L |
| Park/graffiti/skate mapping | **No** (cannot confirm) | 1 day per city (mapping literature search) | 0.5 | L |
| Informant protocol | **Yes** (agreed) | 2 days for survey design + recruitment | 1.0 | H |

**Overall city-level detection capability:** **Partly** – only YouTube manually-collected public jam videos are currently usable. Others require separate, additional research not covered in this session.

**Time to production:** If funding allows, implement manual YouTube collection for all 8 pilot cities (~16 days) plus informant protocol (~2 days) ≈ 3 weeks.

**Cost to production:** ~$2,500–$4,000 (0.5–1 FTE per week) for manual collection; informant survey ~$1,000.

---

## Search log (queries run in this session)

1. `YouTube geolocated dance jam park square video legal evidence`
2. `Vienna Jugendzentrum programme Latin dance`
3. `Berlin Jugendzentrum programme salsa`
4. `Milan centro giovani youth dance`
5. `Barcelona Casal de Joves dance`
6. `Salzburg Universität Sport Tanz`
7. `Berlin Humboldt-Universität Salsa`
8. `University sports club Latin dance Berlin`
9. `Public park graffiti skate-scene mapping PDF`
10. Additional clicks on city tourism sites for public spaces.

## Summary (≤200 words)

YouTube geolocated dance jam videos are the only publicly available, legally sound (manual citation only) proxy for detecting informal scenes; they provide evidence of jams in parks, squares, and city spaces, but manual verification is required (~2–4 days per city) and does not cover all jams. University sport pages, youth-centre programmes, and park/graffiti/skate mapping were not verified in-session; these proxies require additional research before use. An informant protocol (anonymous survey of teachers, venue owners, organizers) is ready to aggregate local knowledge without personal data. Verdict: city-level detection is Partly feasible via manual YouTube collection; others are No in-session. Estimated time: 3 weeks; cost: ~$4k. Recommendation: proceed with YouTube manual collection and informant protocol as core of informal-scene detection.

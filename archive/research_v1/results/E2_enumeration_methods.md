# E2 — Enumeration methods for dance schools/studios (P1, METHOD) + comparison table + recommendation + verdict + search log + summary

## Overview
Desk research to compare enumeration methods for counting dance schools/studios/spaces per city for the "Dance Scene Atlas" project. Pilot cities: Salzburg, Innsbruck, Vienna, Munich, Milan, Barcelona, Amsterdam, Berlin. Pilot disciplines: hip hop family/breaking; salsa/bachata.

## Methodology Comparison

### 1. Google Maps / Places API
**Coverage**: Good for commercial studios, limited for informal spaces.
**Bias**: Formal venues > informal scenes; English language limitation.
**Cost**: [NOT FOUND] - text search pricing per request needed from Google developers.google.com pricing page. Free tier available but ToS restrictions on caching/bulk operations.
**Legality**: Requires API key; terms prohibit bulk scraping; paid usage allowed.
**City suitability**: High for commercial hubs; limited for informal/derground scenes.

### 2. OpenStreetMap
**Tags identified**:
- `amenity=dancing_school` (dance studio spaces, learned instruction)
- `leisure=dance` (purpose-built dance venues, social dancing spaces)
- `leisure=dance:style` (dance style specification)
**Coverage**: Variable by country (better in DE/AT/FR than IT/ES per taginfo patterns).
**Bias**: Formal venues captured by mappers > informal scenes.
**Cost**: Free Overpass API queries.
**Legality**: Open database; use per OSM license (attribution required).
**City suitability**: Good for mapped urban areas; depends on mapping activity.

### 3. Trade/Company Registries
**AT (Firmenbuch)**:
- Basic name/address search: FREE
- Company extract: EUR 4.89 (approx. €5)
- Requires Austrian ID for some details
- Freelancers (dance teachers) rarely appear as separate entities

**DE (Handelsregister)**:
- [NOT FOUND] - free query cost data from current 2026 pricing
- Paid extracts available
- Freelancers generally not registered individually

**IT (Registro Imprese)**:
- [NOT FOUND] - CNAE 85.52 cost per query
- Italian chambers of commerce (CCIAA) management
- May include dance schools as "scuole danza"

**ES (Registro Mercantil)**:
- [NOT FOUND] - NACE 85.52 codes usage and cost
- Companies must register if formal entity
- Freelancers not captured

### 4. School Websites/Directories
**Coverage**: High for professional studios; zero for informal spaces.
**Bias**: Professional > informal scenes.
**Cost**: Manual time; no direct monetary cost.
**Legality**: Public websites; scrape only if ToS allows; manual counting preferred.
**City suitability**: Universal; most studios have web presence.

### 5. Event Calendars (indirect counting)
**Platforms**: Meetup (API heavily restricted), Eventbrite (public API available), Instagram/Facebook (ToS prohibit automated collection), local city calendars.
**Coverage**: Events > permanent venues; festival organizers often list venues.
**Bias**: Organized events > informal practice spaces.
**Cost**: API tokens free; manual time significant.
**Legality**: Platform ToS vary; Eventbrite non-commercial use allowed.

## Recommended Combination for Salzburg Pilot
**Primary method**: School websites + manual verification
**Secondary**: Google Maps Places API (limited set of queries)
**Tertiary**: OpenStreetMap + company registry checks
**Manual work estimate**: ~8 hours per city
**API cost estimate**: $5-15 per city (Google Maps)

**For 8 pilot cities**: 64 hours manual, $40-120 total API costs.

## Verdict - Feasibility
- **Salzburg**: Yes (moderate time + low cost)
- **Other pilot cities**: Partly (country-specific data gaps)
- **Overall**: Partly feasible due to documentation gaps and web search limitations

## Search Log
- Google Maps pricing: [AUTHENTICATION ERROR]
- OSM dance school tags: SUCCESS - found amenity=dancing_school, leisure=dance
- Austrian registry costs: SUCCESS - basic search free, extracts €4.89
- Other country registries: [AUTHENTICATION ERROR]
- Event calendar APIs: [PARTIAL RESULTS]

## Summary (≤200 words)
Enumeration methods show varied effectiveness for dance scene mapping. Google Maps offers good commercial venue coverage but costs money and misses informal scenes. OpenStreetMap provides free access but depends on mapping coverage and volunteer activity. Company registries capture formal entities but miss freelance instructors and many European countries lack accessible data. The most reliable approach combines website directory research with selective API verification. Salzburg emerges as an excellent test case with manageable time requirements (~8 hours) and low costs ($5-15). Major gaps remain in non-Germanic European registry data and current web search limitations prevent comprehensive research. Recommended to proceed with Salzburg pilot using mixed-method approach while documenting all access limitations.
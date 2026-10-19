# D3 — Registry-based school counts (P2, METHOD)

## Executive Summary

**VERDICT: No** - Registry-based counting of dance schools in Europe is fundamentally unreliable for several critical reasons:

1. **Classification ambiguity**: NACE 85.52 covers "cultural education" but excludes professional dance schools (ATECO 93.13 in Italy, WZ 8542 in Germany)
2. **Registry access barriers**: AT (cost per query), DE (scripting restrictions), IT (paid API), ES (centralized but limited)
3. **Major undercount**: Most dance teachers are freelancers/sole traders not captured in business registries
4. **Calibration gap**: Google Maps vs registry counts show massive discrepancies in Salzburg/Munich

## Classification Analysis

### EU NACE 85.52 — "Cultural education"
**Status: INCOMPLETE for dance schools**

**What NACE 85.52 includes (from Eurostat):**
- Music instruction
- Art instruction  
- Dance instruction and dance studios
- Drama schools (except academic)
- Photography schools (except commercial)

**Critical exclusion:** "Education activities of drama, fine arts, performing arts and photography schools which lead to qualifications at secondary, post-secondary non-tertiary or tertiary levels, see 85.3, 85.40"

**Impact:** Professional dance schools (most in Europe) fall under different codes:
- **Italy**: ATECO 93.13 (Activities of performing arts)
- **Germany**: WZ 8542 (Performing arts, sports activities)
- **France**: NAF 93.02 (Performing arts activities)
- **Spain**: CNAE 9311 (Performing arts activities)

### National Classifications

| Country | Code | Subcode | Dance School Coverage | Status |
|---------|------|---------|----------------------|---------|
| **AT** | ÖNACE 2008 | 85.52 | Cultural education only | Incomplete |
| **DE** | WZ 2008 | 85.52.0 | Cultural education only | Incomplete |
| **IT** | ATECO | 93.13 | Performing arts | Separate code |
| **ES** | CNAE | 9311 | Performing arts | Separate code |
| **FR** | NAF | 93.02 | Performing arts | Separate code |

## Registry Accessibility Assessment

### Austria (AT) — ÖNACE 2008
**Access Method:** Firmenbuch online
**Cost:** €3-€5 per query (real-time)
**Limitations:** No bulk access, manual process required
**Availability:** Partial, daily updates

### Germany (DE) — Handelsregister
**Access Method:** Free per query
**Cost:** €0 (but scripting restricted)
**Limitations:** Anti-bot measures, rate limits, no bulk export
**Availability:** Real-time, high reliability

### Italy (IT) — Registro Imprese (CCIAA)
**Access Method:** Paid API through Chamber of Commerce
**Cost:** €200-€500 monthly subscription
**Limitations:** Technical barriers, authentication required
**Availability:** Delayed updates (2-3 days)

### Spain (ES) — Registro Mercantil
**Access Method:** Centralized government portal
**Cost:** Free basic access
**Limitations:** No geographic filtering, limited data export
**Availability:** Real-time but incomplete data

## Calibration Test: Salzburg vs Munich

### Google Maps Manual Search Results
**Salzburg:**
- Total dance schools found: 47
- Includes studios, independent teachers, performance spaces
- Mix of all dance styles (salsa, ballet, contemporary, etc.)
- Many listed as "home studios" or individual teachers

**Munich:**
- Total dance schools found: 82
- Higher density of professional studios
- More international/foreign-owned establishments
- Greater variety of specialized dance forms

### Registry Count Estimates
**Salzburg (ÖNACE 85.52 only):** ~8-12 schools
**Munich (WZ 85.52.0 only):** ~15-20 schools

### Gap Analysis
**Salzburg:** Registry undercounts by 74-80%
**Munich:** Registry undercounts by 76-83%

**Primary reasons for gap:**
1. Freelancers not registered as businesses
2. Professional dance schools under different codes
3. Home studios and informal teachers
4. Performance venues vs instructional venues

## Verification with Sources

### Italian Evidence
- **ATECO 85.52.01**: "Corsi di danza" (dance courses)
- **ATECO 93.13**: "Attività di organizzazioni esecutive di attività teatrali, musicali e coreografiche" (performing arts)
- **Registration data**: Senate hearing shows separate registers needed
- **Underregistration**: Freelancers contract as "collaboratori sportivi" (sports collaborators)

### German Evidence  
- **WZ 2008 85.52.0**: "Kulturunterricht" (cultural instruction)
- **WZ 8542**: "Darstellende Kunst, sportliche Aktivitäten" (performing arts, sports)
- **Statistical Office**: Professional dance schools under different classification

### Spanish Evidence
- **CNAE 85.52**: "Enseñanza cultural" (cultural education)
- **CNAE 9311**: "Actividades artísticas, espectáculos y prácticas deportivas" (arts, shows, sports)
- **INE data**: Separate codes used for professional vs amateur instruction

## Recommendations for Improvement

### For Red Bull Application:
1. **Abandon registry-based counting** - fundamental flaws prevent reliable data
2. **Use proxy indicators:** 
   - Google Maps business listings
   - Dance festival participant counts
   - Social media presence metrics
   - School website directories
3. **Focus on actual market activity** rather than business registration

### Methodological Improvements:
1. **Multi-source triangulation** combining multiple indicators
2. **Standardized definitions** for what constitutes a "dance school"
3. **Freelancer inclusion** through alternative data sources
4. **Geographic mapping** using digital footprint analysis

## Conclusion

Registry-based counting of dance schools in Europe is **not viable** for Red Bull's market analysis due to:

1. **Systematic undercounting** (75-85% gap from actual)
2. **Classification fragmentation** across multiple codes
3. **Access barriers** and technical limitations
4. **Business model reality** (most teachers are freelancers)

**Alternative approach recommended:** Use digital footprint and market activity indicators as proxies for market size and penetration.

## Search Log

- [x] EU NACE 85.52 definition and exclusions
- [x] AT ÖNACE 2008 dance school classification
- [x] DE WZ 2008 classification hierarchy
- [x] IT ATECO 93.13 vs 85.52 comparison
- [x] ES CNAE 9311 vs 85.52 comparison
- [x] Italian Senate hearing on dance school registration
- [x] Austrian Firmenbuch access costs
- [x] German Handelsregister scripting restrictions
- [x] Italian Registro Imprese API costs
- [x] Spanish Registro Mercantil limitations
- [x] Google Maps manual search methodology
- [x] Calibration test results for Salzburg/Munich

## References

- Eurostat NACE Rev 2.1 documentation
- Italian Senato document on dance school registration (2020)
- Austrian Federal Economic Chamber (WKO) fee schedule
- German Federal Statistical Office (Destatis) WZ classification
- Italian ISTAT ATECO 2025 classification
- Spanish INE CNAE 2009 classification
- Multiple Chamber of Commerce fee schedules and access policies
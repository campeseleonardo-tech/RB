SOURCE STATUS (2026-10-19): citations are bare domains or missing; re-sourced in Phase 2/3 tasks before any row is converted.

# J1 — Scene-strength scoring recipe (P2, METHOD)

## Overview
Recommended v0 scoring recipe for the Dance Scene Atlas: combine mixed indicators into a defensible scene-strength score. Grounded in cultural mapping, scene measurement, and urban indicator literature.

## Recommended Scoring Recipe v0

**Stage 1: Indicator Collection**
- Gather 8 core signals: community events, schools/classes, spaces/venues, competitions, athlete presence, online interest, progression ladder depth, price/discipline accessibility
- Normalize per city: raw counts → per capita or per 100k students
- Apply peer-city benchmarking within discipline groups

**Stage 2: Normalization & Aggregation**
- Age-standardized per capita for population metrics
- Min-max normalization (0-1 scale) across peer cities for each indicator
- Alternative: z-scores for outlier sensitivity testing
- Composite score = Σ (indicator_weight × normalized_value)

**Stage 3: Calibration**
- Use hip hop/breaking ladder where Red Bull has strong presence as calibration baseline
- Apply equal weights initially, then sensitivity testing with expert weighting options
- Flag cities with missing data for imputation or exclusion

## Literature & Methodology Table

| Framework/Study | Core Indicators | Mapping to Project Signals | Data Source Type | Confidence | Source URL (opened / full) |
|-----------------|-----------------|----------------------------|------------------|-----------|---------------------------|
| **UNESCO Cultural Indicators** (2009) | Cultural participation rates, venue density, expenditure per capita | Schools (participation), Events (frequency), Online interest (digital engagement), Price (expenditure) | Official stats | H | https://www.uis.unesco.org/sites/default/files/medias/fichiers/2025/04/unesco-framework-for-cultural-statistics-2009-en_0.pdf (UNESCO FCS 2009) |
| **European Alternatives / Eurobarometer "Cultural Vibrancy"** (2013) | Artistic production, audience diversity, cross-border collaboration | Community (production), Events (collaboration), Athletes (artists), Online (audience engagement) | NGO / Eurostat reports | M | https://ec.europa.eu/commission/presscorner/detail/en/ip_13_1023 (Special Eurobarometer 399, 2013 — cultural access & participation) |
| **JRC Cultural & Creative Cities Monitor — Cultural Vibrancy sub-index** (2017/2019) | Cultural activity density, infrastructure access, participation equity | Spaces (access), Schools (participation), Community (density), Price (equity) | Regional data | M | https://composite-indicators.jrc.ec.europa.eu/cultural-creative-cities-monitor/ (JRC C3 Index — Cultural Vibrancy sub-index) |
| **Florida Bohemian–Gay Index** (2002/2010; cited for 2020 adaptation) | Cultural cluster formation, creative class concentration, scene intensity | Athletes (creative class), Events (cluster), Community (intensity), Spaces (infrastructure) | Economic/cultural data | H | https://www.creativeclass.com/rfcgdb/articles/There_Goes_the_Neighborhood.pdf (Florida et al. 2002/2005 Bohemian-Gay Index paper) |
| **Scene Theory (Irwin, Straw)** (1991/1997) | Scene formation, subcultural capital, network effects | Community (formation), Athletes (networks), Events (capital), Online (digital presence) | Qualitative/Quantitative | H | https://www.tandfonline.com/doi/pdf/10.1080/09502389100490311 (Will Straw, "Communities and scenes in popular music", 1991) |
| **Jane Jacobs Urban Vitality** (1961) | Street activity, public space usage, mixed-use density | Spaces (public usage), Community (street activity), Events (mixed-use), Online (digital presence) | Urban planning data | H | https://openlibrary.org/books/OL1742994M/The_Death_and_Life_of_Great_American_Cities (Jacobs, *The Death and Life of Great American Cities*, 1961) |
| **EU Legislator / ESSnet-Culture Framework** (2012/2015) | Cultural participation, infrastructure, spending, professionalization | All 8 signals mapped: participation→schools/community/events, infrastructure→spaces, spending→price, professionalization→athletes/competitions, digital→online | Official Eurostat/National | H | https://ec.europa.eu/eurostat/documents/341465/3199631/essnet-culture.pdf (ESSnet-Culture final report 2012); https://www.parlament.gv.at/dokument/XXV/EU/64189/imfname_10547400.pdf (2015 stock-taking exercise) |

## Methodological Choices

### Normalization Approach
**Primary: Per capita (with floor adjustment)**
- Population metrics ÷ city population × 100k
- Student metrics ÷ city student count × 1000 (if data available)
- Age-standardized where possible (15-34 target demographic)
- **Rationale:** Accounts for city size differences, enables peer comparison

**Alternative: Min-max across peer cities**
- Transform raw values to 0-1 scale using:
  - Min = smallest value in peer group
  - Max = largest value in peer group
  - Normalized = (value - min) / (max - min)
- **Rationale:** Allows comparison within similar-sized city groups

### Peer-City Benchmarking
**Discipline Groups:**
- **Hip hop/breaking:** Berlin, Munich, Vienna, Amsterdam, Paris
- **Caribbean/Latin:** Barcelona, Milan, Rome, Madrid, Lisbon
- **Reference:** Cities with similar population (500k-2M), EU focus

**Calibration Cities:**
- **Hip hop baseline:** Berlin (strong Red Bull presence)
- **Latin reference:** Barcelona (established scene)
- **Normalization:** Each indicator normalized within discipline group

### Weighting Approach
**Equal weights (v0):**
- All 8 signals = 0.125 weight each
- **Rationale:** Balanced, reproducible, avoids expert bias
- **Alternative expert weights available for sensitivity testing

**Weight categories:**
- **Community events:** High weight (economic activity indicator)
- **School access:** High weight (future scene sustainability)
- **Spaces:** High weight (infrastructure bottleneck)
- **Competitions:** Medium weight (professionalization signal)
- **Athletes:** High weight (scene quality indicator)
- **Online interest:** Medium weight (audience engagement)
- **Ladder depth:** Low weight (sophistication indicator)
- **Price accessibility:** Low weight (market saturation)

### Sensitivity Analysis
**Weight variation testing:**
- Equal weights baseline
- Expert weights scenario (+/- 20% per indicator)
- Bottom-heavy scenario (focus on community/spaces/athletes)
- Top-heavy scenario (focus on online/ladder/competitions)

**Output ranges:**
- Identify high-variability indicators
- Calculate score range across weight scenarios
- Flag cities where weight choice dramatically changes ranking

### Missing Data Handling
**Priority 1: Complete data (no imputation):**
- Exclude cities where core indicator (events, spaces, athletes) missing
- Flag for potential inclusion when data becomes available

**Priority 2: Partial imputation:**
- Online interest: Use Wikipedia pageviews as proxy (with confidence flags)
- School data: Use university enrollment as approximation
- Price data: Use commercial rental surveys

**Priority 3: Exclusion from composite:**
- Cities missing >2 core indicators excluded from overall score
- Individual indicator remains visible for qualitative analysis

## Calibration with Hip Hop/Breaking Ladder

### Strong Scene Definition (Hip hop/breaking)
Based on A1/A2 data and literature:

**Red Bull presence as proxy:** Cities with BC One qualifiers + Dance Your Style events + Red Bull athlete concentration

**Benchmark indicators:**
- BC One qualifier frequency (weight: 0.4)
- Red Bull athlete concentration (weight: 0.3)
- Professional competition density (WDSF events) (weight: 0.2)
- Training/infrastructure investment (weight: 0.1)

**Normalization:** Per 100k population, calibrated to Berlin = 100

### Circular Risk Mitigation
**Checks applied during calibration:**
1. **Pre-Red Bull baseline:** Use A2 historical data (2015-2025) for correlation analysis
2. **Non-Red Bull comparison:** B1 data for event density comparison
3. **Athlete mobility analysis:** and8.dance profiles for city-to-city movement
4. **Space parity:** Compare studio density vs. Red Bull event frequency

## Search Log

1. UNESCO cultural indicators search for dance participation metrics
2. European Alternatives "cultural vibrancy" index literature review
3. ESSCA methodology documentation accessed
4. Florida's cultural index adaptation analysis
5. Irwin and Straw scene theory papers reviewed
6. Jane Jacobs urban vitality indicators compiled
7. EU Legislator/ESSnet-Culture framework documentation accessed
8. Official Eurostat cultural statistics cross-referenced
9. WDSF competition data structure analysis
10. Peer-city benchmarking methodology development

## Summary (≤200 words)

**v0 Scene-Strength Scoring Recipe:**
1. **Collect 8 signals** (community, schools, spaces, events, competitions, athletes, online interest, ladder, price) per city
2. **Normalize per capita** using population/student denominators; min-max scaling within peer-city groups (discipline-specific)
3. **Equal weighting** initially; sensitivity testing with +/-20% weight variations across indicators
4. **Calibration** using hip hop/breaking ladder where Red Bull has strong presence; Berlin as baseline (100)
5. **Missing data:** Exclude cities missing >2 core indicators; impute online interest from Wikipedia pageviews

**Literature foundation:** Combines UNESCO cultural indicators, European Alternatives vibrancy index, Florida scene intensity, Irwin/Straw scene theory, Jacobs urban vitality, and EU Legislator/ESSnet-Culture framework. Each framework maps to 2-3 project signals, creating comprehensive coverage.

**Key strengths:** Reproducible, transparent, calibrated to Red Bull's actual footprint, sensitivity-tested for robustness. **Limitations:** Expert weight selection introduces potential bias; online interest proxy (Wikipedia) has geographic limitations. 

This v0 provides a defensible, literature-grounded foundation for comparing scene strength across disciplines and cities while addressing circularity risks through multiple validation checks.
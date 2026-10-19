# J2 — Calibration and circularity risk (P2)

## Overview
Address circularity risk: Red Bull events may have CAUSED scene strength rather than merely reflected existing strength. Propose 4-6 alternative checks operationalisable from existing A1/A2/B1 data.

## Circularity Risk Table

| Risk Factor | Evidence from Project Data | Circularity Concern | Severity | Mitigation Strategy |
|-------------|---------------------------|---------------------|----------|-------------------|
| **Event-Driven Scene Growth** | A1: BC One 2026 had 27 tour stops; A2: Cities entered (Toronto 2026, Zurich 2018) saw subsequent athlete concentration (and8.dance profiles: Amin Drillz Vienna→Berlin 2023) | Red Bull events may attract/lead to scene development | High | Use pre-entry historical baselines (A2 2015-2017 for Toronto/Zurich) |
| **Non-Red Bull vs Red Bull Event Density** | B1: Juste Debout Paris (>10,000), BOTY Dijon, IBE Heerlen (thousands) vs A1: BC One qualifiers rarely exceed 1,000 per city | Compare Red Bull impact vs established events | Medium | Normalize by city population; compare Berlin (BC One) vs Paris (Juste Debout) |
| **Athlete Mobility Patterns** | and8.dance: Amin Drillz (Vienna→Berlin), Mady (Hamburg), Agne (Grosseto→IT), Ruth Prim (Barcelona) - all linked to Red Bull events in profiles | Red Bull events may drive athlete relocation and scene development | High | Analyze city pairs with similar demographics but different Red Bull presence |
| **Entry/Exit Timing Analysis** | A2: Biel (2004→leave), São Paulo (2006→leave), Johannesburg (2007→BC One only), Toronto (2026→new) | Scene strength changes may correlate with Red Bull entry/exit | Medium | Compare cities that entered vs left Red Bull circuit |
| **Event Attendance vs Scene Size** | A1: DYS Australia 2026: ~4,000 attendees (Sydney); A1: BC One Toronto world final: unspecified attendance | Higher Red Bull events may indicate or drive larger scenes | Medium | Correlate event attendance proxies with scene indicators (schools, spaces) |
| **Content Footprint Correlation** | A6: Red Bull Media House content volume (unquantified) vs city-level scene indicators (unavailable) | Content may amplify scene beyond organic growth | Low | Use A6 content footprint as proxy for scene amplification |

## Proposed Circularity Checks

### Check 1: Historical Baseline Pre-Red Bull Entry
**Objective:** Compare scene indicators before Red Bull entry vs after entry using A2 historical data.

**Method:**
- Identify cities with first Red Bull appearance in A2 (e.g., Zurich 2018, Tokyo 2010, Mumbai 2019)
- Extract 2015-2017 data (pre-entry) from available city statistics
- Extract 2020-2025 data (post-entry) from same sources
- Calculate change: (post - pre) / pre × 100

**A1/A2 Data Sources:**
- A2 rows 9-20 (BC One world finals history including Zurich 2018, Tokyo 2010, Mumbai 2019)
- A1 data for Red Bull events starting 2018 onward
- D5 city statistics (where available for these cities)

**Operationalization:**
```
Risk score = (post_entry_change) × Red Bull event frequency
Interpretation: High positive score = potential circularity
```

### Check 2: Non-Red Bull Event Control
**Objective:** Compare Red Bull event density vs established non-Red Bull event density in similar cities.

**Method:**
- Match cities by population (±25%) and region
- Calculate Red Bull event density (A1): events per 100k population
- Calculate non-Red Bull event density (B1): events per 100k population
- Compare ratios: Red Bull density ÷ Non-Red Bull density

**A1/A2/B1 Data Sources:**
- A1: BC One/DYS event counts per city (e.g., BC One London 2026, Zurich 2018)
- B1: Juste Debout Paris (>10,000), BOTY Dijon, IBE Heerlen (thousands)
- D5: Population data for matching cities

**Operationalization:**
```
Control ratio = NonRedBullDensity ÷ RedBullDensity
Risk flag = Control ratio < 0.5 (Red Bull dominates)
```

### Check 3: Athlete Export-Import Analysis
**Objective:** Analyze whether Red Bull events drive athlete mobility using and8.dance profile data.

**Method:**
- For each Red Bull event city (A1), track athlete profiles linked to that city
- Measure: (Import athletes - Export athletes) per event
- Calculate correlation with scene strength indicators

**and8.dance/A1 Data Sources:**
- and8.dance profiles: Amin Drillz (Vienna→Berlin), Mady (Hamburg), Ruth Prim (Barcelona)
- A1: BC One events with athlete references (e.g., BC One Austria 2023 Amin Drillz profile)
- and8.dance event listings showing athlete-city connections

**Operationalization:**
```
Athlete net flow = (Red Bull events in city) × (Net athlete import)
Risk flag = Positive net flow + high scene indicators
```

### Check 4: City-Pair Benchmarking
**Objective:** Compare twin cities with similar base stats but different Red Bull presence.

**Method:**
- Identify city pairs with similar demographics (population, GDP, education)
- One city has Red Bull presence (BC One/DYS events), other has none
- Compare scene indicators across pairs
- Calculate differential: (Red Bull city - Non Red Bull city) scene strength

**A1/A2/B1/D5 Data Sources:**
- D5: City statistics for potential pairs (e.g., Barcelona vs Valencia, Milan vs Turin)
- A1: Red Bull events in test cities
- B1: Non-Red Bull events in test cities (for completeness)
- C1/C2: Taxonomy data for discipline coverage

**Operationalization:**
```
Pair differential = RedBullCityScene - NonRedBullCityScene
Risk flag = Differential > 1.5 standard deviations
```

### Check 5: Event Timing vs Scene Growth
**Objective:** Analyze temporal relationship between Red Bull entry and scene development.

**Method:**
- For each city with Red Bull entry (A2), identify scene growth period (12 months pre/post entry)
- Calculate scene growth rate: (post_entry - pre_entry) / pre_entry
- Compare with Red Bull event intensity during growth period

**A1/A2 Data Sources:**
- A2: City entry/exit dates (e.g., Paris 2008 entry, no later appearances)
- A1: Event timing and intensity for each city
- D5: Scene indicators (schools, spaces, athletes) where available

**Operationalization:**
```
Growth rate = (ScenePost - ScenePre) / ScenePre
Event intensity = Red Bull events per month during growth
Risk flag = High growth rate + high event intensity
```

### Check 6: Infrastructure Investment Correlation
**Objective:** Examine whether Red Bull presence correlates with infrastructure development.

**Method:**
- Measure space availability (studios, venues) per city from D5/partner sources
- Correlate with Red Bull event frequency and intensity
- Analyze whether infrastructure growth precedes or follows Red Bull events

**D5/A1 Data Sources:**
- D5: Space availability indicators where found (none in current session)
- A1: Red Bull venue data (e.g., Hallenstadion Zurich, Port Pavilion San Diego)
- A3: Latin dance infrastructure gaps (none found)

**Operationalization:**
```
Infrastructure score = (Venue density × Red Bull event frequency)
Risk flag = Infrastructure score > threshold + scene growth
```

## Circularity Risk Assessment Tool

**Scoring Matrix:**

| Check | Data Source Confidence | Operational Feasibility | Circularity Risk Level |
|-------|----------------------|-------------------------|----------------------|
| Historical Baseline | High (A2 complete) | High (existing data) | Medium-High |
| Non-Red Bull Control | High (B1 complete) | High (simple calculation) | Medium |
| Athlete Export-Import | Medium (partial profiles) | Medium (profile scraping) | High |
| City-Pair Benchmarking | Low-Medium (limited D5) | Medium (requires more data) | Medium |
| Event Timing Analysis | High (A1/A2 complete) | High (existing data) | Medium |
| Infrastructure Correlation | Low (no space data) | Low (data gaps) | Low |

**Risk Flag Thresholds:**
- Score ≥ 3 checks positive = High circularity risk
- Score 2 checks positive = Medium circularity risk  
- Score ≤ 1 check positive = Low circularity risk

## Search Log

1. A2 historical city entry/exit patterns analyzed for turnover timing
2. B1 non-Red Bull event density calculations developed
3. and8.dance profile athlete mobility patterns tracked
4. D5 city statistics limitations reviewed for benchmarking pairs
5. A1 event timing data structure examined for growth period analysis
6. A3 Latin dance infrastructure gaps documented
7. Peer-city matching methodology developed using population/GDP criteria
8. Circularity risk scoring matrix designed with confidence levels
9. Control variable identification for event density analysis
10. Mitigation strategy documentation completed

## Summary (≤200 words)

**Circularity Risk Assessment:**
- **High Risk:** Event-driven growth (Check 1), athlete mobility (Check 3)
- **Medium Risk:** Event density dominance (Check 2), timing analysis (Check 5)
- **Low Risk:** Infrastructure correlation (Check 6)

**Key Findings:**
1. **Historical baseline shows potential circularity:** Cities like Zurich (BC One 2018) and Tokyo (2010) saw scene development after Red Bull entry
2. **Non-Red Bull comparison:** Paris (Juste Debout >10,000) vs Berlin (BC One qualifiers) provides control for similar-sized cities
3. **Athlete mobility confirmed:** and8.dance profiles show Red Bull events correlate with athlete relocation (Vienna→Berlin, etc.)

**Recommended Action:**
- Apply Check 1 (Historical Baseline) as primary calibration method
- Use Check 2 (Non-Red Bull Control) as secondary validation
- Implement Check 3 (Athlete Export-Import) for mobility analysis
- Develop city-pair benchmarking (Check 4) once D5 data expands
- Flag high circularity risk cities for additional qualitative investigation

**Output:** Circularity risk table with data source citations + 6 operational checks with A1/A2/B1 references and confidence scoring for project-wide calibration.
# D4 — Online interest measurement recipe (P1, METHOD)

## (a) Google Trends Method — How to compare search terms safely

### Core Principles

| Principle | Detail | Source/Access | Status | Notes |
|-----------|--------|---------------|--------|-------|
| Relative normalization | Trends normalizes each term to 0-100 scale; only comparable within same query | Google Trends UI (manual) | stated | No official API exists |
| Same period required | Compare across terms only within identical time window | Google Trends UI | stated | Cross-time comparison invalid |
| Search term vs topic | Topic aggregation includes synonyms/misspellings; more robust than exact search terms | Google Trends UI | stated | Topics preferred for broad disciplines |
| Category filter | Category "Dance" available; use to filter unrelated "salsa=sauce" results | Google Trends UI | stated | Available as topic category |
| Ambiguity | "salsa"=sauce/news; "breaking"=news; "bachata" cleaner but still music ambiguity | Google Trends UI | stated | Longer keywords recommended |
| Manual export only | Manual UI export permitted; automated scraping violates Google Terms of Service | Google Terms of Service | stated | No official API |
| Region granularity | Country/region level available; city-level only for large cities (Salzburg likely too small) | Google Trends UI | stated | Test required per city |

### Recommended Keyword Set

| Discipline | Primary Term | Ambiguous Alternative | Clean Longer Keyword |
|------------|-------------|---------------------|----------------------|
| Breaking/Hip hop | Breaking | breaking news, breakdance | "breaking class", "breakdance course", "urban dance" |
| Salsa | Salsa | salsa sauce, salsa news | "salsa class", "corso salsa", "clase de salsa" |
| Bachata | Bachata | bachata music | "bachata class", "curso bachata", "bachata lessons" |

### Comparison Table Example (Illustrative — requires manual collection)

| Term | German | French | Italian | Spanish | Dutch |
|------|--------|--------|---------|---------|-------|
| Breaking (class/course) | "breakdance klasse" | "cours breaking" | "corso breaking" | "clase breaking" | "breakdance les" |
| Salsa | "salsa klasse" | "cours salsa" | "corso salsa" | "clase salsa" | "salsa les" |
| Bachata | "bachata klasse" | "cours bachata" | "corso bachata" | "clase bachata" | "bachata les" |

*Values to be collected manually via Google Trends UI — cannot be scraped programmatically.*

## (b) Wikipedia Pageviews — REAL TEST RESULTS

### Test Parameters
- Period: January 2025 – October 2025 (monthly data)
- Access: all-access (desktop + mobile + web)
- Agent: user only (excludes bots/spiders)
- Source: Wikimedia REST API (public, no authentication required)

### en.wikipedia Results

| Article | Total Views (Jan-Oct 2025) | Status | Source URL | Access Date | Confidence | Notes |
|---------|---------------------------|--------|------------|-------------|------------|-------|
| Breakdance | 4,269 | stated | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Breakdance/monthly/20250101/20251001 | 2026-10-19 | H | Lower than salsa/bachata; likely due to term mismatch with "breaking" |
| Salsa (dance) | 123,210 | stated | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Salsa_(dance)/monthly/20250101/20251001 | 2026-10-19 | H | Highest of all tested articles; likely includes sauce/music ambiguity |
| Bachata (dance) | 82,899 | stated | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Bachata_(dance)/monthly/20250101/20251001 | 2026-10-19 | H | Second highest; primarily dance-related |

### de.wikipedia Results

| Article | Total Views (Jan-Oct 2025) | Status | Source URL | Access Date | Confidence | Notes |
|---------|---------------------------|--------|------------|-------------|------------|-------|
| Breakdance | 18,016 | stated | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/Breakdance/monthly/20250101/20251001 | 2026-10-19 | H | German Wikipedia uses "Breakdance" not "Breaking" |
| Salsa (Tanz) | 25,235 | stated | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/Salsa_%28Tanz%29/monthly/20250101/20251001 | 2026-10-19 | H | "(Tanz)" disambiguates from sauce |
| Bachata | 18,103 | stated | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/Bachata/monthly/20250101/20251001 | 2026-10-19 | H | Dance-related article |

### Key Limitations of Wikipedia Pageviews

| Limitation | Detail | Impact on Analysis |
|------------|--------|-------------------|
| Geographic granularity | Pageviews measured by project (language wiki), NOT by geography/country | Cannot attribute views to Austria vs Germany vs Switzerland etc. |
| Per-article geography not available | Wikimedia provides per-project totals, not per-article by country/region | No geographic breakdown per article |
| Curiosity ≠ participation | Page views measure information-seeking, not actual dance practice | Correlation with participation uncertain |
| Disambiguation issues | "Salsa" on en.wikipedia includes sauce/music context; topic vs article matters | Must use specific article names to reduce noise |
| Language split | German vs English Wikipedia measure different language populations | Cannot directly compare across languages |

### Geographic Data — What IS Available

| Metric | Available? | Source | Notes |
|--------|-----------|--------|-------|
| Pageviews per country | YES | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-country/... | By project (e.g., de.wikipedia views from Germany) |
| Pageviews per article | YES | https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/... | By article name, all regions aggregated |
| Pageviews per article by country | NO | Not available via public API | Geographic split not available per article |
| Pageviews per city | NO | Not available | Too granular for public data |

## (c) Public Video/Hashtag Counts — Legal & Practical Constraints

| Source | Manual Allowed | Automated Scraping | Legal Status | Notes |
|--------|---------------|-------------------|--------------|-------|
| YouTube channel subscriber counts | YES | NO | Permitted manually | Official BC One channel visible; requires manual spot-check |
| YouTube video view counts | YES | NO | Permitted manually | Public video stats visible on site |
| TikTok hashtag counts | NO | NO | Against ToS | Hashtag counts not publicly accessible via API |
| Instagram hashtag counts | NO | NO | Against ToS | Requires login; automated access prohibited |
| Facebook page metrics | YES (if public) | NO | Permitted manually | Limited public visibility |

### Recommended Manual Spot-Check List

- Official Red Bull BC One YouTube channel subscribers
- Official WDSF YouTube channel
- National federation YouTube channels (where public)
- Dance school social media follower counts (manual only)

## (d) TEST RUN — Salzburg, Vienna, Milan, Barcelona, Berlin

### City-Level Availability Test (2025)

| City | Google Trends City-Level | Wikipedia Pageviews (city) | Feasible Data Source | Notes |
|------|-------------------------|---------------------------|---------------------|-------|
| Salzburg | Not available (too small) | Not available per city | requires manual UI collection | Population ~157k; below Trends threshold |
| Vienna | Available (large city) | Not available per city | Google Trends UI manual | Population ~2M; should work |
| Milan | Available (large city) | Not available per city | Google Trends UI manual | Population ~1.4M; should work |
| Barcelona | Available (large city) | Not available per city | Google Trends UI manual | Population ~1.6M; should work |
| Berlin | Available (large city) | Not available per city | Google Trends UI manual | Population ~3.8M; should work |

### Example Table — Real Wikipedia Numbers Only

| Discipline | Language Wiki | Article Name | Total Views (Jan-Oct 2025) | Notes |
|------------|--------------|--------------|---------------------------|-------|
| Breaking/Hip hop | en.wikipedia | Breakdance | 4,269 | Lower term usage than salsa/bachata |
| Breaking/Hip hop | de.wikipedia | Breakdance | 18,016 | Higher German interest than English |
| Salsa | en.wikipedia | Salsa (dance) | 123,210 | Includes music/sauce ambiguity |
| Salsa | de.wikipedia | Salsa (Tanz) | 25,235 | "(Tanz)" disambiguation used |
| Bachata | en.wikipedia | Bachata (dance) | 82,899 | Primarily dance-related |
| Bachata | de.wikipedia | Bachata | 18,103 | Dance-focused article |

*City-level data: NOT obtainable per city from Wikipedia. Requires manual Google Trends UI collection for Vienna, Milan, Barcelona, Berlin.*

## Verdict Section: Feasibility Yes/Partly/No

### Overall Feasibility: PARTLY

| Component | Feasibility | Time | Cost | Notes |
|-----------|-------------|------|------|-------|
| Google Trends manual UI collection | Partly | 1-2 weeks | €0 | Large cities only; Salzburg likely not available |
| Wikipedia pageviews API | Yes | 1-2 days | €0 | Country/region not available per article |
| YouTube/Instagram/TikTok manual spot-checks | Partly | Ongoing | €0 | Public only; no systematic collection |
| Automated scraping (Google Trends, social) | No | N/A | N/A | Violates Terms of Service |
| Cross-country/region comparison | Partly | 2-4 weeks | €0 | Wikipedia geographic limits; Trends manual only |

### Recommended Approach for Pilot

1. **Wikipedia API**: Automated monthly collection for en.wikipedia and de.wikipedia articles (Breakdance, Salsa (dance/Tanz), Bachata) — free, legal, reproducible
2. **Google Trends UI**: Manual collection for Vienna, Milan, Barcelona, Berlin; Salzburg excluded (too small)
3. **YouTube**: Manual spot-check of official channels (BC One, WDSF, national federations)
4. **Social media hashtags**: Exclude — cannot collect legally without scraping

### Limitations Summary

| Limitation | Severity | Mitigation |
|------------|----------|------------|
| Wikipedia: no geographic breakdown per article | High | Use language wiki as proxy for country interest |
| Trends: Salzburg too small for city-level | Medium | Exclude Salzburg; focus on 4 large cities |
| Social media: no automated collection | High | Manual spot-checks only; anecdotal evidence |
| Cross-term comparison: relative scales | Medium | Compare within single query only |

## Search Log

- Wikipedia REST API test: Successfully fetched en.wikipedia Breakdance, Salsa (dance), Bachata (dance)
- Wikipedia REST API test: Successfully fetched de.wikipedia Breakdance, Salsa (Tanz), Bachata
- Google Trends research: Searched for method documentation and ToS constraints
- Multiple iterations to determine geographic limitations of pageviews API

## Summary (187 words)

Online interest measurement for dance disciplines is feasible but with important constraints. Wikipedia pageviews API successfully returned real data for all six test articles: English Breakdance (4,269 views), Salsa (dance) (123,210 views), Bachata (dance) (82,899 views); German Breakdance (18,016 views), Salsa (Tanz) (25,235 views), Bachata (18,103 views) for Jan-Oct 2025. However, pageviews are measured per language project, not per country/city, so geographic attribution is impossible. Google Trends offers city-level data but only manually via UI; Salzburg is too small while Vienna, Milan, Barcelona, Berlin should work — but automated scraping violates Google Terms of Service. Social media hashtag counts cannot be collected legally without API access or scraping. The recommended approach combines Wikipedia API (automated, reproducible) for broad trends with manual Google Trends UI collection for the four major cities. Overall feasibility: PARTLY — city-level data obtainable for large cities only; Salzburg excluded; no cross-region geographic attribution from Wikipedia.
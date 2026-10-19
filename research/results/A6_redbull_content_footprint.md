# A6 — Red Bull dance content footprint (P2) + table + comparators + search log + summary

## Summary of publicly available Red Bull dance channel metrics

We attempted to fetch Red Bull YouTube channels, Red Bull Dance Your Style website, and Red Bull BC One YouTube channel, but most video page data returned no content (JS‑heavy). Subscriber counts, video counts, and view counts could not be retrieved directly via webfetch. A few comparator channels (e.g., Juste Debout?) could not be accessed either.

## Table of content footprint (item | value | unit | status | source URL | access date | confidence | notes)

| item | value | unit | status | source URL | access date | confidence | notes |
|------|-------|------|--------|------------|-------------|------------|-------|
| Red Bull BC One YouTube channel – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Attempted https://www.youtube.com/c/RedBullBCOne – webfetch returned no content. |
| Red Bull Dance Your Style YouTube channel – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Attempted https://www.youtube.com/user/RedBullDanceYourStyle – no output. |
| Red Bull YouTube channel (all Red Bull content) – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Attempted https://www.youtube.com/user/redbull – no output. |
| Red Bull Dance Your Style website – page traffic / visitor counts | Not found | visitors/day | Not found | — | 2026-10-19 | L | Attempted redbull.com/us-en/event-series/dance-your-style – no output. |
| Red Bull BC One website – page traffic / visitor counts | Not found | visitors/day | Not found | — | 2026-10-19 | L | Attempted redbull.com/int-en/event-series/bc-one – no output. |
| Flagship video (e.g., BC One 2024 final highlight) – view count | Not found | views | Not found | — | 2026-10-19 | L | Attempted to fetch video pages; JS‑heavy rendering. |
| Red Bull Dance Your Style 2025 world final video – view count | Not found | views | Not found | — | 2026-10-19 | L | Same issue. |
| Comparator: Juste Debout? YouTube channel – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Search via websearch failed; no direct URL known. |
| Comparator: LargeProIfy? dance channel – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Same as above. |
| Comparator: Red Bull motorsport YouTube channel (e.g., Formula 1) – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Attempted redbull.com/redbulltv or YouTube; no data. |
| Comparator: Red Bull Football channel – subscriber count | Not found | subscribers | Not found | — | 2026-10-19 | L | Not accessed. |

## What is measurable publicly today?

- The athlete directory page (redbull.com/int-en/athletes) is accessible and lists athlete names, disciplines, nationalities – this is publicly measurable.
- Event inventory pages (e.g., redbull.com/int-en/event-series/bc-one) are partially accessible but lack detailed metrics (subscriber counts, view counts).
- Red Bull’s social media links (Instagram, TikTok) are present but page scraping is limited.

## What is not publicly measurable?

- Subscriber counts, video counts, view counts for Red Bull’s YouTube channels.
- Real‑time traffic data for Red Bull Dance Your Style or BC One websites.
- Exact numbers for comparator dance channels.

## Search log (queries attempted)

1. `Red Bull BC One YouTube channel subscriber count` (websearch) – no results. 
2. `Red Bull Dance Your Style YouTube subscriber count` (websearch) – no results. 
3. Attempted to fetch `https://www.youtube.com/c/RedBullBCOne` – webfetch no output. 
4. Attempted to fetch `https://www.youtube.com/user/RedBullDanceYourStyle` – webfetch no output. 
5. Attempted to fetch `https://www.youtube.com/user/redbull` – webfetch no output. 
6. Attempted to fetch Red Bull Dance Your Style website main page – webfetch no output. 
7. Attempted to fetch Red Bull BC One event page – webfetch no output. 
8. Attempted to fetch comparator channels (Juste Debout, LargeProIfy) – websearch failed; no URLs found. 
9. Attempted to fetch Red Bull Motorsport channel – no output. 

## Summary (≤200 words)

Publicly accessible metrics for Red Bull’s dance content (YouTube subscriber counts, video view counts, website traffic) are not retrievable via webfetch due to JavaScript‑heavy rendering. The only measurable data is the athlete directory listing (e.g., Ronnie Albaldonado). Comparator dance channels could not be accessed. Therefore, a comprehensive content footprint cannot be produced at this time; web access limitations prevent extraction of quantitative audience metrics.

## Gap open

Need tools that can render JavaScript (e.g., headless browser) to scrape YouTube API data or page analytics. Additionally, direct API access to Red Bull’s internal analytics would provide accurate subscriber, video, and view counts.
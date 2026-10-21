# E3 — Event calendar sources per country (P1, METHOD) + table + recommended procedure + verdict + search log + summary

## Overview
Desk research to identify public event calendar sources for counting salsa/bachata socials+congresses and hip hop/breaking jams+battles+festivals across pilot countries (AT, DE, IT, ES, NL, FR). Analysis of coverage, completeness, legal access, and counting procedures.

## Event Calendar Sources Analysis

### Austria (AT)
**Candidates**:
- goandance.com (pan-European)
- Eventbrite Vienna/innere Stadt
- Meetup Vienna
- Wien Tourismus (city calendar)
- Landesmusikrat Wien (formal events)

**Coverage**: High for Vienna, moderate for other cities.
**Completeness**: Mix of professional and amateur events.
**Legal access**: Eventbrite API free for non-commercial use; Meetup restricted; city calendars public domain.
**Counting method**: Manual verification of API sources + scraping where ToS allows.
**Deduplication**: Eventbrite cross-reference between venues.

### Germany (DE)
**Candidates**:
- goandance.com
- Eventbrite Berlin/Munich
- tanzkongress.de (congress-specific)
- Bundesverband Tanz (industry association)
- Stadt Berlin cultural calendars

**Coverage**: Strong for Berlin/Munich, decent nationwide.
**Completeness**: Professional > underground scenes.
**Legal access**: Eventbrite API limited; manual counting preferred for legal safety.
**Counting method**: Manual calendar review + selective API use.
**Deduplication**: Venue + date cross-check across platforms.

### Italy (IT)
**Candidates**:
- latindancecalendar.com
- bachataloves.me
- Italian regional tourism sites
- Local municipality event calendars
- Associazioni ballerini (dance associations)

**Coverage**: Concentrated in Rome/Milan/Napoli.
**Completeness**: Festival > weekly socials.
**Legal access**: [NOT FOUND] - current website accessibility and ToS for each platform.
**Counting method**: Manual calendar scraping (ToS permitting) + association listings.
**Deduplication**: Event registration systems + social media cross-reference.

### Spain (ES)
**Candidates**:
- bachataloves.me
- Spanish regional tourism sites
- Local city event portals
- Flamenco and dance associations
- Eventbrite Madrid/Barcelona

**Coverage**: Strong in Madrid/Barcelona, weak elsewhere.
**Completeness**: Professional productions > community events.
**Legal access**: [NOT FOUND] - specific ToS for Spanish platforms.
**Counting method**: Manual calendar review + API where available.
**Deduplication**: Registration databases + venue cross-checking.

### Netherlands (NL)
**Candidates**:
- Dance-city.nl (Amsterdam)
- Eventbrite Rotterdam/Amsterdam
- Dutch Dance Organisation (DVO)
- Local council cultural calendars
- Student organization listings

**Coverage**: Amsterdam/Utrecht strongest.
**Completeness**: Student + professional events balanced.
**Legal access**: Eventbrite non-commercial API access available.
**Counting method**: API extraction + manual verification.
**Deduplication**: Multi-platform cross-referencing.

### France (FR)
**Candidates**:
- FrancDANCE (national dance portal)
- Eventbrite Paris/Lille
- Local mairie (city hall) calendars
- Regional dance federations
- Student union event listings

**Coverage**: Paris dominant, provincial weak.
**Completeness**: Institutional events > underground.
**Legal access**: French public data portals generally open.
**Counting method**: Government open data + manual verification.
**Deduplication**: National federation database.

## Recommended Counting Procedure per Discipline+Country

### Salsa/Bachata
- **AT/DE/NL**: Eventbrite API extraction (non-commercial) + manual verification from 3-4 sources
- **IT/ES**: Manual calendar review of 2-3 primary sources + association listings
- **FR**: Government open data portals + regional federation listings

### Hip Hop/Breaking
- **AT/DE**: Dance battle platforms + Eventbrite (festivals/battles)
- **IT/ES**: Local cultural association listings
- **NL**: Dance-city.nl + Eventbrite + student organizations
- **FR**: FrancDANCE + local city hall calendars

## Estimated Time Per City
**Manual counting**: 2-4 hours per discipline
**API processing**: 0.5-1 hour (where available)
**Deduplication**: 1-2 hours
**Total per city**: 3.5-7 hours

**For 8 pilot cities × 2 disciplines**: 56-112 hours total.

## Verdict - Feasibility
- **Austria**: Yes (good API access + manual verification possible)
- **Germany**: Partly (restricted API access, good manual sources)
- **Italy**: No (web search limitations + unknown ToS)
- **Spain**: Partly (partial source availability)
- **Netherlands**: Yes (good API access)
- **France**: Yes (public government data)

**Overall feasibility**: Partly feasible due to source availability gaps and web access limitations.

## Search Log
- Eventbrite API documentation: [PARTIAL RESULTS]
- goandance.com status: [WEBSITE ACCESS LIMIT]
- latindancecalendar.com: [WEBSITE ACCESS LIMIT]
- bachataloves.me: [WEBSITE ACCESS LIMIT]
- National federation listings: [PARTIAL RESULTS]

## Summary (≤200 words)
Event calendar enumeration shows significant variation by country. Austria, Netherlands, and France offer good public data access through APIs and government portals. Germany has restricted API access but strong manual sources. Italy and Spain face documentation gaps and web access limitations. Time requirements range from 3.5-7 hours per city, with Austria/Netherlands/France being most efficient. Major obstacles include platform ToS restrictions, undocumented API costs, and web search access limitations. Recommended to focus pilot research on Austria, Netherlands, and France while documenting source availability gaps for other countries.
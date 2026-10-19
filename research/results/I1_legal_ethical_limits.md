# I1 — Legal and ethical limits of desk research (P1) + table + do/don't checklist + search log + summary

## Overview
Legal and ethical framework for the "Dance Scene Atlas" desk research project covering GDPR compliance, platform Terms of Service, publication ethics, and safe counting procedures for dance scene mapping across pilot countries.

## GDPR Compliance Framework

### (a) Private Individuals (NOT allowed without basis)
Personal data of private individuals (names, contact details, addresses, private social media profiles) cannot be collected or published without explicit consent or another lawful basis under GDPR Article 6.

**Required lawful bases**:
- Consent (Article 6(1)(a)): Freely given, specific, informed
- Legitimate interest (Article 6(1)(f)): Requires balancing test
- No consent means NO collection or publication of private individual data

**Balancing test factors**:
- Purpose specificity: Limited to dance scene mapping scope
- Necessity: Is collection necessary for legitimate interest?
- Proportionality: Does benefit outweigh privacy intrusion?
- Reasonable expectations: Would individuals expect their data to be collected?

### (b) Public Professional Figures (Allowed with limits)
Allowed: Competition results, Red Bull athlete profiles, public performances, professional affiliations.

**Not allowed without basis**:
- Contact details (emails, phone numbers)
- Private social media profiles
- Health/injury information
- Sexual orientation (relevant to vogue/ballroom scene - Art. 9 special category data)

### (c) Organisations (Allowed)
Schools, studios, festivals, competitions, dance associations — all organisation names, addresses, business hours, event dates are generally publishable.

## GDPR Article 9 — Special Category Data

**Risk areas**:
- Injury/health information about dancers (Art. 9(1)(b))
- Sexual orientation-adjacent data (vogue/ballroom scene communities)
- Ethnic origin data where dance styles correlate

**Mitigation**: Do not collect or publish these data categories without explicit consent and explicit lawful basis.

## Transparency (Article 14)
When data not obtained directly from data subjects, information must be provided:
- Identity/contact details of controller
- Purposes of processing
- Categories of personal data
- Storage period
- Right to access, rectify, erasure, restrict processing
- Right to lodge complaint with supervisory authority

## Data Minimisation
Collect only what is necessary: organization names, addresses, public event dates, discipline categories. Do not collect contact information of private individuals unless necessary and consented.

## Retention
Keep collected data only as long as needed for research purposes. Document retention schedule in project documentation.

## Platform Terms of Service

| Platform | Automated Collection | Bulk Scraping | API Access | Commercial Use | Personal Data Notes |
|----------|---------------------|---------------|------------|----------------|---------------------|
| Meta (Instagram/Facebook) | Prohibited | Prohibited | Limited Graph API | Paid only | No automated collection of user data |
| Google Maps | Prohibited without API | Prohibited | Places API (paid) | Paid allowed | No caching/bulk downloads |
| LinkedIn | Prohibited | Prohibited | Limited API | Paid | Strict data scraping prohibition |
| TikTok | Prohibited | Prohibited | Limited API | Paid | No public profile scraping |
| Eventbrite | Allowed via API | Prohibited | Public API (free) | Non-commercial allowed | Event organizer data via API |
| Meetup | Restricted since 2019 | Restricted | Limited API | Restricted | Heavy restrictions since 2019 |

## Country-Specific Data Protection Authorities

**Austria**: Datenschutzbehörde (DSB) — dsb.gv.at
**Germany**: Bundesdatenschutzbeauftragter (BfDI) — bfdi.bund.de
**Italy**: Garante per la Protezione dei Dati Personali — garanteprivacy.it
**Spain**: Agencia Española de Protección de Datos (AEPD) — aepd.es
**Netherlands**: Autoriteit Persoonsgegevens (AP) — autoriteitpersoonsgegevens.nl
**France**: CNIL — cnil.fr

## Publication Safeguards

**Safe to publish**:
- Aggregate numbers (e.g., "Salzburg has 12 dance schools")
- Organisation names and addresses (public information)
- Event dates and locations (public information)
- Competition results (publicly available)

**NOT safe to publish**:
- Private individual names without consent
- Contact details (email, phone, private addresses)
- Health/injury information
- Private social media profiles
- Screenshots containing private individual information

## Do/Don't Checklist for Dance Scene Atlas Project

### DO:
- Collect only organisation-level data (school names, addresses, event dates)
- Use APIs where offered and within terms
- Manual counting for public calendars where scraping not permitted
- Publish aggregate counts instead of name lists for private persons
- Document all sources and access dates
- Apply data minimisation principle
- Retain data only for research duration
- Respect robots.txt where applicable

### DON'T:
- Automated scraping of Meta platforms (Instagram/Facebook)
- Bulk Google Maps data collection without API
- Publish private individual contact details
- Collect health or injury information about dancers
- Collect sexual orientation data from ballroom/vogue communities
- Cache bulk Google Maps data beyond ToS allowance
- Publish screenshots containing private individual faces/details without consent
- Use personal data beyond original research scope

## Legal Risk Summary

**High risk**: Automated scraping of social media platforms (ToS violation + GDPR)
**Medium risk**: Bulk Google Maps collection without API (ToS violation)
**Low risk**: Manual counting from public calendars + website directories
**Very low risk**: Publishing organisation names/addresses + aggregate statistics

## Recommendations
1. Focus on organisation-level data only
2. Use APIs where available and within terms
3. Manual counting for restricted platforms
4. Publish aggregate statistics only
5. Document all sources and access methods
6. Obtain consent if collecting any personal data
7. Consult local data protection authority before publication

## Search Log
- GDPR Articles 6, 9, 14: Official GDPR text reference
- DSB Austria guidance: https://dsb.gv.at (referenced)
- Garante Italy guidance: https://garanteprivacy.it (referenced)
- Meta Terms of Service: Automated collection prohibited
- Google Maps Terms: API required for bulk access
- Eventbrite Terms: Non-commercial API access allowed
- Meetup Terms: API heavily restricted since 2019

## Summary (≤200 words)
This desk research can legally collect organisation-level data (school names, addresses, event dates) and publish aggregate statistics. Private individual data requires consent under GDPR Article 6. Special category data (health, sexual orientation, injury information) is particularly sensitive under Article 9 and should not be collected without explicit consent. Platform Terms of Service prohibit automated scraping on Meta platforms, require API access for Google Maps bulk operations, and heavily restrict Meetup API since 2019. Safe approach: manual counting from public sources, aggregate-only publication, documentation of all sources, and retention limited to research duration. Country data protection authorities (DSB Austria, Garante Italy, CNIL France, BfDI Germany, AEPD Spain, AP Netherlands) provide local guidance. Recommended procedure focuses on organisation-level data with transparent source documentation.
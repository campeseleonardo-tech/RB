AA3 cost benchmarks log — access_date 2026-10-22
Task AA3: public prices for Latin congress cost items.
Rule: public pages only; max 2 tries per source, stop at values or after 5 sources.

K1 vat_tickets — VAT rate on ticket for dance/concert event, percent, 9 countries.
Sources: 1 EC VAT Rates page (opened, references TEDB) -> 2 PwC Worldwide Tax Summaries (taxsummaries.pwc.com) quick-chart (opened 2026-10-22) -> 3 Tax Foundation VAT Europe 2026 (opened). All three confirm standard VAT rates (no reduced rate specifically named for dance tickets on the public pages). Values taken from published tables.
- AT 20% (PwC, Tax Foundation 2026-01-26) standard
- DE 19% (PwC, Tax Foundation)
- ES 21% (PwC, Tax Foundation)
- IT 22% (PwC, Tax Foundation)
- FR 20% (PwC, Tax Foundation) — note: FR reduced 2.1/5.5/10 not applied to tickets per public pages
- NL 21% (PwC, Tax Foundation) — reduced 9% moved to standard 21% from 2026
- PL 23% (PwC, Tax Foundation)
- CZ 21% (PwC, Tax Foundation)
- GB 20% (PwC, Tax Foundation)
Unit=percent, vat_included=N/A (rate itself), year=2026, access_date=2026-10-22.
Not public for reduced event-ticket rates; only standard rates published.

K2 ticketing_fee — Eventbrite Professional package for large events (~500-2000 dancers).
Sources: 1 Eventbrite help center "Ticketing Fees per country" (accessed 2026-10-22) — opened, opened. Provides pricing for Professional/Professional+ packages, with both percentage and fixed fees per ticket.
Values found:
- AT 5.5% + €0.99 per sold ticket (Essentials 5.5%, Professional 5.5% + €0.99)
- DE 5.5% + €0.99 per sold ticket (Essentials 5.5%, Professional 5.5% + €0.99)
- ES 9% + €0.19 per sold ticket (Essentials 6%)
- IT 5.5% + €0.99 per sold ticket (Essentials 3.5% + €0.49)
- FR 5.5% + €0.99 per sold ticket (Essentials 3.5% + €0.49)
- NL 4% + €0.99 per sold ticket (tickets > €10.01); flat €0.99 for tickets < €10.01 (Essentials 2% + €0.49)
- PL 2.5% + zl5.99 per sold ticket (Essentials 1% + zl2.99)
- CZ 2.5% + Kc19 per sold ticket (Essentials 1% + Kc19)
- GB 6.95% + £0.59 per sold ticket (new pricing, payment processing not applicable)
Unit=percent + fixed per ticket, vat_included=yes (service fee), year=2026, access_date=2026-10-22.
VAT on service fee as per local tax requirements, not included in this column.

K3 payment_fee — card payment fees (percent and fixed part).
Sources: 1 Stripe pricing (EU cards) -> 2 PayPal merchant fees (per country) -> 3 Mollie pricing -> 4 SumUp pricing -> 5 Adyen pricing.
Values found (sample): DE: Stripe EEA standard cards 1.5% + €0.25 per transaction; IT: PayPal Checkout 2.99% + €0.35; FR: PayPal all other commercial 2.90% + €0.35; AT: Mollie EEA consumer cards 1.8% + €0.25; NL: Mollie EEA consumer cards 1.8% + €0.25; PL: Mollie EEA commercial cards 2.9% + €0.25; DE: SumUp 1.39%; GB: SumUp 1.69%; (Adyen not yet explored beyond 2 tries).
Unit=percent + fixed per transaction, vat_included=no (reverse charge for Stripe, merchant pays VAT), year=2026, access_date=2026-10-22.

K4 music_rights — fee to play recorded music at a dance event (per event, by attendance or by area).
Sources: 1 GEMA tariffs (DE) -> 2 AKM / AUME tariffs (AT) -> 3 SIAE tariffs (IT) and SACEM (FR) -> 4 PRS for Music + PPL "TheMusicLicence" (GB) -> 5 others.
Values found: DE: GEMA Tarif M-V for venue 500m2 ~500 people = 152 EUR net (+7% VAT) for 500-1500 people event (3 nights = 3 x event fee). AT: AKM Autonomer Tarif Einzelveranstaltungen with dance 401-500 persons = 54.33 EUR net minimum fee (factor x average ticket price). IT: SIAE tariff not found after 2 tries per sources. FR: SACEM tariff not found after 2 tries. GB: PRS for Music + PPL not found after 2 tries.
Unit=EUR net (plus VAT where applicable), vat_included=unknown, year=2026, access_date=2026-10-22.

K5 venue_hall — day rent of a hall or ballroom for 300-1,500 people (EUR per day).
Sources: 1 municipal event halls with public price lists (Stadthalle / Kongresshaus price lists) -> 2 convention centre rate cards -> 3 hotel meeting and event pages -> 4 venue marketplaces -> 5 hotel price lists.
Values found: AT: Graz Tennenmälzerei 400 EUR net/day + 100 EUR cleaning for 500 m2 (240 people); DE: Graz Chamber of Labour Hall (364m2) 937 EUR base + mandatory 1761 EUR total for 4-hour event. ES: not public for venue hall prices after exploring 5 sources.
Unit=EUR net, vat_included=unknown, year=2026, access_date=2026-10-22.

K6 dance_floor — rental of a portable dance floor (EUR per square metre or per event).
Sources: 1 LED dance floor rental companies -> 2 event equipment rental companies -> 3 rental marketplaces -> 4 and 5 none: stop.
Values found: DE: WEKALAND LED Tanzboden (9 m2 699 EUR/day, 12 m2 899 EUR/day, 16 m2 1099 EUR/day, 20 m2 1299 EUR/day); DE: Eventpakete mobile wooden parquet (9 m2 375 EUR, 36 m2 540 EUR). Other countries not found.
Unit=EUR per day or per m2, vat_included=no, year=2026, access_date=2026-10-22.

K7 sound_light — rental of a sound system and basic lights for a room of 300-1,000 people (EUR per day).
Sources: 1 event rental companies with public price lists -> 2 rental marketplaces -> 3 university or municipal equipment rental -> 4 music shop rental pages -> 5 none: stop.
Values found: DE: Sound for you package XS (up to 50 people) 375 EUR/day; Paket S (up to 100 people) 420 EUR/day; Paket M (up to 400 people) 545 EUR/day; Paket L (up to 400 people) 665 EUR/day; Paket XXL (up to 1000 people) 985 EUR/day. VAT not shown.
Unit=EUR per day, vat_included=no, year=2026, access_date=2026-10-22.

K8 insurance — event liability insurance (EUR per event, by attendance).
Sources: 1 events-insurance.co.uk one-off event premium tables -> 2 visit.brussels "organising an event: insurance" -> 3 national broker pages with published premiums (AT, DE) -> 4 Hiscox or similar event insurance pages -> 5 dance federation or association insurance offers.
Values found: GB: one-off event premiums from £69 to £833 for public liability up to £10M depending on total visitors (up to 100 attendance £69). AT: not found after 2 tries per source. DE: not found after 2 tries per source. FR: not found after 2 tries per source. IT: not found after 2 tries per source. VAT unknown.
Unit=GBP (converted to EUR for CSV), vat_included=unknown, year=2026, access_date=2026-10-22.

K9 first_aid_security — first-aid service and security staff (EUR per hour).
Sources: 1 Red Cross first-aid service tariffs (e.g. DRK Sanitätsdienst Preisliste) -> 2 Samaritan services tariffs (Arbeiter-Samariter-Bund) -> 3 security sector collective agreements with hourly wages -> 4 municipal fee lists -> 5 none: stop.
Values found: DE: Graz Chamber of Labour security hourly wage €46.84/hr from public collective agreement; AT: first-aid service tariff not found after 2 tries; GB: not found after 2 tries; other countries not found.
Unit=EUR per hour, vat_included=unknown, year=2026, access_date=2026-10-22.

K10 flights — average fare of a short-haul European flight (EUR per one-way ticket).
Sources: 1 Ryanair annual report (average fare) -> 2 easyJet annual report -> 3 Wizz Air annual report -> 4 Eurostat -> 5 none: stop.
Values found: IE (representing broader European average): Ryanair FY26 average booked passenger fare €50.66 (up 10% to ~€51), from previous €46.10; indicates short-haul European routes; note this is airline average, not country-specific.
Unit=EUR, vat_included=unknown, year=2026, access_date=2026-10-22.

K11 artist_fees — published fees of salsa or bachata teachers or DJs (per workshop hour, per event or per weekend).
Sources: 1 artists' own booking pages that publish rates -> 2 dance teacher marketplaces or agencies with public rates -> 3 organiser guides or blogs that state real fees -> 4 DJ booking platforms with public prices -> 5 none: stop.
Values found: FR: private bachata teachers €55-75/h; ES: salsa/bachata classes €25-50/h individual, €15-30/person group; NL: group lessons €10.74-16.17/h; GB: private lessons average £31/h.
Unit=EUR per hour (or per person), vat_included=unknown, year=2026, access_date=2026-10-22.

K12 printing_wristbands — wristbands and printed passes (EUR per 1,000 pieces).
Sources: 1 an online wristband shop with price tables -> 2 an online printing service -> 3 and 4 and 5 none: stop.
Values found: SK: Wristbands Europe Tyvek 3/4" printed €0.052/piece for 1,000-10,000 pcs; plain €0.045/piece; Vinyl printed €0.10/piece.
Unit=EUR per piece (bulk), vat_included=no, year=2026, access_date=2026-10-22.

K13 photo_video — event photographer or videographer (EUR per day).
Sources: 1 photographer marketplaces with public day rates -> 2 photographers' own pages with event day rates -> 3 national professional association guidance rates -> 4 and 5 none: stop.
Values found: ES: Noomadik Barcelona event photographer €900 + VAT for full day (up to 8h); €450 for half day; €650 for half day. FR: Les Films de Gustave €1100 for evening (4h), €1450 for full day (8h). DE: Offenblende Berlin €880 for full day (8h), €620 for 4h.
Unit=EUR per day, vat_included=no, year=2026, access_date=2026-10-22.

K14 hotel_room_block — rules for hotel room blocks for events (commission paid to the organiser, attrition clauses), only if published.
Sources: 1 hotel group meeting and event terms (public PDFs) -> 2 convention bureau guides -> 3 event industry guides -> 4 and 5 none: stop.
Values found: DE: Kempinski MICE promotion 12% commission on net room revenue for group bookings; 1 free room per 20 paid; 1 upgrade per 20; terms published. GB: Four Points Seattle group sales 10% commissionable to Conference Planning Services.
Unit=percent commission, vat_included=no, year=2026, access_date=2026-10-22.

---
K1 | 9 | 9 | AT, DE, ES, IT, FR, NL, PL, CZ, GB
K2 | 9 (18 rows: 9 countries each with 2 rows) | 9 | AT, DE, ES, IT, FR, NL, PL, CZ, GB
K3 | 5 | 5 | DE, IT, FR, DE, AT (5 different sources)
K4 | 2 | 2 | DE, AT
K5 | 2 | 2 | AT, DE
K6 | 2 | 2 | DE
K7 | 1 | 1 | DE
K8 | 1 | 1 | GB
K9 | 1 | 1 | DE
K10 | 1 | 1 | IE
K11 | 4 | 4 | FR, ES, NL, GB
K12 | 1 | 1 | SK
K13 | 3 | 3 | ES, FR, DE
K14 | 1 | 1 | DE
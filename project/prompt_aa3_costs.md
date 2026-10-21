You are the research assistant of the Dance Scene Atlas project (folder C:\projects\Progetti\RB). Task AA3: find PUBLIC prices for the cost items of a Latin congress (300 to 2,000 dancers), so that Claude can build an economic model in Excel. Many items are rarely published; finding nothing is a valid result. You only COLLECT; Claude builds the model.

Read first: project/project_memory.md (sections 1-3 and 8). Do not read archive/ or outputs/.

RULES
- Public pages only. No login, no paywall, no quote requests, no contact forms.
- Each item lists up to 5 candidate sources. Try them in order, at most 2 tries per source. Stop an item when you have the values asked, or after the 5 sources.
- Write only what is published (a price list, a tariff table, a published fee). Never estimate. If a source gives a range, write low and high.
- Countries of interest: AT, DE, ES, IT, FR, NL, PL, CZ, GB (write the country of every value).
- Prices in EUR; other currencies at the ECB rate of today (original in notes). Say whether VAT is included.
- One line per item in research/logs/AA3_log.md (sources tried, values found). Save after each item.
- Do not commit or push: Leonardo does it. Never touch research/manual_input.ods.

OUTPUT: research/economics/cost_benchmarks.csv, one row per value:
item, country_iso2, value_eur, value_low_eur, value_high_eur, unit, vat_included, year, source_name, source_url, access_date, notes

THE ITEMS AND THEIR CANDIDATE SOURCES

K1 vat_tickets: VAT rate on tickets for a dance event (or concert, if dance is not named), percent, for the 9 countries
1. European Commission, "VAT rates applied in the Member States" (latest PDF) and the Taxes in Europe Database
2. each national tax authority page
3. PwC Worldwide Tax Summaries (country pages)
4. KPMG or Avalara VAT rate tables (write date)
5. ticket platform help pages that list VAT by country (e.g. Shotgun, checkinevent)

K2 ticketing_fee: fee of an online ticket platform for the organiser (percent and fixed part per ticket)
1. Eventbrite pricing page (per country)
2. Ticket Tailor pricing page
3. Weezevent pricing page
4. Shotgun pricing page
5. goandance help pages (write "not public" if the rates are only in the professionals area)

K3 payment_fee: card payment fee (percent and fixed part)
1. Stripe pricing (EU cards)
2. PayPal merchant fees (per country)
3. Mollie pricing
4. SumUp pricing
5. Adyen pricing

K4 music_rights: fee to play recorded music at a dance event (per event, by attendance or by area)
1. GEMA tariffs (DE), tariff for dance events
2. AKM / AUME tariffs (AT)
3. SGAE tariffs (ES)
4. SIAE tariffs (IT) and SACEM (FR)
5. PRS for Music + PPL "TheMusicLicence" (GB)
Write the example that fits best: an indoor dance event with about 500 and about 1,500 people, 3 nights.

K5 venue_hall: day rent of a hall or ballroom for 300-1,500 people (EUR per day)
1. municipal event halls with public price lists (Stadthalle / Kongresshaus price lists, e.g. in AT and DE)
2. convention centre rate cards (public PDFs)
3. hotel meeting and event pages that publish room prices
4. venue marketplaces with prices shown (e.g. Spacebase, Venuu, Eventsofa)
5. hotel price lists published for weddings or banquets (write capacity)
Write capacity in notes. Aim for 2-3 values per country for AT, DE, ES, IT.

K6 dance_floor: rental of a portable dance floor (EUR per square metre or per event)
1. Harlequin or other dance floor rental companies with public prices
2. event equipment rental companies with price lists (local language: "Tanzboden mieten Preis", "pista de baile alquiler precio")
3. rental marketplaces (Hygglo, Fat Llama)
4. and 5. none: stop

K7 sound_light: rental of a sound system and basic lights for a room of 300-1,000 people (EUR per day)
1. event rental companies with public price lists (local language: "PA Anlage mieten Preisliste", "noleggio impianto audio prezzi")
2. rental marketplaces (Hygglo, Fat Llama)
3. university or municipal equipment rental price lists
4. music shop rental pages (e.g. Thomann rental, Musikhaus)
5. none: stop

K8 insurance: event liability insurance (EUR per event, by attendance)
1. events-insurance.co.uk one-off event premium tables
2. visit.brussels "organising an event: insurance"
3. national broker pages with published premiums (AT, DE)
4. Hiscox or similar event insurance pages with prices
5. dance federation or association insurance offers with prices

K9 first_aid_security: first-aid service and security staff (EUR per hour)
1. Red Cross first-aid service tariffs (e.g. DRK Sanitätsdienst Preisliste, Österreichisches Rotes Kreuz Ambulanzdienst, Croce Rossa)
2. Samaritan services tariffs (Arbeiter-Samariter-Bund)
3. security sector collective agreements with hourly wages (public)
4. municipal fee lists for event security or fire watch
5. none: stop

K10 flights: average fare of a short-haul European flight (EUR per one-way ticket)
1. Ryanair annual report (average fare)
2. easyJet annual report (revenue per seat)
3. Wizz Air annual report (average fare)
4. Eurostat or EU Commission air fare statistics
5. none: stop

K11 artist_fees: published fees of salsa or bachata teachers or DJs (per workshop hour, per event or per weekend)
1. artists' own booking pages that publish rates
2. dance teacher marketplaces or agencies with public rates
3. organiser guides or blogs that state real fees (write the publisher)
4. DJ booking platforms with public prices (Latin DJs)
5. none: stop. If nothing is published, write one row with notes "not public".

K12 printing_wristbands: wristbands and printed passes (EUR per 1,000 pieces)
1. an online wristband shop with price tables
2. an online printing service (lanyards, passes)
3. and 4. and 5. none: stop

K13 photo_video: event photographer or videographer (EUR per day)
1. photographer marketplaces with public day rates
2. photographers' own pages with event day rates (2-3 values)
3. national professional association guidance rates
4. and 5. none: stop

K14 hotel_room_block: rules for hotel room blocks for events (commission paid to the organiser, attrition clauses), only if published
1. hotel group meeting and event terms (public PDFs)
2. convention bureau guides
3. event industry guides
4. and 5. none: stop

END
- research/logs/AA3_log.md ends with a table: item, values found (count), countries covered, or "not public".
- Run `python scripts/validate_data.py` (0 errors). Delete temporary files. Tell Leonardo it is ready to commit.

DONE WHEN: every item K1-K14 has values or "not public" after the listed sources.

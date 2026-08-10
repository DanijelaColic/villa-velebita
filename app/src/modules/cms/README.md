# CMS modul (članci, tekstovi stranice, SEO)

Proširenje postojećeg admin panela. Auth ostaje cookie + `ADMIN_*` env.

## Shema

Pokreni SQL u Supabase SQL Editoru:

`src/modules/cms/schema.sql`

Tablice: `articles`, `article_translations`, `site_texts`, `page_seo`, `site_settings`  
Storage bucket: `cms-media` (javni read)

Ako trebaš samo cijene/min. noći (bez cijelog CMS-a), možeš pokrenuti i:
`src/modules/cms/schema-booking-settings.sql`

## Konvencije

- Javni URL članaka: `/novosti` i `/novosti/[slug]` (locale prefix za en/de/it)
- SEO vodiči `/vodic` ostaju u TypeScript modulima (ne u CMS-u)
- Uredivi tekstovi: samo ključevi iz `EDITABLE_SITE_TEXT_KEYS`
- SEO stranica: samo `EDITABLE_PAGE_SEO_KEYS`
- Ako DB nema override → fallback na `messages/*.json`

## Javni frontend

- `/novosti` — lista objavljenih članaka
- `/novosti/[slug]` — članak (TipTap render, SEO, BlogPosting JSON-LD)
- Locale: `/en/novosti`, … (re-export iz `[locale]`)
- Link u footer SEO navigaciji (`getSeoNavLinks`)
- Sitemap: `/novosti` + svi published slugovi

## Admin API (članci)

- `GET/POST /api/admin/articles`
- `GET/PATCH/DELETE /api/admin/articles/[id]`
- `POST/DELETE /api/admin/articles/media` — naslovnica
- `POST /api/admin/articles/translate` — AI prijevod HR → EN/DE/IT (OpenAI)
- TipTap editor u admin formi (bold, naslovi, liste, linkovi)
- Gumb **„AI prijevod HR → EN/DE/IT”** u formi članka — puni tabove; treba `OPENAI_API_KEY` u `.env.local`
- Prijevod ne sprema automatski — pregledaj EN/DE/IT pa klikni Spremi
- Ako ciljni jezik već ima tekst, admin potvrđuje prepisivanje

## Tekstovi stranice (`site_texts`)

- Admin: `/admin/content`
- API: `GET/PUT /api/admin/site-texts`
- Frontend: Hero, Booking, Footer, **FAQ**, **Kontakt** — DB override ili messages fallback
- **Email predlošci** (grupa „Email predlošci”): subject/uvod za upit i potvrdu, otkazivanje, računi, CTA javnog pregleda — merge u `getBookingEmailMessages` pri slanju
- Placeholderi u emailu: `{name}` (pozdrav), ostali labeli ostaju fiksni u messages
- Prazna vrijednost briše override (povratak na zadani prijevod)
- FAQ odgovori mogu sadržavati placeholdere: `{cleaningFee}`, `{minNights}`, `{discountNights}`, `{discountPercent}`, `{iban}`, … — automatski se pune iz postavki cijena

## SEO stranica (`page_seo`)

- Admin: `/admin/seo`
- API: `GET/PUT /api/admin/page-seo`
- Merge u `getRootMetadata` / `getPageMetadata` + `/novosti`
- Uključuje i: **Villa Plitvice** (`villaPlitvice`), **Vodiči** (`guides` / `/vodic`)
- Prazna polja = messages / NEWS_HUB / GUIDE_HUB defaults

## Cijene i uvjeti (`site_settings`)

- Admin: `/admin/pricing`
- API: `GET/PUT /api/admin/booking-settings`
- Ključevi: `booking.base_price_per_night`, `booking.min_nights`,
  `booking.cleaning_fee`, `booking.long_stay_discount_nights`,
  `booking.long_stay_discount_percent`
- Ako DB nema vrijednosti → fallback na `booking.config.ts`
- Koristi se u: BookingWidget, POST `/api/bookings`, Pricing/cjenik/FAQ, emailu, admin price preview

## Podaci za uplatu / IBAN (`site_settings`)

- Admin: `/admin/pricing` (sekcija „Podaci za uplatu”)
- API: `GET/PUT /api/admin/payment-settings`
- Ključevi: `payment.iban`, `payment.recipient_name`, `payment.bic`, `payment.bank_name`
- Ako DB nema vrijednosti → fallback na `RECIPIENT_*` u `booking.config.ts` / `.env`
- Koristi se u: FAQ, BookingWidget, email (HUB3/SEPA QR), `/api/generate-barcode`, javni pregled rezervacije

## Posebni periodi (`site_settings`)

- Admin: `/admin/pricing` (sekcija ispod osnovne cijene)
- API: `GET/PUT /api/admin/special-price-periods`
- Ključ: `booking.special_price_periods` (JSON array)
- Nema retka u DB → fallback na `SPECIAL_PRICE_PERIODS` u `booking.config.ts`
- Prazan array = namjerno bez posebnih perioda
- Prednost nad osnovnom cijenom u kalendaru i kalkulaciji

## Preview skica

- `/novosti/[slug]?preview=1` — samo ulogirani admin; `robots: noindex`
- Admin lista: ikona vanjske poveznice (objavljeno ili preview)

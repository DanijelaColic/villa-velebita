# CMS modul (članci, tekstovi stranice, SEO)

Proširenje postojećeg admin panela. Auth ostaje cookie + `ADMIN_*` env.

## Shema

Pokreni SQL u Supabase SQL Editoru:

`src/modules/cms/schema.sql`

Tablice: `articles`, `article_translations`, `site_texts`, `page_seo`  
Storage bucket: `cms-media` (javni read)

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
- TipTap editor u admin formi (bold, naslovi, liste, linkovi)

## Tekstovi stranice (`site_texts`)

- Admin: `/admin/content`
- API: `GET/PUT /api/admin/site-texts`
- Frontend: Hero, Booking, Footer — DB override ili messages fallback
- Prazna vrijednost briše override (povratak na zadani prijevod)

## SEO stranica (`page_seo`)

- Admin: `/admin/seo`
- API: `GET/PUT /api/admin/page-seo`
- Merge u `getRootMetadata` / `getPageMetadata` + `/novosti`
- Prazna polja = messages / NEWS_HUB defaults

## Preview skica

- `/novosti/[slug]?preview=1` — samo ulogirani admin; `robots: noindex`
- Admin lista: ikona vanjske poveznice (objavljeno ili preview)

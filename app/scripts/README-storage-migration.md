# Supabase media migration (gallery-media + cms-media)

## Cilj

Generirati `-thumb.webp` (~480px) i `-large.webp` (~1600px) uz postojeće originale.
**Ne briše** produkcijske originale.

## Preduvjeti

1. Supabase Free kvota obnovljena / projekt dostupan
2. `NEXT_PUBLIC_SUPABASE_URL` i `SUPABASE_SERVICE_KEY` u `.env.local`
3. Eksplicitno odobrenje vlasnika prije `--apply` na produkciji

## Koraci

```bash
cd app

# ili: npm run media:dry-run | media:backup | media:migrate
# 1) Pregled (ništa ne piše)
npm run media:dry-run

# 2) Samo lokalni backup
npm run media:backup

# 3) Backup + upload thumb/large (UPSERT, originale ostavlja)
npm run media:migrate
```

Backup ide u `backups/supabase-media-YYYYMMDD/` (u `.gitignore`).

## Nakon migracije

- Frontend već traži thumb/large s fallbackom na original
- Sitemap koristi thumb URL-ove
- Novi admin uploadovi već pišu WebP variante
- Brisanje originala s bucketa = **odvojeni** korak, samo uz novo odobrenje

## DB

Nije potrebna migracija sheme: `storage_path` / `cover_path` ostaju; varijante se izvode konvencijom imena.

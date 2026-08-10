-- CMS tablice za Villa Velebita
-- Pokreni u Supabase SQL editoru (nakon postojećih bookings / gallery_items)
-- https://supabase.com/dashboard → SQL Editor

-- ------------------------------------------------------------
-- ČLANCI (blog / novosti)
-- ------------------------------------------------------------

create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  slug text not null,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  cover_path text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint articles_slug_unique unique (slug)
);

create index if not exists articles_status_published_idx
  on articles (status, published_at desc nulls last);

create index if not exists articles_updated_idx
  on articles (updated_at desc);

alter table articles enable row level security;

create policy "Service role full access articles"
  on articles
  using (true)
  with check (true);

create table if not exists article_translations (
  id uuid default gen_random_uuid() primary key,
  article_id uuid not null references articles (id) on delete cascade,
  locale text not null
    check (locale in ('hr', 'en', 'de', 'it')),
  title text not null default '',
  excerpt text not null default '',
  -- TipTap JSON dokument (null = još nema sadržaja za taj jezik)
  content jsonb,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint article_translations_article_locale unique (article_id, locale)
);

create index if not exists article_translations_locale_idx
  on article_translations (locale);

alter table article_translations enable row level security;

create policy "Service role full access article_translations"
  on article_translations
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- UREĐIVI TEKSTOVI STRANICE (whitelist ključeva u aplikaciji)
-- ------------------------------------------------------------

create table if not exists site_texts (
  key text not null,
  locale text not null
    check (locale in ('hr', 'en', 'de', 'it')),
  value text not null default '',
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

alter table site_texts enable row level security;

create policy "Service role full access site_texts"
  on site_texts
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- SEO PO STRANICI
-- ------------------------------------------------------------

create table if not exists page_seo (
  page_key text not null,
  locale text not null
    check (locale in ('hr', 'en', 'de', 'it')),
  title text,
  description text,
  og_title text,
  og_description text,
  og_image_alt text,
  updated_at timestamptz not null default now(),
  primary key (page_key, locale)
);

alter table page_seo enable row level security;

create policy "Service role full access page_seo"
  on page_seo
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- STORAGE: naslovnice članaka (isti bucket pattern kao galerija)
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

create policy "Public can read cms media"
  on storage.objects
  for select
  using (bucket_id = 'cms-media');

create policy "Service role can write cms media"
  on storage.objects
  for all
  using (bucket_id = 'cms-media')
  with check (bucket_id = 'cms-media');

-- updated_at helper (opcionalno – aplikacija može postavljati updated_at sama)
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on articles;
create trigger articles_set_updated_at
  before update on articles
  for each row execute function set_updated_at();

drop trigger if exists article_translations_set_updated_at on article_translations;
create trigger article_translations_set_updated_at
  before update on article_translations
  for each row execute function set_updated_at();

drop trigger if exists site_texts_set_updated_at on site_texts;
create trigger site_texts_set_updated_at
  before update on site_texts
  for each row execute function set_updated_at();

drop trigger if exists page_seo_set_updated_at on page_seo;
create trigger page_seo_set_updated_at
  before update on page_seo
  for each row execute function set_updated_at();

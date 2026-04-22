-- Pokreni ovo u Supabase SQL editoru (https://supabase.com/dashboard → SQL Editor)

create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  apartment_slug text not null,
  check_in date not null,
  check_out date not null,
  nights integer not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  adults integer not null default 1,
  children integer not null default 0,
  price_per_night numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  deposit numeric(10, 2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  locale text not null default 'hr',
  deposit_paid boolean not null default false,
  notes text,
  created_at timestamptz default now()
);

-- Ako tablica već postoji bez novih kolona, dodaj ih:
-- alter table bookings add column if not exists deposit_paid boolean not null default false;
-- alter table bookings add column if not exists locale text not null default 'hr';

-- Indexi za brže upite
create index if not exists bookings_apartment_status_idx
  on bookings (apartment_slug, status);

create index if not exists bookings_dates_idx
  on bookings (check_in, check_out);

-- Row Level Security
alter table bookings enable row level security;

-- Samo service role (server API) može raditi sve operacije
-- Anon korisnici nemaju direktan pristup
create policy "Service role full access"
  on bookings
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- GALERIJA (admin upload + frontend prikaz iz baze/storage)
-- ------------------------------------------------------------

create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  storage_path text not null unique,
  category_key text not null default 'exterior-entrance',
  media_type text not null check (media_type in ('image', 'video')),
  alt_text text,
  title text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table gallery_items
  add constraint if not exists gallery_items_category_key_check
  check (
    category_key in (
      'exterior-entrance',
      'ground-floor',
      'first-floor',
      'attic',
      'gazebo',
      'nature'
    )
  );

create index if not exists gallery_items_sort_idx
  on gallery_items (sort_order asc, created_at asc);

alter table gallery_items enable row level security;

create policy "Service role full access gallery_items"
  on gallery_items
  using (true)
  with check (true);

-- Storage bucket za galeriju (public read)
insert into storage.buckets (id, name, public)
values ('gallery-media', 'gallery-media', true)
on conflict (id) do nothing;

-- Javnosti dopusti čitanje media fileova (frontend)
create policy "Public can read gallery media"
  on storage.objects
  for select
  using (bucket_id = 'gallery-media');

-- Upload/brisanje prepusti samo service role ključu (server API)
create policy "Service role can write gallery media"
  on storage.objects
  for all
  using (bucket_id = 'gallery-media')
  with check (bucket_id = 'gallery-media');

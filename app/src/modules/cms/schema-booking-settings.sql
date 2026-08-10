-- Postavke rezervacije (osnovna cijena, min. noći)
-- Pokreni u Supabase SQL Editoru ako već imaš CMS tablice

create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

do $$ begin
  create policy "Service role full access site_settings"
    on site_settings
    using (true)
    with check (true);
exception when duplicate_object then null;
end $$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_set_updated_at on site_settings;
create trigger site_settings_set_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- =============================================================================
-- Configurações do site (link do grupo WhatsApp editável pelo admin).
-- Rode no SQL Editor do Supabase (uma vez).
-- =============================================================================

create table if not exists public.site_settings (
  id text primary key default 'default',
  whatsapp_group_url text not null default '',
  updated_at timestamptz not null default now()
);

comment on table public.site_settings is 'Configurações globais da LP (ex.: link do grupo WhatsApp)';

insert into public.site_settings (id, whatsapp_group_url)
values ('default', '')
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

-- Sem políticas para anon/authenticated: apenas service role (API servidor) acessa.

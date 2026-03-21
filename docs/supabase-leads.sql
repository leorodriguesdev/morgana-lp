-- =============================================================================
-- NOVO PROJETO: cria tabela completa (mesmos campos do webhook SellFlux + data)
-- Rode no SQL Editor do Supabase (uma vez).
-- =============================================================================

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  data timestamptz not null default now(),
  nome text not null,
  email text not null,
  telefone text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_conjunto text not null default '',
  utm_content text not null default '',
  utm_term text not null default '',
  src text not null default ''
);

create index if not exists leads_data_idx on public.leads (data desc);

alter table public.leads enable row level security;

comment on table public.leads is 'Leads LP — espelho dos dados enviados ao webhook (nome, email, telefone, UTMs, src) + data';

-- Tabela antiga sem as colunas novas? Rode: docs/supabase-leads-migration.sql

-- Rode no SQL Editor do Supabase (uma vez).
-- Tabela simples: data, nome, email

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  data timestamptz not null default now(),
  nome text not null,
  email text not null
);

create index if not exists leads_data_idx on public.leads (data desc);

alter table public.leads enable row level security;

-- Inserções só pela API Next (service role), que ignora RLS.
-- Nenhuma policy para anon/authenticated = leitura/escrita pelo cliente com anon key fica bloqueada.

comment on table public.leads is 'Leads da LP (nome + e-mail)';

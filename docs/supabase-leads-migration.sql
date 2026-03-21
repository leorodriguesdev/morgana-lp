-- Se a tabela public.leads JA EXISTE (só id, data, nome, email), rode este bloco UMA vez.

alter table public.leads add column if not exists telefone text not null default '';
alter table public.leads add column if not exists utm_source text not null default '';
alter table public.leads add column if not exists utm_medium text not null default '';
alter table public.leads add column if not exists utm_campaign text not null default '';
alter table public.leads add column if not exists utm_conjunto text not null default '';
alter table public.leads add column if not exists utm_content text not null default '';
alter table public.leads add column if not exists utm_term text not null default '';
alter table public.leads add column if not exists src text not null default '';

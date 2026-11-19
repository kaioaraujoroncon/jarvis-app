-- Jarvis · esquema inicial (Supabase / Postgres). Rodar no SQL Editor. Substitui as abas da planilha.
create extension if not exists pgcrypto;

create table public.areas (
  id text primary key, nome text not null, emoji text, cor text, ordem int default 0
);
create table public.bots (
  id text primary key, nome text not null, emoji text,
  area_id text references public.areas(id), missao text, tom text, rotinas jsonb default '[]',
  fontes jsonb default '[]', xp_por_tarefa int default 10, nivel int default 1, xp_total int default 0,
  ativo boolean default true, doc_url text, atualizado_em timestamptz default now()
);
create table public.itens (
  id text primary key, user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  bot_id text references public.bots(id), area_id text references public.areas(id),
  tipo text not null check (tipo in ('Aprovar','Direcionar','Executar','Aguardando','plano','tarefa')),
  titulo text not null, prazo date, xp int default 0, opcoes jsonb default '[]', nota text,
  missao boolean default false, ativo boolean default true,
  status text not null default 'aberto' check (status in ('aberto','respondido','fechado','adiado')),
  adiado_ate date, plano text, efeitos jsonb default '{}',
  notion_id text, notion_sync text, respondido_em timestamptz,
  criado_em timestamptz default now(), atualizado_em timestamptz default now()
);
create table public.respostas (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  item_id text not null references public.itens(id) on delete cascade,
  resposta text not null, extra text, criado_em timestamptz default now(),
  processado_em timestamptz   -- o "cérebro" (Claude) preenche ao processar
);
create table public.xp_eventos (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  item_id text references public.itens(id), pontos int not null, motivo text, criado_em timestamptz default now()
);
create table public.dispositivos (
  id uuid primary key default gen_random_uuid(), user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  plataforma text, apns_token text, criado_em timestamptz default now()
);
create table public.frases_voz (  -- cache das falas geradas (ElevenLabs)
  hash text primary key, texto text not null, voz_id text, arquivo_url text, criado_em timestamptz default now()
);

alter table public.itens enable row level security;
alter table public.respostas enable row level security;
alter table public.xp_eventos enable row level security;
alter table public.dispositivos enable row level security;
create policy itens_dono on public.itens for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy respostas_dono on public.respostas for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy xp_dono on public.xp_eventos for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy disp_dono on public.dispositivos for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create index on public.itens (status, prazo);
create index on public.respostas (processado_em) where processado_em is null;

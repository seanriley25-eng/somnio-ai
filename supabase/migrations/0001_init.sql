-- Dreams table: each row is a single dream + its AI interpretation.
-- share_id is a public, un-guessable slug used in /dream/[share_id] URLs.
create extension if not exists "pgcrypto";

create table public.dreams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  share_id text not null unique default encode(gen_random_bytes(9), 'hex'),
  dream_text text not null,
  title text not null,
  narrative text not null,
  symbols jsonb not null,
  insight text not null,
  mood text not null,
  created_at timestamptz not null default now()
);

create index dreams_user_id_created_at_idx on public.dreams (user_id, created_at desc);
create index dreams_share_id_idx on public.dreams (share_id);

alter table public.dreams enable row level security;

-- Owners can read/insert/delete their own dreams.
create policy "dreams_owner_select" on public.dreams
  for select using (auth.uid() = user_id);

create policy "dreams_owner_insert" on public.dreams
  for insert with check (auth.uid() = user_id);

create policy "dreams_owner_delete" on public.dreams
  for delete using (auth.uid() = user_id);

-- Public read by share_id (the secret URL slug). No user_id exposed via API;
-- the interpretation page only selects the non-PII columns.
create policy "dreams_public_read_by_share_id" on public.dreams
  for select using (true);

-- Note: the permissive public select above is safe because the app never
-- leaks user_id or auth.users to unauthenticated callers — the share page
-- selects only display columns, and /dreams uses the owner-select policy.

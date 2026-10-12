create table if not exists public.logbooks (
 user_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null default '{}'::jsonb check (octet_length(payload::text) <= 100000),
 updated_at timestamptz not null default now()
);
alter table public.logbooks enable row level security;
revoke all on public.logbooks from anon;
grant select, insert, update, delete on public.logbooks to authenticated;
create policy "Read own logbook" on public.logbooks for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own logbook" on public.logbooks for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own logbook" on public.logbooks for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own logbook" on public.logbooks for delete to authenticated using ((select auth.uid()) = user_id);

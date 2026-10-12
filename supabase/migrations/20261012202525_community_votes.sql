create table public.community_votes (
 user_id uuid not null references auth.users(id) on delete cascade,
 kind text not null check(kind in ('arc','character')),
 slot text not null,
 item_id text not null check(length(item_id) between 1 and 80),
 score integer,
 primary key(user_id,kind,slot),
 check((kind='arc' and slot=item_id and score between 1 and 10 and score is not null) or (kind='character' and slot='favourite' and score is null))
);
alter table public.community_votes enable row level security;
revoke all on public.community_votes from anon,authenticated;
grant select,insert,update,delete on public.community_votes to authenticated;
create policy own_select on public.community_votes for select to authenticated using((select auth.uid())=user_id);
create policy own_insert on public.community_votes for insert to authenticated with check((select auth.uid())=user_id);
create policy own_update on public.community_votes for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create policy own_delete on public.community_votes for delete to authenticated using((select auth.uid())=user_id);
-- Deliberately exposes only anonymous aggregates; never user IDs or private logbook data.
create function public.community_summary() returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object(
 'arcs',coalesce((select jsonb_agg(r) from (select item_id as arc_id,avg(score) as average,count(*) as votes from public.community_votes where kind='arc' group by item_id) r),'[]'::jsonb),
 'characters',coalesce((select jsonb_agg(r) from (select item_id as character_id,count(*) as votes from public.community_votes where kind='character' group by item_id) r),'[]'::jsonb));
$$;
revoke all on function public.community_summary() from public;
grant execute on function public.community_summary() to anon,authenticated;

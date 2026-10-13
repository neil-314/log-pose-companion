-- PRIVATE REVIEW ONLY. Not applied to any connected project.
-- This migration creates storage boundaries, not a public launch API.
-- Browser clients deliberately receive no INSERT/UPDATE/DELETE grants.
-- Transactional posting, moderation, throttling and profile projection must be
-- connected through a reviewed server adapter before staging integration.
begin;
create schema if not exists log_pose_private;
revoke all on schema log_pose_private from public,anon,authenticated;
create table log_pose_private.profiles(
 user_id uuid primary key references auth.users(id) on delete cascade,
 handle text not null unique check(handle ~ '^[A-Za-z0-9_]{3,24}$'),
 public boolean not null default false, share jsonb not null default '{}'::jsonb,
 suspended boolean not null default false, created_at timestamptz not null default now()
);
create unique index profiles_handle_ci on log_pose_private.profiles(lower(handle));
create table log_pose_private.staff(user_id uuid primary key references auth.users(id),role text not null check(role in ('moderator','admin')));
create table log_pose_private.blocks(owner uuid references auth.users(id) on delete cascade,target uuid references auth.users(id) on delete cascade,primary key(owner,target),check(owner<>target));
create table log_pose_private.threads(
 id uuid primary key default gen_random_uuid(),author uuid not null references auth.users(id),
 kind text not null check(kind in ('anime','manga')),cutoff integer not null check(cutoff between 0 and 100000),room text not null,
 title text not null check(length(title) between 5 and 120),body text not null check(length(body) between 5 and 4000),
 state text not null default 'pending' check(state in ('pending','published','quarantined','removed')),
 locked boolean not null default false,created_at timestamptz not null default now()
);
create index threads_feed on log_pose_private.threads(kind,cutoff,created_at desc) where state='published';
create table log_pose_private.replies(id uuid primary key default gen_random_uuid(),thread uuid not null references log_pose_private.threads(id),author uuid not null references auth.users(id),body text not null check(length(body) between 2 and 2000),state text not null default 'pending' check(state in ('pending','published','quarantined','removed')),created_at timestamptz not null default now());
create index replies_thread on log_pose_private.replies(thread,created_at);
create table log_pose_private.reactions(thread uuid references log_pose_private.threads(id),user_id uuid references auth.users(id),primary key(thread,user_id));
create table log_pose_private.conversations(id uuid primary key default gen_random_uuid(),sender uuid not null references auth.users(id),recipient uuid not null references auth.users(id),kind text not null check(kind in ('anime','manga')),cutoff integer not null check(cutoff>=0),state text not null default 'pending' check(state in ('pending','accepted','declined')),check(sender<>recipient));
create index conversations_recipient on log_pose_private.conversations(recipient,state);
create table log_pose_private.messages(id uuid primary key default gen_random_uuid(),conversation uuid not null references log_pose_private.conversations(id),author uuid not null references auth.users(id),body text not null check(length(body) between 1 and 2000),created_at timestamptz not null default now());
create index messages_conversation on log_pose_private.messages(conversation,created_at);
create table log_pose_private.reports(id uuid primary key default gen_random_uuid(),reporter uuid not null references auth.users(id),target uuid not null,kind text not null check(kind in ('thread','reply','message')),reason text not null check(length(reason) between 1 and 500),snapshot text not null,status text not null default 'open',created_at timestamptz not null default now());
create table log_pose_private.audit(id bigint generated always as identity primary key,actor uuid not null references auth.users(id),target uuid not null,action text not null,created_at timestamptz not null default now());
create table log_pose_private.notifications(id uuid primary key default gen_random_uuid(),recipient uuid not null references auth.users(id),thread uuid not null references log_pose_private.threads(id),created_at timestamptz not null default now());
create index notifications_recipient on log_pose_private.notifications(recipient,created_at desc);
create table log_pose_private.rate_windows(user_id uuid references auth.users(id),action text not null,window_at timestamptz not null,hits integer not null check(hits>=0),primary key(user_id,action,window_at));
create table log_pose_private.crew_runs(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id),members text[] not null check(cardinality(members)=10),score integer not null check(score between 0 and 1000),kind text not null check(kind in ('anime','manga')),checkpoint integer not null check(checkpoint>=0),scoring_version integer not null default 1,created_at timestamptz not null default now());
create index crew_runs_best on log_pose_private.crew_runs(user_id,score desc);
-- Fail closed: no private tables or sequences are client-accessible. A future
-- adapter must return projections, never SELECT * from profiles/logbooks.
do $$ declare t record;begin for t in select tablename from pg_tables where schemaname='log_pose_private' loop execute format('alter table log_pose_private.%I enable row level security',t.tablename);execute format('revoke all on log_pose_private.%I from public, anon, authenticated',t.tablename);end loop;end $$;
revoke all on all sequences in schema log_pose_private from public,anon,authenticated;
alter default privileges in schema log_pose_private revoke all on tables from public,anon,authenticated;
alter default privileges in schema log_pose_private revoke execute on functions from public;
commit;

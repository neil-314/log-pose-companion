-- Server-only beta snapshot. Compare-and-swap revision prevents lost updates.
create table public.harbour_runtime (id integer primary key check(id=1), revision bigint not null default 0, payload jsonb not null check(jsonb_typeof(payload)='object'), updated_at timestamptz not null default now());
alter table public.harbour_runtime enable row level security;
revoke all on public.harbour_runtime from public,anon,authenticated;
grant select,insert,update on public.harbour_runtime to service_role;
insert into public.harbour_runtime(id,payload) values(1,'{"version":1,"users":[],"threads":[],"replies":[],"reactions":[],"blocks":[],"requests":[],"messages":[],"reports":[],"audit":[],"events":[],"limits":[],"runs":[]}');
comment on table public.harbour_runtime is 'Server-only beta state. Revision CAS serializes updates. Never return payload directly to browsers. Normalize before scale-out.';

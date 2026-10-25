-- Contact form messages. The public (anon) key may only INSERT; nobody can read
-- messages through the API, so they're only visible in the Supabase dashboard.
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 80),
  email       text not null check (char_length(email) between 3 and 120 and email like '%_@_%'),
  message     text not null check (char_length(message) between 10 and 2000),
  created_at  timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can send a message" on public.contact_messages;
create policy "Anyone can send a message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Column-level privileges: anon can insert these columns only, and can't select at all.
revoke all on public.contact_messages from anon, authenticated;
grant insert (name, email, message) on public.contact_messages to anon, authenticated;

-- Public bucket for project demo videos (read-only for visitors; uploads happen from the dashboard or CLI).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800, array['video/mp4', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Dream images: add a column for the generated image URL + a public storage bucket.

alter table public.dreams
  add column if not exists image_url text;

-- Public storage bucket for dream images. Upserts are idempotent.
insert into storage.buckets (id, name, public)
values ('dreams', 'dreams', true)
on conflict (id) do nothing;

-- Public read access for dream images (the bucket is used only for shareable images).
drop policy if exists "dreams_storage_public_read" on storage.objects;
create policy "dreams_storage_public_read" on storage.objects
  for select using (bucket_id = 'dreams');

-- Writes are performed by the server using the service_role key, which bypasses RLS.

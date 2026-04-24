-- Base64 share_ids include `/`, `+`, and `=` which break URL routing
-- (a `/` makes `/dream/abc/def` mis-match the `/dream/[share_id]` route,
-- and Vercel normalizes `%2F` back to `/` in paths). Switch to hex.

alter table public.dreams
  alter column share_id set default encode(gen_random_bytes(9), 'hex');

-- Regenerate any existing share_ids containing URL-unsafe characters.
update public.dreams
set share_id = encode(gen_random_bytes(9), 'hex')
where share_id ~ '[/+=]';

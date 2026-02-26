-- Migration 002: add UPDATE policy to user_roles
-- Fixes silent failure when upsert hits an existing (user_id, role) row.
-- Apply in: Supabase Dashboard → SQL Editor → New query → Run

create policy "update own roles"
  on public.user_roles for update
  using  (user_id = auth.uid())
  with check (user_id = auth.uid());

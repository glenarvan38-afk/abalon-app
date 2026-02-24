-- Migration: multi-role foundation
-- Apply in: Supabase Dashboard → SQL Editor → New query → paste → Run
-- Tables: user_roles, customer_profiles, contractor_profiles
-- RLS: each table restricted to own rows via auth.uid()

-- ============================================================
-- user_roles
-- ============================================================
create table if not exists public.user_roles (
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null check (role in ('customer', 'contractor', 'admin')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "select own roles"
  on public.user_roles for select
  using (user_id = auth.uid());

create policy "insert own roles"
  on public.user_roles for insert
  with check (user_id = auth.uid());

-- ============================================================
-- customer_profiles
-- ============================================================
create table if not exists public.customer_profiles (
  user_id      uuid        primary key references auth.users(id) on delete cascade,
  full_name    text        not null,
  home_zip     text        not null,
  home_address text,
  state        text        not null default 'NC',
  created_at   timestamptz not null default now()
);

alter table public.customer_profiles enable row level security;

create policy "select own customer profile"
  on public.customer_profiles for select
  using (user_id = auth.uid());

create policy "insert own customer profile"
  on public.customer_profiles for insert
  with check (user_id = auth.uid());

create policy "update own customer profile"
  on public.customer_profiles for update
  using (user_id = auth.uid());

-- ============================================================
-- contractor_profiles
-- ============================================================
create table if not exists public.contractor_profiles (
  user_id              uuid        primary key references auth.users(id) on delete cascade,
  company_name         text        not null,
  contact_name         text        not null,
  phone                text        not null,
  office_address       text        not null,
  office_zip           text        not null,
  state                text        not null default 'NC',
  service_radius_miles int         not null,
  services             text[]      not null,
  equipment            text[]      not null default '{}',
  license_number       text,
  verified             boolean     not null default false,
  created_at           timestamptz not null default now()
);

alter table public.contractor_profiles enable row level security;

create policy "select own contractor profile"
  on public.contractor_profiles for select
  using (user_id = auth.uid());

create policy "insert own contractor profile"
  on public.contractor_profiles for insert
  with check (user_id = auth.uid());

create policy "update own contractor profile"
  on public.contractor_profiles for update
  using (user_id = auth.uid());

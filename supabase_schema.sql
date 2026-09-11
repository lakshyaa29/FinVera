-- ==========================================================
-- FINVERA — Supabase PostgreSQL Schema & Migration
-- ==========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  age_group text not null check (age_group in ('13-17', '18-24', '25-34', '35+')),
  occupation text not null default 'student',
  knowledge_level text not null default 'beginner',
  learning_goals text[] default array[]::text[],
  risk_comfort text not null default 'balanced',
  onboarded boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. User Learning Progress
create table if not exists public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  xp integer default 0 not null,
  level_title text default 'Money Beginner' not null,
  streak_days integer default 1 not null,
  last_active_date date default current_date not null,
  completed_lessons text[] default array[]::text[],
  unlocked_levels integer[] default array[1]::integer[],
  completed_missions text[] default array[]::text[],
  explored_calculators text[] default array[]::text[],
  achievements text[] default array[]::text[],
  weekly_activity boolean[] default array[true, false, false, false, false, false, false]::boolean[],
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Simulated Portfolios
create table if not exists public.simulated_portfolios (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  virtual_cash numeric(14, 2) default 100000.00 not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Simulated Portfolio Holdings
create table if not exists public.portfolio_holdings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_id text not null,
  units numeric(10, 4) not null,
  avg_buy_price numeric(14, 2) not null,
  total_invested numeric(14, 2) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, asset_id)
);

-- 5. Simulated Transactions Log
create table if not exists public.simulated_transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_id text not null,
  asset_symbol text not null,
  asset_name text not null,
  type text not null check (type in ('BUY', 'SELL')),
  units numeric(10, 4) not null,
  price numeric(14, 2) not null,
  total_amount numeric(14, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Money Health Scores
create table if not exists public.money_health_scores (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  scores jsonb not null default '{}'::jsonb,
  overall_score integer not null default 50,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on all tables
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.simulated_portfolios enable row level security;
alter table public.portfolio_holdings enable row level security;
alter table public.simulated_transactions enable row level security;
alter table public.money_health_scores enable row level security;

-- Create Policies (Users can only read and write their own data)
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users can update own progress" on public.user_progress for all using (auth.uid() = user_id);

create policy "Users can manage own portfolio" on public.simulated_portfolios for all using (auth.uid() = user_id);
create policy "Users can manage own holdings" on public.portfolio_holdings for all using (auth.uid() = user_id);
create policy "Users can manage own transactions" on public.simulated_transactions for all using (auth.uid() = user_id);
create policy "Users can manage own health scores" on public.money_health_scores for all using (auth.uid() = user_id);

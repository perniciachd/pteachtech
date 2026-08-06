-- Training feedback (anonymous). Run this once in the Supabase SQL editor.
-- All access is via the server-side service role; RLS denies anon by default.

create table if not exists public.training_feedback (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  -- Context (no participant name — anonymous by design)
  training_name    text not null,
  training_topic   text,
  trainer          text,
  organization     text,
  location         text,
  training_date    text,

  -- Ratings (1-5)
  met_expectations smallint,
  relevance        smallint,
  content_quality  smallint,
  trainer_rating   smallint,
  queries_answered smallint,
  overall          smallint,

  -- Net Promoter (0-10)
  nps              smallint,

  -- Open text
  liked_most       text,
  improve          text,
  suggestions      text,

  -- Curation: only featured rows are shown publicly
  featured         boolean not null default false
);

create index if not exists training_feedback_created_at_idx on public.training_feedback (created_at desc);
create index if not exists training_feedback_featured_idx on public.training_feedback (featured) where featured = true;

-- Deny all anon access; the app reads/writes via the service role only.
alter table public.training_feedback enable row level security;

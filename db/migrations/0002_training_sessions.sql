-- Training sessions — one row per delivered training, addressed by a short code.
-- The QR printed for a session encodes pteachtech.in/f/<code>, so the context
-- (training name, trainer, org, date) lives in the DB and stays editable after
-- the QR has been printed.
--
-- Run this once against the Neon database, after 0001_training_feedback.sql.

create table if not exists public.training_sessions (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  -- Short, unambiguous, URL-safe code used in /f/<code>. Lowercase only.
  code           text not null unique,

  -- Context stamped onto every response collected through this session.
  training_name  text not null,
  training_topic text,
  trainer        text,
  organization   text,
  location       text,
  training_date  text,

  -- Closed sessions stop accepting new responses (QR still resolves,
  -- participants get a "this session is closed" message).
  active         boolean not null default true,

  notes          text
);

create index if not exists training_sessions_created_at_idx
  on public.training_sessions (created_at desc);

-- Link responses back to the session they were collected under.
-- Nullable: responses from the generic /feedback link have no session.
alter table public.training_feedback
  add column if not exists session_id uuid references public.training_sessions (id) on delete set null;

create index if not exists training_feedback_session_id_idx
  on public.training_feedback (session_id);

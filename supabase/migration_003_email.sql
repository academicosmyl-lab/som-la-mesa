-- ================================================================
-- MIGRACIÓN 003 — Campo email en ciudadanos
-- Supabase → SQL Editor → New Query → Run
-- ================================================================
alter table ciudadanos add column if not exists email text;

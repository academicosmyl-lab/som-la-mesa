-- ================================================================
-- MIGRACIÓN 001 — Soporte multi-tema en reportes
-- Pegar en: Supabase → SQL Editor → New Query → Run
-- ================================================================

-- 1. Eliminar columnas de tema único (si existen)
alter table reportes drop column if exists tema;
alter table reportes drop column if exists detalle;

-- 2. Agregar columnas de múltiples temas
alter table reportes add column if not exists temas    text[] not null default '{}';
alter table reportes add column if not exists detalles jsonb;

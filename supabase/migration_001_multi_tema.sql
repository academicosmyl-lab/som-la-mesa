-- ============================================================
-- Migración 001 · Cambio tema → temas (selección múltiple)
-- Pegar en Supabase SQL Editor y ejecutar
-- ============================================================

-- Eliminar columna tema (texto único)
alter table reportes drop column if exists tema;
alter table reportes drop column if exists detalle;

-- Agregar columna temas (array) y detalles (JSON por tema)
alter table reportes add column if not exists temas text[] not null default '{}';
alter table reportes add column if not exists detalles jsonb;

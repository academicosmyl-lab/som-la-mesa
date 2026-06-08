-- ============================================================
-- SOM · Sistema Operativo Municipal — La Mesa, Cundinamarca
-- Esquema de base de datos · Pegar en Supabase SQL Editor
-- ============================================================

-- Extensión geoespacial
create extension if not exists postgis;

-- ─────────────────────────────────────────
-- TABLA: zonas (veredas y barrios de La Mesa)
-- ─────────────────────────────────────────
create table if not exists zonas (
  id               uuid primary key default gen_random_uuid(),
  nombre           text not null,
  tipo             text not null check (tipo in ('urbano', 'rural')),
  lat              double precision not null,
  lng              double precision not null,
  votos_en_juego   integer not null default 0
);

-- Datos iniciales: barrios urbanos y veredas rurales de La Mesa
insert into zonas (nombre, tipo, lat, lng, votos_en_juego) values
  ('Centro',           'urbano', 4.6328, -74.4597, 420),
  ('El Triunfo',       'urbano', 4.6340, -74.4610, 310),
  ('La Esperanza',     'urbano', 4.6315, -74.4580, 280),
  ('Brisas del Campo', 'urbano', 4.6350, -74.4625, 250),
  ('San Carlos',       'urbano', 4.6300, -74.4560, 195),
  ('El Cairo',         'rural',  4.6180, -74.4420, 340),
  ('La Esperanza Rural','rural', 4.6450, -74.4700, 290),
  ('San Javier',       'rural',  4.6080, -74.4350, 260),
  ('El Paraíso',       'rural',  4.6550, -74.4800, 215),
  ('La Victoria',      'rural',  4.5980, -74.4280, 180),
  ('El Triunfo Rural', 'rural',  4.6620, -74.4890, 165),
  ('Las Palmas',       'rural',  4.5900, -74.4200, 150)
on conflict do nothing;

-- ─────────────────────────────────────────
-- TABLA: ciudadanos
-- ─────────────────────────────────────────
create table if not exists ciudadanos (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  nombre                text not null,
  celular               text not null,
  zona_id               uuid references zonas(id),
  quiere_ser_lider      boolean not null default false,
  consentimiento        boolean not null default false,
  consentimiento_fecha  timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- TABLA: reportes
-- ─────────────────────────────────────────
create table if not exists reportes (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  zona_id      uuid references zonas(id),
  zona_nombre  text not null,
  tipo_zona    text not null check (tipo_zona in ('urbano', 'rural')),
  tema         text not null check (tema in ('vias','agua','seguridad','salud','educacion','empleo','otro')),
  detalle      text,
  foto_url     text,
  lat          double precision,
  lng          double precision,
  anonimo      boolean not null default false,
  ciudadano_id uuid references ciudadanos(id)
);

-- ─────────────────────────────────────────
-- TABLA: compromisos (motor de transparencia)
-- ─────────────────────────────────────────
create table if not exists compromisos (
  id                  uuid primary key default gen_random_uuid(),
  titulo              text not null,
  descripcion         text not null,
  estado              text not null default 'planeado'
                        check (estado in ('planeado','en_curso','cumplido')),
  avance_pct          integer not null default 0 check (avance_pct between 0 and 100),
  evidencia_url       text,
  zona_id             uuid references zonas(id),
  fecha_compromiso    date not null default current_date,
  fecha_actualizacion timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- SEGURIDAD: Row Level Security
-- ─────────────────────────────────────────

-- Cualquiera puede leer zonas y compromisos (datos públicos)
alter table zonas       enable row level security;
alter table compromisos enable row level security;
create policy "zonas_public_read"       on zonas       for select using (true);
create policy "compromisos_public_read" on compromisos for select using (true);

-- Reportes: cualquiera puede insertar, solo autenticados leen
alter table reportes enable row level security;
create policy "reportes_public_insert" on reportes for insert with check (true);
create policy "reportes_auth_read"     on reportes for select using (auth.role() = 'authenticated');

-- Ciudadanos: solo inserción pública, lectura solo autenticados
alter table ciudadanos enable row level security;
create policy "ciudadanos_public_insert" on ciudadanos for insert with check (true);
create policy "ciudadanos_auth_read"     on ciudadanos for select using (auth.role() = 'authenticated');

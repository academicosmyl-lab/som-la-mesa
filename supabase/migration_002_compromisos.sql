-- ================================================================
-- MIGRACIÓN 002 — Compromisos reales de campaña
-- Pegar en: Supabase → SQL Editor → New Query → Run
-- ================================================================

-- 1. Actualizar constraint de estado (minúsculas → mayúsculas para la UI)
alter table compromisos drop constraint if exists compromisos_estado_check;
alter table compromisos add constraint compromisos_estado_check
  check (estado in ('PENDIENTE', 'EN_PROGRESO', 'CUMPLIDO'));
alter table compromisos alter column estado set default 'PENDIENTE';

-- 2. Insertar compromisos reales de la campaña
insert into compromisos (titulo, descripcion, estado, avance_pct, fecha_compromiso) values

('Agua potable para veredas',
 'Ampliar la cobertura del acueducto municipal a las 7 veredas sin acceso a agua tratada. Plan en 3 etapas con inversión propia y gestión de regalías departamentales.',
 'PENDIENTE', 0, '2028-03-31'),

('Mejoramiento de vías terciarias',
 'Intervenir los 42 km de vías veredales en peor estado (Clasificación C y D) mediante convenios con el INVIAS y la Gobernación de Cundinamarca.',
 'PENDIENTE', 0, '2028-06-30'),

('Conectividad digital rural',
 'Llevar internet de banda ancha a las 12 veredas mediante el programa MinTIC Zonas Digitales y alianza con operadores privados. Incluye 6 Puntos Vive Digital.',
 'PENDIENTE', 0, '2028-12-31'),

('Empleo joven — 500 empleos locales',
 'Crear 500 empleos formales en el municipio a través del programa Jóvenes en Acción, alianzas con empresas del sector agroindustrial y turístico.',
 'PENDIENTE', 0, '2029-06-30'),

('Plan de turismo sostenible',
 'Crear la Ruta del Tequendama certificada por ProColombia. Meta: 40% más de visitantes en el primer año de gobierno. Incluye señalización, capacitación y agenda cultural.',
 'PENDIENTE', 0, '2028-10-31'),

('Hospital de primer nivel reforzado',
 'Dotar al hospital municipal con equipos de diagnóstico básico (ecógrafo, laboratorio clínico ampliado) y garantizar médico permanente en las veredas más alejadas.',
 'PENDIENTE', 0, '2028-08-31'),

('Escuela de emprendimiento rural',
 'Crear el Centro de Desarrollo Empresarial de La Mesa con talleres gratuitos de emprendimiento, acceso a créditos del Fondo Emprender y asesoría técnica para productores.',
 'PENDIENTE', 0, '2029-03-31'),

('Plan anticorrupción y transparencia',
 'Publicar en línea todos los contratos del municipio, instalar cámaras en dependencias públicas y crear la Oficina del Ciudadano para reportar irregularidades.',
 'PENDIENTE', 0, '2028-02-28');

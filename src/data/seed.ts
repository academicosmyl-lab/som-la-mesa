// ─── DATOS SEMILLA — Sistema Operativo Municipal (SOM) ───────────────────────
// Fuentes: Registraduría, DANE 2018, La República. Datos verificados.
// Los marcados con [DEMO] son ejemplos ilustrativos — reemplazar con datos reales.

export const MUNICIPIO = {
  nombre: 'La Mesa',
  departamento: 'Cundinamarca',
  provincia: 'Tequendama',
  distanciaBogota: 65,
  coordenadas: { lat: 4.6380, lng: -74.4668 },
  zoom: 13,
}

export const ELECCION = {
  cargo: 'Alcaldía Municipal',
  fechaEstimada: new Date('2027-10-26'),
  periodo: '2028–2031',
}

export const CENSO = {
  ano: 2023,
  habilitados: 27172,
  participacion: 0.6098,
  votantes: 16571,
  votosValidos: 16131,
}

export const OBJETIVO = {
  votosMin: 4500,
  votosMax: 5500,
  descripcion: 'Blindar votos sólidos y bien distribuidos',
}

export const CANDIDATO = {
  nombre: 'Fabio Andrés Cabrera Parra',
  nombreCorto: 'Fabio A. Cabrera',
  // TODO: cargar diagnóstico de redes cuando el equipo entregue sus perfiles
}

export const RESULTADOS_2023 = [
  {
    candidato: 'Laura M. Londoño',
    agrupacion: 'Juntos Recuperemos La Mesa',
    votos: 4007,
    porcentaje: 24.84,
    ganador: true,
    color: '#FF9F2E',
  },
  {
    candidato: 'Diego A. Barrera',
    agrupacion: 'Gob. Incluyente y Transparente',
    votos: 3662,
    porcentaje: 22.70,
    ganador: false,
    color: '#5AA9FF',
  },
  {
    candidato: 'Julián A. Castiblanco',
    agrupacion: 'Firme con La Mesa',
    votos: 3253,
    porcentaje: 20.16,
    ganador: false,
    color: '#5AA9FF',
  },
  {
    candidato: 'Marcos García Salcedo',
    agrupacion: 'Partido de la U',
    votos: 1367,
    porcentaje: 8.47,
    ganador: false,
    color: '#3a4760',
  },
  {
    candidato: 'Martín E. Moreno',
    agrupacion: 'Alianza Verde',
    votos: 1302,
    porcentaje: 8.07,
    ganador: false,
    color: '#3a4760',
  },
  {
    candidato: 'Óscar A. Quiroga',
    agrupacion: 'En Marcha',
    votos: 991,
    porcentaje: 6.14,
    ganador: false,
    color: '#3a4760',
  },
  {
    candidato: 'Otros (5 candidatos)',
    agrupacion: '—',
    votos: 1549,
    porcentaje: 9.62,
    ganador: false,
    color: '#252d3d',
  },
]

export const OBJETIVO_BAR = {
  candidato: 'Objetivo Cabrera 2027',
  agrupacion: 'Meta de campaña',
  votos: 5000,
  porcentaje: 31.0,
  ganador: false,
  color: '#19E3C2',
  esObjetivo: true,
}

export const TERRITORIO = {
  poblacionCenso2018: 32694,
  urbana: { poblacion: 16854, porcentaje: 51.55 },
  rural:  { poblacion: 15840, porcentaje: 48.45 },
  // TODO: Cargar lista de veredas con coordenadas y censo electoral por puesto
}

// [DEMO] Índice de Prioridad Municipal — reemplazar con datos de campo
export const DEMO_PROBLEMAS = [
  {
    id: 1,
    nombre: 'Agua potable rural',
    zona: 'Rural',
    afectados: 8500,
    urgencia: 'ALTA' as const,
    ipm: 94,
    categoria: 'Servicios',
    color: '#FF5D5D',
  },
  {
    id: 2,
    nombre: 'Vías terciarias',
    zona: 'Rural',
    afectados: 6200,
    urgencia: 'ALTA' as const,
    ipm: 87,
    categoria: 'Infraestructura',
    color: '#FF5D5D',
  },
  {
    id: 3,
    nombre: 'Conectividad digital',
    zona: 'Mixto',
    afectados: 12000,
    urgencia: 'MEDIA' as const,
    ipm: 76,
    categoria: 'Tecnología',
    color: '#FF9F2E',
  },
  {
    id: 4,
    nombre: 'Empleo jóvenes',
    zona: 'Urbano',
    afectados: 4800,
    urgencia: 'MEDIA' as const,
    ipm: 71,
    categoria: 'Economía',
    color: '#FF9F2E',
  },
  {
    id: 5,
    nombre: 'Turismo sostenible',
    zona: 'Mixto',
    afectados: 2100,
    urgencia: 'BAJA' as const,
    ipm: 65,
    categoria: 'Desarrollo',
    color: '#39DC84',
  },
]

// [DEMO] Índice de Humor Social — reemplazar con encuestas de campo
export const DEMO_HUMOR_SOCIAL = [
  { indicador: 'Esperanza',     valor: 38, fullMark: 100, color: '#39DC84' },
  { indicador: 'Satisfacción',  valor: 22, fullMark: 100, color: '#5AA9FF' },
  { indicador: 'Desconfianza',  valor: 67, fullMark: 100, color: '#FF9F2E' },
  { indicador: 'Rabia',         valor: 45, fullMark: 100, color: '#FF5D5D' },
]

// [DEMO] Motor de Transparencia — cargar con compromisos reales cuando el equipo defina la propuesta
export const DEMO_COMPROMISOS = [
  {
    id: 1,
    titulo: 'Plan agua potable rural',
    descripcion: 'TODO: descripción del compromiso',
    estado: 'PENDIENTE' as const,
    avance: 0,
    evidencias: 0,
  },
  {
    id: 2,
    titulo: 'Mejoramiento vías veredales',
    descripcion: 'TODO: descripción del compromiso',
    estado: 'PENDIENTE' as const,
    avance: 0,
    evidencias: 0,
  },
  {
    id: 3,
    titulo: 'Conectividad para veredas',
    descripcion: 'TODO: descripción del compromiso',
    estado: 'PENDIENTE' as const,
    avance: 0,
    evidencias: 0,
  },
  {
    id: 4,
    titulo: 'Empleo para jóvenes',
    descripcion: 'TODO: descripción del compromiso',
    estado: 'PENDIENTE' as const,
    avance: 0,
    evidencias: 0,
  },
]

// [DEMO] Puntos en el mapa — reemplazar con datos GPS reales de campo
export const DEMO_MAP_POINTS = [
  {
    id: 'urban-center',
    pos: [4.6380, -74.4668] as [number, number],
    label: 'Centro Urbano · La Mesa',
    tipo: 'urban' as const,
    votos: 9200,
  },
  {
    id: 'vereda-triunfo',
    pos: [4.6250, -74.4900] as [number, number],
    label: 'Vereda El Triunfo [DEMO]',
    tipo: 'rural' as const,
    votos: 420,
  },
  {
    id: 'vereda-victoria',
    pos: [4.6520, -74.4500] as [number, number],
    label: 'Vereda La Victoria [DEMO]',
    tipo: 'rural' as const,
    votos: 380,
  },
  {
    id: 'vereda-sur',
    pos: [4.6100, -74.4750] as [number, number],
    label: 'Zona Sur [DEMO]',
    tipo: 'rural' as const,
    votos: 560,
  },
  {
    id: 'alerta-agua',
    pos: [4.6180, -74.4820] as [number, number],
    label: 'Alerta: Agua potable [DEMO]',
    tipo: 'alert' as const,
    votos: 0,
  },
  {
    id: 'alerta-via',
    pos: [4.6460, -74.4600] as [number, number],
    label: 'Alerta: Vías [DEMO]',
    tipo: 'alert' as const,
    votos: 0,
  },
]

export const AGENTES = [
  {
    id: 'estadistico',
    nombre: 'Agente Estadístico',
    rol: 'Limpieza, deduplicación y georreferenciación de datos',
    estado: 'INICIALIZANDO' as const,
    ultimaEjecucion: null as null | Date,
    registrosProcesados: 0,
    descripcionEstado: 'Esperando datos de campo',
  },
  {
    id: 'analitico',
    nombre: 'Agente Analítico',
    rol: 'IPM, humor social, radar de problemas, esfuerzo territorial',
    estado: 'INICIALIZANDO' as const,
    ultimaEjecucion: null as null | Date,
    registrosProcesados: 0,
    descripcionEstado: 'Pendiente de Agente Estadístico',
  },
  {
    id: 'disenador',
    nombre: 'Agente Diseñador',
    rol: 'Dashboard, piezas compartibles, consistencia visual',
    estado: 'ACTIVO' as const,
    ultimaEjecucion: new Date(),
    registrosProcesados: 1,
    descripcionEstado: 'Dashboard MVP generado',
  },
]

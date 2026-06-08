/**
 * Agente Analítico — Sistema Operativo Municipal (SOM)
 *
 * ROL: Convierte datos limpios en decisiones.
 * Es la ventaja competitiva del sistema.
 *
 * ENTRADAS:  datasets del Agente Estadístico.
 *
 * SALIDAS:   alertas priorizadas, recomendaciones accionables,
 *            medición contra la meta de 4.500–5.500 votos.
 *
 * ÍNDICES:   Humor Social, Radar de Problemas Emergentes,
 *            Índice de Prioridad Municipal (IPM),
 *            Índice de Esfuerzo Territorial.
 *
 * DISPARADOR: corrida diaria + alertas ante picos.
 * ESTADO: INICIALIZANDO — pendiente de Agente Estadístico.
 */

import type { ReporteLimpio } from './agentEstadistico'

export interface IndiceHumorSocial {
  zona: string
  esperanza:    number  // 0–100
  satisfaccion: number  // 0–100
  desconfianza: number  // 0–100
  rabia:        number  // 0–100
  timestamp:    Date
  fuente:       string
}

export interface ProblemaEmergente {
  categoria:   string
  zona:        string
  tendencia:   number   // % de crecimiento en últimos 7 días
  pico:        boolean  // ¿superó umbral de alerta?
  reportes7d:  number
  reportes30d: number
}

export interface IPMInput {
  nombre:      string
  zona:        string
  impactoSocial: number   // 0–10
  afectados:   number
  costoEstimado: number   // COP
  urgencia:    number     // 0–10
  popularidad: number     // 0–10 (basado en reportes y señal pública)
  viabilidad:  number     // 0–10
}

export interface IPMResult extends IPMInput {
  score:       number     // 0–100
  ranking:     number
}

export interface EsfuerzoTerritorial {
  zona:            string
  votosEnJuego:    number
  humorSocial:     number   // promedio de los 4 índices, invertido
  coberturaActual: number   // % de electores contactados
  score:           number   // votos × humor × (1 - cobertura) → prioridad
}

export interface DecisionSemanal {
  semana:           string
  eventoRecomendado: { zona: string; motivo: string }
  mensajePorZona:   Record<string, string>
  lideresMovilizar: string[]
  proyeccionVotos:  number
  metaSemana:       { min: number; max: number }
}

/**
 * Calcula el Índice de Prioridad Municipal (IPM).
 * Formula: promedio ponderado de 6 dimensiones.
 * TODO: ajustar ponderaciones con el equipo de campaña.
 */
export function calcularIPM(problemas: IPMInput[]): IPMResult[] {
  const scored = problemas.map(p => {
    const afectadosNorm = Math.min(p.afectados / 32694, 1) * 10
    const score = (
      p.impactoSocial  * 0.25 +
      afectadosNorm    * 0.20 +
      p.urgencia       * 0.20 +
      p.popularidad    * 0.20 +
      p.viabilidad     * 0.10 +
      (10 - Math.min(p.costoEstimado / 1_000_000_000, 10)) * 0.05
    ) * 10

    return { ...p, score: Math.round(Math.min(score, 100)), ranking: 0 }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, ranking: i + 1 }))
}

/**
 * Calcula el Índice de Esfuerzo Territorial.
 * Responde: ¿dónde invierto la próxima semana?
 * TODO: integrar con tabla electoral por puesto (Registraduría).
 */
export function calcularEsfuerzoTerritorial(
  zonas: { nombre: string; votosEnJuego: number; coberturaActual: number }[],
  humor: IndiceHumorSocial[]
): EsfuerzoTerritorial[] {
  return zonas.map(zona => {
    const humorZona = humor.find(h => h.zona === zona.nombre)
    const sentimientoNeutro = humorZona
      ? (humorZona.esperanza + (100 - humorZona.desconfianza)) / 2
      : 50

    const score = zona.votosEnJuego * (sentimientoNeutro / 100) * (1 - zona.coberturaActual)

    return {
      zona:            zona.nombre,
      votosEnJuego:    zona.votosEnJuego,
      humorSocial:     sentimientoNeutro,
      coberturaActual: zona.coberturaActual,
      score:           Math.round(score),
    }
  }).sort((a, b) => b.score - a.score)
}

/**
 * Detecta problemas emergentes (picos de reporte en 7 días).
 * Dispara alerta si el crecimiento supera el umbral.
 * TODO: implementar con datos reales del Agente Estadístico.
 */
export function detectarProblemasEmergentes(
  reportes: ReporteLimpio[],
  umbralCrecimiento = 0.5
): ProblemaEmergente[] {
  // TODO: agrupar reportes por categoría y zona,
  // calcular tendencia 7d vs 30d, marcar picos.
  void reportes
  void umbralCrecimiento
  return []
}

/**
 * Genera la decisión semanal del sistema.
 * Responde las 3 preguntas de campaña:
 *   1. ¿Dónde hago el próximo evento?
 *   2. ¿Qué mensaje uso por zona?
 *   3. ¿A quién movilizo?
 *
 * TODO: integrar API de Claude para generación de copy.
 * NOTA: toda señal de redes = "señal pública con sesgo", no encuesta.
 */
export async function generarDecisionSemanal(): Promise<DecisionSemanal | null> {
  // TODO: orquestar:
  // 1. Agente Estadístico → datos limpios
  // 2. calcularEsfuerzoTerritorial → zona prioritaria
  // 3. calcularIPM → problema a destacar
  // 4. Claude API → copy del mensaje por zona
  // 5. CRM territorial → líderes disponibles
  return null
}

/** Mide el avance contra la meta de 4.500–5.500 votos. */
export function medirMeta(proyeccion: number): {
  metaMin: number; metaMax: number
  enMeta: boolean; brecha: number
  porcentajeLogrado: number
} {
  const META_MIN = 4500
  const META_MAX = 5500
  return {
    metaMin:           META_MIN,
    metaMax:           META_MAX,
    enMeta:            proyeccion >= META_MIN,
    brecha:            Math.max(0, META_MIN - proyeccion),
    porcentajeLogrado: Math.round((proyeccion / META_MIN) * 100),
  }
}

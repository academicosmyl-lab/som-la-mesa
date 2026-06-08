/**
 * Agente Estadístico — Sistema Operativo Municipal (SOM)
 *
 * ROL: Dueño de la verdad de los datos.
 * Convierte el caos en tablas limpias y confiables.
 *
 * ENTRADAS:  reportes ciudadanos crudos, datos abiertos,
 *            resultados electorales, escucha de redes.
 *
 * SALIDAS:   dataset estructurado y versionado,
 *            KPIs base, tablas cruzadas problema×territorio×votos-en-juego,
 *            tasa de cobertura por puesto de votación.
 *
 * DISPARADOR: lote nuevo + corrida diaria.
 * CRITERIO:   ≥80% de reportes correctamente ubicados en puesto/mesa.
 *
 * ESTADO: INICIALIZANDO — pendiente de datos de campo.
 * TODO: implementar conexión a Supabase/PostGIS.
 */

export interface ReporteCiudadano {
  id: string
  lat: number
  lng: number
  categoria: string
  descripcion: string
  foto?: string
  timestamp: Date
  consentimiento: boolean // Ley 1581 — no procesar sin esto
}

export interface ReporteLimpio extends ReporteCiudadano {
  vereda?: string
  barrio?: string
  puestoVotacion?: string
  mesa?: string
  validado: boolean
  fechaValidacion: Date
}

export interface BatchResult {
  total: number
  validados: number
  rechazados: number
  tasaCobertura: number
  reportesLimpios: ReporteLimpio[]
  errores: string[]
}

/**
 * Valida que el reporte tenga consentimiento explícito (Ley 1581).
 * Es el primer filtro — sin esto, el reporte no existe para el sistema.
 */
function validarConsentimiento(r: ReporteCiudadano): boolean {
  return r.consentimiento === true
}

/**
 * Georreferencia un reporte a la unidad territorial común.
 * TODO: implementar lookup contra tabla de veredas/barrios con PostGIS.
 * TODO: cruzar con tabla de puestos de votación de la Registraduría.
 */
async function georreferenciar(_r: ReporteCiudadano): Promise<Partial<ReporteLimpio>> {
  // TODO: llamar a Supabase / PostGIS:
  // SELECT vereda, barrio, puesto_votacion, mesa
  // FROM territorio
  // WHERE ST_Within(ST_Point($lng, $lat), geometria)
  // LIMIT 1
  return {
    vereda: undefined,
    barrio: undefined,
    puestoVotacion: undefined,
    mesa: undefined,
  }
}

/**
 * Procesa un lote de reportes ciudadanos.
 * - Filtra sin consentimiento (descarte permanente)
 * - Deduplica por coordenada+categoría (ventana 50m / 1h)
 * - Georreferencia a vereda/barrio/puesto/mesa
 * - Aísla datos sucios — NUNCA los mezcla con limpios
 */
export async function procesarLote(reportes: ReporteCiudadano[]): Promise<BatchResult> {
  const result: BatchResult = {
    total: reportes.length,
    validados: 0,
    rechazados: 0,
    tasaCobertura: 0,
    reportesLimpios: [],
    errores: [],
  }

  const sinConsentimiento = reportes.filter(r => !validarConsentimiento(r))
  if (sinConsentimiento.length > 0) {
    result.rechazados += sinConsentimiento.length
    result.errores.push(`${sinConsentimiento.length} reportes rechazados: sin consentimiento Ley 1581`)
  }

  const conConsentimiento = reportes.filter(validarConsentimiento)

  for (const reporte of conConsentimiento) {
    const geo = await georreferenciar(reporte)
    const limpio: ReporteLimpio = {
      ...reporte,
      ...geo,
      validado: !!geo.puestoVotacion,
      fechaValidacion: new Date(),
    }
    result.reportesLimpios.push(limpio)
    if (limpio.validado) result.validados++
  }

  result.tasaCobertura = result.total > 0
    ? result.validados / result.total
    : 0

  // Criterio de calidad: ≥80% de reportes georreferenciados
  if (result.tasaCobertura < 0.8) {
    result.errores.push(
      `Tasa de cobertura ${(result.tasaCobertura * 100).toFixed(1)}% — por debajo del umbral (80%). Revisar tabla territorial.`
    )
  }

  return result
}

/** Calcula estadísticas base para el dashboard. TODO: implementar. */
export async function calcularKPIs(): Promise<Record<string, number>> {
  // TODO: query a Supabase:
  // - conteo de reportes por categoría
  // - cobertura por puesto de votación
  // - series de tiempo por semana
  return {}
}

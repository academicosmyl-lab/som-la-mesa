/**
 * Agente Diseñador — Sistema Operativo Municipal (SOM)
 *
 * ROL: Dueño de que TODO se vea fuerte, serio y memorable.
 * Ningún output llega al público sin pasar por aquí.
 *
 * RESPONSABILIDADES:
 * - Mantiene y aplica el sistema de diseño (paleta, tipografías, componentes).
 * - Genera piezas compartibles: Motor de Transparencia, mapas de calor,
 *   tarjetas del IPM — listas para redes y WhatsApp.
 * - Garantiza la estética "sala de inteligencia". Nada genérico.
 * - Adapta cada pieza a su canal (story, post cuadrado, pantalla de prensa).
 *
 * CRITERIO: una persona del equipo puede tomar cualquier pieza
 * y publicarla sin retoque.
 *
 * ESTADO: ACTIVO — Dashboard MVP generado.
 */

// ─── Sistema de Diseño (fuente de verdad) ────────────────────────────────────

export const DESIGN_SYSTEM = {
  colores: {
    fondo:     { base: '#080B11', panel: '#0C111A' },
    acento:    { teal: '#19E3C2' },
    alerta:    { amber: '#FF9F2E', red: '#FF5D5D' },
    apoyo:     { gold: '#F5C24B', green: '#39DC84', blue: '#5AA9FF' },
    texto:     { primary: '#EAF0F6', secondary: '#7E8AA0' },
  },
  tipografia: {
    display: "'Bricolage Grotesque', sans-serif",  // Títulos
    cuerpo:  "'Manrope', sans-serif",              // Textos
    datos:   "'Space Mono', monospace",            // Etiquetas técnicas
  },
  tokens: {
    borderRadius: { sm: '6px', md: '10px', lg: '14px', xl: '20px' },
    glass: 'rgba(12,17,26,0.85)',
    glassBorder: 'rgba(255,255,255,0.07)',
    glowTeal: '0 0 24px rgba(25,227,194,0.18)',
  },
  canales: {
    storyVertical:   { width: 1080, height: 1920 },
    postCuadrado:    { width: 1080, height: 1080 },
    postHorizontal:  { width: 1200, height: 628 },
    pantallaPrensa:  { width: 1920, height: 1080 },
    whatsapp:        { width: 1080, height: 1080 },
  },
} as const

// ─── Tipos de piezas compartibles ────────────────────────────────────────────

export type Canal = keyof typeof DESIGN_SYSTEM['canales']

export interface PiezaBase {
  id:        string
  tipo:      string
  canal:     Canal
  timestamp: Date
  version:   string
  aprobada:  boolean
}

export interface PiezaTransparencia extends PiezaBase {
  tipo:         'transparencia'
  compromiso:   string
  avance:       number   // 0–100
  evidencias:   number
  mensaje:      string
}

export interface PiezaIPM extends PiezaBase {
  tipo:          'ipm'
  problema:      string
  score:         number
  afectados:     number
  zonaDestacada: string
}

export interface PiezaMapaCalor extends PiezaBase {
  tipo:          'mapa-calor'
  capa:          'problemas' | 'votos' | 'cobertura'
  zonasDestacadas: string[]
}

// ─── Lógica de generación ────────────────────────────────────────────────────

/**
 * Valida que una pieza cumpla el criterio del Agente Diseñador:
 * "se puede publicar sin retoque".
 * TODO: integrar con API de Claude para review automático de copy.
 */
export function validarPieza(pieza: PiezaBase): { ok: boolean; observaciones: string[] } {
  const obs: string[] = []

  if (!pieza.canal) obs.push('Canal no especificado')
  if (!pieza.aprobada) obs.push('Pendiente de aprobación humana')

  // TODO: verificar que el copy respeta el sistema de diseño,
  // que no usa colores de partidos rivales,
  // que los datos incluidos provienen del Agente Estadístico.

  return { ok: obs.length === 0, observaciones: obs }
}

/**
 * Genera el copy para una pieza del Motor de Transparencia.
 * TODO: llamar a la API de Claude con el prompt adecuado.
 * El resultado siempre se revisa contra el sistema de diseño.
 */
export async function generarCopyTransparencia(compromiso: string, avance: number): Promise<string> {
  // TODO: const anthropic = new Anthropic()
  // const response = await anthropic.messages.create({
  //   model: 'claude-opus-4-7',
  //   max_tokens: 150,
  //   system: `Eres el copy de campaña de Fabio Cabrera, La Mesa.
  //            Tono: serio, cercano, basado en evidencia.
  //            Estética: sala de inteligencia — no eslóganes vacíos.
  //            Sistema de diseño: fondo oscuro, acento teal #19E3C2.`,
  //   messages: [{ role: 'user', content: `Compromiso: ${compromiso}. Avance: ${avance}%. Genera copy para post cuadrado WhatsApp.` }]
  // })
  return `TODO: copy automático — "${compromiso}" al ${avance}% · Fabio A. Cabrera`
}

/**
 * Genera el set de piezas para la decisión semanal.
 * Salida: imágenes listas para redes y WhatsApp.
 * TODO: implementar renderizado a canvas/SVG exportable.
 */
export async function generarPiezasSemana(
  _zonaDestacada: string,
  _problema: string,
  _score: number
): Promise<PiezaIPM[]> {
  // TODO: renderizar con canvas API o puppeteer,
  // exportar a PNG según dimensiones del canal,
  // almacenar en Supabase Storage.
  return []
}

/**
 * Verifica que todo el dashboard respete el sistema de diseño.
 * Corre ante cada nuevo análisis relevante.
 * Criterio: "¿se ve como app de candidato genérica?" → si sí, está mal.
 */
export function auditarUI(): { ok: boolean; hallazgos: string[] } {
  const hallazgos: string[] = []
  // TODO: verificar via CSS-in-JS que todos los colores
  // pertenecen al sistema de diseño definido arriba.
  // TODO: verificar que las fuentes cargadas son Bricolage + Manrope + Space Mono.
  return { ok: hallazgos.length === 0, hallazgos }
}

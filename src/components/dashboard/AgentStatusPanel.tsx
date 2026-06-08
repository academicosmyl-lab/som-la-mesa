import { Bot, Activity, Database, Palette } from 'lucide-react'
import { AGENTES } from '../../data/seed'
import type { StatsReportes } from '../../hooks/useDashboardData'

const ICONS = { estadistico: Database, analitico: Activity, disenador: Palette }
const ESTADO_COLOR: Record<string, string> = {
  ACTIVO:        '#19E3C2',
  INICIALIZANDO: '#FF9F2E',
  ERROR:         '#FF5D5D',
}
const ESTADO_BG: Record<string, string> = {
  ACTIVO:        'rgba(25,227,194,0.08)',
  INICIALIZANDO: 'rgba(255,159,46,0.08)',
  ERROR:         'rgba(255,93,93,0.08)',
}

interface Props {
  stats?:   StatsReportes
  loading?: boolean
}

export default function AgentStatusPanel({ stats, loading }: Props) {
  const tieneData = stats && stats.total > 0
  const temasActivos = tieneData
    ? Object.values(stats.porTema).filter(v => v > 0).length
    : 0

  const agentesLive = tieneData
    ? [
        {
          id: 'estadistico',
          estado: 'ACTIVO',
          rol: `Procesando ${stats.total} reporte${stats.total !== 1 ? 's' : ''} ciudadanos en tiempo real`,
          descripcionEstado: `${stats.total} registros`,
        },
        {
          id: 'analitico',
          estado: 'ACTIVO',
          rol: `Analizando ${temasActivos} tema${temasActivos !== 1 ? 's' : ''} con reporte activo en el municipio`,
          descripcionEstado: `${temasActivos} temas`,
        },
        {
          id: 'disenador',
          estado: 'ACTIVO',
          rol: 'Diseña visualizaciones y piezas para redes a partir de los datos del SOM',
          descripcionEstado: 'En servicio',
        },
      ]
    : null

  const lista = agentesLive ?? AGENTES

  return (
    <div className="glass rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Bot size={14} color="#7E8AA0" />
        <div className="flex-1">
          <p className="panel-label">Agentes IA</p>
          <p className="font-display font-semibold text-[13px] mt-[1px]" style={{ color: '#EAF0F6' }}>
            Motor Autónomo
          </p>
        </div>
        {loading && (
          <span className="font-data text-[8px] uppercase tracking-widest" style={{ color: '#FF9F2E' }}>
            Cargando…
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {lista.map((ag) => {
          const Icon = ICONS[ag.id as keyof typeof ICONS] ?? Bot
          const color = ESTADO_COLOR[ag.estado]
          return (
            <div key={ag.id} className="rounded-xl p-3 flex-1"
              style={{ background: ESTADO_BG[ag.estado], border: `1px solid ${color}25` }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-lg shrink-0"
                    style={{ width: 28, height: 28, background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Icon size={13} color={color} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[12px]" style={{ color: '#EAF0F6' }}>
                      {ag.id === 'estadistico' ? 'Estadístico' : ag.id === 'analitico' ? 'Analítico' : 'Diseñador'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <div
                    className={ag.estado === 'ACTIVO' ? 'pulse-dot' : ''}
                    style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: color,
                      ...(ag.estado !== 'ACTIVO' ? { display: 'inline-block' } : {}),
                    }}
                  />
                  <span className="font-data text-[8px] font-bold uppercase tracking-widest" style={{ color }}>
                    {ag.estado}
                  </span>
                </div>
              </div>

              <p className="text-[10px] mt-2 leading-tight" style={{ color: '#7E8AA0' }}>{ag.rol}</p>

              <div className="flex items-center justify-between mt-2 pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="panel-label">Estado</span>
                <span className="font-data text-[9px]" style={{ color }}>
                  {ag.descripcionEstado}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="font-data text-[9px] mt-3" style={{ color: '#3a4760', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 8 }}>
        {tieneData
          ? `Última actualización: ${new Date(stats!.ultimaActualizacion ?? '').toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}`
          : 'Agentes Estadístico y Analítico inicializan con datos de campo'}
      </p>
    </div>
  )
}

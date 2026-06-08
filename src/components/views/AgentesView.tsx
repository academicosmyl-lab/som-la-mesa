import { Bot, Database, Activity, Palette, CheckCircle2, Circle } from 'lucide-react'
import type { StatsReportes } from '../../hooks/useDashboardData'

interface Props { stats: StatsReportes; loading: boolean }

const CAPACIDADES = [
  { agente: 'estadistico', label: 'Agente Estadístico', icon: Database, color: '#5AA9FF',
    descripcion: 'Procesa todos los reportes ciudadanos entrantes, calcula distribuciones por zona y tema, y mantiene el IPM actualizado en tiempo real.',
    capacidades: [
      'Conteo y clasificación de reportes por tema',
      'Distribución geográfica por zona/vereda',
      'Cálculo del Índice de Prioridad Municipal (IPM)',
      'Detección de anomalías en patrones de reporte',
    ],
  },
  { agente: 'analitico', label: 'Agente Analítico', icon: Activity, color: '#19E3C2',
    descripcion: 'Analiza el sentimiento y la tendencia de los datos para generar el Índice de Humor Social y alertas de atención territorial.',
    capacidades: [
      'Análisis de sentimiento por distribución de temas',
      'Detección de zonas con alta concentración de problemas',
      'Generación del Índice de Humor Social municipal',
      'Alertas de prioridad para el equipo de campaña',
    ],
  },
  { agente: 'disenador', label: 'Agente Diseñador', icon: Palette, color: '#A78BFA',
    descripcion: 'Genera piezas visuales y contenido para redes sociales a partir de los datos del SOM, listas para compartir por WhatsApp.',
    capacidades: [
      'Generación de infografías con datos reales',
      'Piezas para WhatsApp y redes sociales',
      'Certificados de compromisos cumplidos',
      'Resúmenes semanales de actividad del SOM',
    ],
  },
]

export default function AgentesView({ stats, loading }: Props) {
  const tieneData = stats.total > 0

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Banner de estado */}
      <div className="glass rounded-xl px-5 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-xl"
            style={{ width: 40, height: 40, background: 'rgba(25,227,194,0.1)', border: '1px solid rgba(25,227,194,0.2)' }}>
            <Bot size={20} color="#19E3C2" />
          </div>
          <div>
            <p className="font-display font-bold text-[15px]" style={{ color: '#EAF0F6' }}>Motor Autónomo SOM</p>
            <p className="font-data text-[10px]" style={{ color: '#7E8AA0' }}>3 agentes activos · actualización en tiempo real</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-data font-bold text-[22px]" style={{ color: tieneData ? '#39DC84' : '#FF9F2E' }}>
            {loading ? '…' : stats.total}
          </p>
          <p className="panel-label">registros procesados</p>
        </div>
      </div>

      {/* Tarjetas de agentes */}
      <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
        {CAPACIDADES.map(ag => {
          const Icon = ag.icon
          const activo = ag.agente === 'disenador' || tieneData
          return (
            <div key={ag.agente} className="glass rounded-xl p-5 flex flex-col gap-3 overflow-y-auto scroll-som">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-xl shrink-0"
                    style={{ width: 36, height: 36, background: `${ag.color}15`, border: `1px solid ${ag.color}30` }}>
                    <Icon size={16} color={ag.color} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-[13px]" style={{ color: '#EAF0F6' }}>{ag.label}</p>
                    <div className="flex items-center gap-1 mt-[2px]">
                      <div className={activo ? 'pulse-dot' : ''}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: activo ? '#39DC84' : '#FF9F2E',
                          ...(!activo ? { display: 'inline-block' } : {}) }} />
                      <span className="font-data text-[8px] font-bold uppercase"
                        style={{ color: activo ? '#39DC84' : '#FF9F2E' }}>
                        {activo ? 'ACTIVO' : 'INICIALIZANDO'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed" style={{ color: '#7E8AA0' }}>{ag.descripcion}</p>

              <div className="flex flex-col gap-[6px] pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="panel-label mb-1">Capacidades</p>
                {ag.capacidades.map(cap => (
                  <div key={cap} className="flex items-start gap-2">
                    {activo
                      ? <CheckCircle2 size={11} color={ag.color} className="shrink-0 mt-[1px]" />
                      : <Circle size={11} color="#3a4760" className="shrink-0 mt-[1px]" />
                    }
                    <span className="text-[10px] leading-tight" style={{ color: activo ? '#c5cfd9' : '#3a4760' }}>
                      {cap}
                    </span>
                  </div>
                ))}
              </div>

              {!activo && (
                <p className="font-data text-[9px] mt-auto pt-2" style={{ color: '#FF9F2E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  Inicializa cuando lleguen los primeros reportes ciudadanos
                </p>
              )}
              {activo && ag.agente !== 'disenador' && (
                <p className="font-data text-[9px] mt-auto pt-2" style={{ color: ag.color, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  Procesando {stats.total} reporte{stats.total !== 1 ? 's' : ''} · última act. hace un momento
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

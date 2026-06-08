import Badge from '../ui/Badge'
import { DEMO_PROBLEMAS } from '../../data/seed'
import type { StatsReportes } from '../../hooks/useDashboardData'
import type { TemaReporte } from '../../lib/database.types'

const URGENCIA_VARIANT: Record<string, 'red' | 'amber' | 'green'> = {
  ALTA:  'red',
  MEDIA: 'amber',
  BAJA:  'green',
}

const TEMA_META: Record<TemaReporte, { nombre: string; color: string }> = {
  vias:      { nombre: 'Vías y movilidad',  color: '#FF9F2E' },
  agua:      { nombre: 'Agua / acueducto',  color: '#5AA9FF' },
  seguridad: { nombre: 'Seguridad',          color: '#FF5D5D' },
  salud:     { nombre: 'Salud',              color: '#39DC84' },
  educacion: { nombre: 'Educación',          color: '#A78BFA' },
  empleo:    { nombre: 'Empleo / economía',  color: '#F5C24B' },
  otro:      { nombre: 'Otros problemas',    color: '#7E8AA0' },
}

interface Props { stats?: StatsReportes }

export default function PriorityIndex({ stats }: Props) {
  const esLive = stats && stats.total > 0

  // Calcular IPM desde datos reales
  const problemasLive = esLive
    ? Object.entries(stats.porTema)
        .filter(([, count]) => count > 0)
        .sort(([, a], [, b]) => b - a)
        .map(([tema, count], i) => {
          const meta = TEMA_META[tema as TemaReporte]
          const maxCount = Math.max(...Object.values(stats.porTema))
          const ipm = Math.round((count / maxCount) * 95) + 4
          return {
            id: tema,
            nombre: meta.nombre,
            color: meta.color,
            ipm,
            urgencia: ipm >= 70 ? 'ALTA' : ipm >= 50 ? 'MEDIA' : 'BAJA',
            afectados: count,
            zona: 'Reportes ciudadanos',
            rank: i + 1,
          }
        })
    : null

  const lista = problemasLive ?? DEMO_PROBLEMAS

  return (
    <div className="glass rounded-xl p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="panel-label">Índice de Prioridad Municipal</p>
          <p className="font-display font-semibold text-[13px] mt-[2px]" style={{ color: '#EAF0F6' }}>
            IPM — Ranking Automático
          </p>
        </div>
        {esLive
          ? <span className="font-data text-[8px] font-bold uppercase tracking-widest px-2 py-[3px] rounded"
              style={{ background: 'rgba(57,220,132,0.12)', color: '#39DC84', border: '1px solid rgba(57,220,132,0.25)' }}>LIVE</span>
          : <span className="demo-badge">DEMO</span>
        }
      </div>

      <div className="flex-1 overflow-y-auto scroll-som space-y-[6px]">
        {lista.map((p, i) => (
          <div key={p.id}
            className={`rounded-lg px-3 py-[9px] ${i === 0 ? 'glass-teal' : ''}`}
            style={i !== 0 ? { background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' } : {}}>
            <div className="flex items-start gap-2">
              <span className="font-data font-bold text-[13px] tabular-nums shrink-0 mt-[1px]"
                style={{ color: i === 0 ? '#19E3C2' : '#7E8AA0', minWidth: 16 }}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-display font-semibold text-[12px] truncate"
                    style={{ color: i === 0 ? '#EAF0F6' : '#c5cfd9' }}>
                    {p.nombre}
                  </p>
                  <Badge variant={URGENCIA_VARIANT[p.urgencia]}>{p.urgencia}</Badge>
                </div>
                <div className="flex items-center gap-2 mt-[5px]">
                  <div className="progress-bar flex-1">
                    <div className="progress-fill" style={{ width: `${p.ipm}%`, background: p.color }} />
                  </div>
                  <span className="font-data text-[10px] tabular-nums shrink-0" style={{ color: p.color }}>{p.ipm}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
                    {esLive ? `${p.afectados} reporte${p.afectados !== 1 ? 's' : ''}` : `${(p.afectados as number).toLocaleString('es-CO')} afectados`}
                  </span>
                  <span className="font-data text-[9px]" style={{ color: '#3a4760' }}>·</span>
                  <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>{p.zona}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="font-data text-[9px] pt-2 mt-1" style={{ color: '#3a4760', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {esLive ? `Calculado desde ${stats.total} reportes ciudadanos` : 'IPM = impacto + afectados + costo + urgencia + popularidad + viabilidad'}
      </p>
    </div>
  )
}

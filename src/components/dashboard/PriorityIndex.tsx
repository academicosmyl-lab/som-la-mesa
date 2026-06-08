import Badge from '../ui/Badge'
import { DEMO_PROBLEMAS } from '../../data/seed'

const URGENCIA_VARIANT: Record<string, 'red' | 'amber' | 'green'> = {
  ALTA:  'red',
  MEDIA: 'amber',
  BAJA:  'green',
}

export default function PriorityIndex() {
  return (
    <div className="glass rounded-xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="panel-label">Índice de Prioridad Municipal</p>
          <p className="font-display font-semibold text-[13px] mt-[2px]" style={{ color: '#EAF0F6' }}>
            IPM — Ranking Automático
          </p>
        </div>
        <span className="demo-badge">DEMO</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scroll-som space-y-[6px]">
        {DEMO_PROBLEMAS.map((p, i) => (
          <div
            key={p.id}
            className={`rounded-lg px-3 py-[9px] ${i === 0 ? 'glass-teal' : ''}`}
            style={i !== 0 ? { background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' } : {}}
          >
            <div className="flex items-start gap-2">
              {/* Rank */}
              <span
                className="font-data font-bold text-[13px] tabular-nums shrink-0 mt-[1px]"
                style={{ color: i === 0 ? '#19E3C2' : '#7E8AA0', minWidth: 16 }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p
                    className="font-display font-semibold text-[12px] truncate"
                    style={{ color: i === 0 ? '#EAF0F6' : '#c5cfd9' }}
                  >
                    {p.nombre}
                  </p>
                  <Badge variant={URGENCIA_VARIANT[p.urgencia]}>{p.urgencia}</Badge>
                </div>

                {/* IPM bar */}
                <div className="flex items-center gap-2 mt-[5px]">
                  <div className="progress-bar flex-1">
                    <div
                      className="progress-fill"
                      style={{ width: `${p.ipm}%`, background: p.color }}
                    />
                  </div>
                  <span className="font-data text-[10px] tabular-nums shrink-0" style={{ color: p.color }}>
                    {p.ipm}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
                    {p.afectados.toLocaleString('es-CO')} afectados
                  </span>
                  <span className="font-data text-[9px]" style={{ color: '#3a4760' }}>·</span>
                  <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
                    {p.zona}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="font-data text-[9px] pt-2 mt-1" style={{ color: '#3a4760', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        IPM = impacto + afectados + costo + urgencia + popularidad + viabilidad
      </p>
    </div>
  )
}

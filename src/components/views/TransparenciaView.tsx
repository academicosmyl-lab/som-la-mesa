import { ShieldCheck, Camera, FileText, TrendingUp } from 'lucide-react'
import Badge from '../ui/Badge'
import { DEMO_COMPROMISOS } from '../../data/seed'
import type { CompromisoDB } from '../../hooks/useDashboardData'

const ESTADO_VARIANT: Record<string, 'gray' | 'amber' | 'teal' | 'green'> = {
  PENDIENTE:   'gray',
  EN_PROGRESO: 'amber',
  CUMPLIDO:    'green',
}

interface Props { compromisos: CompromisoDB[] }

export default function TransparenciaView({ compromisos }: Props) {
  const esLive = compromisos.length > 0
  const lista = esLive
    ? compromisos.map(c => ({ id: c.id, titulo: c.titulo, descripcion: c.descripcion,
        estado: c.estado, avance: c.avance_pct, evidencias: c.evidencia_url ? 1 : 0, fecha: c.fecha_compromiso }))
    : DEMO_COMPROMISOS.map(c => ({ ...c, id: String(c.id), descripcion: c.descripcion, fecha: '' }))

  const cumplidos    = lista.filter(c => c.estado === 'CUMPLIDO').length
  const enProgreso   = lista.filter(c => c.estado === 'EN_PROGRESO').length
  const avanceProm   = lista.length > 0 ? Math.round(lista.reduce((s, c) => s + c.avance, 0) / lista.length) : 0

  return (
    <div className="h-full flex flex-col gap-3">

      {/* KPIs de compromisos */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {[
          { label: 'Total compromisos', value: lista.length, color: '#EAF0F6' },
          { label: 'Cumplidos',         value: cumplidos,    color: '#39DC84' },
          { label: 'En progreso',       value: enProgreso,   color: '#FF9F2E' },
          { label: 'Avance promedio',   value: `${avanceProm}%`, color: '#19E3C2' },
        ].map(k => (
          <div key={k.label} className="glass rounded-xl px-4 py-3">
            <p className="panel-label">{k.label}</p>
            <p className="font-data font-bold text-[26px]" style={{ color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Grid de compromisos */}
      <div className="flex-1 overflow-y-auto scroll-som min-h-0">
        <div className="glass rounded-xl p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} color="#19E3C2" />
              <p className="font-display font-semibold text-[13px]" style={{ color: '#EAF0F6' }}>
                Compromisos de Campaña — "Él Sí Cumple"
              </p>
            </div>
            {esLive
              ? <span className="font-data text-[8px] font-bold uppercase tracking-widest px-2 py-[3px] rounded"
                  style={{ background: 'rgba(57,220,132,0.12)', color: '#39DC84', border: '1px solid rgba(57,220,132,0.25)' }}>LIVE</span>
              : <span className="demo-badge">DEMO</span>
            }
          </div>

          <div className="grid grid-cols-3 gap-3 overflow-y-auto scroll-som">
            {lista.map(c => (
              <div key={c.id} className="rounded-xl p-4 flex flex-col gap-3"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display font-semibold text-[13px] leading-tight" style={{ color: '#EAF0F6' }}>
                    {c.titulo}
                  </p>
                  <Badge variant={ESTADO_VARIANT[c.estado] ?? 'gray'}>{c.estado.replace('_', ' ')}</Badge>
                </div>

                {c.descripcion && (
                  <p className="text-[11px] leading-relaxed" style={{ color: '#7E8AA0' }}>{c.descripcion}</p>
                )}

                <div>
                  <div className="flex items-center justify-between mb-[6px]">
                    <div className="flex items-center gap-1">
                      <TrendingUp size={10} color="#19E3C2" />
                      <span className="panel-label">Avance</span>
                    </div>
                    <span className="font-data font-bold text-[13px]"
                      style={{ color: c.avance === 100 ? '#39DC84' : '#19E3C2' }}>{c.avance}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-fill" style={{
                      width: `${c.avance}%`,
                      background: c.avance === 100 ? '#39DC84' : c.avance > 0 ? '#19E3C2' : 'transparent',
                    }} />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-1">
                    <Camera size={10} color="#7E8AA0" />
                    <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>{c.evidencias} fotos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText size={10} color="#7E8AA0" />
                    <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>0 docs</span>
                  </div>
                  {c.fecha && (
                    <span className="font-data text-[9px] ml-auto" style={{ color: '#3a4760' }}>
                      {new Date(c.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

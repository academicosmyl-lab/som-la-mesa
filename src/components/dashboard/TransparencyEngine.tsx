import { ShieldCheck, Camera, FileText } from 'lucide-react'
import Badge from '../ui/Badge'
import { DEMO_COMPROMISOS } from '../../data/seed'
import type { CompromisoDB } from '../../hooks/useDashboardData'

const ESTADO_VARIANT: Record<string, 'gray' | 'amber' | 'teal' | 'green'> = {
  PENDIENTE:   'gray',
  EN_PROGRESO: 'amber',
  CUMPLIDO:    'green',
}

interface Props { compromisos?: CompromisoDB[] }

export default function TransparencyEngine({ compromisos }: Props) {
  const esLive = compromisos && compromisos.length > 0

  // Normalise so template works for both real and demo data
  const lista = esLive
    ? compromisos.map(c => ({
        id:          c.id,
        titulo:      c.titulo,
        descripcion: c.descripcion,
        estado:      c.estado,
        avance:      c.avance_pct,
        evidencias:  c.evidencia_url ? 1 : 0,
        fecha:       c.fecha_compromiso,
      }))
    : DEMO_COMPROMISOS.map(c => ({ ...c, id: String(c.id), descripcion: '', fecha: '' }))

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck size={15} color="#19E3C2" />
          <div>
            <p className="panel-label">Motor de Transparencia</p>
            <p className="font-display font-semibold text-[13px]" style={{ color: '#EAF0F6' }}>
              Compromisos de Campaña — "Él Sí Cumple"
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {esLive
            ? <span className="font-data text-[8px] font-bold uppercase tracking-widest px-2 py-[3px] rounded"
                style={{ background: 'rgba(57,220,132,0.12)', color: '#39DC84', border: '1px solid rgba(57,220,132,0.25)' }}>LIVE</span>
            : <span className="demo-badge">DEMO</span>
          }
          <span className="font-data text-[9px] px-2 py-1 rounded"
            style={{ background: 'rgba(126,138,160,0.1)', color: '#7E8AA0', border: '1px solid rgba(126,138,160,0.15)' }}>
            {lista.length} compromisos
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {lista.map((c) => (
          <div key={c.id} className="rounded-xl p-3 flex flex-col gap-2"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between gap-1">
              <p className="font-display font-semibold text-[12px] leading-tight" style={{ color: '#EAF0F6' }}>
                {c.titulo}
              </p>
              <Badge variant={ESTADO_VARIANT[c.estado] ?? 'gray'}>{c.estado}</Badge>
            </div>

            {c.descripcion && (
              <p className="text-[10px] leading-tight" style={{ color: '#7E8AA0' }}>{c.descripcion}</p>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="panel-label">Avance</span>
                <span className="font-data text-[10px]" style={{ color: '#7E8AA0' }}>{c.avance}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{
                  width: `${c.avance}%`,
                  background: c.avance === 100 ? '#39DC84' : c.avance > 0 ? '#19E3C2' : 'transparent',
                }} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Camera size={10} color="#7E8AA0" />
                <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
                  {c.evidencias} fotos
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FileText size={10} color="#7E8AA0" />
                <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>0 docs</span>
              </div>
            </div>

            {c.fecha && (
              <p className="font-data text-[8px]" style={{ color: '#3a4760' }}>
                {new Date(c.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="font-data text-[9px] mt-3" style={{ color: '#3a4760' }}>
        Cada compromiso cumplido genera una pieza compartible automática para redes y WhatsApp · Ley 1581 aplicada
      </p>
    </div>
  )
}

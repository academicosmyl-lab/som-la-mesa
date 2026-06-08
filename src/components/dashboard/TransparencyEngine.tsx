import { ShieldCheck, Camera, FileText } from 'lucide-react'
import Badge from '../ui/Badge'
import { DEMO_COMPROMISOS } from '../../data/seed'

const ESTADO_VARIANT: Record<string, 'gray' | 'amber' | 'teal' | 'green'> = {
  PENDIENTE:   'gray',
  EN_PROGRESO: 'amber',
  CUMPLIDO:    'green',
}

export default function TransparencyEngine() {
  return (
    <div className="glass rounded-xl p-4">
      {/* Header */}
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
          <span className="demo-badge">DEMO</span>
          <span
            className="font-data text-[9px] px-2 py-1 rounded"
            style={{ background: 'rgba(126,138,160,0.1)', color: '#7E8AA0', border: '1px solid rgba(126,138,160,0.15)' }}
          >
            {DEMO_COMPROMISOS.length} compromisos
          </span>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-4 gap-3">
        {DEMO_COMPROMISOS.map((c) => (
          <div
            key={c.id}
            className="rounded-xl p-3 flex flex-col gap-2"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-start justify-between gap-1">
              <p
                className="font-display font-semibold text-[12px] leading-tight"
                style={{ color: '#EAF0F6' }}
              >
                {c.titulo}
              </p>
              <Badge variant={ESTADO_VARIANT[c.estado]}>{c.estado}</Badge>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="panel-label">Avance</span>
                <span className="font-data text-[10px]" style={{ color: '#7E8AA0' }}>
                  {c.avance}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${c.avance}%`,
                    background: c.avance === 100 ? '#39DC84' : c.avance > 0 ? '#19E3C2' : 'transparent',
                  }}
                />
              </div>
            </div>

            {/* Evidence */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Camera size={10} color="#7E8AA0" />
                <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
                  {c.evidencias} fotos
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FileText size={10} color="#7E8AA0" />
                <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
                  0 docs
                </span>
              </div>
            </div>

            <p className="font-data text-[8px]" style={{ color: '#3a4760' }}>
              TODO: fecha y descripción del compromiso
            </p>
          </div>
        ))}
      </div>

      <p className="font-data text-[9px] mt-3" style={{ color: '#3a4760' }}>
        Cada compromiso cumplido genera una pieza compartible automática para redes y WhatsApp · Ley 1581 aplicada
      </p>
    </div>
  )
}

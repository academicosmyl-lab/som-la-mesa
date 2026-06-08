import { useClock, daysUntil } from '../../hooks/useClock'
import { ELECCION } from '../../data/seed'

export default function Header() {
  const now = useClock()
  const days = daysUntil(ELECCION.fechaEstimada)

  const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const dateStr = now.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <header
      className="flex items-center justify-between px-5"
      style={{
        height: 58,
        minHeight: 58,
        background: 'rgba(8,11,17,0.95)',
        borderBottom: '1px solid rgba(25,227,194,0.12)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Left: Title */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-[14px] tracking-wider uppercase" style={{ color: '#EAF0F6' }}>
            Sistema Operativo Municipal
          </span>
          <span
            className="font-data text-[8px] px-[5px] py-[1px] rounded"
            style={{ background: 'rgba(25,227,194,0.1)', color: '#19E3C2', border: '1px solid rgba(25,227,194,0.25)' }}
          >
            MVP
          </span>
        </div>
        <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
          Campaña Fabio A. Cabrera Parra · La Mesa, Cundinamarca
        </p>
      </div>

      {/* Center: Live clock */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="pulse-dot" style={{ background: '#19E3C2', width: 7, height: 7 }} />
          <span className="font-data text-[9px] uppercase tracking-widest" style={{ color: '#19E3C2' }}>
            Live
          </span>
        </div>
        <div className="text-center">
          <div className="font-data font-bold text-[18px]" style={{ color: '#EAF0F6', letterSpacing: '0.05em' }}>
            {timeStr}
          </div>
          <div className="font-data text-[9px] capitalize" style={{ color: '#7E8AA0' }}>
            {dateStr}
          </div>
        </div>
      </div>

      {/* Right: Election countdown */}
      <div className="text-right">
        <div className="flex items-center justify-end gap-2">
          <span className="panel-label">Elección objetivo</span>
        </div>
        <div className="flex items-center justify-end gap-2 mt-[2px]">
          <span
            className="font-display font-bold text-[22px] tabular-nums"
            style={{ color: '#F5C24B' }}
          >
            {days.toLocaleString('es-CO')}
          </span>
          <div>
            <div className="font-data text-[9px] uppercase" style={{ color: '#7E8AA0' }}>días</div>
            <div className="font-data text-[9px]" style={{ color: '#F5C24B' }}>Oct 2027</div>
          </div>
        </div>
      </div>
    </header>
  )
}

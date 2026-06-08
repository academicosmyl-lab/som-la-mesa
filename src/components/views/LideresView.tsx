import { useLideres } from '../../hooks/useDashboardData'
import { Users, MapPin, Phone, Calendar, Star } from 'lucide-react'

function maskName(nombre: string): string {
  const parts = nombre.trim().split(' ')
  if (parts.length === 1) return parts[0][0] + '***'
  return `${parts[0]} ${parts[1]?.[0] ?? ''}***`
}

function maskPhone(cel: string): string {
  const d = cel.replace(/\D/g, '')
  if (d.length < 7) return '***'
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-****`
}

export default function LideresView() {
  const { lideres, loading } = useLideres()

  const porZona = lideres.reduce<Record<string, number>>((acc, l) => {
    const z = l.zona_nombre ?? 'Sin zona'
    acc[z] = (acc[z] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="h-full flex flex-col gap-3">

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        <div className="glass rounded-xl px-4 py-3">
          <p className="panel-label">Líderes voluntarios</p>
          <p className="font-data font-bold text-[28px]" style={{ color: '#F5C24B' }}>
            {loading ? '…' : lideres.length}
          </p>
        </div>
        <div className="glass rounded-xl px-4 py-3">
          <p className="panel-label">Zonas representadas</p>
          <p className="font-data font-bold text-[28px]" style={{ color: '#19E3C2' }}>
            {loading ? '…' : Object.keys(porZona).length}
          </p>
        </div>
        <div className="glass rounded-xl px-4 py-3">
          <p className="panel-label">Zona con más líderes</p>
          <p className="font-data font-bold text-[14px] mt-1" style={{ color: '#EAF0F6' }}>
            {loading ? '…' : Object.entries(porZona).sort(([,a],[,b])=>b-a)[0]?.[0] ?? '—'}
          </p>
        </div>
        <div className="glass rounded-xl px-4 py-3">
          <p className="panel-label">Estado</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="pulse-dot" style={{ background: '#F5C24B', width: 7, height: 7 }} />
            <p className="font-data font-bold text-[12px]" style={{ color: '#F5C24B' }}>Red activa</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 flex-1 min-h-0" style={{ gridTemplateColumns: '2fr 1fr' }}>

        {/* Tabla de líderes */}
        <div className="glass rounded-xl p-4 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-3 shrink-0">
            <Users size={14} color="#F5C24B" />
            <p className="font-display font-semibold text-[13px]" style={{ color: '#EAF0F6' }}>
              Red de Líderes · Datos protegidos (Ley 1581)
            </p>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-data text-[11px]" style={{ color: '#7E8AA0' }}>Cargando…</p>
            </div>
          ) : lideres.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <Star size={36} color="#3a4760" />
              <p className="font-display text-[14px]" style={{ color: '#7E8AA0' }}>
                Aún no hay líderes registrados
              </p>
              <p className="font-data text-[11px] text-center" style={{ color: '#3a4760', maxWidth: 320 }}>
                Cuando un ciudadano marque "quiero ser líder de mi zona" en el formulario, aparecerá aquí
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto scroll-som">
              {/* Header */}
              <div className="grid gap-3 pb-2" style={{ gridTemplateColumns: '2fr 2fr 2fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 8, marginBottom: 6 }}>
                <span className="panel-label">Nombre</span>
                <span className="panel-label">Zona</span>
                <span className="panel-label">Contacto</span>
                <span className="panel-label">Fecha</span>
              </div>
              {lideres.map(l => (
                <div key={l.id} className="grid gap-3 py-[9px] px-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                  style={{ gridTemplateColumns: '2fr 2fr 2fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full"
                      style={{ width: 24, height: 24, background: 'rgba(245,194,75,0.15)', border: '1px solid rgba(245,194,75,0.3)', flexShrink: 0 }}>
                      <Star size={10} color="#F5C24B" fill="#F5C24B" />
                    </div>
                    <span className="font-data text-[11px]" style={{ color: '#EAF0F6' }}>{maskName(l.nombre)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} color="#7E8AA0" />
                    <span className="font-data text-[10px]" style={{ color: '#c5cfd9' }}>{l.zona_nombre ?? 'Sin zona'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={10} color="#7E8AA0" />
                    <span className="font-data text-[10px]" style={{ color: '#7E8AA0' }}>{maskPhone(l.celular)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={9} color="#3a4760" />
                    <span className="font-data text-[9px]" style={{ color: '#3a4760' }}>
                      {new Date(l.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Distribución por zona */}
        <div className="glass rounded-xl p-4 flex flex-col min-h-0">
          <p className="panel-label mb-3 shrink-0">Por zona</p>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-data text-[11px]" style={{ color: '#7E8AA0' }}>Cargando…</p>
            </div>
          ) : Object.keys(porZona).length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-data text-[11px] text-center" style={{ color: '#3a4760' }}>Sin datos aún</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto scroll-som space-y-2">
              {Object.entries(porZona).sort(([,a],[,b])=>b-a).map(([zona, count]) => {
                const max = Math.max(...Object.values(porZona))
                const pct = Math.round((count / max) * 100)
                return (
                  <div key={zona}>
                    <div className="flex items-center justify-between mb-[4px]">
                      <span className="font-data text-[10px]" style={{ color: '#c5cfd9' }}>{zona}</span>
                      <span className="font-data font-bold text-[11px]" style={{ color: '#F5C24B' }}>{count}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%`, background: '#F5C24B' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <p className="font-data text-[8px] mt-3 pt-2 shrink-0" style={{ color: '#3a4760', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            Datos protegidos · Solo visibles para el equipo autorizado · Ley 1581 de 2012
          </p>
        </div>
      </div>
    </div>
  )
}

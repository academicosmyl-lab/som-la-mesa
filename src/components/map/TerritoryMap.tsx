import { useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from 'react-leaflet'
import { MUNICIPIO, DEMO_MAP_POINTS, TERRITORIO, ZONA_COORDS } from '../../data/seed'
import type { ReporteResumen } from '../../hooks/useDashboardData'

const TYPE_STYLES = {
  urban: { color: '#5AA9FF', radius: 14, fillOpacity: 0.25 },
  rural: { color: '#19E3C2', radius: 9,  fillOpacity: 0.3  },
  alert: { color: '#FF5D5D', radius: 7,  fillOpacity: 0.4  },
}
const TYPE_LABEL = { urban: 'Zona Urbana', rural: 'Zona Rural', alert: 'Alerta Ciudadana' }
const TEMA_COLOR: Record<string, string> = {
  vias: '#FF9F2E', agua: '#5AA9FF', seguridad: '#FF5D5D',
  salud: '#39DC84', educacion: '#A78BFA', empleo: '#F5C24B', otro: '#7E8AA0',
}

interface Props {
  reportes?: ReporteResumen[]
  mode?:     'puntos' | 'calor'
}

export default function TerritoryMap({ reportes, mode = 'puntos' }: Props) {
  const center: [number, number] = [MUNICIPIO.coordenadas.lat, MUNICIPIO.coordenadas.lng]
  const esLive = reportes && reportes.length > 0
  const reportesConGPS = reportes?.filter(r => r.lat !== null && r.lng !== null) ?? []

  // Agrupa reportes por zona para el mapa de calor
  const zonaClusters = useMemo(() => {
    if (!reportes?.length) return []
    const map: Record<string, { lat: number; lng: number; count: number }> = {}
    reportes.forEach(r => {
      const coords = ZONA_COORDS[r.zona_nombre]
      if (!coords) return
      if (!map[r.zona_nombre]) map[r.zona_nombre] = { lat: coords[0], lng: coords[1], count: 0 }
      map[r.zona_nombre].count++
    })
    return Object.values(map)
  }, [reportes])

  // Agrupa reportes con GPS por proximidad
  const gpsClusters = useMemo(() => {
    if (!reportesConGPS.length) return []
    const map: Record<string, { lat: number; lng: number; count: number }> = {}
    reportesConGPS.forEach(r => {
      const key = `${Math.round(r.lat! * 200) / 200},${Math.round(r.lng! * 200) / 200}`
      if (!map[key]) map[key] = { lat: r.lat!, lng: r.lng!, count: 0 }
      map[key].count++
    })
    return Object.values(map)
  }, [reportesConGPS])

  const heatSources = gpsClusters.length > 0 ? gpsClusters : zonaClusters

  return (
    <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <p className="panel-label">Gemelo Digital del Territorio</p>
          <p className="font-display font-semibold text-[13px] mt-[2px]" style={{ color: '#EAF0F6' }}>
            La Mesa · Cundinamarca
          </p>
        </div>
        <div className="flex items-center gap-3">
          {esLive
            ? <span className="font-data text-[8px] font-bold uppercase tracking-widest px-2 py-[3px] rounded"
                style={{ background: 'rgba(57,220,132,0.12)', color: '#39DC84', border: '1px solid rgba(57,220,132,0.25)' }}>LIVE</span>
            : <span className="demo-badge">DEMO</span>
          }
          {mode === 'puntos' && (
            <div className="flex items-center gap-3">
              {(['urban', 'rural', 'alert'] as const).map(t => (
                <div key={t} className="flex items-center gap-1">
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: TYPE_STYLES[t].color }} />
                  <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>{TYPE_LABEL[t]}</span>
                </div>
              ))}
            </div>
          )}
          {mode === 'calor' && (
            <div className="flex items-center gap-3">
              {[['#FF5D5D','Alta'], ['#FF9F2E','Media'], ['#F5C24B','Baja']].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1">
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                  <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>{l} densidad</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative" style={{ minHeight: 0 }}>
        <MapContainer center={center} zoom={MUNICIPIO.zoom}
          style={{ width: '100%', height: '100%' }}
          zoomControl={true} attributionControl={true}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
          />

          <Circle center={center} radius={1800} pathOptions={{
            color: '#5AA9FF', fillColor: '#5AA9FF', fillOpacity: 0.04, weight: 1, dashArray: '4 4',
          }} />

          {/* ── MODO PUNTOS ── */}
          {mode === 'puntos' && (
            <>
              {!esLive && DEMO_MAP_POINTS.map(pt => {
                const style = TYPE_STYLES[pt.tipo]
                return (
                  <CircleMarker key={pt.id} center={pt.pos} radius={style.radius}
                    pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: style.fillOpacity, weight: 2 }}>
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <p style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600, fontSize: 12, margin: 0 }}>{pt.label}</p>
                        {pt.votos > 0 && <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: '#7E8AA0', margin: '4px 0 0' }}>~{pt.votos.toLocaleString('es-CO')} votos [DEMO]</p>}
                        <p style={{ fontFamily: 'Space Mono', fontSize: 9, color: style.color, margin: '4px 0 0' }}>{TYPE_LABEL[pt.tipo]}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                )
              })}
              {reportesConGPS.map(r => {
                const temaColor = r.temas[0] ? (TEMA_COLOR[r.temas[0]] ?? '#FF5D5D') : '#FF5D5D'
                return (
                  <CircleMarker key={r.id} center={[r.lat!, r.lng!]} radius={7}
                    pathOptions={{ color: temaColor, fillColor: temaColor, fillOpacity: 0.55, weight: 2 }}>
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <p style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600, fontSize: 12, margin: 0 }}>{r.zona_nombre}</p>
                        <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: temaColor, margin: '4px 0 0' }}>{r.temas.join(' · ')}</p>
                        <p style={{ fontFamily: 'Space Mono', fontSize: 9, color: '#7E8AA0', margin: '4px 0 0' }}>
                          {r.tipo_zona} · {r.anonimo ? 'Anónimo' : 'Identificado'} · {new Date(r.created_at).toLocaleDateString('es-CO')}
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                )
              })}
            </>
          )}

          {/* ── MODO CALOR ── */}
          {mode === 'calor' && heatSources.map((c, i) => {
            const r1 = Math.min(200 + c.count * 250, 1400)
            const r2 = Math.min(100 + c.count * 120, 700)
            const r3 = Math.min(50 + c.count * 60, 350)
            return (
              <CircleMarker key={i} center={[c.lat, c.lng]} radius={0}
                pathOptions={{ opacity: 0, fillOpacity: 0 }}>
                <Circle center={[c.lat, c.lng]} radius={r1}
                  pathOptions={{ color: 'transparent', fillColor: '#FF5D5D', fillOpacity: 0.04, weight: 0 }} />
                <Circle center={[c.lat, c.lng]} radius={r2}
                  pathOptions={{ color: 'transparent', fillColor: '#FF9F2E', fillOpacity: 0.09, weight: 0 }} />
                <Circle center={[c.lat, c.lng]} radius={r3}
                  pathOptions={{ color: 'transparent', fillColor: '#F5C24B', fillOpacity: 0.18, weight: 0 }} />
                <Popup>
                  <p style={{ fontFamily: 'Space Mono', fontWeight: 700, fontSize: 12, margin: 0 }}>
                    {c.count} reporte{c.count !== 1 ? 's' : ''}
                  </p>
                </Popup>
              </CircleMarker>
            )
          })}
          {mode === 'calor' && !heatSources.length && !esLive && DEMO_MAP_POINTS.map(pt => {
            const style = TYPE_STYLES[pt.tipo]
            return (
              <CircleMarker key={pt.id} center={pt.pos} radius={style.radius}
                pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: style.fillOpacity, weight: 2 }} />
            )
          })}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-4">
          <div><p className="panel-label">Urbano</p><p className="font-data font-bold text-[12px]" style={{ color: '#5AA9FF' }}>{TERRITORIO.urbana.porcentaje.toFixed(1)}%</p></div>
          <div><p className="panel-label">Rural</p><p className="font-data font-bold text-[12px]" style={{ color: '#19E3C2' }}>{TERRITORIO.rural.porcentaje.toFixed(1)}%</p></div>
          <div><p className="panel-label">Población 2018</p><p className="font-data font-bold text-[12px]" style={{ color: '#EAF0F6' }}>{TERRITORIO.poblacionCenso2018.toLocaleString('es-CO')}</p></div>
          {esLive && mode === 'puntos' && <div><p className="panel-label">Con GPS</p><p className="font-data font-bold text-[12px]" style={{ color: '#39DC84' }}>{reportesConGPS.length}</p></div>}
          {esLive && mode === 'calor' && <div><p className="panel-label">Zonas activas</p><p className="font-data font-bold text-[12px]" style={{ color: '#FF9F2E' }}>{heatSources.length}</p></div>}
        </div>
        <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>~{MUNICIPIO.distanciaBogota} km de Bogotá · Provincia del Tequendama</p>
      </div>
    </div>
  )
}

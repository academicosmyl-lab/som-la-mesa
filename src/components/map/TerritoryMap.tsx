import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from 'react-leaflet'
import { MUNICIPIO, DEMO_MAP_POINTS, TERRITORIO } from '../../data/seed'
import type { ReporteResumen } from '../../hooks/useDashboardData'

const TYPE_STYLES = {
  urban: { color: '#5AA9FF', radius: 14, fillOpacity: 0.25 },
  rural: { color: '#19E3C2', radius: 9,  fillOpacity: 0.3  },
  alert: { color: '#FF5D5D', radius: 7,  fillOpacity: 0.4  },
}

const TYPE_LABEL = {
  urban: 'Zona Urbana',
  rural: 'Zona Rural',
  alert: 'Alerta Ciudadana',
}

const TEMA_COLOR: Record<string, string> = {
  vias:      '#FF9F2E',
  agua:      '#5AA9FF',
  seguridad: '#FF5D5D',
  salud:     '#39DC84',
  educacion: '#A78BFA',
  empleo:    '#F5C24B',
  otro:      '#7E8AA0',
}

interface Props { reportes?: ReporteResumen[] }

export default function TerritoryMap({ reportes }: Props) {
  const center: [number, number] = [MUNICIPIO.coordenadas.lat, MUNICIPIO.coordenadas.lng]

  const reportesConGPS = reportes?.filter(r => r.lat !== null && r.lng !== null) ?? []
  const esLive = reportes && reportes.length > 0

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
          <div className="flex items-center gap-3">
            {(['urban', 'rural', 'alert'] as const).map(t => (
              <div key={t} className="flex items-center gap-1">
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: TYPE_STYLES[t].color }} />
                <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>{TYPE_LABEL[t]}</span>
              </div>
            ))}
            {esLive && (
              <div className="flex items-center gap-1">
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5D5D' }} />
                <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>Reportes ({reportes!.length})</span>
              </div>
            )}
          </div>
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
            color: '#5AA9FF', fillColor: '#5AA9FF',
            fillOpacity: 0.06, weight: 1, dashArray: '4 4',
          }} />

          {/* Demo / structural points when no live data */}
          {!esLive && DEMO_MAP_POINTS.map((pt) => {
            const style = TYPE_STYLES[pt.tipo]
            return (
              <CircleMarker key={pt.id} center={pt.pos} radius={style.radius}
                pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: style.fillOpacity, weight: 2 }}>
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <p style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600, fontSize: 12, margin: 0 }}>{pt.label}</p>
                    {pt.votos > 0 && (
                      <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: '#7E8AA0', margin: '4px 0 0' }}>
                        ~{pt.votos.toLocaleString('es-CO')} votos en juego [DEMO]
                      </p>
                    )}
                    <p style={{ fontFamily: 'Space Mono', fontSize: 9, color: style.color, margin: '4px 0 0' }}>
                      {TYPE_LABEL[pt.tipo]}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}

          {/* Live report markers (only those with GPS) */}
          {reportesConGPS.map((r) => {
            const temaColor = r.temas[0] ? (TEMA_COLOR[r.temas[0]] ?? '#FF5D5D') : '#FF5D5D'
            return (
              <CircleMarker key={r.id}
                center={[r.lat!, r.lng!]}
                radius={7}
                pathOptions={{ color: temaColor, fillColor: temaColor, fillOpacity: 0.55, weight: 2 }}>
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <p style={{ fontFamily: 'Bricolage Grotesque', fontWeight: 600, fontSize: 12, margin: 0 }}>{r.zona_nombre}</p>
                    <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: temaColor, margin: '4px 0 0' }}>
                      {r.temas.join(' · ')}
                    </p>
                    <p style={{ fontFamily: 'Space Mono', fontSize: 9, color: '#7E8AA0', margin: '4px 0 0' }}>
                      {r.tipo_zona} · {r.anonimo ? 'Anónimo' : 'Ciudadano identificado'}
                    </p>
                    <p style={{ fontFamily: 'Space Mono', fontSize: 9, color: '#7E8AA0', margin: '2px 0 0' }}>
                      {new Date(r.created_at).toLocaleDateString('es-CO')}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-4">
          <div>
            <p className="panel-label">Urbano</p>
            <p className="font-data font-bold text-[12px]" style={{ color: '#5AA9FF' }}>
              {TERRITORIO.urbana.porcentaje.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="panel-label">Rural</p>
            <p className="font-data font-bold text-[12px]" style={{ color: '#19E3C2' }}>
              {TERRITORIO.rural.porcentaje.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="panel-label">Población 2018</p>
            <p className="font-data font-bold text-[12px]" style={{ color: '#EAF0F6' }}>
              {TERRITORIO.poblacionCenso2018.toLocaleString('es-CO')}
            </p>
          </div>
          {esLive && (
            <div>
              <p className="panel-label">Reportes GPS</p>
              <p className="font-data font-bold text-[12px]" style={{ color: '#39DC84' }}>
                {reportesConGPS.length}
              </p>
            </div>
          )}
        </div>
        <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
          ~{MUNICIPIO.distanciaBogota} km de Bogotá · Provincia del Tequendama
        </p>
      </div>
    </div>
  )
}

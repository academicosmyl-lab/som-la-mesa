import { MapPin, User, Clock, Tag, Download } from 'lucide-react'
import type { ReporteResumen, StatsReportes } from '../../hooks/useDashboardData'

const TEMA_COLOR: Record<string, string> = {
  vias: '#FF9F2E', agua: '#5AA9FF', seguridad: '#FF5D5D',
  salud: '#39DC84', educacion: '#A78BFA', empleo: '#F5C24B', otro: '#7E8AA0',
}

function exportCSV(reportes: ReporteResumen[]) {
  const header = 'ID,Fecha,Zona,Tipo,Temas,GPS Lat,GPS Lng,Anónimo'
  const rows = reportes.map(r => [
    r.id,
    new Date(r.created_at).toLocaleString('es-CO'),
    `"${r.zona_nombre}"`,
    r.tipo_zona,
    `"${r.temas.join(', ')}"`,
    r.lat ?? '',
    r.lng ?? '',
    r.anonimo ? 'Sí' : 'No',
  ].join(','))
  const csv = [header, ...rows].join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reportes-som-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

interface Props { reportes: ReporteResumen[]; stats: StatsReportes; loading: boolean }

export default function CapturaView({ reportes, stats, loading }: Props) {
  return (
    <div className="h-full flex flex-col gap-3">

      {/* Resumen por tema */}
      <div className="glass rounded-xl p-4 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <p className="panel-label">Reportes por tema</p>
          {reportes.length > 0 && (
            <button onClick={() => exportCSV(reportes)}
              className="flex items-center gap-2 px-3 py-[6px] rounded-lg font-data text-[10px] uppercase tracking-widest font-bold transition-all"
              style={{ background: 'rgba(25,227,194,0.1)', border: '1px solid rgba(25,227,194,0.25)',
                color: '#19E3C2', cursor: 'pointer' }}>
              <Download size={11} />
              Exportar CSV
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.porTema)
            .sort(([, a], [, b]) => b - a)
            .map(([tema, count]) => (
              <div key={tema} className="flex items-center gap-2 px-3 py-[6px] rounded-lg"
                style={{ background: `${TEMA_COLOR[tema]}12`, border: `1px solid ${TEMA_COLOR[tema]}30` }}>
                <Tag size={10} color={TEMA_COLOR[tema]} />
                <span className="font-data text-[10px] capitalize" style={{ color: TEMA_COLOR[tema] }}>{tema}</span>
                <span className="font-data font-bold text-[12px]" style={{ color: TEMA_COLOR[tema] }}>{count}</span>
              </div>
            ))}
          {stats.total === 0 && (
            <p className="font-data text-[11px]" style={{ color: '#7E8AA0' }}>Sin reportes aún</p>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="glass rounded-xl p-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <p className="panel-label">Reportes ciudadanos — {stats.total} total</p>
          {loading && <span className="font-data text-[9px]" style={{ color: '#FF9F2E' }}>Cargando…</span>}
        </div>

        {reportes.length === 0 && !loading ? (
          <div className="flex-1 flex items-center justify-center flex-col gap-3">
            <div style={{ fontSize: 48, opacity: 0.2 }}>📋</div>
            <p className="font-display text-[14px]" style={{ color: '#7E8AA0' }}>Aún no hay reportes ciudadanos</p>
            <p className="font-data text-[11px] text-center" style={{ color: '#3a4760', maxWidth: 320 }}>
              Cuando un ciudadano llene el formulario en <strong style={{ color: '#19E3C2' }}>#/reportar</strong>, aparecerá aquí en tiempo real
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scroll-som">
            <div className="grid gap-3 pb-2 shrink-0"
              style={{ gridTemplateColumns: '1fr 1fr 2fr 80px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 8, marginBottom: 8 }}>
              <span className="panel-label">Zona</span>
              <span className="panel-label">Tipo</span>
              <span className="panel-label">Temas</span>
              <span className="panel-label">Fecha</span>
            </div>
            {reportes.map(r => (
              <div key={r.id}
                className="grid gap-3 py-[10px] rounded-lg px-2 hover:bg-white/[0.02] transition-colors"
                style={{ gridTemplateColumns: '1fr 1fr 2fr 80px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-1 min-w-0">
                  <MapPin size={10} color="#7E8AA0" className="shrink-0" />
                  <span className="font-data text-[10px] truncate" style={{ color: '#c5cfd9' }}>{r.zona_nombre}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={10} color="#7E8AA0" className="shrink-0" />
                  <span className="font-data text-[10px]" style={{ color: '#7E8AA0' }}>
                    {r.tipo_zona === 'urbano' ? 'Urbano' : 'Rural'} · {r.anonimo ? 'Anón.' : 'Identif.'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {r.temas.map(t => (
                    <span key={t} className="font-data text-[9px] px-[6px] py-[2px] rounded capitalize"
                      style={{ background: `${TEMA_COLOR[t] ?? '#7E8AA0'}15`, color: TEMA_COLOR[t] ?? '#7E8AA0',
                        border: `1px solid ${TEMA_COLOR[t] ?? '#7E8AA0'}25` }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={9} color="#3a4760" className="shrink-0" />
                  <span className="font-data text-[9px]" style={{ color: '#3a4760' }}>
                    {new Date(r.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

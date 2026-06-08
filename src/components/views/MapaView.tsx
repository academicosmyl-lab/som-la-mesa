import { useState } from 'react'
import TerritoryMap from '../map/TerritoryMap'
import type { ReporteResumen, StatsReportes } from '../../hooks/useDashboardData'

interface Props { reportes: ReporteResumen[]; stats: StatsReportes }

export default function MapaView({ reportes, stats }: Props) {
  const [mode, setMode] = useState<'puntos' | 'calor'>('puntos')

  const temasTop = Object.entries(stats.porTema)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Barra superior */}
      <div className="flex items-center justify-between shrink-0 gap-3">
        <div className="flex gap-3 flex-1">
          <div className="glass rounded-xl px-4 py-3 flex-1">
            <p className="panel-label">Total reportes</p>
            <p className="font-data font-bold text-[24px]" style={{ color: '#39DC84' }}>{stats.total}</p>
          </div>
          {temasTop.map(([tema, count]) => (
            <div key={tema} className="glass rounded-xl px-4 py-3 flex-1">
              <p className="panel-label capitalize">{tema}</p>
              <p className="font-data font-bold text-[24px]" style={{ color: '#19E3C2' }}>{count}</p>
            </div>
          ))}
          {temasTop.length === 0 && (
            <div className="glass rounded-xl px-4 py-3 flex-[3] flex items-center">
              <p className="font-data text-[11px]" style={{ color: '#7E8AA0' }}>
                Sin reportes aún — los marcadores aparecen cuando llegan datos ciudadanos
              </p>
            </div>
          )}
        </div>

        {/* Toggle modo */}
        <div className="glass rounded-xl p-1 flex shrink-0">
          {(['puntos', 'calor'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="px-4 py-2 rounded-lg font-data text-[10px] uppercase tracking-widest font-bold transition-all"
              style={{
                background: mode === m ? 'rgba(25,227,194,0.15)' : 'transparent',
                color: mode === m ? '#19E3C2' : '#7E8AA0',
                border: mode === m ? '1px solid rgba(25,227,194,0.3)' : '1px solid transparent',
                cursor: 'pointer',
              }}>
              {m === 'puntos' ? 'Puntos' : 'Mapa de calor'}
            </button>
          ))}
        </div>
      </div>

      {/* Mapa */}
      <div className="flex-1 min-h-0">
        <TerritoryMap reportes={reportes} mode={mode} />
      </div>
    </div>
  )
}

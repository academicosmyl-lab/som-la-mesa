import TerritoryMap from '../map/TerritoryMap'
import type { ReporteResumen, StatsReportes } from '../../hooks/useDashboardData'

interface Props { reportes: ReporteResumen[]; stats: StatsReportes }

export default function MapaView({ reportes, stats }: Props) {
  const temasTop = Object.entries(stats.porTema)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Stats rápidas */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        <div className="glass rounded-xl px-4 py-3">
          <p className="panel-label">Total reportes</p>
          <p className="font-data font-bold text-[24px]" style={{ color: '#39DC84' }}>{stats.total}</p>
        </div>
        {temasTop.map(([tema, count]) => (
          <div key={tema} className="glass rounded-xl px-4 py-3">
            <p className="panel-label capitalize">{tema}</p>
            <p className="font-data font-bold text-[24px]" style={{ color: '#19E3C2' }}>{count}</p>
          </div>
        ))}
        {temasTop.length === 0 && (
          <div className="glass rounded-xl px-4 py-3 col-span-3 flex items-center">
            <p className="font-data text-[11px]" style={{ color: '#7E8AA0' }}>
              Sin reportes ciudadanos aún — los marcadores GPS aparecerán aquí cuando lleguen
            </p>
          </div>
        )}
      </div>
      {/* Mapa a pantalla completa */}
      <div className="flex-1 min-h-0">
        <TerritoryMap reportes={reportes} />
      </div>
    </div>
  )
}

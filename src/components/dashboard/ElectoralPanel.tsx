import {
  BarChart, Bar, XAxis, YAxis, Cell, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts'
import { RESULTADOS_2023, OBJETIVO_BAR } from '../../data/seed'

const DATA = [OBJETIVO_BAR, ...RESULTADOS_2023].map(r => ({
  ...r,
  fill: (r as typeof OBJETIVO_BAR).esObjetivo ? '#19E3C2' : r.color,
}))

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div className="glass rounded-lg px-3 py-2" style={{ minWidth: 180 }}>
      <p className="font-display font-semibold text-[12px]" style={{ color: '#EAF0F6' }}>{d.candidato}</p>
      <p className="font-data text-[10px]" style={{ color: '#7E8AA0' }}>{d.agrupacion}</p>
      <div className="flex items-center gap-3 mt-1">
        <span className="font-data font-bold text-[14px]" style={{ color: d.fill }}>
          {d.votos.toLocaleString('es-CO')}
        </span>
        {d.porcentaje > 0 && (
          <span className="font-data text-[11px]" style={{ color: '#7E8AA0' }}>
            {d.porcentaje.toFixed(2)}%
          </span>
        )}
      </div>
      {('esObjetivo' in d && d.esObjetivo) && (
        <p className="text-[9px] mt-1" style={{ color: '#19E3C2' }}>Meta de campaña 2027</p>
      )}
      {d.ganador && (
        <p className="text-[9px] mt-1" style={{ color: '#FF9F2E' }}>Ganador elección 2023</p>
      )}
    </div>
  )
}

export default function ElectoralPanel() {
  return (
    <div className="glass rounded-xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="panel-label">Análisis Electoral</p>
          <p className="font-display font-semibold text-[13px] mt-[2px]" style={{ color: '#EAF0F6' }}>
            Resultados 2023 vs. Objetivo 2027
          </p>
        </div>
        <div
          className="font-data text-[9px] px-2 py-1 rounded"
          style={{ background: 'rgba(25,227,194,0.08)', color: '#19E3C2', border: '1px solid rgba(25,227,194,0.2)' }}
        >
          11 candidatos
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            margin={{ top: 2, right: 12, left: 0, bottom: 2 }}
          >
            <XAxis
              type="number"
              domain={[0, 5800]}
              tick={{ fill: '#7E8AA0', fontSize: 9, fontFamily: 'Space Mono' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : `${v}`}
            />
            <YAxis
              type="category"
              dataKey="candidato"
              width={110}
              tick={{ fill: '#7E8AA0', fontSize: 10, fontFamily: 'Manrope' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <ReferenceLine
              x={4007}
              stroke="#FF9F2E"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
              label={{ value: 'Ganó 2023', fill: '#FF9F2E', fontSize: 8, fontFamily: 'Space Mono' }}
            />
            <Bar dataKey="votos" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {DATA.map((entry, index) => (
                <Cell key={index} fill={entry.fill} fillOpacity={'esObjetivo' in entry ? 1 : 0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer note */}
      <div
        className="flex items-center justify-between pt-2 mt-1"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
          Fuente: Registraduría · Alcaldía La Mesa 2023
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div style={{ width: 8, height: 8, borderRadius: 2, background: '#19E3C2' }} />
            <span className="font-data text-[8px]" style={{ color: '#7E8AA0' }}>Objetivo</span>
          </div>
          <div className="flex items-center gap-1">
            <div style={{ width: 8, height: 8, borderRadius: 2, background: '#FF9F2E' }} />
            <span className="font-data text-[8px]" style={{ color: '#7E8AA0' }}>Ganador</span>
          </div>
        </div>
      </div>
    </div>
  )
}

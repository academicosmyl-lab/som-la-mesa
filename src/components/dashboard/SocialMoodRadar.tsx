import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts'
import { DEMO_HUMOR_SOCIAL } from '../../data/seed'

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null
  const d = payload[0].payload
  return (
    <div className="glass rounded-lg px-3 py-2">
      <p className="font-display font-semibold text-[12px]" style={{ color: '#EAF0F6' }}>{d.indicador}</p>
      <p className="font-data font-bold text-[18px]" style={{ color: d.color }}>{d.valor}</p>
      <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>/ 100</p>
    </div>
  )
}

// Context-aware label color
function getIndicatorColor(indicador: string): string {
  const map: Record<string, string> = {
    Esperanza: '#39DC84',
    Satisfacción: '#5AA9FF',
    Desconfianza: '#FF9F2E',
    Rabia: '#FF5D5D',
  }
  return map[indicador] ?? '#7E8AA0'
}

export default function SocialMoodRadar() {
  const desconfianza = DEMO_HUMOR_SOCIAL.find(d => d.indicador === 'Desconfianza')?.valor ?? 0
  const esperanza    = DEMO_HUMOR_SOCIAL.find(d => d.indicador === 'Esperanza')?.valor ?? 0

  const signal = desconfianza > 60 ? 'ALERTA' : desconfianza > 40 ? 'ATENCIÓN' : 'NORMAL'
  const signalColor = desconfianza > 60 ? '#FF5D5D' : desconfianza > 40 ? '#FF9F2E' : '#39DC84'

  return (
    <div className="glass rounded-xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="panel-label">Índice de Humor Social</p>
          <p className="font-display font-semibold text-[13px] mt-[2px]" style={{ color: '#EAF0F6' }}>
            Sentimiento Municipal
          </p>
        </div>
        <span className="demo-badge">DEMO</span>
      </div>

      {/* Signal badge */}
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-[6px] mb-2"
        style={{ background: `${signalColor}12`, border: `1px solid ${signalColor}28` }}
      >
        <div className="pulse-dot" style={{ background: signalColor, width: 6, height: 6 }} />
        <span className="font-data text-[9px] font-bold uppercase tracking-widest" style={{ color: signalColor }}>
          {signal}
        </span>
        <span className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>
          — desconfianza: {desconfianza}/100
        </span>
      </div>

      {/* Radar */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={DEMO_HUMOR_SOCIAL} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid
              stroke="rgba(255,255,255,0.08)"
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="indicador"
              tick={({ x, y, payload }: any) => (
                <text
                  x={x} y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={getIndicatorColor(payload.value)}
                  fontSize={10}
                  fontFamily="Space Mono"
                  fontWeight={700}
                >
                  {payload.value}
                </text>
              )}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#7E8AA0', fontSize: 8, fontFamily: 'Space Mono' }}
              axisLine={false}
              tickCount={4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Humor Social"
              dataKey="valor"
              stroke="#19E3C2"
              fill="#19E3C2"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="text-center">
          <p className="font-data font-bold text-[16px]" style={{ color: '#39DC84' }}>{esperanza}</p>
          <p className="panel-label">Esperanza</p>
        </div>
        <div className="text-center">
          <p className="font-data font-bold text-[16px]" style={{ color: '#FF9F2E' }}>{desconfianza}</p>
          <p className="panel-label">Desconfianza</p>
        </div>
      </div>

      <p className="font-data text-[8px] mt-2 text-center" style={{ color: '#3a4760' }}>
        Pendiente de encuestas de campo · señal pública con sesgo
      </p>
    </div>
  )
}

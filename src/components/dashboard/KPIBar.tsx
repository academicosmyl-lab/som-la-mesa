import { Users2, Target, Trophy, CalendarClock } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import ProgressRing from '../ui/ProgressRing'
import { CENSO, OBJETIVO, RESULTADOS_2023, ELECCION, TERRITORIO } from '../../data/seed'
import { daysUntil } from '../../hooks/useClock'

const dias = daysUntil(ELECCION.fechaEstimada)
const umbral = RESULTADOS_2023[0]

// Total campaign duration: from Jun 2026 to Oct 2027 = ~490 days total
const TOTAL_DIAS = 490
const DIAS_TRANSCURRIDOS = TOTAL_DIAS - dias
const TIEMPO_RING = Math.round((DIAS_TRANSCURRIDOS / TOTAL_DIAS) * 100)

const CARDS = [
  {
    label:    'Censo Electoral',
    sublabel: `${CENSO.ano} · La Mesa, Cundinamarca`,
    value:    CENSO.habilitados,
    icon:     Users2,
    color:    '#5AA9FF',
    ring:     Math.round(CENSO.participacion * 100),
    ringLabel: `${(CENSO.participacion * 100).toFixed(1)}% participaron`,
    note:     `${CENSO.votantes.toLocaleString('es-CO')} votantes · ${CENSO.votosValidos.toLocaleString('es-CO')} válidos`,
  },
  {
    label:    'Objetivo de Votos',
    sublabel: 'Meta sólida para ganar',
    value:    OBJETIVO.votosMin,
    valueSuffix: `– ${OBJETIVO.votosMax.toLocaleString('es-CO')}`,
    isRange:  true,
    icon:     Target,
    color:    '#19E3C2',
    ring:     Math.round((OBJETIVO.votosMin / CENSO.votosValidos) * 100),
    ringLabel: `${((OBJETIVO.votosMin / CENSO.votosValidos) * 100).toFixed(1)}% del total`,
    note:     'Distribuidos por vereda y barrio',
  },
  {
    label:    'Umbral de Victoria',
    sublabel: `Ganó en 2023 con ${umbral.porcentaje}%`,
    value:    umbral.votos,
    icon:     Trophy,
    color:    '#FF9F2E',
    ring:     Math.round((umbral.votos / CENSO.votosValidos) * 100),
    ringLabel: `${umbral.porcentaje}% del total válido`,
    note:     `Campo fragmentado · 11 candidatos`,
  },
  {
    label:    'Días a la Elección',
    sublabel: `${ELECCION.cargo} · Oct 2027`,
    value:    dias,
    icon:     CalendarClock,
    color:    '#F5C24B',
    ring:     TIEMPO_RING,
    ringLabel: `${DIAS_TRANSCURRIDOS} días transcurridos`,
    note:     `Período ${ELECCION.periodo} · ${TERRITORIO.urbana.porcentaje.toFixed(0)}% urb / ${TERRITORIO.rural.porcentaje.toFixed(0)}% rural`,
  },
]

export default function KPIBar() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CARDS.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="glass rounded-xl p-4 flex flex-col gap-2 hover:border-[rgba(25,227,194,0.22)] transition-all duration-200"
            style={{ cursor: 'default', position: 'relative', overflow: 'hidden' }}
          >
            {/* Subtle top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${card.color}50, transparent)`,
            }} />

            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    width: 28, height: 28,
                    background: `${card.color}18`,
                    border: `1px solid ${card.color}35`,
                  }}
                >
                  <Icon size={13} color={card.color} />
                </div>
                <span className="panel-label">{card.label}</span>
              </div>

              {/* Progress ring */}
              <div style={{ position: 'relative' }}>
                <ProgressRing
                  percent={card.ring}
                  color={card.color}
                  size={40}
                  stroke={3}
                />
                {/* Ring center label */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Mono', fontSize: 7, color: card.color, fontWeight: 700,
                }}>
                  {card.ring}%
                </div>
              </div>
            </div>

            {/* Main value */}
            <div>
              {card.isRange ? (
                <div className="flex items-baseline gap-[3px] flex-wrap">
                  <span
                    className="font-display font-bold tabular-nums"
                    style={{ fontSize: 26, color: card.color, lineHeight: 1 }}
                  >
                    <AnimatedCounter to={card.value} duration={1300} />
                  </span>
                  <span
                    className="font-display font-semibold"
                    style={{ fontSize: 17, color: card.color, lineHeight: 1, opacity: 0.8 }}
                  >
                    {card.valueSuffix}
                  </span>
                </div>
              ) : (
                <span
                  className="font-display font-bold tabular-nums"
                  style={{ fontSize: 28, color: card.color, lineHeight: 1 }}
                >
                  <AnimatedCounter to={card.value} duration={1300} />
                </span>
              )}
              <p className="text-[11px] mt-[3px]" style={{ color: '#7E8AA0' }}>
                {card.sublabel}
              </p>
            </div>

            {/* Ring label + note */}
            <div
              className="pt-2 flex flex-col gap-1"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="font-data text-[9px]" style={{ color: card.color, opacity: 0.8 }}>
                {card.ringLabel}
              </p>
              <p className="text-[9px]" style={{ color: '#4a5568' }}>
                {card.note}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

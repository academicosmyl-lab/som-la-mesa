import { Users2, Target, Trophy, CalendarClock } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import { CENSO, OBJETIVO, RESULTADOS_2023, ELECCION } from '../../data/seed'
import { daysUntil } from '../../hooks/useClock'

const dias = daysUntil(ELECCION.fechaEstimada)
const umbral = RESULTADOS_2023[0]

const CARDS = [
  {
    label: 'Censo Electoral',
    sublabel: `2023 · Habilitados`,
    value: CENSO.habilitados,
    suffix: '',
    icon: Users2,
    color: '#5AA9FF',
    note: `${(CENSO.participacion * 100).toFixed(1)}% particip. → ${CENSO.votosValidos.toLocaleString('es-CO')} votos válidos`,
  },
  {
    label: 'Objetivo de Votos',
    sublabel: 'Meta sólida de campaña',
    value: OBJETIVO.votosMin,
    valueSuffix: `– ${OBJETIVO.votosMax.toLocaleString('es-CO')}`,
    icon: Target,
    color: '#19E3C2',
    note: 'Votos distribuidos por territorio',
    isRange: true,
  },
  {
    label: 'Umbral de Victoria',
    sublabel: `Ganó en 2023 con ${umbral.porcentaje}%`,
    value: umbral.votos,
    icon: Trophy,
    color: '#FF9F2E',
    note: `Campo fragmentado · 11 candidatos`,
  },
  {
    label: 'Días a la Elección',
    sublabel: `${ELECCION.cargo} · Oct 2027`,
    value: dias,
    icon: CalendarClock,
    color: '#F5C24B',
    note: 'Periodo 2028–2031',
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
            className="glass rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 hover:border-[rgba(25,227,194,0.2)] group"
            style={{ cursor: 'default' }}
          >
            <div className="flex items-center justify-between">
              <span className="panel-label">{card.label}</span>
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 28, height: 28,
                  background: `${card.color}18`,
                  border: `1px solid ${card.color}30`,
                }}
              >
                <Icon size={14} color={card.color} />
              </div>
            </div>

            <div>
              {card.isRange ? (
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display font-bold tabular-nums"
                    style={{ fontSize: 26, color: card.color, lineHeight: 1 }}
                  >
                    <AnimatedCounter to={card.value} duration={1200} />
                  </span>
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: 18, color: card.color, lineHeight: 1 }}
                  >
                    {card.valueSuffix}
                  </span>
                </div>
              ) : (
                <span
                  className="font-display font-bold tabular-nums"
                  style={{ fontSize: 28, color: card.color, lineHeight: 1 }}
                >
                  <AnimatedCounter to={card.value} duration={1200} />
                </span>
              )}
              <p className="text-[11px] mt-1" style={{ color: '#7E8AA0' }}>{card.sublabel}</p>
            </div>

            <div
              className="text-[10px] pt-2"
              style={{ color: '#4a5568', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {card.note}
            </div>
          </div>
        )
      })}
    </div>
  )
}

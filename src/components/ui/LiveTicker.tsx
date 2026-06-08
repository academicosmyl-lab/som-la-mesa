import { useEffect, useRef } from 'react'
import { CENSO, OBJETIVO, RESULTADOS_2023, TERRITORIO } from '../../data/seed'

const ITEMS = [
  `CENSO ELECTORAL ${CENSO.ano}: ${CENSO.habilitados.toLocaleString('es-CO')} HABILITADOS`,
  `PARTICIPACIÓN ${CENSO.ano}: ${(CENSO.participacion * 100).toFixed(2)}%  →  ${CENSO.votosValidos.toLocaleString('es-CO')} VOTOS VÁLIDOS`,
  `OBJETIVO FABIO CABRERA 2027: ${OBJETIVO.votosMin.toLocaleString('es-CO')} – ${OBJETIVO.votosMax.toLocaleString('es-CO')} VOTOS`,
  `CAMPO 2023: 11 CANDIDATOS  ·  GANÓ CON ${RESULTADOS_2023[0].votos.toLocaleString('es-CO')} VOTOS (${RESULTADOS_2023[0].porcentaje}%)`,
  `VOTO RURAL = ${TERRITORIO.rural.porcentaje.toFixed(1)}% DEL TOTAL  ·  OPORTUNIDAD DIFERENCIAL CLAVE`,
  `URNA MÁS COMPETIDA: BARRERA ${RESULTADOS_2023[1].votos.toLocaleString('es-CO')} · CASTIBLANCO ${RESULTADOS_2023[2].votos.toLocaleString('es-CO')}`,
  `LA MESA, CUNDINAMARCA  ·  PROVINCIA DEL TEQUENDAMA  ·  ~65 KM DE BOGOTÁ`,
  `POBLACIÓN CENSO 2018: ${TERRITORIO.poblacionCenso2018.toLocaleString('es-CO')} HABITANTES`,
  `ELECCIÓN OBJETIVO: OCTUBRE 2027  ·  CARGO: ALCALDÍA MUNICIPAL  ·  PERÍODO 2028–2031`,
]

const FULL = ITEMS.join('   ·   ')

export default function LiveTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let pos = 0
    let raf: number

    const animate = () => {
      pos -= 0.6
      const width = el.scrollWidth / 2
      if (Math.abs(pos) >= width) pos = 0
      el.style.transform = `translateX(${pos}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const repeated = `${FULL}   ·   ${FULL}`

  return (
    <div
      style={{
        height: 30,
        background: 'rgba(25,227,194,0.06)',
        borderBottom: '1px solid rgba(25,227,194,0.12)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 2,
        background: 'linear-gradient(90deg, #080B11, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Live badge */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 3,
        display: 'flex', alignItems: 'center',
        paddingLeft: 12, paddingRight: 12,
        background: 'rgba(25,227,194,0.12)',
        borderRight: '1px solid rgba(25,227,194,0.2)',
        gap: 6, flexShrink: 0,
      }}>
        <div
          className="pulse-dot"
          style={{ background: '#19E3C2', width: 6, height: 6 }}
        />
        <span style={{
          fontFamily: 'Space Mono', fontSize: 8, fontWeight: 700,
          color: '#19E3C2', letterSpacing: '0.15em', whiteSpace: 'nowrap',
        }}>
          DATOS
        </span>
      </div>

      {/* Scrolling track */}
      <div style={{ paddingLeft: 80, overflow: 'hidden', width: '100%' }}>
        <div ref={trackRef} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span style={{
            fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.08em',
            color: '#7E8AA0', whiteSpace: 'nowrap',
          }}>
            {repeated}
          </span>
        </div>
      </div>

      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 2,
        background: 'linear-gradient(270deg, #080B11, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

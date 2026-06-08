import { useEffect, useState } from 'react'

interface Props {
  percent: number
  color: string
  size?: number
  stroke?: number
  animated?: boolean
}

export default function ProgressRing({ percent, color, size = 42, stroke = 3, animated = true }: Props) {
  const [displayed, setDisplayed] = useState(animated ? 0 : percent)
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (displayed / 100) * circ

  useEffect(() => {
    if (!animated) { setDisplayed(percent); return }
    const start = performance.now()
    const dur = 1400
    const raf = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setDisplayed(ease * percent)
      if (t < 1) requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)
    return () => cancelAnimationFrame(id)
  }, [percent, animated])

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
      />
      {/* Fill */}
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
    </svg>
  )
}

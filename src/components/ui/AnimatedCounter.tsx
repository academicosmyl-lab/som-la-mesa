import { useEffect, useRef, useState } from 'react'

interface Props {
  to: number
  duration?: number
  className?: string
  format?: (n: number) => string
}

export default function AnimatedCounter({ to, duration = 1400, className = '', format }: Props) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [to, duration])

  const display = format ? format(value) : value.toLocaleString('es-CO')
  return <span className={className}>{display}</span>
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

interface Props {
  onDone: () => void
}

const MESSAGES = [
  'Cargando datos territoriales...',
  'Iniciando Agente Estadístico...',
  'Conectando Agente Analítico...',
  'Aplicando sistema de diseño...',
  'Dashboard listo',
]

export default function SplashScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'loading' | 'exit'>('logo')
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'),    500)
    const t2 = setTimeout(() => setPhase('loading'), 1100)
    const t3 = setTimeout(() => {
      let p = 0
      const iv = setInterval(() => {
        p += 1.4
        setProgress(Math.min(p, 100))
        if (p >= 100) clearInterval(iv)
      }, 20)
      return () => clearInterval(iv)
    }, 1100)
    const t4 = setTimeout(() => setPhase('exit'), 2700)
    const t5 = setTimeout(() => { setVisible(false); onDone() }, 3100)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [onDone])

  const msg = MESSAGES[Math.floor((progress / 100) * (MESSAGES.length - 1))]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 0.45 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080B11',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 grid-texture" style={{ opacity: 0.4 }} />

          {/* Central radial glow */}
          <div style={{
            position: 'absolute',
            width: 700, height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(25,227,194,0.09) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          {/* Corner scanlines */}
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.15, scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              style={{
                position: 'absolute',
                top: 60 + i * 2,
                left: 0, right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent, #19E3C2, transparent)',
                transformOrigin: 'left',
              }}
            />
          ))}

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* Logo icon */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
            >
              <div style={{
                width: 80, height: 80,
                background: 'rgba(25,227,194,0.1)',
                border: '1px solid rgba(25,227,194,0.35)',
                borderRadius: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 50px rgba(25,227,194,0.22), 0 0 120px rgba(25,227,194,0.08)',
              }}>
                <Zap size={40} color="#19E3C2" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* SOM wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
            >
              <div style={{
                fontFamily: 'Bricolage Grotesque', fontWeight: 800,
                fontSize: 88, letterSpacing: '-3px', color: '#19E3C2',
                lineHeight: 1, textShadow: '0 0 60px rgba(25,227,194,0.35)',
              }}>
                SOM
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase !== 'logo' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: 10 }}
            >
              <p style={{
                fontFamily: 'Space Mono', fontSize: 11, letterSpacing: '0.22em',
                color: '#7E8AA0', textTransform: 'uppercase',
              }}>
                Sistema Operativo Municipal
              </p>
              <p style={{
                fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.16em',
                color: '#4a5568', textTransform: 'uppercase', marginTop: 5,
              }}>
                Campaña Fabio A. Cabrera · La Mesa, Cundinamarca · 2027
              </p>
            </motion.div>

            {/* Loading section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === 'loading' || phase === 'exit' ? 1 : 0, y: phase === 'loading' || phase === 'exit' ? 0 : 10 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: 44, width: 300 }}
            >
              {/* Bar header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: '#7E8AA0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Iniciando sistema
                </span>
                <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: '#19E3C2', fontWeight: 700 }}>
                  {Math.floor(progress)}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 1, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #19E3C2, #39DC84)',
                    borderRadius: 1,
                    boxShadow: '0 0 12px rgba(25,227,194,0.7)',
                  }}
                />
              </div>

              {/* Status message */}
              <p style={{
                fontFamily: 'Space Mono', fontSize: 9, color: '#4a5568',
                marginTop: 9, textAlign: 'center', minHeight: 14,
              }}>
                {msg}
              </p>
            </motion.div>

            {/* Version */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase !== 'logo' ? 0.4 : 0 }}
              transition={{ delay: 0.8 }}
              style={{
                fontFamily: 'Space Mono', fontSize: 8, color: '#3a4760',
                marginTop: 60, letterSpacing: '0.1em',
              }}
            >
              SOM MVP v0.1 · Jun 2026 · Datos: Registraduría / DANE 2018
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

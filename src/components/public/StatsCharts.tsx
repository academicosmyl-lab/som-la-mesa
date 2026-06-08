import { useEffect, useRef, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { CENSO, TERRITORIO, RESULTADOS_2023, OBJETIVO_BAR } from '../../data/seed'

const TEAL   = '#19E3C2'
const DARK   = '#1a1a1a'
const GRAY   = '#e8e8e8'
const RED    = '#c0392b'

// ── Hook: animar al entrar en pantalla ──────────────────────────────────────
function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ── Tooltip personalizado ───────────────────────────────────────────────────
function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color?: string } }[] }) {
  if (!active || !payload?.length) return null
  const { name, value, payload: p } = payload[0]
  return (
    <div style={{
      background: '#fff', border: '1px solid #ddd',
      padding: '8px 12px', borderRadius: 4,
      fontFamily: 'sans-serif', fontSize: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <strong style={{ color: p.color ?? DARK }}>{name}</strong>
      <br />
      <span style={{ color: '#555' }}>{typeof value === 'number' && value < 1 ? `${(value * 100).toFixed(1)}%` : value.toLocaleString('es-CO')}</span>
    </div>
  )
}

// ── Card wrapper ────────────────────────────────────────────────────────────
function StatCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        padding: '24px 20px 20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>
        {subtitle}
      </div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 700, color: DARK, marginBottom: 16, lineHeight: 1.2 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

// ── 1. Distribución poblacional ─────────────────────────────────────────────
function CardPoblacion() {
  const data = [
    { name: 'Urbana', value: TERRITORIO.urbana.porcentaje, color: DARK },
    { name: 'Rural',  value: TERRITORIO.rural.porcentaje,  color: '#bbb' },
  ]
  return (
    <StatCard title="Distribución poblacional" subtitle="Municipio de La Mesa · 2018">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={78}
            dataKey="value" startAngle={90} endAngle={-270} paddingAngle={2}>
            {data.map(d => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontFamily: 'sans-serif', fontSize: 12 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }} />
            <span style={{ color: '#555' }}>{d.name} <strong style={{ color: DARK }}>{d.value.toFixed(1)}%</strong></span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontFamily: 'sans-serif', fontSize: 11, color: '#888' }}>
        {TERRITORIO.poblacionCenso2018.toLocaleString('es-CO')} habitantes totales
      </div>
    </StatCard>
  )
}

// ── 2. Participación electoral ───────────────────────────────────────────────
function CardParticipacion() {
  const votaron = Math.round(CENSO.participacion * 100)
  const noVotaron = 100 - votaron
  const data = [
    { name: 'Votaron',     value: votaron,   color: DARK  },
    { name: 'No votaron',  value: noVotaron, color: GRAY  },
  ]
  return (
    <StatCard title="Participación electoral 2023" subtitle="Censo electoral · Registraduría">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={78}
            dataKey="value" startAngle={90} endAngle={-270} paddingAngle={2}>
            {data.map(d => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontFamily: 'sans-serif', fontSize: 12 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, border: d.color === GRAY ? '1px solid #ccc' : 'none' }} />
            <span style={{ color: '#555' }}>{d.name} <strong style={{ color: DARK }}>{d.value}%</strong></span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontFamily: 'sans-serif', fontSize: 11, color: '#888' }}>
        {CENSO.habilitados.toLocaleString('es-CO')} habilitados · {CENSO.votantes.toLocaleString('es-CO')} votaron
      </div>
    </StatCard>
  )
}

// ── 3. Resultados alcaldía 2023 ─────────────────────────────────────────────
function CardResultados() {
  const top5 = RESULTADOS_2023.slice(0, 4)
  const data = top5.map(r => ({
    name: r.candidato.split(' ').slice(0, 2).join(' '),
    votos: r.votos,
    fill: r.ganador ? RED : '#bbb',
  }))
  return (
    <StatCard title="Resultados alcaldía 2023" subtitle="Votos válidos por candidato">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 20, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} width={72} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="votos" radius={[0, 3, 3, 0]} label={{ position: 'right', fontSize: 10, fill: '#888', fontFamily: 'sans-serif' }}>
            {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: 8, fontFamily: 'sans-serif', fontSize: 11, color: '#888' }}>
        <span style={{ color: RED, fontWeight: 700 }}>■</span> Ganador · 4.007 votos = victoria (24.8%)
      </div>
    </StatCard>
  )
}

// ── 4. Objetivo campaña 2027 ────────────────────────────────────────────────
function CardObjetivo() {
  const data = [
    { name: 'Ganador 2023',    votos: 4007, fill: '#bbb'  },
    { name: 'Nuestro objetivo', votos: OBJETIVO_BAR.votos, fill: TEAL  },
  ]
  return (
    <StatCard title="Nuestro objetivo para 2027" subtitle="Meta de campaña · votos necesarios">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ left: 8, right: 24, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="votos" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 11, fill: '#555', fontFamily: 'sans-serif' }}>
            {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: 8, fontFamily: 'sans-serif', fontSize: 11, color: '#555' }}>
        <span style={{ color: TEAL, fontWeight: 700 }}>■</span> Meta: <strong>{OBJETIVO_BAR.votos.toLocaleString('es-CO')}</strong> votos ·
        supera el umbral de victoria en +24%
      </div>
    </StatCard>
  )
}

// ── Export principal ────────────────────────────────────────────────────────
export default function StatsCharts() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 16,
    }}>
      <CardPoblacion />
      <CardParticipacion />
      <CardResultados />
      <CardObjetivo />
    </div>
  )
}

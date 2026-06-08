import { useEffect, useRef, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
} from 'recharts'

const DARK  = '#1a1a1a'
const RED   = '#c0392b'
const AMBER = '#e67e22'
const GREEN = '#27ae60'
const GRAY  = '#e0e0e0'

// ── Scroll animation hook ───────────────────────────────────────────────────
function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ── Tooltip ─────────────────────────────────────────────────────────────────
function Tip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color?: string; unit?: string } }[] }) {
  if (!active || !payload?.length) return null
  const { name, value, payload: p } = payload[0]
  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '8px 12px', borderRadius: 4, fontFamily: 'sans-serif', fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <strong style={{ color: p.color ?? DARK }}>{name}</strong><br />
      <span style={{ color: '#555' }}>{value}{p.unit ?? ''}</span>
    </div>
  )
}

// ── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ title, eyebrow, fuente, children }: { title: string; eyebrow: string; fuente: string; children: React.ReactNode }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      background: '#fff', border: '1px solid #e8e8e8', padding: '22px 18px 18px',
      display: 'flex', flexDirection: 'column',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.65s ease, transform 0.65s ease',
    }}>
      <div style={{ fontFamily: 'sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{eyebrow}</div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700, color: DARK, marginBottom: 14, lineHeight: 1.3 }}>{title}</div>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ fontFamily: 'sans-serif', fontSize: 9, color: '#bbb', marginTop: 10, borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>
        Fuente: {fuente}
      </div>
    </div>
  )
}

// ── 1. Pobreza multidimensional (IPM) ───────────────────────────────────────
function CardIPM() {
  const data = [
    { name: 'La Mesa', value: 46.9, color: RED, unit: '%' },
    { name: 'Cundinamarca', value: 7.3, color: AMBER, unit: '%' },
    { name: 'Meta nacional 2030', value: 15.0, color: GRAY, unit: '%' },
  ]
  return (
    <Card title="Índice de Pobreza Multidimensional" eyebrow="Condiciones de vida" fuente="Gobernación Cundinamarca · Censo DANE 2018">
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis dataKey="name" tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontFamily: 'sans-serif', fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} unit="%" domain={[0, 60]} />
          <Tooltip content={<Tip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            <LabelList dataKey="value" position="top" style={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555', fontWeight: 700 }} formatter={(v: unknown) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: RED, fontWeight: 700, marginTop: 6, textAlign: 'center' }}>
        La Mesa está 6× por encima del promedio de Cundinamarca
      </div>
    </Card>
  )
}

// ── 2. Acceso a agua potable ─────────────────────────────────────────────────
function CardAgua() {
  const data = [
    { name: 'Urbano Cund.', value: 98, color: GREEN, unit: '%' },
    { name: 'Rural Cund.', value: 74, color: AMBER, unit: '%' },
    { name: 'Rural La Mesa*', value: 52, color: RED, unit: '%' },
  ]
  return (
    <Card title="Cobertura de agua potable" eyebrow="Servicios básicos" fuente="DANE · MinVivienda · Alcaldía La Mesa 2022">
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis dataKey="name" tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontFamily: 'sans-serif', fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} unit="%" domain={[0, 110]} />
          <Tooltip content={<Tip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            <LabelList dataKey="value" position="top" style={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555', fontWeight: 700 }} formatter={(v: unknown) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#888', marginTop: 6, textAlign: 'center' }}>
        *Antes del acueducto regional (2022): agua cada 12 días en zona urbana · 4.000 usuarios rurales sin cobertura
      </div>
    </Card>
  )
}

// ── 3. Brecha digital ────────────────────────────────────────────────────────
function CardInternet() {
  return (
    <Card title="Acceso a internet" eyebrow="Brecha digital" fuente="DANE TIC en Hogares 2023 · estimación veredal">
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie data={[{ name: 'Con internet', value: 20, color: GREEN }, { name: 'Sin internet', value: 80, color: GRAY }]}
            cx="50%" cy="50%" innerRadius={48} outerRadius={72}
            dataKey="value" startAngle={90} endAngle={-270} paddingAngle={2}>
            <Cell fill={RED} />
            <Cell fill={GRAY} />
          </Pie>
          <Tooltip content={<Tip />} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: RED, fontWeight: 700, textAlign: 'center' }}>
        ~80% de veredas sin internet estable
      </div>
      <div style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#888', marginTop: 4, textAlign: 'center' }}>
        vs 84% cobertura urbana en Cundinamarca
      </div>
    </Card>
  )
}

// ── 4. Inversión pública en obras (SECOP) ────────────────────────────────────
function CardInversion() {
  const data = [
    { name: 'Vías rurales', value: 6400, color: AMBER, unit: 'M COP' },
    { name: 'Agua potable', value: 1730, color: GREEN, unit: 'M COP' },
    { name: 'Educación', value: 2450, color: DARK, unit: 'M COP' },
    { name: 'Salud', value: 800, color: RED, unit: 'M COP' },
    { name: 'Mercado/Plaza', value: 1800, color: '#888', unit: 'M COP' },
  ]
  return (
    <Card title="Inversión pública reciente" eyebrow="SECOP · contratos alcaldía 2024–2026" fuente="SECOP · ElDoradoRadio · ColombiaLicita 2026">
      <ResponsiveContainer width="100%" height={170}>
        <BarChart data={data} layout="vertical" margin={{ left: 12, right: 40, top: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f5f5f5" />
          <XAxis type="number" tick={{ fontFamily: 'sans-serif', fontSize: 9, fill: '#aaa' }} axisLine={false} tickLine={false} unit="M" />
          <YAxis type="category" dataKey="name" tick={{ fontFamily: 'sans-serif', fontSize: 10, fill: '#555' }} axisLine={false} tickLine={false} width={80} />
          <Tooltip content={<Tip />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            <LabelList dataKey="value" position="right" style={{ fontFamily: 'sans-serif', fontSize: 9, fill: '#888' }} formatter={(v: unknown) => `$${(Number(v) / 1000).toFixed(1)}B`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default function StatsCharts() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
      <CardIPM />
      <CardAgua />
      <CardInternet />
      <CardInversion />
    </div>
  )
}

import { useState } from 'react'
import {
  LayoutDashboard, Map, FileInput, ShieldCheck,
  BarChart2, Bot, Zap
} from 'lucide-react'
import { AGENTES } from '../../data/seed'

const NAV = [
  { id: 'dashboard',      label: 'Dashboard',          icon: LayoutDashboard },
  { id: 'mapa',           label: 'Mapa Territorial',   icon: Map },
  { id: 'captura',        label: 'Captura Ciudadana',  icon: FileInput },
  { id: 'transparencia',  label: 'Transparencia',      icon: ShieldCheck },
  { id: 'indices',        label: 'Índices',            icon: BarChart2 },
  { id: 'agentes',        label: 'Agentes IA',         icon: Bot },
]

const ESTADO_COLOR: Record<string, string> = {
  ACTIVO:        '#19E3C2',
  INICIALIZANDO: '#FF9F2E',
  ERROR:         '#FF5D5D',
}

export default function Sidebar() {
  const [active, setActive] = useState('dashboard')

  return (
    <aside
      className="flex flex-col h-full select-none"
      style={{
        width: 220,
        minWidth: 220,
        background: '#080B11',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 mb-1">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 32, height: 32,
              background: 'rgba(25,227,194,0.12)',
              border: '1px solid rgba(25,227,194,0.25)',
            }}
          >
            <Zap size={16} color="#19E3C2" />
          </div>
          <span
            className="font-display font-bold text-[20px] tracking-tight"
            style={{ color: '#19E3C2' }}
          >
            SOM
          </span>
        </div>
        <p className="panel-label" style={{ lineHeight: '1.3' }}>
          Sistema Operativo<br />Municipal
        </p>
      </div>

      {/* Candidate badge */}
      <div className="mx-3 mt-3 px-3 py-2 rounded-[8px]" style={{ background: 'rgba(25,227,194,0.06)', border: '1px solid rgba(25,227,194,0.12)' }}>
        <p className="panel-label mb-1">Campaña 2027</p>
        <p className="font-display font-semibold text-[12px]" style={{ color: '#EAF0F6' }}>
          Fabio A. Cabrera
        </p>
        <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>La Mesa · Cundinamarca</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-3 overflow-y-auto scroll-som">
        {NAV.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => setActive(id)}
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </div>
        ))}
      </nav>

      {/* Agent mini status */}
      <div className="px-3 pb-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="panel-label mb-2">Agentes IA</p>
        {AGENTES.map(ag => (
          <div key={ag.id} className="flex items-center justify-between mb-1">
            <span className="text-[11px]" style={{ color: '#7E8AA0' }}>
              {ag.id === 'estadistico' ? 'Estadístico' : ag.id === 'analitico' ? 'Analítico' : 'Diseñador'}
            </span>
            <div className="flex items-center gap-1">
              <div
                className={ag.estado === 'ACTIVO' ? 'pulse-dot' : ''}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: ESTADO_COLOR[ag.estado] ?? '#7E8AA0',
                  ...(ag.estado !== 'ACTIVO' ? { display: 'inline-block' } : {}),
                }}
              />
              <span className="font-data text-[8px]" style={{ color: ESTADO_COLOR[ag.estado] ?? '#7E8AA0' }}>
                {ag.estado}
              </span>
            </div>
          </div>
        ))}
        <p className="font-data text-[8px] mt-3" style={{ color: '#3a4760' }}>
          SOM MVP v0.1 · Jun 2026
        </p>
      </div>
    </aside>
  )
}

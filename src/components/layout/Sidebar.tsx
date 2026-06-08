import {
  LayoutDashboard, Map, FileInput, ShieldCheck,
  BarChart2, Bot, Zap, LogOut
} from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'
import type { StatsReportes } from '../../hooks/useDashboardData'

export type SomView = 'dashboard' | 'mapa' | 'captura' | 'transparencia' | 'indices' | 'agentes'

const NAV: { id: SomView; label: string; icon: any }[] = [
  { id: 'dashboard',     label: 'Dashboard',          icon: LayoutDashboard },
  { id: 'mapa',          label: 'Mapa Territorial',   icon: Map },
  { id: 'captura',       label: 'Captura Ciudadana',  icon: FileInput },
  { id: 'transparencia', label: 'Transparencia',      icon: ShieldCheck },
  { id: 'indices',       label: 'Índices',            icon: BarChart2 },
  { id: 'agentes',       label: 'Agentes IA',         icon: Bot },
]

const ESTADO_COLOR: Record<string, string> = {
  ACTIVO:        '#19E3C2',
  INICIALIZANDO: '#FF9F2E',
  ERROR:         '#FF5D5D',
}

interface Props {
  active:  SomView
  onNav:   (v: SomView) => void
  stats:   StatsReportes
}

export default function Sidebar({ active, onNav, stats }: Props) {
  const { signOut } = useAuth()

  return (
    <aside
      className="flex flex-col h-full select-none"
      style={{ width: 220, minWidth: 220, background: '#080B11', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center justify-center rounded-lg"
            style={{ width: 32, height: 32, background: 'rgba(25,227,194,0.12)', border: '1px solid rgba(25,227,194,0.25)' }}>
            <Zap size={16} color="#19E3C2" />
          </div>
          <span className="font-display font-bold text-[20px] tracking-tight" style={{ color: '#19E3C2' }}>SOM</span>
        </div>
        <p className="panel-label" style={{ lineHeight: '1.3' }}>Sistema Operativo<br />Municipal</p>
      </div>

      {/* Candidate badge */}
      <div className="mx-3 mt-3 px-3 py-2 rounded-[8px]"
        style={{ background: 'rgba(25,227,194,0.06)', border: '1px solid rgba(25,227,194,0.12)' }}>
        <p className="panel-label mb-1">Campaña 2027</p>
        <p className="font-display font-semibold text-[12px]" style={{ color: '#EAF0F6' }}>Fabio A. Cabrera</p>
        <p className="font-data text-[9px]" style={{ color: '#7E8AA0' }}>La Mesa · Cundinamarca</p>
        {stats.total > 0 && (
          <div className="flex items-center gap-1 mt-[6px]">
            <div className="pulse-dot" style={{ background: '#39DC84', width: 5, height: 5 }} />
            <span className="font-data text-[9px]" style={{ color: '#39DC84' }}>
              {stats.total} reporte{stats.total !== 1 ? 's' : ''} en vivo
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-3 overflow-y-auto scroll-som">
        {NAV.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            className={`nav-item ${active === id ? 'active' : ''}`}
            onClick={() => onNav(id)}
            style={{ cursor: 'pointer' }}
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{label}</span>
            {id === 'captura' && stats.total > 0 && (
              <span className="ml-auto font-data text-[8px] font-bold px-[5px] py-[1px] rounded"
                style={{ background: 'rgba(57,220,132,0.15)', color: '#39DC84', border: '1px solid rgba(57,220,132,0.3)' }}>
                {stats.total}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Agent mini status */}
      <div className="px-3 pb-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="panel-label mb-2">Agentes IA</p>
        {[
          { id: 'estadistico', label: 'Estadístico', estado: stats.total > 0 ? 'ACTIVO' : 'INICIALIZANDO' },
          { id: 'analitico',   label: 'Analítico',   estado: stats.total > 0 ? 'ACTIVO' : 'INICIALIZANDO' },
          { id: 'disenador',   label: 'Diseñador',   estado: 'ACTIVO' },
        ].map(ag => (
          <div key={ag.id} className="flex items-center justify-between mb-1">
            <span className="text-[11px]" style={{ color: '#7E8AA0' }}>{ag.label}</span>
            <div className="flex items-center gap-1">
              <div className={ag.estado === 'ACTIVO' ? 'pulse-dot' : ''}
                style={{ width: 6, height: 6, borderRadius: '50%', background: ESTADO_COLOR[ag.estado],
                  ...(ag.estado !== 'ACTIVO' ? { display: 'inline-block' } : {}) }} />
              <span className="font-data text-[8px]" style={{ color: ESTADO_COLOR[ag.estado] }}>{ag.estado}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sign out */}
      <div className="px-3 pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg mt-2"
          style={{ background: 'rgba(255,93,93,0.06)', border: '1px solid rgba(255,93,93,0.15)',
            color: '#FF5D5D', cursor: 'pointer', fontSize: 11, fontFamily: 'sans-serif' }}
        >
          <LogOut size={12} />
          <span>Cerrar sesión</span>
        </button>
        <p className="font-data text-[8px] mt-2" style={{ color: '#3a4760' }}>SOM MVP v0.1 · Jun 2026</p>
      </div>
    </aside>
  )
}

import { useState } from 'react'
import { useDashboardData } from './hooks/useDashboardData'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PublicSite from './pages/PublicSite'
import ReportarPage from './pages/ReportarPage'
import PrivacidadPage from './pages/PrivacidadPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Sidebar, { type SomView } from './components/layout/Sidebar'
import Header from './components/layout/Header'
import LiveTicker from './components/ui/LiveTicker'
import SplashScreen from './components/ui/SplashScreen'

// Dashboard view
import KPIBar from './components/dashboard/KPIBar'
import ElectoralPanel from './components/dashboard/ElectoralPanel'
import PriorityIndex from './components/dashboard/PriorityIndex'
import SocialMoodRadar from './components/dashboard/SocialMoodRadar'
import TransparencyEngine from './components/dashboard/TransparencyEngine'
import AgentStatusPanel from './components/dashboard/AgentStatusPanel'
import TerritoryMap from './components/map/TerritoryMap'

// Section views
import MapaView from './components/views/MapaView'
import CapturaView from './components/views/CapturaView'
import TransparenciaView from './components/views/TransparenciaView'
import IndicesView from './components/views/IndicesView'
import AgentesView from './components/views/AgentesView'
import LideresView from './components/views/LideresView'

const SPLASH_SEEN_KEY = 'som_splash_seen'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -10 },
  transition: { duration: 0.4, delay },
})

const VIEW_TITLES: Record<SomView, string> = {
  dashboard:     'Dashboard General',
  mapa:          'Mapa Territorial',
  captura:       'Captura Ciudadana',
  lideres:       'Red de Líderes',
  transparencia: 'Motor de Transparencia',
  indices:       'Índices de Gestión',
  agentes:       'Agentes IA',
}

function Dashboard() {
  const [ready, setReady] = useState(() => sessionStorage.getItem(SPLASH_SEEN_KEY) === '1')
  const [activeView, setActiveView] = useState<SomView>('dashboard')
  const data = useDashboardData()

  const handleSplashDone = () => {
    sessionStorage.setItem(SPLASH_SEEN_KEY, '1')
    setReady(true)
  }

  return (
    <>
      {!ready && <SplashScreen onDone={handleSplashDone} />}
      <div className="som-shell flex h-full" style={{ background: '#080B11' }}>
        <Sidebar active={activeView} onNav={setActiveView} stats={data.stats} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <LiveTicker />

          {/* Breadcrumb */}
          <div className="px-4 py-[6px] shrink-0 flex items-center gap-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="font-data text-[9px] uppercase tracking-widest" style={{ color: '#3a4760' }}>SOM</span>
            <span className="font-data text-[9px]" style={{ color: '#3a4760' }}>›</span>
            <span className="font-data text-[9px] uppercase tracking-widest" style={{ color: '#19E3C2' }}>
              {VIEW_TITLES[activeView]}
            </span>
          </div>

          <main className="flex-1 overflow-auto scroll-som grid-texture" style={{ padding: '14px 16px 16px' }}>
            <AnimatePresence mode="wait">

              {activeView === 'dashboard' && (
                <motion.div key="dashboard" {...fadeUp(0)} className="flex flex-col gap-3 h-full">
                  <KPIBar totalReportes={data.stats.total} />
                  <div className="grid gap-3" style={{ gridTemplateColumns: '3fr 2fr', height: 302 }}>
                    <TerritoryMap reportes={data.reportes} />
                    <ElectoralPanel />
                  </div>
                  <div className="grid grid-cols-3 gap-3" style={{ height: 272 }}>
                    <PriorityIndex stats={data.stats} />
                    <SocialMoodRadar stats={data.stats} />
                    <AgentStatusPanel stats={data.stats} loading={data.loading} />
                  </div>
                  <TransparencyEngine compromisos={data.compromisos} />
                </motion.div>
              )}

              {activeView === 'mapa' && (
                <motion.div key="mapa" {...fadeUp(0)} style={{ height: 'calc(100vh - 160px)' }}>
                  <MapaView reportes={data.reportes} stats={data.stats} />
                </motion.div>
              )}

              {activeView === 'captura' && (
                <motion.div key="captura" {...fadeUp(0)} style={{ height: 'calc(100vh - 160px)' }}>
                  <CapturaView reportes={data.reportes} stats={data.stats} loading={data.loading} />
                </motion.div>
              )}

              {activeView === 'transparencia' && (
                <motion.div key="transparencia" {...fadeUp(0)} style={{ height: 'calc(100vh - 160px)' }}>
                  <TransparenciaView compromisos={data.compromisos} />
                </motion.div>
              )}

              {activeView === 'indices' && (
                <motion.div key="indices" {...fadeUp(0)} style={{ height: 'calc(100vh - 160px)' }}>
                  <IndicesView stats={data.stats} />
                </motion.div>
              )}

              {activeView === 'lideres' && (
                <motion.div key="lideres" {...fadeUp(0)} style={{ height: 'calc(100vh - 160px)' }}>
                  <LideresView />
                </motion.div>
              )}

              {activeView === 'agentes' && (
                <motion.div key="agentes" {...fadeUp(0)} style={{ height: 'calc(100vh - 160px)' }}>
                  <AgentesView stats={data.stats} loading={data.loading} />
                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<PublicSite />} />
      <Route path="/login"     element={<LoginPage />} />
      <Route path="/som"       element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/reportar"  element={<ReportarPage />} />
      <Route path="/privacidad" element={<PrivacidadPage />} />
    </Routes>
  )
}

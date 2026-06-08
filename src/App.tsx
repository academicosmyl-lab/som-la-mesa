import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import LiveTicker from './components/ui/LiveTicker'
import SplashScreen from './components/ui/SplashScreen'
import KPIBar from './components/dashboard/KPIBar'
import ElectoralPanel from './components/dashboard/ElectoralPanel'
import PriorityIndex from './components/dashboard/PriorityIndex'
import SocialMoodRadar from './components/dashboard/SocialMoodRadar'
import TransparencyEngine from './components/dashboard/TransparencyEngine'
import AgentStatusPanel from './components/dashboard/AgentStatusPanel'
import TerritoryMap from './components/map/TerritoryMap'

// Only show splash on first visit per session
const SPLASH_SEEN_KEY = 'som_splash_seen'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
})

const fadeLeft = (delay: number) => ({
  initial: { opacity: 0, x: -22 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.55, delay },
})

const fadeRight = (delay: number) => ({
  initial: { opacity: 0, x: 22 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.55, delay },
})

export default function App() {
  const [ready, setReady] = useState(() =>
    sessionStorage.getItem(SPLASH_SEEN_KEY) === '1'
  )

  const handleSplashDone = () => {
    sessionStorage.setItem(SPLASH_SEEN_KEY, '1')
    setReady(true)
  }

  return (
    <>
      {!ready && <SplashScreen onDone={handleSplashDone} />}

      <div className="flex h-full overflow-hidden" style={{ background: '#080B11' }}>
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <LiveTicker />

          <main
            className="flex-1 overflow-auto scroll-som grid-texture"
            style={{ padding: '14px 16px 16px' }}
          >
            {/* Row 1 — KPI Cards */}
            <motion.div {...fadeUp(0.05)}>
              <KPIBar />
            </motion.div>

            {/* Row 2 — Map + Electoral Analysis */}
            <div
              className="grid gap-3 mt-3"
              style={{ gridTemplateColumns: '3fr 2fr', height: 302 }}
            >
              <motion.div {...fadeLeft(0.15)} className="h-full">
                <TerritoryMap />
              </motion.div>
              <motion.div {...fadeRight(0.2)} className="h-full">
                <ElectoralPanel />
              </motion.div>
            </div>

            {/* Row 3 — Priority Index + Social Mood + Agents */}
            <div
              className="grid grid-cols-3 gap-3 mt-3"
              style={{ height: 272 }}
            >
              <motion.div {...fadeUp(0.25)} className="h-full">
                <PriorityIndex />
              </motion.div>
              <motion.div {...fadeUp(0.32)} className="h-full">
                <SocialMoodRadar />
              </motion.div>
              <motion.div {...fadeUp(0.39)} className="h-full">
                <AgentStatusPanel />
              </motion.div>
            </div>

            {/* Row 4 — Transparency Engine */}
            <motion.div {...fadeUp(0.45)} className="mt-3">
              <TransparencyEngine />
            </motion.div>
          </main>
        </div>
      </div>
    </>
  )
}

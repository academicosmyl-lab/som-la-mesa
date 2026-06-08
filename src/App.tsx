import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import KPIBar from './components/dashboard/KPIBar'
import ElectoralPanel from './components/dashboard/ElectoralPanel'
import PriorityIndex from './components/dashboard/PriorityIndex'
import SocialMoodRadar from './components/dashboard/SocialMoodRadar'
import TransparencyEngine from './components/dashboard/TransparencyEngine'
import AgentStatusPanel from './components/dashboard/AgentStatusPanel'
import TerritoryMap from './components/map/TerritoryMap'

export default function App() {
  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#080B11' }}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main
          className="flex-1 overflow-auto scroll-som grid-texture"
          style={{ padding: '14px 16px 16px' }}
        >
          {/* Row 1 — KPI Cards */}
          <KPIBar />

          {/* Row 2 — Map + Electoral Analysis */}
          <div
            className="grid gap-3 mt-3"
            style={{ gridTemplateColumns: '3fr 2fr', height: 310 }}
          >
            <TerritoryMap />
            <ElectoralPanel />
          </div>

          {/* Row 3 — Priority Index + Social Mood + Agents */}
          <div
            className="grid grid-cols-3 gap-3 mt-3"
            style={{ height: 276 }}
          >
            <PriorityIndex />
            <SocialMoodRadar />
            <AgentStatusPanel />
          </div>

          {/* Row 4 — Transparency Engine */}
          <div className="mt-3">
            <TransparencyEngine />
          </div>
        </main>
      </div>
    </div>
  )
}

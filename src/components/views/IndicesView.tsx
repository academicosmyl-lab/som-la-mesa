import PriorityIndex from '../dashboard/PriorityIndex'
import SocialMoodRadar from '../dashboard/SocialMoodRadar'
import type { StatsReportes } from '../../hooks/useDashboardData'

interface Props { stats: StatsReportes }

export default function IndicesView({ stats }: Props) {
  return (
    <div className="h-full grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <PriorityIndex stats={stats} />
      <SocialMoodRadar stats={stats} />
    </div>
  )
}

import type { Metadata } from "next"
import TeamsList from "@/components/teams/teams-list"

export const metadata: Metadata = {
  title: "Virtual Premier League - Teams",
  description: "Teams in the Virtual Premier League",
}

export default function TeamsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold heading-gradient mb-2">Teams</h1>
        <p className="text-white/60">Browse and manage all teams in the Virtual Premier League</p>
      </div>

      <div className="relative">
        {/* Background blur effects */}
        <div className="blur-circle blur-circle-1 w-[500px] h-[500px] top-[-250px] right-[-100px]" />
        <div className="blur-circle blur-circle-2 w-[400px] h-[400px] bottom-[-200px] left-[-150px]" />

        <TeamsList />
      </div>
    </div>
  )
}

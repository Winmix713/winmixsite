"use client"

import { useState, useEffect } from "react"
import { Users, Trophy, BarChart, Info, Calendar, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { StatCard } from "@/components/ui/stat-card"

type StatusType = "completed" | "live" | "upcoming"

interface Match {
  date: string
  homeTeam: string
  awayTeam: string
  score: string
  status: StatusType
  homeTeamLogo?: string
  awayTeamLogo?: string
}

interface UpcomingMatch {
  date: string
  time: string
  homeTeam: string
  homeTeamAbbr: string
  awayTeam: string
  awayTeamAbbr: string
  league: string
  homeTeamLogo?: string
  awayTeamLogo?: string
}

export default function DashboardPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sample data
  const statsData = {
    teams: {
      value: 16,
      change: {
        value: "+4",
        isPositive: true,
        text: "from last month",
      },
    },
    matches: {
      value: 18,
      change: {
        value: "+2",
        isPositive: true,
        text: "from last week",
      },
    },
    accuracy: {
      value: "76%",
      change: {
        value: "+2.5%",
        isPositive: true,
        text: "from last month",
      },
    },
    leagues: {
      value: 1,
      info: "Virtual Premier League",
    },
  }

  const matchesData: Match[] = [
    {
      date: "2025-05-15",
      homeTeam: "Liverpool",
      awayTeam: "Manchester Kék",
      score: "2-1",
      status: "completed",
    },
    {
      date: "2025-05-16",
      homeTeam: "London Ágyúk",
      awayTeam: "Chelsea",
      score: "0-0",
      status: "live",
    },
    {
      date: "2025-05-17",
      homeTeam: "Tottenham",
      awayTeam: "West Ham",
      score: "3-2",
      status: "completed",
    },
    {
      date: "2025-05-18",
      homeTeam: "Aston Oroszlán",
      awayTeam: "Everton",
      score: "-",
      status: "upcoming",
    },
  ]

  const upcomingMatchesData: UpcomingMatch[] = [
    {
      date: "2025-05-18",
      time: "15:00",
      homeTeam: "Aston Oroszlán",
      homeTeamAbbr: "AO",
      awayTeam: "Everton",
      awayTeamAbbr: "EV",
      league: "Virtual Premier League",
    },
    {
      date: "2025-05-19",
      time: "20:00",
      homeTeam: "Newcastle",
      homeTeamAbbr: "NC",
      awayTeam: "Brighton",
      awayTeamAbbr: "BR",
      league: "Virtual Premier League",
    },
    {
      date: "2025-05-20",
      time: "16:45",
      homeTeam: "London Ágyúk",
      homeTeamAbbr: "LÁ",
      awayTeam: "Vörös Ördögök",
      awayTeamAbbr: "VÖ",
      league: "Virtual Premier League",
    },
  ]

  return (
    <div className="w-full">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="blur-circle blur-circle-1 w-[500px] h-[500px] top-[-250px] right-[-100px]" />
        <div className="blur-circle blur-circle-2 w-[400px] h-[400px] top-1/3 left-[-150px]" />
        <div className="blur-circle blur-circle-1 w-[500px] h-[500px] bottom-[-250px] left-1/2" />
      </div>

      <div className="container py-8 space-y-6">
        {/* Dashboard Header */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold heading-gradient">Dashboard</h1>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            >
              <span>View Reports</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <p className="text-white/60">Overview of your Virtual Premier League management system</p>
        </div>

        {/* League Info Banner */}
        <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-blue-900/5 backdrop-blur-sm p-6">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />

          <div className="flex flex-row items-start gap-3 relative z-10">
            <div className="pt-0.5">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight text-lg text-white">Virtual Premier League Teams Only</h3>
              <p className="text-sm text-white/60 mt-1">
                This platform exclusively features Virtual Premier League teams. All match data and statistics refer to
                these virtual teams, not actual Premier League teams.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <StatCard
            title="Total Teams"
            value={statsData.teams.value}
            icon={<Users size={24} />}
            color="blue"
            change={statsData.teams.change}
          />

          <StatCard
            title="Upcoming Matches"
            value={statsData.matches.value}
            icon={<Calendar size={24} />}
            color="green"
            change={statsData.matches.change}
          />

          <StatCard
            title="Prediction Accuracy"
            value={statsData.accuracy.value}
            icon={<BarChart size={24} />}
            color="purple"
            change={statsData.accuracy.change}
          />

          <StatCard
            title="Active Leagues"
            value={statsData.leagues.value}
            icon={<Trophy size={24} />}
            color="amber"
            change={
              statsData.leagues.info
                ? {
                    value: "",
                    isPositive: true,
                    text: statsData.leagues.info,
                  }
                : undefined
            }
          />
        </div>

        {/* Main Content Grid */}
        <div className="w-full grid gap-6 grid-cols-1 lg:grid-cols-12">
          {/* Matches Table */}
          <div className="w-full lg:col-span-8">
            <Card className="glass-card w-full overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-amber-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Recent Matches</h2>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <span>All Matches</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <div className="overflow-x-auto -mx-6">
                  <div className="inline-block min-w-full align-middle px-6">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-2 text-sm font-medium text-white/60">Date</th>
                          <th className="text-right py-3 px-2 text-sm font-medium text-white/60">Home Team</th>
                          <th className="text-center py-3 px-2 text-sm font-medium text-white/60">Score</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-white/60">Away Team</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-white/60">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {matchesData.map((match, index) => (
                          <tr key={index} className="hover:bg-white/5 transition-colors duration-150">
                            <td className="py-4 px-2 text-sm whitespace-nowrap text-white/80">{match.date}</td>
                            <td className="py-4 px-2">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-sm font-medium whitespace-nowrap text-white">
                                  {match.homeTeam}
                                </span>
                                <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                                  <span className="text-xs font-bold text-white">{match.homeTeam.charAt(0)}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <div className="flex items-center justify-center">
                                <div
                                  className={cn(
                                    "py-1 px-3 rounded text-center min-w-16",
                                    match.status === "live" ? "bg-red-500/20 text-white animate-pulse" : "text-white",
                                  )}
                                >
                                  <span className="text-sm font-mono font-medium whitespace-nowrap">{match.score}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                                  <span className="text-xs font-bold text-white">{match.awayTeam.charAt(0)}</span>
                                </div>
                                <span className="text-sm font-medium whitespace-nowrap text-white">
                                  {match.awayTeam}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <StatusBadge status={match.status} animated={match.status === "live"} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    <span>View All Matches</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Upcoming Matches */}
          <div className="w-full lg:col-span-4">
            <Card className="glass-card h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-green-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Upcoming Matches</h2>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <span>View All</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingMatchesData.map((match, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-md group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                          {match.date} {match.time}
                        </span>
                        <span className="text-xs font-medium bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">
                          {match.league}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium bg-white/10 px-1.5 py-0.5 rounded group-hover:bg-white/15 transition-colors">
                            {match.homeTeamAbbr}
                          </span>
                          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                            {match.homeTeam}
                          </span>
                        </div>

                        <span className="text-xs font-medium text-white/60 mx-2 group-hover:text-white/80 transition-colors">
                          vs
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                            {match.awayTeam}
                          </span>
                          <span className="text-xs font-medium bg-white/10 px-1.5 py-0.5 rounded group-hover:bg-white/15 transition-colors">
                            {match.awayTeamAbbr}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                    <span>View All Upcoming</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

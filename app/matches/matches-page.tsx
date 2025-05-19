"use client"

import { useState, useEffect } from "react"
import type React from "react"

import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent, SidebarContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { StatsGrid } from "@/components/ui/stats-grid"
import { StatsCard } from "@/components/ui/stats-card"
import { Trophy, Calendar, Filter, ChevronRight, Clock, CheckCircle, ArrowUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemLog } from "@/components/system-log"
import { VimeoCard } from "@/components/vimeo-card"
import { VideoGrid } from "@/components/video-grid"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import MatchTableView from "@/components/matches/match-table-view"

export default function MatchesPage() {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("list")

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter matches based on status and search query
  const filteredMatches = matchData.filter((match) => {
    const statusMatches = filter === "all" || match.status.toLowerCase() === filter.toLowerCase()
    const searchMatches =
      !searchQuery ||
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())
    return statusMatches && searchMatches
  })

  // Sort matches based on column
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (!sortColumn) return 0

    let compareA, compareB

    switch (sortColumn) {
      case "date":
        compareA = new Date(a.date)
        compareB = new Date(b.date)
        break
      case "time":
        compareA = a.time
        compareB = b.time
        break
      case "homeTeam":
        compareA = a.homeTeam
        compareB = b.homeTeam
        break
      case "awayTeam":
        compareA = a.awayTeam
        compareB = b.awayTeam
        break
      case "status":
        compareA = a.status
        compareB = b.status
        break
      default:
        return 0
    }

    if (compareA < compareB) return sortDirection === "asc" ? -1 : 1
    if (compareA > compareB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Matches"
        description="All matches in the Virtual Premier League"
        actions={[
          {
            label: "Match Statistics",
            href: "/statistics",
            variant: "outline",
          },
          {
            label: "League Table",
            href: "/league-management",
            variant: "default",
          },
        ]}
      />

      <SystemLog
        title="Virtual Premier League Matches Only"
        description="This platform exclusively features Virtual Premier League matches. All match data and statistics refer to these virtual teams."
        type="info"
      />

      <VideoGrid columns={2} className="mb-6">
        <VimeoCard
          title="Broadcast Layout"
          vimeoUrl="https://player.vimeo.com/video/853718761?h=b9cc34bed7&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
        />
        <VimeoCard
          title="Broadcast Lineups"
          vimeoUrl="https://player.vimeo.com/video/853063498?h=ff24fde913&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
        />
      </VideoGrid>

      <StatsGrid columns={4}>
        <StatsCard
          title="Total Matches"
          value="240"
          change="+0"
          isPositive={false}
          icon={<Trophy className="h-5 w-5 text-blue-400" />}
        />
        <StatsCard
          title="Completed"
          value="182"
          change="+5"
          isPositive={true}
          icon={<CheckCircle className="h-5 w-5 text-emerald-400" />}
        />
        <StatsCard
          title="Live Now"
          value="2"
          change="+1"
          isPositive={true}
          icon={<Clock className="h-5 w-5 text-red-400" />}
        />
        <StatsCard
          title="Upcoming"
          value="56"
          change="-5"
          isPositive={false}
          icon={<Calendar className="h-5 w-5 text-amber-400" />}
        />
      </StatsGrid>

      <ContentGrid sidebar>
        <MainContent>
          <SectionContainer>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-white">Match Filters</h3>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search teams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
                <Select defaultValue="all" onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Matches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Matches</SelectItem>
                    <SelectItem value="live">Live Matches</SelectItem>
                    <SelectItem value="upcoming">Upcoming Matches</SelectItem>
                    <SelectItem value="completed">Completed Matches</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all" onValueChange={setDateRange}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="season">This Season</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="list" className="mb-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-black/40">
                        <tr className="border-b border-white/5">
                          <th
                            className="text-left py-3 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("date")}
                          >
                            <div className="flex items-center gap-1">
                              Date
                              {sortColumn === "date" && (
                                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                              )}
                            </div>
                          </th>
                          <th
                            className="text-left py-3 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("time")}
                          >
                            <div className="flex items-center gap-1">
                              Time
                              {sortColumn === "time" && (
                                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                              )}
                            </div>
                          </th>
                          <th
                            className="text-left py-3 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("status")}
                          >
                            <div className="flex items-center gap-1">
                              Status
                              {sortColumn === "status" && (
                                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                              )}
                            </div>
                          </th>
                          <th
                            className="text-left py-3 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("homeTeam")}
                          >
                            <div className="flex items-center gap-1">
                              Home Team
                              {sortColumn === "homeTeam" && (
                                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                              )}
                            </div>
                          </th>
                          <th
                            className="text-left py-3 px-4 text-sm font-medium text-gray-400 cursor-pointer hover:text-white"
                            onClick={() => handleSort("awayTeam")}
                          >
                            <div className="flex items-center gap-1">
                              Away Team
                              {sortColumn === "awayTeam" && (
                                <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
                              )}
                            </div>
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Score</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedMatches.map((match, index) => (
                          <MatchRow key={index} match={match} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="table" className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <MatchTableView matches={sortedMatches} />
                )}
              </TabsContent>
            </Tabs>

            {sortedMatches.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No matches found</h3>
                <p className="text-gray-400 max-w-md">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
              </div>
            )}

            {sortedMatches.length > 0 && !isLoading && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing <span className="font-medium text-white">{sortedMatches.length}</span> of{" "}
                  <span className="font-medium text-white">{matchData.length}</span> matches
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </SectionContainer>
        </MainContent>

        <SidebarContent>
          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-400" />
                Match Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  label="Home Wins"
                  value="98"
                  icon={<Trophy className="h-4 w-4 text-blue-400" />}
                  bgColor="from-blue-500/10"
                  borderColor="border-blue-500/10"
                />
                <StatCard
                  label="Away Wins"
                  value="64"
                  icon={<Trophy className="h-4 w-4 text-green-400" />}
                  bgColor="from-green-500/10"
                  borderColor="border-green-500/10"
                />
                <StatCard
                  label="Draws"
                  value="20"
                  icon={<Trophy className="h-4 w-4 text-purple-400" />}
                  bgColor="from-purple-500/10"
                  borderColor="border-purple-500/10"
                />
                <StatCard
                  label="Goals"
                  value="542"
                  icon={<Trophy className="h-4 w-4 text-amber-400" />}
                  bgColor="from-amber-500/10"
                  borderColor="border-amber-500/10"
                />
              </div>
            </CardContent>
          </SectionContainer>

          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                Upcoming Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="space-y-3">
                {matchData
                  .filter((match) => match.status === "Upcoming")
                  .slice(0, 3)
                  .map((match, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-1.5">
                        <Badge variant="outline" className="text-xs">
                          {match.date} • {match.time}
                        </Badge>
                        <Badge className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/10">
                          VPL
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{match.homeTeam}</span>
                        <span className="text-xs text-gray-400">vs</span>
                        <span className="font-medium">{match.awayTeam}</span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Upcoming Matches
              </Button>
            </CardContent>
          </SectionContainer>

          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-400" />
                Prediction Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <Tabs defaultValue="chart">
                <TabsList className="w-full">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="mt-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 relative overflow-hidden">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Prediction Distribution</h4>
                    <div className="relative h-[180px] flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-blue-500"></div>
                          <div className="absolute top-0 right-1/2 bottom-1/2 left-0 bg-emerald-500"></div>
                          <div className="absolute top-1/2 right-1/2 bottom-0 left-0 bg-amber-500"></div>
                        </div>
                        <div className="absolute inset-[15%] rounded-full bg-gray-900/90"></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-gray-400">Home (45%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                        <span className="text-xs text-gray-400">Away (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                        <span className="text-xs text-gray-400">Draw (25%)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="stats" className="mt-4 space-y-4">
                  <PerformanceBar label="Successful predictions" value={76} color="emerald" />
                  <PerformanceBar label="Home wins" value={60} color="blue" />
                  <PerformanceBar label="Away wins" value={42} color="purple" />
                </TabsContent>
              </Tabs>

              <div className="mt-5 flex justify-center">
                <Button className="w-full">View Detailed Analysis</Button>
              </div>
            </CardContent>
          </SectionContainer>

          <VimeoCard
            title="Score Lower Third"
            vimeoUrl="https://player.vimeo.com/video/853092802?h=606ab6342d&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
            className="mt-6"
          />
        </SidebarContent>
      </ContentGrid>
    </PageContainer>
  )
}

interface MatchData {
  date: string
  time: string
  status: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
}

function MatchRow({ match }: { match: MatchData }) {
  const getRowClass = () => {
    if (match.status === "Live")
      return "transition-colors border-b border-white/5 hover:bg-white/5 cursor-pointer bg-red-500/5"
    if (match.status === "Upcoming")
      return "transition-colors border-b border-white/5 hover:bg-white/5 cursor-pointer bg-blue-500/5"
    return "transition-colors border-b border-white/5 hover:bg-white/5 cursor-pointer"
  }

  const getScoreDisplay = () => {
    if (match.status === "Live") {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="font-bold">{match.homeScore}</span>
          <span>-</span>
          <span className="font-bold">{match.awayScore}</span>
          <Clock className="h-3 w-3 text-red-500 ml-1 animate-pulse" />
        </div>
      )
    }

    if (match.status === "Upcoming") {
      return <span className="text-gray-400">-</span>
    }

    // Completed match
    return <span className="font-medium">{`${match.homeScore}-${match.awayScore}`}</span>
  }

  return (
    <tr className={getRowClass()}>
      <td className="p-4 align-middle text-gray-300">{match.date}</td>
      <td className="p-4 align-middle text-gray-300">{match.time}</td>
      <td className="p-4 align-middle">
        <StatusBadge status={match.status} />
      </td>
      <td className="p-4 align-middle text-white font-medium">{match.homeTeam}</td>
      <td className="p-4 align-middle text-white font-medium">{match.awayTeam}</td>
      <td className="p-4 align-middle text-center">{getScoreDisplay()}</td>
      <td className="p-4 align-middle text-center">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Live") {
    return (
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-red-500 text-white">
        Live
      </div>
    )
  }

  if (status === "Upcoming") {
    return (
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-blue-500 text-white">
        Upcoming
      </div>
    )
  }

  return (
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-green-500 text-white">
      Completed
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
  bgColor: string
  borderColor: string
}

function StatCard({ label, value, icon, bgColor, borderColor }: StatCardProps) {
  return (
    <div className={`relative rounded-lg border ${borderColor} bg-white/5 ${bgColor} p-4`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        {icon}
      </div>
      <p className="text-2xl font-semibold text-white mt-2">{value}</p>
    </div>
  )
}

interface PerformanceBarProps {
  label: string
  value: number
  color: string
}

function PerformanceBar({ label, value, color }: PerformanceBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-400">{value}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5">
        <div className={`bg-${color}-500 h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

const matchData = [
  {
    date: "2023-09-01",
    time: "14:00",
    status: "Completed",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 2,
    awayScore: 1,
  },
  {
    date: "2023-09-01",
    time: "16:00",
    status: "Live",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    homeScore: 1,
    awayScore: 1,
  },
  {
    date: "2023-09-02",
    time: "18:00",
    status: "Upcoming",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: 0,
    awayScore: 0,
  },
  {
    date: "2023-09-02",
    time: "20:00",
    status: "Completed",
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    homeScore: 3,
    awayScore: 2,
  },
  {
    date: "2023-09-03",
    time: "15:00",
    status: "Live",
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Olympique Marseille",
    homeScore: 0,
    awayScore: 1,
  },
  {
    date: "2023-09-03",
    time: "17:00",
    status: "Upcoming",
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    homeScore: 0,
    awayScore: 0,
  },
  {
    date: "2023-09-04",
    time: "19:00",
    status: "Completed",
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    homeScore: 1,
    awayScore: 0,
  },
  {
    date: "2023-09-04",
    time: "21:00",
    status: "Live",
    homeTeam: "Inter Milan",
    awayTeam: "AS Roma",
    homeScore: 2,
    awayScore: 1,
  },
  {
    date: "2023-09-05",
    time: "16:30",
    status: "Upcoming",
    homeTeam: "Tottenham Hotspur",
    awayTeam: "Manchester City",
    homeScore: 0,
    awayScore: 0,
  },
  {
    date: "2023-09-05",
    time: "18:30",
    status: "Completed",
    homeTeam: "Napoli",
    awayTeam: "Lazio",
    homeScore: 4,
    awayScore: 0,
  },
]

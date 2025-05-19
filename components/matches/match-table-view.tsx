"use client"

import { useState } from "react"
import { Eye, Filter, Search, ArrowUpDown } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MatchData {
  id: string
  date: string
  time: string
  status: "Completed" | "LIVE" | "Upcoming"
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
}

// Sample match data with Virtual Premier League teams
const matchData: MatchData[] = [
  {
    id: "1",
    date: "2025. 04. 30.",
    time: "21:00",
    status: "Completed",
    homeTeam: "Newcastle",
    awayTeam: "Vörös Ördögök",
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: "2",
    date: "2025. 05. 25.",
    time: "19:00",
    status: "Completed",
    homeTeam: "Nottingham",
    awayTeam: "Brentford",
    homeScore: 4,
    awayScore: 3,
  },
  {
    id: "3",
    date: "2025. 05. 02.",
    time: "13:00",
    status: "Completed",
    homeTeam: "Liverpool",
    awayTeam: "Vörös Ördögök",
    homeScore: 2,
    awayScore: 3,
  },
  {
    id: "4",
    date: "2025. 06. 02.",
    time: "23:00",
    status: "LIVE",
    homeTeam: "Brighton",
    awayTeam: "Manchester Kék",
    homeScore: 1,
    awayScore: 2,
  },
  {
    id: "5",
    date: "2025. 06. 08.",
    time: "22:00",
    status: "LIVE",
    homeTeam: "Aston Oroszlán",
    awayTeam: "Manchester Kék",
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: "6",
    date: "2025. 04. 30.",
    time: "22:00",
    status: "Upcoming",
    homeTeam: "Aston Oroszlán",
    awayTeam: "Brentford",
    homeScore: 0,
    awayScore: 0,
  },
  {
    id: "7",
    date: "2025. 06. 01.",
    time: "17:00",
    status: "Upcoming",
    homeTeam: "Liverpool",
    awayTeam: "Manchester Kék",
    homeScore: 0,
    awayScore: 0,
  },
  {
    id: "8",
    date: "2025. 05. 20.",
    time: "21:00",
    status: "Upcoming",
    homeTeam: "Brentford",
    awayTeam: "Tottenham",
    homeScore: 0,
    awayScore: 0,
  },
]

export function MatchTableView() {
  const [matches] = useState<MatchData[]>(matchData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter matches based on search query and status
  const filteredMatches = matches.filter((match) => {
    const statusMatches = statusFilter === "all" || match.status.toLowerCase() === statusFilter.toLowerCase()
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

  const columns = [
    {
      header: (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("date")}>
          Date
          {sortColumn === "date" && (
            <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
          )}
        </div>
      ),
      accessorKey: "date",
    },
    {
      header: (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("time")}>
          Time
          {sortColumn === "time" && (
            <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
          )}
        </div>
      ),
      accessorKey: "time",
    },
    {
      header: (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("status")}>
          Status
          {sortColumn === "status" && (
            <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
          )}
        </div>
      ),
      accessorKey: "status",
      cell: ({ row }: { row: MatchData }) => {
        let status: "success" | "warning" | "info" = "info"
        const icon = null

        if (row.status === "Completed") {
          status = "success"
        } else if (row.status === "LIVE") {
          status = "warning"
        }

        return <StatusBadge status={status} label={row.status} icon={icon} />
      },
    },
    {
      header: (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("homeTeam")}>
          Home Team
          {sortColumn === "homeTeam" && (
            <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
          )}
        </div>
      ),
      accessorKey: "homeTeam",
      className: "text-white font-medium",
    },
    {
      header: (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("awayTeam")}>
          Away Team
          {sortColumn === "awayTeam" && (
            <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
          )}
        </div>
      ),
      accessorKey: "awayTeam",
      className: "text-white font-medium",
    },
    {
      header: "Score",
      accessorKey: ({ row }: { row: MatchData }) => {
        if (row.status === "Upcoming") {
          return <span className="text-gray-400">-</span>
        }

        const scoreClass = row.homeScore > row.awayScore ? "font-medium text-emerald-500" : "font-medium text-white"

        return <span className={scoreClass}>{`${row.homeScore}-${row.awayScore}`}</span>
      },
      className: "text-center",
    },
    {
      header: "Details",
      accessorKey: (row: MatchData) => (
        <div className="flex justify-center">
          <Button
            size="icon"
            variant="outline"
            className="bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 h-8 w-8"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "text-center",
    },
  ]

  return (
    <div className="space-y-4">
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
          <Select defaultValue="all" onValueChange={setStatusFilter}>
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
        </div>
      </div>

      <div className="bg-black/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">R</span>
          </div>
          <h3 className="text-white font-medium">Virtual Premier League Matches</h3>
        </div>

        <DataTable columns={columns} data={sortedMatches} keyField="id" emptyState={<div>No matches found</div>} />
      </div>
    </div>
  )
}

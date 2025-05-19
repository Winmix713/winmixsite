"use client"

import type React from "react"

import { useState } from "react"
import { Search, Grid, List, Filter } from "lucide-react"
import TeamCard from "./team-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock data for teams
const teamsData = [
  {
    id: "1",
    name: "London Ágyúk",
    stadium: "Emirates Stadium",
    founded: 1886,
    color: "#EF0107",
  },
  {
    id: "2",
    name: "Manchester Blues",
    stadium: "Etihad Stadium",
    founded: 1880,
    color: "#6CABDD",
  },
  {
    id: "3",
    name: "Liverpool Reds",
    stadium: "Anfield",
    founded: 1892,
    color: "#C8102E",
  },
  {
    id: "4",
    name: "Chelsea Lions",
    stadium: "Stamford Bridge",
    founded: 1905,
    color: "#034694",
  },
  {
    id: "5",
    name: "Tottenham Spurs",
    stadium: "Tottenham Hotspur Stadium",
    founded: 1882,
    color: "#132257",
  },
  {
    id: "6",
    name: "Manchester Reds",
    stadium: "Old Trafford",
    founded: 1878,
    color: "#DA291C",
  },
]

export default function TeamsList() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTeams, setFilteredTeams] = useState(teamsData)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredTeams(teamsData)
    } else {
      const filtered = teamsData.filter(
        (team) =>
          team.name.toLowerCase().includes(query.toLowerCase()) ||
          team.stadium.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredTeams(filtered)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/60 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="icon"
            className={`border-white/10 ${view === "grid" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"}`}
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`border-white/10 ${view === "list" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"}`}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 ml-2"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {filteredTeams.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
          <p className="text-white/60">No teams found matching your search criteria.</p>
        </div>
      ) : (
        <div
          className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}
        >
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} view={view} />
          ))}
        </div>
      )}
    </div>
  )
}

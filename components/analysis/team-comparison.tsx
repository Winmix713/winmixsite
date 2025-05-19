"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// VPL teams
const VPL_TEAMS = [
  "Arsenal",
  "Aston Villa",
  "Bournemouth",
  "Brentford",
  "Brighton",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Liverpool",
  "Man City",
  "Man United",
  "Newcastle",
  "Nottingham Forest",
  "Tottenham",
  "West Ham",
]

// Mock data for team comparison
const TEAM_METRICS = {
  Arsenal: {
    attack: 85,
    defense: 80,
    possession: 78,
    passing: 82,
    physicality: 75,
    speed: 80,
  },
  Liverpool: {
    attack: 88,
    defense: 78,
    possession: 82,
    passing: 85,
    physicality: 80,
    speed: 85,
  },
  "Man City": {
    attack: 90,
    defense: 85,
    possession: 90,
    passing: 92,
    physicality: 78,
    speed: 82,
  },
  "Man United": {
    attack: 80,
    defense: 75,
    possession: 75,
    passing: 78,
    physicality: 82,
    speed: 83,
  },
  Tottenham: {
    attack: 82,
    defense: 72,
    possession: 76,
    passing: 80,
    physicality: 78,
    speed: 81,
  },
  Chelsea: {
    attack: 78,
    defense: 76,
    possession: 80,
    passing: 82,
    physicality: 76,
    speed: 79,
  },
  Newcastle: {
    attack: 76,
    defense: 82,
    possession: 72,
    passing: 75,
    physicality: 85,
    speed: 78,
  },
  Brighton: {
    attack: 75,
    defense: 74,
    possession: 78,
    passing: 80,
    physicality: 72,
    speed: 76,
  },
}

export default function TeamComparison() {
  const [isLoading, setIsLoading] = useState(true)
  const [team1, setTeam1] = useState("Arsenal")
  const [team2, setTeam2] = useState("Liverpool")
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      updateComparisonData()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      updateComparisonData()
    }
  }, [team1, team2, isLoading])

  const updateComparisonData = () => {
    const metrics = [
      {
        subject: "Attack",
        A: TEAM_METRICS[team1 as keyof typeof TEAM_METRICS].attack,
        B: TEAM_METRICS[team2 as keyof typeof TEAM_METRICS].attack,
      },
      {
        subject: "Defense",
        A: TEAM_METRICS[team1 as keyof typeof TEAM_METRICS].defense,
        B: TEAM_METRICS[team2 as keyof typeof TEAM_METRICS].defense,
      },
      {
        subject: "Possession",
        A: TEAM_METRICS[team1 as keyof typeof TEAM_METRICS].possession,
        B: TEAM_METRICS[team2 as keyof typeof TEAM_METRICS].possession,
      },
      {
        subject: "Passing",
        A: TEAM_METRICS[team1 as keyof typeof TEAM_METRICS].passing,
        B: TEAM_METRICS[team2 as keyof typeof TEAM_METRICS].passing,
      },
      {
        subject: "Physicality",
        A: TEAM_METRICS[team1 as keyof typeof TEAM_METRICS].physicality,
        B: TEAM_METRICS[team2 as keyof typeof TEAM_METRICS].physicality,
      },
      {
        subject: "Speed",
        A: TEAM_METRICS[team1 as keyof typeof TEAM_METRICS].speed,
        B: TEAM_METRICS[team2 as keyof typeof TEAM_METRICS].speed,
      },
    ]
    setData(metrics)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Team Comparison</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={team1} onValueChange={setTeam1}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select team 1" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TEAM_METRICS).map((team) => (
                    <SelectItem key={team} value={team} disabled={team === team2}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={team2} onValueChange={setTeam2}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select team 2" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TEAM_METRICS).map((team) => (
                    <SelectItem key={team} value={team} disabled={team === team1}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="w-full h-[400px] flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            <div className="w-full h-[400px]">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name={team1} dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                    <Radar name={team2} dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

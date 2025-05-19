"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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

// Mock data for performance metrics
const PERFORMANCE_DATA = {
  Arsenal: [
    { name: "Goals Scored", value: 67 },
    { name: "Goals Conceded", value: 28 },
    { name: "Shots", value: 520 },
    { name: "Shots on Target", value: 210 },
    { name: "Possession", value: 58 },
    { name: "Passes", value: 18500 },
    { name: "Pass Accuracy", value: 86 },
    { name: "Tackles", value: 420 },
    { name: "Interceptions", value: 310 },
  ],
  Liverpool: [
    { name: "Goals Scored", value: 72 },
    { name: "Goals Conceded", value: 32 },
    { name: "Shots", value: 540 },
    { name: "Shots on Target", value: 230 },
    { name: "Possession", value: 62 },
    { name: "Passes", value: 19200 },
    { name: "Pass Accuracy", value: 88 },
    { name: "Tackles", value: 380 },
    { name: "Interceptions", value: 290 },
  ],
  "Man City": [
    { name: "Goals Scored", value: 78 },
    { name: "Goals Conceded", value: 25 },
    { name: "Shots", value: 560 },
    { name: "Shots on Target", value: 250 },
    { name: "Possession", value: 65 },
    { name: "Passes", value: 20500 },
    { name: "Pass Accuracy", value: 91 },
    { name: "Tackles", value: 360 },
    { name: "Interceptions", value: 270 },
  ],
  "Man United": [
    { name: "Goals Scored", value: 56 },
    { name: "Goals Conceded", value: 37 },
    { name: "Shots", value: 480 },
    { name: "Shots on Target", value: 190 },
    { name: "Possession", value: 54 },
    { name: "Passes", value: 17200 },
    { name: "Pass Accuracy", value: 83 },
    { name: "Tackles", value: 440 },
    { name: "Interceptions", value: 330 },
  ],
  Tottenham: [
    { name: "Goals Scored", value: 62 },
    { name: "Goals Conceded", value: 42 },
    { name: "Shots", value: 510 },
    { name: "Shots on Target", value: 200 },
    { name: "Possession", value: 56 },
    { name: "Passes", value: 18000 },
    { name: "Pass Accuracy", value: 84 },
    { name: "Tackles", value: 410 },
    { name: "Interceptions", value: 300 },
  ],
}

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe", "#eff6ff", "#f8fafc", "#1e40af"]

export default function PerformanceAnalysis() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState("Arsenal")
  const [data, setData] = useState<(typeof PERFORMANCE_DATA)["Arsenal"]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setData(PERFORMANCE_DATA[selectedTeam as keyof typeof PERFORMANCE_DATA])
    }, 1000)
    return () => clearTimeout(timer)
  }, [selectedTeam])

  const handleTeamChange = (value: string) => {
    setSelectedTeam(value)
    setData(PERFORMANCE_DATA[value as keyof typeof PERFORMANCE_DATA])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Team Performance Analysis</CardTitle>
            <Select value={selectedTeam} onValueChange={handleTeamChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(PERFORMANCE_DATA).map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent
                                content={
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-bold">{label}</span>
                                    <span className="text-xs">Value: {payload[0].value}</span>
                                  </div>
                                }
                              />
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

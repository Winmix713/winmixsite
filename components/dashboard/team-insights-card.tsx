"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
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

// Mock data for team insights
const TEAM_STATS = {
  goals: [
    { team: "Man City", value: 78 },
    { team: "Liverpool", value: 72 },
    { team: "Arsenal", value: 67 },
    { team: "Tottenham", value: 62 },
    { team: "Newcastle", value: 58 },
    { team: "Man United", value: 56 },
    { team: "Chelsea", value: 52 },
    { team: "Brighton", value: 51 },
  ],
  defense: [
    { team: "Man City", value: 25 },
    { team: "Newcastle", value: 27 },
    { team: "Arsenal", value: 28 },
    { team: "Liverpool", value: 32 },
    { team: "Brighton", value: 35 },
    { team: "Man United", value: 37 },
    { team: "Brentford", value: 39 },
    { team: "Chelsea", value: 40 },
  ],
  form: [
    { team: "Arsenal", value: 13 },
    { team: "Man City", value: 12 },
    { team: "Liverpool", value: 11 },
    { team: "Aston Villa", value: 10 },
    { team: "Newcastle", value: 9 },
    { team: "Brighton", value: 8 },
    { team: "Tottenham", value: 7 },
    { team: "Man United", value: 7 },
  ],
}

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe", "#eff6ff", "#f8fafc"]

export default function TeamInsightsCard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("goals")
  const [data, setData] = useState<typeof TEAM_STATS.goals>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setData(TEAM_STATS[activeTab as keyof typeof TEAM_STATS])
    }, 1000)
    return () => clearTimeout(timer)
  }, [activeTab])

  useEffect(() => {
    if (!isLoading) {
      setData(TEAM_STATS[activeTab as keyof typeof TEAM_STATS])
    }
  }, [activeTab, isLoading])

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "goals":
        return "Goals Scored"
      case "defense":
        return "Goals Conceded"
      case "form":
        return "Points Last 5 Games"
      default:
        return tab
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Team Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="goals" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="defense">Defense</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {isLoading ? (
              <div className="w-full h-[300px] flex items-center justify-center">
                <Skeleton className="w-full h-full" />
              </div>
            ) : (
              <div className="w-full h-[300px]">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 70, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="team" tick={{ fontSize: 12 }} width={60} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltip>
                                <ChartTooltipContent
                                  content={
                                    <div className="flex flex-col gap-0.5">
                                      <span className="text-sm font-bold">{payload[0].payload.team}</span>
                                      <span className="text-xs">
                                        {getTabLabel(activeTab)}: {payload[0].value}
                                      </span>
                                    </div>
                                  }
                                />
                              </ChartTooltip>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            )}

            <div className="text-center pt-2">
              <Link href="/teams" className="text-sm text-primary hover:underline">
                View all team statistics
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

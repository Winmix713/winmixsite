"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecentMatchesCard from "./recent-matches-card"
import UpcomingMatchesCard from "./upcoming-matches-card"
import TeamInsightsCard from "./team-insights-card"
import PredictionPerformanceChart from "./prediction-performance-chart"
import { SectionContainer } from "@/components/ui/section-container"
import { StatsGrid } from "@/components/ui/stats-grid"
import { StatsTrend } from "@/components/ui/stats-trend"
import { ChartProgress } from "@/components/ui/chart-progress"
import { Activity, TrendingUp, Trophy, Users } from "lucide-react"

// Mock data for the dashboard
const dashboardStats = [
  {
    title: "Total Matches",
    value: "380",
    change: "+12%",
    trend: "up",
    icon: <Activity className="h-4 w-4" />,
  },
  {
    title: "Active Teams",
    value: "16",
    change: "0%",
    trend: "neutral",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Prediction Accuracy",
    value: "68.5%",
    change: "+2.3%",
    trend: "up",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "League Leaders",
    value: "Man City",
    change: "No change",
    trend: "neutral",
    icon: <Trophy className="h-4 w-4" />,
  },
]

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <StatsGrid stats={dashboardStats} isLoading={isLoading} />

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SectionContainer>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Season Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartProgress value={65} label="Season Completion" description="Matchweek 25 of 38 completed" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StatsTrend title="Goals per Match" value="2.8" change="+0.3" trend="up" />
                  <StatsTrend title="Home Wins" value="48%" change="+2%" trend="up" />
                  <StatsTrend title="Away Wins" value="32%" change="+5%" trend="up" />
                  <StatsTrend title="Draws" value="20%" change="-7%" trend="down" />
                </CardContent>
              </Card>
            </div>
          </SectionContainer>

          <SectionContainer>
            <div className="grid gap-4 md:grid-cols-2">
              <RecentMatchesCard />
              <UpcomingMatchesCard />
            </div>
          </SectionContainer>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <SectionContainer>
            <div className="grid gap-4 md:grid-cols-2">
              <RecentMatchesCard extended={true} />
              <UpcomingMatchesCard extended={true} />
            </div>
          </SectionContainer>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <SectionContainer>
            <TeamInsightsCard />
          </SectionContainer>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <SectionContainer>
            <PredictionPerformanceChart />
          </SectionContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}

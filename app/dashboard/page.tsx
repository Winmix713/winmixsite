import { Suspense } from "react"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { PageHeader } from "@/components/ui/page-header"
import { SectionContainer } from "@/components/ui/section-container"
import { RecentMatchesCard } from "@/components/dashboard/recent-matches-card"
import { UpcomingMatchesCard } from "@/components/dashboard/upcoming-matches-card"
import { TeamInsightsCard } from "@/components/dashboard/team-insights-card"
import { PredictionPerformanceChart } from "@/components/dashboard/prediction-performance-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Virtual Premier League Dashboard"
        description="Overview of your league performance, upcoming matches, and team insights"
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Suspense fallback={<div>Loading overview...</div>}>
            <DashboardOverview />
          </Suspense>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div>Loading recent matches...</div>}>
              <RecentMatchesCard />
            </Suspense>
            <Suspense fallback={<div>Loading upcoming matches...</div>}>
              <UpcomingMatchesCard />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Suspense fallback={<div>Loading team insights...</div>}>
            <SectionContainer title="Team Performance Insights">
              <TeamInsightsCard />
            </SectionContainer>
          </Suspense>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Suspense fallback={<div>Loading prediction performance...</div>}>
            <SectionContainer title="Prediction Performance">
              <PredictionPerformanceChart />
            </SectionContainer>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

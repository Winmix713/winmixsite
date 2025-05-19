import type { Metadata } from "next"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatisticsOverview from "@/components/statistics/statistics-overview"
import StatisticsCharts from "@/components/statistics/statistics-charts"
import UserPerformance from "@/components/statistics/user-performance"
import StatisticsLeaderboard from "@/components/statistics/statistics-leaderboard"

export const metadata: Metadata = {
  title: "Virtual Premier League - Statistics",
  description: "Statistics for the Virtual Premier League",
}

export default function StatisticsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Statistics"
        description="Comprehensive statistics for the Virtual Premier League"
        actions={[
          {
            label: "Export Data",
            href: "#",
            variant: "outline",
          },
          {
            label: "View Leaderboard",
            href: "#leaderboard",
            variant: "default",
          },
        ]}
      />

      <SectionContainer>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="leaderboard" id="leaderboard">
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <StatisticsOverview />
          </TabsContent>

          <TabsContent value="charts">
            <StatisticsCharts />
          </TabsContent>

          <TabsContent value="performance">
            <UserPerformance />
          </TabsContent>

          <TabsContent value="leaderboard">
            <StatisticsLeaderboard />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </PageContainer>
  )
}

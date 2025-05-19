import type { Metadata } from "next"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PerformanceAnalysis from "@/components/analysis/performance-analysis"
import TeamComparison from "@/components/analysis/team-comparison"
import PredictionAccuracy from "@/components/analysis/prediction-accuracy"
import TrendAnalysis from "@/components/analysis/trend-analysis"

export const metadata: Metadata = {
  title: "Virtual Premier League - Analysis",
  description: "Advanced analysis for the Virtual Premier League",
}

export default function AnalysisPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Analysis"
        description="Advanced analytics and insights for the Virtual Premier League"
        actions={[
          {
            label: "Export Report",
            href: "#",
            variant: "outline",
          },
          {
            label: "Create New Analysis",
            href: "#",
            variant: "default",
          },
        ]}
      />

      <SectionContainer>
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
            <TabsTrigger value="prediction">Prediction Accuracy</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <PerformanceAnalysis />
          </TabsContent>

          <TabsContent value="comparison">
            <TeamComparison />
          </TabsContent>

          <TabsContent value="prediction">
            <PredictionAccuracy />
          </TabsContent>

          <TabsContent value="trends">
            <TrendAnalysis />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </PageContainer>
  )
}

import type { Metadata } from "next"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { SectionContainer } from "@/components/ui/section-container"
import LeagueManagementContent from "@/components/league-management/league-management-content"

export const metadata: Metadata = {
  title: "Virtual Premier League - League Management",
  description: "Manage leagues in the Virtual Premier League",
}

export default function LeagueManagementPage() {
  return (
    <PageContainer>
      <PageHeader
        title="League Management"
        description="Manage and analyze leagues in the Virtual Premier League"
        actions={[
          {
            label: "League Statistics",
            href: "/statistics",
            variant: "outline",
          },
          {
            label: "Create New League",
            href: "#create-league",
            variant: "default",
          },
        ]}
      />

      <SectionContainer>
        <LeagueManagementContent />
      </SectionContainer>
    </PageContainer>
  )
}

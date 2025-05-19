import type { Metadata } from "next"
import PageHeader from "@/components/ui/page-header"
import PatternsList from "@/components/patterns/patterns-list"
import PatternCreator from "@/components/patterns/pattern-creator"

export const metadata: Metadata = {
  title: "Patterns | Virtual Premier League Analytics",
  description: "Discover and create tactical patterns in the Virtual Premier League",
}

export default function PatternsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Tactical Patterns"
        description="Discover and create tactical patterns in the Virtual Premier League"
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <PatternsList />
        </div>
        <div>
          <PatternCreator />
        </div>
      </div>
    </div>
  )
}

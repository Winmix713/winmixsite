import type { Metadata } from "next"
import MatchesPage from "./matches-page"

export const metadata: Metadata = {
  title: "Virtual Premier League - Matches",
  description: "Matches in the Virtual Premier League",
}

export default function Page() {
  return <MatchesPage />
}

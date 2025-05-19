"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils/date-utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

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

// Mock data for recent matches
const RECENT_MATCHES = [
  {
    id: "m1",
    homeTeam: "Liverpool",
    awayTeam: "Man City",
    homeScore: 2,
    awayScore: 2,
    date: "2023-04-01T15:00:00Z",
    status: "completed",
    competition: "Premier League",
  },
  {
    id: "m2",
    homeTeam: "Arsenal",
    awayTeam: "Tottenham",
    homeScore: 3,
    awayScore: 1,
    date: "2023-03-28T17:30:00Z",
    status: "completed",
    competition: "Premier League",
  },
  {
    id: "m3",
    homeTeam: "Chelsea",
    awayTeam: "Newcastle",
    homeScore: 1,
    awayScore: 1,
    date: "2023-03-26T14:00:00Z",
    status: "completed",
    competition: "Premier League",
  },
  {
    id: "m4",
    homeTeam: "Man United",
    awayTeam: "Brighton",
    homeScore: 2,
    awayScore: 0,
    date: "2023-03-25T15:00:00Z",
    status: "completed",
    competition: "Premier League",
  },
  {
    id: "m5",
    homeTeam: "Aston Villa",
    awayTeam: "Fulham",
    homeScore: 3,
    awayScore: 0,
    date: "2023-03-24T20:00:00Z",
    status: "completed",
    competition: "Premier League",
  },
]

interface RecentMatchesCardProps {
  extended?: boolean
}

export default function RecentMatchesCard({ extended = false }: RecentMatchesCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<typeof RECENT_MATCHES>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMatches(RECENT_MATCHES)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const displayMatches = extended ? matches : matches.slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading
            ? Array(extended ? 5 : 3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))
            : displayMatches.map((match) => (
                <Link
                  href={`/matches?id=${match.id}`}
                  key={match.id}
                  className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium">{match.homeTeam}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">{match.homeScore}</span>
                      <span>-</span>
                      <span className="font-bold">{match.awayScore}</span>
                    </div>
                    <span className="font-medium">{match.awayTeam}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline">{match.competition}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(new Date(match.date), "MMM d")}</span>
                  </div>
                </Link>
              ))}

          {!extended && !isLoading && (
            <div className="text-center pt-2">
              <Link href="/matches" className="text-sm text-primary hover:underline">
                View all matches
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

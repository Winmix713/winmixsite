"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils/date-utils"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Calendar } from "lucide-react"

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

// Mock data for upcoming matches
const UPCOMING_MATCHES = [
  {
    id: "um1",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    date: "2023-04-10T19:45:00Z",
    competition: "Premier League",
    venue: "Etihad Stadium",
  },
  {
    id: "um2",
    homeTeam: "Tottenham",
    awayTeam: "Newcastle",
    date: "2023-04-09T16:30:00Z",
    competition: "Premier League",
    venue: "Tottenham Hotspur Stadium",
  },
  {
    id: "um3",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    date: "2023-04-08T12:30:00Z",
    competition: "Premier League",
    venue: "Anfield",
  },
  {
    id: "um4",
    homeTeam: "Brighton",
    awayTeam: "Aston Villa",
    date: "2023-04-07T20:00:00Z",
    competition: "Premier League",
    venue: "Amex Stadium",
  },
  {
    id: "um5",
    homeTeam: "West Ham",
    awayTeam: "Fulham",
    date: "2023-04-06T19:45:00Z",
    competition: "Premier League",
    venue: "London Stadium",
  },
]

interface UpcomingMatchesCardProps {
  extended?: boolean
}

export default function UpcomingMatchesCard({ extended = false }: UpcomingMatchesCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useState<typeof UPCOMING_MATCHES>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMatches(UPCOMING_MATCHES)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const displayMatches = extended ? matches : matches.slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Matches</CardTitle>
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
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{match.homeTeam}</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium">{match.awayTeam}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(new Date(match.date), "MMM d, HH:mm")}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline">{match.competition}</Badge>
                    <span className="text-xs text-muted-foreground">{match.venue}</span>
                  </div>
                </Link>
              ))}

          {!extended && !isLoading && (
            <div className="text-center pt-2">
              <Link href="/matches" className="text-sm text-primary hover:underline">
                View all upcoming matches
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

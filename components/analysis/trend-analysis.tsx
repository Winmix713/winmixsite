"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowUpRight, Download, Filter, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react"

// Sample data for goal trends
const goalTrendData = [
  { gameweek: 1, homeGoals: 22, awayGoals: 15, totalGoals: 37 },
  { gameweek: 2, homeGoals: 25, awayGoals: 18, totalGoals: 43 },
  { gameweek: 3, homeGoals: 20, awayGoals: 16, totalGoals: 36 },
  { gameweek: 4, homeGoals: 28, awayGoals: 19, totalGoals: 47 },
  { gameweek: 5, homeGoals: 24, awayGoals: 21, totalGoals: 45 },
  { gameweek: 6, homeGoals: 26, awayGoals: 17, totalGoals: 43 },
  { gameweek: 7, homeGoals: 23, awayGoals: 20, totalGoals: 43 },
  { gameweek: 8, homeGoals: 27, awayGoals: 22, totalGoals: 49 },
  { gameweek: 9, homeGoals: 25, awayGoals: 18, totalGoals: 43 },
  { gameweek: 10, homeGoals: 29, awayGoals: 23, totalGoals: 52 },
  { gameweek: 11, homeGoals: 24, awayGoals: 19, totalGoals: 43 },
  { gameweek: 12, homeGoals: 26, awayGoals: 21, totalGoals: 47 },
  { gameweek: 13, homeGoals: 28, awayGoals: 20, totalGoals: 48 },
  { gameweek: 14, homeGoals: 25, awayGoals: 22, totalGoals: 47 },
  { gameweek: 15, homeGoals: 27, awayGoals: 19, totalGoals: 46 },
  { gameweek: 16, homeGoals: 30, awayGoals: 24, totalGoals: 54 },
  { gameweek: 17, homeGoals: 26, awayGoals: 20, totalGoals: 46 },
  { gameweek: 18, homeGoals: 28, awayGoals: 23, totalGoals: 51 },
  { gameweek: 19, homeGoals: 29, awayGoals: 21, totalGoals: 50 },
  { gameweek: 20, homeGoals: 27, awayGoals: 22, totalGoals: 49 },
]

// Sample data for team form trends
const teamFormData = [
  { team: "Manchester City", form: [3, 3, 3, 3, 1] }, // 3=win, 1=draw, 0=loss
  { team: "Liverpool", form: [3, 3, 3, 0, 3] },
  { team: "Arsenal", form: [3, 3, 1, 3, 3] },
  { team: "Manchester United", form: [3, 0, 3, 1, 3] },
  { team: "Tottenham", form: [3, 1, 0, 3, 3] },
  { team: "Chelsea", form: [1, 3, 3, 0, 3] },
  { team: "Newcastle", form: [3, 3, 0, 3, 1] },
  { team: "Aston Villa", form: [3, 0, 3, 3, 0] },
  { team: "Brighton", form: [1, 3, 0, 3, 1] },
  { team: "Brentford", form: [0, 3, 1, 3, 0] },
  { team: "Fulham", form: [1, 0, 3, 0, 3] },
  { team: "Crystal Palace", form: [0, 1, 3, 0, 3] },
  { team: "Bournemouth", form: [0, 3, 0, 1, 3] },
  { team: "Everton", form: [0, 0, 3, 1, 0] },
  { team: "Nottingham Forest", form: [1, 0, 0, 0, 3] },
  { team: "West Ham", form: [0, 1, 0, 3, 0] },
]

// Sample data for goal distribution
const goalDistributionData = [
  { name: "1-0", value: 52 },
  { name: "2-0", value: 38 },
  { name: "2-1", value: 45 },
  { name: "1-1", value: 40 },
  { name: "3-0", value: 22 },
  { name: "3-1", value: 28 },
  { name: "2-2", value: 18 },
  { name: "3-2", value: 15 },
  { name: "0-0", value: 12 },
  { name: "Other", value: 30 },
]

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
]

// Calculate team form points
const calculateFormPoints = (form) => {
  return form.reduce((sum, result) => sum + result, 0)
}

// Sort teams by form
const sortedTeamForm = [...teamFormData].sort((a, b) => calculateFormPoints(b.form) - calculateFormPoints(a.form))

export default function TrendAnalysis() {
  const [timeRange, setTimeRange] = useState("season")
  const [dataType, setDataType] = useState("all")

  // Calculate average goals per game
  const averageGoals = goalTrendData.reduce((sum, item) => sum + item.totalGoals, 0) / goalTrendData.length

  // Calculate home vs away goal percentage
  const totalHomeGoals = goalTrendData.reduce((sum, item) => sum + item.homeGoals, 0)
  const totalAwayGoals = goalTrendData.reduce((sum, item) => sum + item.awayGoals, 0)
  const homeGoalPercentage = ((totalHomeGoals / (totalHomeGoals + totalAwayGoals)) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Trend Analysis</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Goals Per Game</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageGoals.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">+0.4 from previous season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Home Goal Percentage</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{homeGoalPercentage}%</div>
            <p className="text-xs text-muted-foreground">Home teams score more goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common Score</CardTitle>
            <Minus className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1-0</div>
            <p className="text-xs text-muted-foreground">52 matches ended 1-0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-Form Team</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manchester City</div>
            <p className="text-xs text-muted-foreground">13 points from last 5 games</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goal-trends" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="goal-trends">Goal Trends</TabsTrigger>
            <TabsTrigger value="team-form">Team Form</TabsTrigger>
            <TabsTrigger value="result-patterns">Result Patterns</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last5">Last 5 Gameweeks</SelectItem>
                <SelectItem value="last10">Last 10 Gameweeks</SelectItem>
                <SelectItem value="season">Full Season</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Data</SelectItem>
                <SelectItem value="home">Home Only</SelectItem>
                <SelectItem value="away">Away Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="goal-trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goal Trends by Gameweek</CardTitle>
              <CardDescription>How goal scoring has evolved throughout the season</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={goalTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="gameweek" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="homeGoals"
                    name="Home Goals"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="awayGoals"
                    name="Away Goals"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Goal Trend Insights</CardTitle>
                <CardDescription>Key observations from goal scoring patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Increasing Goal Trend</p>
                      <p className="text-sm text-muted-foreground">
                        Average goals per game has increased by 12% in the second half of the season
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Home Advantage</p>
                      <p className="text-sm text-muted-foreground">
                        Home teams score 58% of all goals, showing a clear home advantage
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-amber-500/20 p-1">
                      <Minus className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Weekend vs. Weekday</p>
                      <p className="text-sm text-muted-foreground">
                        No significant difference in goal patterns between weekend and weekday matches
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Distribution</CardTitle>
                <CardDescription>Most common match scorelines</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={goalDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {goalDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team-form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Form Rankings</CardTitle>
              <CardDescription>Teams ranked by their form over the last 5 matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedTeamForm.map((team, index) => {
                  const formPoints = calculateFormPoints(team.form)
                  const formPercentage = (formPoints / 15) * 100 // 15 is max possible (5 wins)

                  return (
                    <div key={team.team} className="flex items-center">
                      <div className="w-8 text-sm font-medium">{index + 1}</div>
                      <div className="w-40 text-sm font-medium">{team.team}</div>
                      <div className="flex flex-1 items-center gap-1">
                        {team.form.map((result, i) => (
                          <div
                            key={i}
                            className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium text-white
                              ${result === 3 ? "bg-emerald-500" : result === 1 ? "bg-amber-500" : "bg-red-500"}`}
                          >
                            {result === 3 ? "W" : result === 1 ? "D" : "L"}
                          </div>
                        ))}
                      </div>
                      <div className="ml-4 w-12 text-sm font-medium">{formPoints}pts</div>
                      <div className="ml-4 w-full max-w-[100px]">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${formPercentage}%` }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Form Trend Insights</CardTitle>
                <CardDescription>Key observations from team form patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Top Teams Consistency</p>
                      <p className="text-sm text-muted-foreground">
                        The top 3 teams have maintained consistent form throughout the season
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-red-500/20 p-1">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Bottom Teams Struggle</p>
                      <p className="text-sm text-muted-foreground">
                        The bottom 3 teams have shown poor form for over 10 consecutive gameweeks
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-amber-500/20 p-1">
                      <Minus className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Mid-table Volatility</p>
                      <p className="text-sm text-muted-foreground">
                        Teams ranked 7-14 show the most volatile form patterns
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Factors</CardTitle>
                <CardDescription>Key factors influencing team form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Fixture Difficulty</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Teams with easier fixture runs tend to show better form. Manchester City's recent form coincides
                      with a favorable run of fixtures.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Injury Situations</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Teams with fewer injuries to key players maintain better form. Liverpool's recent dip coincided
                      with injuries to 2 key defenders.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Schedule Congestion</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Teams with less fixture congestion tend to maintain better form. Teams involved in European
                      competitions show more form volatility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="result-patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Result Pattern Analysis</CardTitle>
              <CardDescription>Patterns and trends in match results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold">Home vs Away Win Percentage</h3>
                  <div className="h-4 w-full rounded-full bg-gray-200">
                    <div className="h-4 rounded-l-full bg-blue-500" style={{ width: "58%" }} />
                    <div className="h-4 rounded-r-full bg-orange-500" style={{ width: "24%" }} />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Home Wins: 58%</span>
                    <span>Draws: 18%</span>
                    <span>Away Wins: 24%</span>
                  </div>

                  <h3 className="mt-6 font-semibold">First Goal Impact</h3>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm">Teams scoring first win 72% of matches, draw 20%, and lose only 8%</p>
                  </div>

                  <h3 className="mt-4 font-semibold">Comeback Victories</h3>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm">
                      Only 8% of matches result in comeback victories (team conceding first but winning)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Half-time/Full-time Patterns</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium">Leading at HT, Win at FT</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium">Leading at HT, Draw at FT</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium">Leading at HT, Lose at FT</span>
                      <span className="text-sm font-medium">6%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium">Drawing at HT, Win at FT</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium">Drawing at HT, Draw at FT</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-2">
                      <span className="text-sm font-medium">Losing at HT, Win at FT</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Timing of Goals</CardTitle>
                <CardDescription>When goals are scored during matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-24 text-sm">1-15 min</div>
                    <div className="flex-1">
                      <div className="h-4 w-[12%] rounded-full bg-blue-500" />
                    </div>
                    <div className="ml-2 w-10 text-sm">12%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-sm">16-30 min</div>
                    <div className="flex-1">
                      <div className="h-4 w-[15%] rounded-full bg-blue-500" />
                    </div>
                    <div className="ml-2 w-10 text-sm">15%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-sm">31-45 min</div>
                    <div className="flex-1">
                      <div className="h-4 w-[18%] rounded-full bg-blue-500" />
                    </div>
                    <div className="ml-2 w-10 text-sm">18%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-sm">46-60 min</div>
                    <div className="flex-1">
                      <div className="h-4 w-[16%] rounded-full bg-blue-500" />
                    </div>
                    <div className="ml-2 w-10 text-sm">16%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-sm">61-75 min</div>
                    <div className="flex-1">
                      <div className="h-4 w-[17%] rounded-full bg-blue-500" />
                    </div>
                    <div className="ml-2 w-10 text-sm">17%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-sm">76-90 min</div>
                    <div className="flex-1">
                      <div className="h-4 w-[22%] rounded-full bg-blue-500" />
                    </div>
                    <div className="ml-2 w-10 text-sm">22%</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  More goals are scored in the final 15 minutes than any other period, likely due to fatigue and teams
                  chasing games.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Result Pattern Insights</CardTitle>
                <CardDescription>Key insights from result patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">First Goal Importance</p>
                      <p className="text-sm text-muted-foreground">
                        Teams scoring first have a 72% win rate, highlighting the importance of starting strong
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Late Goal Impact</p>
                      <p className="text-sm text-muted-foreground">
                        22% of all goals are scored in the final 15 minutes, often changing match outcomes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-amber-500/20 p-1">
                      <Minus className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Home Advantage</p>
                      <p className="text-sm text-muted-foreground">
                        Home teams win 58% of matches, showing a significant home advantage
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-red-500/20 p-1">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Comeback Rarity</p>
                      <p className="text-sm text-muted-foreground">
                        Only 8% of matches result in comeback victories, making them statistically rare
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

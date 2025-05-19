"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { ArrowUpRight, Calendar, Download, Filter, RefreshCw } from "lucide-react"

// Sample data for prediction accuracy
const predictionData = [
  { name: "Arsenal", actual: 78, predicted: 75, accuracy: 96 },
  { name: "Aston Villa", actual: 68, predicted: 62, accuracy: 91 },
  { name: "Bournemouth", actual: 45, predicted: 42, accuracy: 93 },
  { name: "Brentford", actual: 52, predicted: 55, accuracy: 94 },
  { name: "Brighton", actual: 62, predicted: 58, accuracy: 94 },
  { name: "Chelsea", actual: 65, predicted: 70, accuracy: 93 },
  { name: "Crystal Palace", actual: 48, predicted: 45, accuracy: 94 },
  { name: "Everton", actual: 40, predicted: 38, accuracy: 95 },
  { name: "Fulham", actual: 52, predicted: 48, accuracy: 92 },
  { name: "Liverpool", actual: 82, predicted: 80, accuracy: 98 },
  { name: "Manchester City", actual: 89, predicted: 88, accuracy: 99 },
  { name: "Manchester United", actual: 72, predicted: 75, accuracy: 96 },
  { name: "Newcastle", actual: 71, predicted: 68, accuracy: 96 },
  { name: "Nottingham Forest", actual: 38, predicted: 35, accuracy: 92 },
  { name: "Tottenham", actual: 68, predicted: 65, accuracy: 96 },
  { name: "West Ham", actual: 52, predicted: 50, accuracy: 96 },
]

// Sample data for accuracy over time
const accuracyTrendData = [
  { month: "Jan", accuracy: 88 },
  { month: "Feb", accuracy: 90 },
  { month: "Mar", accuracy: 92 },
  { month: "Apr", accuracy: 91 },
  { month: "May", accuracy: 94 },
  { month: "Jun", accuracy: 95 },
  { month: "Jul", accuracy: 93 },
  { month: "Aug", accuracy: 94 },
  { month: "Sep", accuracy: 96 },
  { month: "Oct", accuracy: 95 },
  { month: "Nov", accuracy: 97 },
  { month: "Dec", accuracy: 96 },
]

// Sample data for model comparison
const modelComparisonData = [
  { name: "Basic", accuracy: 85, speed: 95, complexity: 20 },
  { name: "Advanced", accuracy: 92, speed: 80, complexity: 60 },
  { name: "Expert", accuracy: 96, speed: 65, complexity: 85 },
  { name: "AI-Enhanced", accuracy: 98, speed: 60, complexity: 95 },
]

export default function PredictionAccuracy() {
  const [timeRange, setTimeRange] = useState("year")
  const [modelType, setModelType] = useState("all")

  // Calculate average accuracy
  const averageAccuracy = predictionData.reduce((sum, item) => sum + item.accuracy, 0) / predictionData.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Prediction Accuracy</h2>
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
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAccuracy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performing Team</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manchester City</div>
            <p className="text-xs text-muted-foreground">99% prediction accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Improved</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Newcastle</div>
            <p className="text-xs text-muted-foreground">+8.2% from previous</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Models</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active prediction models</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="team-accuracy" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="team-accuracy">Team Accuracy</TabsTrigger>
            <TabsTrigger value="accuracy-trend">Accuracy Trend</TabsTrigger>
            <TabsTrigger value="model-comparison">Model Comparison</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select value={modelType} onValueChange={setModelType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="basic">Basic Model</SelectItem>
                <SelectItem value="advanced">Advanced Model</SelectItem>
                <SelectItem value="expert">Expert Model</SelectItem>
                <SelectItem value="ai">AI-Enhanced Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="team-accuracy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Prediction Accuracy</CardTitle>
              <CardDescription>
                Comparison between actual and predicted points for each team in the Virtual Premier League
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={predictionData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="actual" name="Actual Points" fill="#8884d8" />
                  <Bar dataKey="predicted" name="Predicted Points" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Accuracy by Team</CardTitle>
              <CardDescription>Percentage accuracy of predictions for each team</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={predictionData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" name="Accuracy %" fill="#ff7c43" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accuracy-trend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Accuracy Trend</CardTitle>
              <CardDescription>How prediction accuracy has changed over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={accuracyTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy %"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Factors Affecting Accuracy</CardTitle>
                <CardDescription>Key factors that influenced prediction accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Data Quality</p>
                      <p className="text-sm text-muted-foreground">
                        Improved data collection methods resulted in 4.2% accuracy increase
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Model Refinement</p>
                      <p className="text-sm text-muted-foreground">
                        Algorithm improvements contributed to 3.8% accuracy increase
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-emerald-500/20 p-1">
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">Feature Engineering</p>
                      <p className="text-sm text-muted-foreground">
                        New features added to the model improved accuracy by 2.5%
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy Improvement Plan</CardTitle>
                <CardDescription>Upcoming initiatives to further improve prediction accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-blue-500/20 p-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Advanced AI Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Implementing deep learning models (Expected: Q3 2025)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-blue-500/20 p-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Real-time Data Processing</p>
                      <p className="text-sm text-muted-foreground">
                        Implementing streaming data analysis (Expected: Q4 2025)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 rounded-full bg-blue-500/20 p-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">External Data Sources</p>
                      <p className="text-sm text-muted-foreground">
                        Integrating additional data sources (Expected: Q1 2026)
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="model-comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Model Comparison</CardTitle>
              <CardDescription>Performance metrics for different prediction models</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={modelComparisonData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" name="Accuracy %" fill="#8884d8" />
                  <Bar dataKey="speed" name="Processing Speed" fill="#82ca9d" />
                  <Bar dataKey="complexity" name="Model Complexity" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Strengths</CardTitle>
                <CardDescription>Key strengths of each prediction model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Basic Model</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      <li>Fast processing time</li>
                      <li>Low resource requirements</li>
                      <li>Good for quick estimations</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Advanced Model</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      <li>Balanced performance</li>
                      <li>Good accuracy-to-resource ratio</li>
                      <li>Handles most common scenarios well</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Expert Model</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      <li>High accuracy for complex scenarios</li>
                      <li>Advanced feature utilization</li>
                      <li>Good handling of outliers</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">AI-Enhanced Model</h4>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      <li>Highest overall accuracy</li>
                      <li>Self-improving capabilities</li>
                      <li>Best for critical predictions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Selection Guide</CardTitle>
                <CardDescription>When to use each prediction model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Basic Model</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use for quick estimations, preliminary analysis, and when resource conservation is important.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Advanced Model</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use for regular match predictions, team performance analysis, and standard league simulations.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">Expert Model</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use for detailed season projections, complex scenario analysis, and when higher accuracy is
                      needed.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-semibold">AI-Enhanced Model</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Use for critical predictions, championship forecasting, and when maximum accuracy is required
                      regardless of processing time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

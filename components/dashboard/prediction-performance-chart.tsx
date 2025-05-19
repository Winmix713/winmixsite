"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for prediction performance
const PREDICTION_DATA = [
  { matchday: 1, accuracy: 45, baseline: 40 },
  { matchday: 2, accuracy: 50, baseline: 42 },
  { matchday: 3, accuracy: 48, baseline: 41 },
  { matchday: 4, accuracy: 55, baseline: 43 },
  { matchday: 5, accuracy: 60, baseline: 44 },
  { matchday: 6, accuracy: 58, baseline: 45 },
  { matchday: 7, accuracy: 62, baseline: 46 },
  { matchday: 8, accuracy: 65, baseline: 47 },
  { matchday: 9, accuracy: 63, baseline: 48 },
  { matchday: 10, accuracy: 68, baseline: 49 },
  { matchday: 11, accuracy: 70, baseline: 50 },
  { matchday: 12, accuracy: 67, baseline: 51 },
  { matchday: 13, accuracy: 72, baseline: 52 },
  { matchday: 14, accuracy: 75, baseline: 53 },
  { matchday: 15, accuracy: 73, baseline: 54 },
  { matchday: 16, accuracy: 76, baseline: 55 },
  { matchday: 17, accuracy: 78, baseline: 56 },
  { matchday: 18, accuracy: 75, baseline: 57 },
  { matchday: 19, accuracy: 80, baseline: 58 },
  { matchday: 20, accuracy: 78, baseline: 59 },
]

export default function PredictionPerformanceChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<typeof PREDICTION_DATA>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setData(PREDICTION_DATA)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate current accuracy and improvement
  const currentAccuracy = data.length > 0 ? data[data.length - 1].accuracy : 0
  const startAccuracy = data.length > 0 ? data[0].accuracy : 0
  const improvement = currentAccuracy - startAccuracy

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle>Prediction Performance</CardTitle>
            <CardDescription>Model accuracy over time</CardDescription>
          </div>
          {!isLoading && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                Current: {currentAccuracy}%
              </Badge>
              <Badge
                variant={improvement > 0 ? "success" : improvement < 0 ? "destructive" : "outline"}
                className="text-sm"
              >
                {improvement > 0 ? "+" : ""}
                {improvement}%
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="matchday" label={{ value: "Matchday", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={[30, 100]} label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltip>
                            <ChartTooltipContent
                              content={
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-sm font-bold">Matchday {label}</span>
                                  <span className="text-xs flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                                    Model: {payload[0].value}%
                                  </span>
                                  <span className="text-xs flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                                    Baseline: {payload[1].value}%
                                  </span>
                                </div>
                              }
                            />
                          </ChartTooltip>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Model Accuracy"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    name="Baseline"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

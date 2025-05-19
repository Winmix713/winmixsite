"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Condition {
  id: string
  field: string
  operator: string
  value: string
}

export default function PatternCreator() {
  const [patternName, setPatternName] = useState("")
  const [description, setDescription] = useState("")
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "c1", field: "homeTeam", operator: "is", value: "" },
  ])

  const addCondition = () => {
    const newCondition = {
      id: `c${conditions.length + 1}`,
      field: "homeTeam",
      operator: "is",
      value: "",
    }
    setConditions([...conditions, newCondition])
  }

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((condition) => condition.id !== id))
    }
  }

  const updateCondition = (id: string, field: string, value: string) => {
    setConditions(conditions.map((condition) => (condition.id === id ? { ...condition, [field]: value } : condition)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!patternName.trim()) {
      toast({
        title: "Error",
        description: "Pattern name is required",
        variant: "destructive",
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Pattern description is required",
        variant: "destructive",
      })
      return
    }

    const invalidCondition = conditions.find((condition) => !condition.value.trim())
    if (invalidCondition) {
      toast({
        title: "Error",
        description: "All condition values must be filled",
        variant: "destructive",
      })
      return
    }

    // Submit form (mock)
    toast({
      title: "Pattern Created",
      description: `Pattern "${patternName}" has been created successfully.`,
    })

    // Reset form
    setPatternName("")
    setDescription("")
    setConditions([{ id: "c1", field: "homeTeam", operator: "is", value: "" }])
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Pattern</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="patternName" className="text-sm font-medium">
              Pattern Name
            </label>
            <Input
              id="patternName"
              placeholder="Enter pattern name"
              value={patternName}
              onChange={(e) => setPatternName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your pattern"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Conditions</label>
              <Button type="button" variant="outline" size="sm" onClick={addCondition}>
                <Plus className="h-4 w-4 mr-1" /> Add Condition
              </Button>
            </div>

            <div className="space-y-3">
              {conditions.map((condition) => (
                <div key={condition.id} className="flex gap-2 items-center">
                  <Select
                    value={condition.field}
                    onValueChange={(value) => updateCondition(condition.id, "field", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homeTeam">Home Team</SelectItem>
                      <SelectItem value="awayTeam">Away Team</SelectItem>
                      <SelectItem value="league">League</SelectItem>
                      <SelectItem value="timeOfDay">Time of Day</SelectItem>
                      <SelectItem value="dayOfWeek">Day of Week</SelectItem>
                      <SelectItem value="venue">Venue</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={condition.operator}
                    onValueChange={(value) => updateCondition(condition.id, "operator", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">is</SelectItem>
                      <SelectItem value="isNot">is not</SelectItem>
                      <SelectItem value="contains">contains</SelectItem>
                      <SelectItem value="doesNotContain">does not contain</SelectItem>
                      <SelectItem value="greaterThan">greater than</SelectItem>
                      <SelectItem value="lessThan">less than</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Value"
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCondition(condition.id)}
                    disabled={conditions.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Pattern</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

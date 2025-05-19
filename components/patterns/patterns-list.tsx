"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowUpDown, BookOpen, Code, Zap } from "lucide-react"

// Sample pattern data
const patternData = [
  {
    id: "p1",
    name: "High Press Counter",
    description: "High pressing followed by quick counter-attack when possession is regained",
    category: "Attacking",
    teams: ["Liverpool", "Manchester City", "Arsenal"],
    effectiveness: 85,
    complexity: "Medium",
    created: "2025-03-15",
    lastUsed: "2025-05-01",
  },
  {
    id: "p2",
    name: "Low Block Transition",
    description: "Defensive low block with quick transitions to attack through wide areas",
    category: "Defensive",
    teams: ["Tottenham", "Newcastle", "Crystal Palace"],
    effectiveness: 78,
    complexity: "Low",
    created: "2025-02-10",
    lastUsed: "2025-04-28",
  },
  {
    id: "p3",
    name: "Possession Build-up",
    description: "Patient possession-based build-up play through the central areas",
    category: "Possession",
    teams: ["Manchester City", "Arsenal", "Brighton"],
    effectiveness: 82,
    complexity: "High",
    created: "2025-01-20",
    lastUsed: "2025-05-05",
  },
  {
    id: "p4",
    name: "Wing Overload",
    description: "Overloading one wing to create numerical advantage and crossing opportunities",
    category: "Attacking",
    teams: ["Manchester United", "Chelsea", "Aston Villa"],
    effectiveness: 75,
    complexity: "Medium",
    created: "2025-03-05",
    lastUsed: "2025-04-22",
  },
  {
    id: "p5",
    name: "Gegenpressing",
    description: "Immediate counter-pressing after losing possession to regain the ball quickly",
    category: "Pressing",
    teams: ["Liverpool", "Brentford", "Brighton"],
    effectiveness: 88,
    complexity: "High",
    created: "2025-02-18",
    lastUsed: "2025-05-03",
  },
  {
    id: "p6",
    name: "False Nine System",
    description: "Using a false nine to drop deep and create space for attacking midfielders",
    category: "Attacking",
    teams: ["Manchester City", "Arsenal", "Brighton"],
    effectiveness: 80,
    complexity: "High",
    created: "2025-01-15",
    lastUsed: "2025-04-30",
  },
]

export default function PatternsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Filter patterns based on search term
  const filteredPatterns = patternData.filter(pattern => 
    pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.teams.some(team => team.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleViewPattern = (pattern) => {
    setSelectedPattern(pattern);
    setShowDetails(true);
  };
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tactical Patterns</CardTitle>
          <CardDescription>
            Browse and analyze tactical patterns used by teams in the Virtual Premier League
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patterns..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="attacking">Attacking</TabsTrigger>
              <TabsTrigger value="defensive">Defensive</TabsTrigger>
              <TabsTrigger value="possession">Possession</TabsTrigger>
              <TabsTrigger value="pressing">Pressing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {filteredPatterns.map((pattern) => (
                  <div 
                    key={pattern.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-primary/10 p-1">
                          {pattern.category === "Attacking" ? (
                            <Zap className="h-4 w-4 text-primary" />
                          ) : pattern.category === "Defensive" ? (
                            <BookOpen className="h-4 w-4 text-primary" />
                          ) : pattern.category === "Possession" ? (
                            <Code className="h-4 w-4 text-primary" />
                          ) : (
                            <Zap className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <h3 className="font-medium">{pattern.name}</h3>
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">
                          {pattern

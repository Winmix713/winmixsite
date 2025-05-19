"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function SettingsNotifications() {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: {
      matches: true,
      predictions: true,
      news: false,
      updates: true,
    },
    push: {
      matches: true,
      predictions: true,
      news: true,
      updates: false,
    },
  })

  const handleToggle = (category: "email" | "push", type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type as keyof (typeof prev)[category]],
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Manage the emails you receive from us.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-matches">Match Updates</Label>
                <p className="text-sm text-muted-foreground">Receive emails about upcoming and completed matches.</p>
              </div>
              <Switch
                id="email-matches"
                checked={notifications.email.matches}
                onCheckedChange={() => handleToggle("email", "matches")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-predictions">Prediction Results</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails when your predictions are confirmed or results are in.
                </p>
              </div>
              <Switch
                id="email-predictions"
                checked={notifications.email.predictions}
                onCheckedChange={() => handleToggle("email", "predictions")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-news">News and Articles</Label>
                <p className="text-sm text-muted-foreground">Receive emails about league news and articles.</p>
              </div>
              <Switch
                id="email-news"
                checked={notifications.email.news}
                onCheckedChange={() => handleToggle("email", "news")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-updates">System Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about system updates, maintenance, and new features.
                </p>
              </div>
              <Switch
                id="email-updates"
                checked={notifications.email.updates}
                onCheckedChange={() => handleToggle("email", "updates")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>Manage the push notifications you receive on your devices.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-matches">Match Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about upcoming and completed matches.
                </p>
              </div>
              <Switch
                id="push-matches"
                checked={notifications.push.matches}
                onCheckedChange={() => handleToggle("push", "matches")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-predictions">Prediction Results</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications when your predictions are confirmed or results are in.
                </p>
              </div>
              <Switch
                id="push-predictions"
                checked={notifications.push.predictions}
                onCheckedChange={() => handleToggle("push", "predictions")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-news">News and Articles</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about league news and articles.
                </p>
              </div>
              <Switch
                id="push-news"
                checked={notifications.push.news}
                onCheckedChange={() => handleToggle("push", "news")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-updates">System Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about system updates, maintenance, and new features.
                </p>
              </div>
              <Switch
                id="push-updates"
                checked={notifications.push.updates}
                onCheckedChange={() => handleToggle("push", "updates")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Copy, RefreshCw } from "lucide-react"

export default function SettingsAPI() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState("vpl_api_key_12345678901234567890")
  const [apiEnabled, setApiEnabled] = useState(true)
  const [webhookUrl, setWebhookUrl] = useState("https://example.com/webhook")
  const [webhookEnabled, setWebhookEnabled] = useState(false)

  const handleRegenerateKey = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      const newKey = "vpl_api_key_" + Math.random().toString(36).substring(2, 15)
      setApiKey(newKey)
      toast({
        title: "API Key Regenerated",
        description: "Your API key has been regenerated successfully.",
      })
    }, 1000)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API Key Copied",
      description: "Your API key has been copied to clipboard.",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "API settings updated",
        description: "Your API settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>Manage your API keys and access to the Virtual Premier League API.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="api-enabled">API Access</Label>
                <Switch id="api-enabled" checked={apiEnabled} onCheckedChange={setApiEnabled} />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable or disable API access to your account. When disabled, all API keys will be temporarily
                invalidated.
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input id="api-key" value={apiKey} readOnly className="font-mono" disabled={!apiEnabled} />
                <Button type="button" variant="outline" size="icon" onClick={handleCopyKey} disabled={!apiEnabled}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateKey}
                  disabled={!apiEnabled || isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Key
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-enabled">Webhook Notifications</Label>
                <Switch
                  id="webhook-enabled"
                  checked={webhookEnabled}
                  onCheckedChange={setWebhookEnabled}
                  disabled={!apiEnabled}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Receive webhook notifications for events like match updates, prediction results, and system updates.
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://example.com/webhook"
                disabled={!apiEnabled || !webhookEnabled}
              />
              <p className="text-sm text-muted-foreground">
                The URL where webhook notifications will be sent. Must be a valid HTTPS URL.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading || !apiEnabled}>
              {isLoading ? "Saving..." : "Save API Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}

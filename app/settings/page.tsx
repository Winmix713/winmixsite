import type { Metadata } from "next"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsProfile from "@/components/settings/settings-profile"
import SettingsNotifications from "@/components/settings/settings-notifications"
import SettingsAppearance from "@/components/settings/settings-appearance"
import SettingsAPI from "@/components/settings/settings-api"

export const metadata: Metadata = {
  title: "Virtual Premier League - Settings",
  description: "Settings for the Virtual Premier League application",
}

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader title="Settings" description="Manage your account settings and preferences" />

      <SectionContainer>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <SettingsProfile />
          </TabsContent>

          <TabsContent value="notifications">
            <SettingsNotifications />
          </TabsContent>

          <TabsContent value="appearance">
            <SettingsAppearance />
          </TabsContent>

          <TabsContent value="api">
            <SettingsAPI />
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </PageContainer>
  )
}

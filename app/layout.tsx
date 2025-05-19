import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { AppLayout } from "@/components/layouts/app-layout"

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Load Space Grotesk font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Winmix Tipster - Virtual League",
  description: "Advanced sports analytics and predictions platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}

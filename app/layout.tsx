import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Space_Grotesk, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Space Chronicle - Daily Space History Explorer",
  description:
    "Discover the astronomical events, space missions, and cosmic discoveries that happened on this day throughout history",
  keywords: ["space", "history", "astronomy", "NASA", "space exploration", "cosmic events"],
  authors: [{ name: "Space Chronicle Team" }],
  creator: "Space Chronicle",
  publisher: "Space Chronicle",
  robots: "index, follow",
  openGraph: {
    title: "Space Chronicle - Daily Space History Explorer",
    description: "Explore space history through the lens of daily cosmic events and discoveries",
    type: "website",
    locale: "en_US",
    siteName: "Space Chronicle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Chronicle - Daily Space History Explorer",
    description: "Discover what happened on this day in space history",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#667eea",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

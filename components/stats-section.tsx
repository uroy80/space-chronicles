"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Satellite, Star, Users } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: <Rocket className="w-8 h-8 text-red-400" />,
      value: "5,000+",
      label: "Space Missions",
      description: "Launched since 1957",
    },
    {
      icon: <Satellite className="w-8 h-8 text-blue-400" />,
      value: "8,000+",
      label: "Active Satellites",
      description: "Currently in orbit",
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      value: "4,000+",
      label: "Exoplanets",
      description: "Discovered to date",
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      value: "600+",
      label: "Astronauts",
      description: "Have been to space",
    },
  ]

  return (
    <section className="relative z-10 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Calendar, Clock, Globe } from "lucide-react"

interface HeroSectionProps {
  currentDate: Date
}

export function HeroSection({ currentDate }: HeroSectionProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Space History Today
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the astronomical events, space missions, and cosmic discoveries that happened on this day
            throughout history
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">{formatDate(currentDate)}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Live Updates</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
            <Globe className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">Global Events</span>
          </div>
        </div>

        <div className="relative w-64 h-64 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow opacity-20"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-spin-reverse opacity-30"></div>
          <div className="absolute inset-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
      </div>
    </section>
  )
}

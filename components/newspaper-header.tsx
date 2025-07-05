"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Sun, Wind } from "lucide-react"
import { CharmingLogo } from "./charming-logo"

interface NewspaperHeaderProps {
  currentDate: Date
}

interface SpaceWeatherData {
  solarActivity: {
    level: string
    color: string
  }
  solarWind: {
    speed: number
  }
  geomagneticActivity: {
    kIndex: number
    level: string
    color: string
  }
}

export function NewspaperHeader({ currentDate }: NewspaperHeaderProps) {
  const [spaceWeather, setSpaceWeather] = useState<SpaceWeatherData | null>(null)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getWeatherColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-400"
      case "yellow":
        return "text-yellow-400"
      case "orange":
        return "text-orange-400"
      case "red":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  useEffect(() => {
    const fetchSpaceWeather = async () => {
      try {
        const response = await fetch("/api/space-weather")
        if (response.ok) {
          const data = await response.json()
          setSpaceWeather(data)
        }
      } catch (error) {
        console.error("Failed to fetch space weather:", error)
      }
    }

    fetchSpaceWeather()
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 border-b border-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>

        {/* Responsive floating particles */}
        {[...Array(typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Constellation lines - Hidden on mobile */}
        <svg className="absolute inset-0 w-full h-full opacity-10 hidden md:block" viewBox="0 0 1000 400">
          <motion.path
            d="M100,100 L200,150 L300,120 L400,180 L500,140"
            stroke="url(#constellation-gradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 p-2 md:p-6 lg:p-8">
        {/* Mobile Layout */}
        <div className="text-center mb-6 md:mb-10 md:hidden">
          <motion.div
            className="flex items-center justify-center space-x-4 mb-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <CharmingLogo variant="rocket" size="md" />
            <div className="text-center">
              <motion.h1
                className="text-2xl font-bold font-space text-cosmic tracking-wider mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                SPACE CHRONICLE
              </motion.h1>
              <motion.p
                className="text-xs font-elegant text-stellar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                "Exploring the cosmos through history"
              </motion.p>
            </div>
            <CharmingLogo variant="sparkles" size="md" />
          </motion.div>

          {/* Mobile Observatory & Mission Control */}
          <motion.div
            className="flex items-center justify-center space-x-6 mb-4 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              className="flex items-center space-x-2"
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-4 h-4 text-blue-400 flex items-center justify-center">🔭</div>
              <span className="text-blue-300 font-modern">Observatory</span>
            </motion.div>

            <div className="w-px h-6 bg-gradient-to-b from-transparent via-slate-400 to-transparent"></div>

            <motion.div
              className="flex items-center space-x-2"
              animate={{ x: [3, -3, 3] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-4 h-4 text-purple-400 flex items-center justify-center">🛰️</div>
              <span className="text-purple-300 font-modern">Mission Control</span>
            </motion.div>
          </motion.div>

          {/* Mobile Space Weather */}
          {spaceWeather && (
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-slate-600/30">
                <Sun className="w-3 h-3 text-orange-400" />
                <span className={`font-medium font-modern ${getWeatherColor(spaceWeather.solarActivity.color)}`}>
                  Solar: {spaceWeather.solarActivity.level}
                </span>
              </div>
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-slate-600/30">
                <Wind className="w-3 h-3 text-blue-400" />
                <span className="text-blue-300 font-medium font-modern">Wind: {spaceWeather.solarWind.speed}km/s</span>
              </div>
              <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-slate-600/30">
                <Activity className="w-3 h-3 text-purple-400" />
                <span className={`font-medium font-modern ${getWeatherColor(spaceWeather.geomagneticActivity.color)}`}>
                  Geo: K{spaceWeather.geomagneticActivity.kIndex}
                </span>
              </div>
            </motion.div>
          )}

          {/* Mobile Date Display */}
          <motion.div
            className="flex items-center justify-center space-x-2 text-sm mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse-glow" />
            <span className="text-lg font-bold font-space text-cosmic tracking-wide">{formatDate(currentDate)}</span>
            <motion.div
              className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse-glow"
              style={{ animationDelay: "1s" }}
            />
          </motion.div>

          {/* Mobile Subheader */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 text-xs"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-xl border border-slate-600/30"
              whileHover={{ scale: 1.05 }}
            >
              <CharmingLogo variant="globe" size="sm" />
              <span className="text-slate-200 font-medium font-modern">Est. 1957</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-xl border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <CharmingLogo variant="sparkles" size="sm" />
              <span className="text-purple-200 font-medium font-modern">Daily Edition</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="text-center mb-10 hidden md:block">
          <motion.div
            className="flex items-center justify-center space-x-12 mb-8"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Left decorative logos */}
            <div className="flex items-center space-x-6">
              <CharmingLogo variant="rocket" size="lg" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <CharmingLogo variant="globe" size="md" />
              </motion.div>
            </div>

            {/* Main title */}
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-space text-white tracking-wider mb-4 drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                THE SPACE CHRONICLE
              </motion.h1>

              {/* Decorative underline */}
              <motion.div
                className="relative h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="text-lg font-elegant text-slate-200 mt-4 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                "Exploring the cosmos through the lens of history"
              </motion.p>
            </div>

            {/* Right decorative logos */}
            <div className="flex items-center space-x-6">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <CharmingLogo variant="star" size="md" />
              </motion.div>
              <CharmingLogo variant="sparkles" size="lg" />
            </div>
          </motion.div>

          {/* Enhanced Subheader */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-sm mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div
              className="flex items-center space-x-4 glass-effect px-6 py-3 rounded-2xl border border-slate-600/30 shadow-2xl"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
              transition={{ duration: 0.3 }}
            >
              <CharmingLogo variant="globe" size="sm" />
              <span className="text-slate-200 font-medium font-modern">Est. 1957 • Sputnik Era</span>
            </motion.div>

            <div className="flex items-center space-x-6">
              <motion.div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse-glow" />
              <span className="text-xl md:text-2xl font-bold font-space text-cosmic tracking-wide">
                {formatDate(currentDate)}
              </span>
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse-glow"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <motion.div
              className="flex items-center space-x-3 glass-effect px-6 py-3 rounded-2xl border border-purple-500/30 shadow-2xl"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <CharmingLogo variant="sparkles" size="sm" />
              <span className="text-purple-200 font-medium font-modern">Daily Space History Edition</span>
            </motion.div>
          </motion.div>

          {/* Enhanced decorative elements */}
          <motion.div
            className="flex items-center justify-center space-x-8 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              className="flex items-center space-x-2"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-6 h-6 text-blue-400 flex items-center justify-center">🔭</div>
              <span className="text-sm font-modern text-blue-300">Deep Space Observatory</span>
            </motion.div>

            <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-400 to-transparent"></div>

            <motion.div
              className="flex items-center space-x-2"
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-6 h-6 text-purple-400 flex items-center justify-center">🛰️</div>
              <span className="text-sm font-modern text-purple-300">Mission Control</span>
            </motion.div>
          </motion.div>

          {/* Desktop Space Weather */}
          {spaceWeather && (
            <motion.div
              className="flex items-center justify-center space-x-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.div
                className="flex items-center space-x-3 glass-effect px-4 py-3 rounded-2xl border border-orange-500/30 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(251, 146, 60, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-5 h-5 text-orange-400" />
                <div className="text-left">
                  <span className="text-xs text-orange-300 font-modern block">Solar Activity</span>
                  <span className={`text-sm font-bold font-space ${getWeatherColor(spaceWeather.solarActivity.color)}`}>
                    {spaceWeather.solarActivity.level}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 glass-effect px-4 py-3 rounded-2xl border border-blue-500/30 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <Wind className="w-5 h-5 text-blue-400" />
                <div className="text-left">
                  <span className="text-xs text-blue-300 font-modern block">Solar Wind</span>
                  <span className="text-sm font-bold text-blue-300 font-space">
                    {spaceWeather.solarWind.speed} km/s
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 glass-effect px-4 py-3 rounded-2xl border border-purple-500/30 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <Activity className="w-5 h-5 text-purple-400" />
                <div className="text-left">
                  <span className="text-xs text-purple-300 font-modern block">Geomagnetic</span>
                  <span
                    className={`text-sm font-bold font-space ${getWeatherColor(spaceWeather.geomagneticActivity.color)}`}
                  >
                    {spaceWeather.geomagneticActivity.level} (K{spaceWeather.geomagneticActivity.kIndex})
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 glass-effect px-4 py-3 rounded-2xl border border-green-500/30 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-sm font-medium text-green-300 font-modern">Live Data</span>
              </motion.div>
            </motion.div>
          )}

          {/* Final decorative line */}
          <motion.div
            className="w-32 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
        </div>
      </div>
    </div>
  )
}

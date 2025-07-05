"use client"

import { useState, useEffect } from "react"
import { Wind, Eye, Sun, Activity, RefreshCw, Zap, Satellite } from "lucide-react"
import { motion } from "framer-motion"
import { CharmingLogo } from "./charming-logo"

interface SpaceWeatherData {
  solarActivity: {
    level: string
    description: string
    color: string
  }
  solarWind: {
    speed: number
    density: number
    temperature: number
  }
  geomagneticActivity: {
    kIndex: number
    level: string
    color: string
  }
  visibility: {
    condition: string
    description: string
    color: string
  }
  forecast: string
  lastUpdated: string
}

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<SpaceWeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSpaceWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/space-weather")
      if (response.ok) {
        const data = await response.json()
        setWeatherData(data)
      } else {
        throw new Error("Failed to fetch space weather data")
      }
    } catch (err) {
      setError("Unable to fetch space weather data")
      console.error("Space weather fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpaceWeather()
    const interval = setInterval(fetchSpaceWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "yellow":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "orange":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "red":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
    }
  }

  if (loading) {
    return (
      <motion.div
        className="glass-effect border border-slate-600/40 rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6 border-b border-slate-600/40 pb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <CharmingLogo variant="zap" size="md" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-slate-200 font-space">Space Weather</h3>
              <p className="text-xs text-slate-400 font-modern">Loading conditions...</p>
            </div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="p-3 glass-effect rounded-xl border border-slate-700/50"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
              >
                <div className="h-4 bg-slate-700/50 rounded"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (error || !weatherData) {
    return (
      <motion.div
        className="glass-effect border border-slate-600/40 rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6 border-b border-slate-600/40 pb-4">
            <CharmingLogo variant="zap" size="md" />
            <div>
              <h3 className="text-xl font-bold text-slate-200 font-space">Space Weather</h3>
              <p className="text-xs text-red-400 font-modern">Connection Error</p>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-slate-400 mb-4 font-modern text-sm">{error || "Unable to load space weather"}</p>
            <motion.button
              onClick={fetchSpaceWeather}
              className="text-blue-400 hover:text-blue-300 text-sm underline glass-effect hover:bg-blue-500/20 px-4 py-2 rounded-lg transition-all duration-300 font-modern"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="glass-effect border border-slate-600/40 rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Compact Header */}
      <div className="relative p-6 border-b border-slate-600/40 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.15, rotate: 10 }} transition={{ duration: 0.4 }}>
              <CharmingLogo variant="zap" size="md" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold font-space text-white">Space Weather</h3>
              <p className="text-xs text-slate-300 font-modern">Live cosmic conditions</p>
            </div>
          </div>
          <motion.button
            onClick={fetchSpaceWeather}
            className="text-slate-400 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
            whileHover={{ scale: 1.15, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            title="Refresh space weather"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {/* Solar Activity - Compact */}
          <motion.div
            className="flex items-center justify-between p-3 glass-effect rounded-xl border border-slate-700/50 hover:bg-slate-700/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 4 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Sun className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-slate-100 font-space">Solar Activity</span>
                <p className="text-xs text-slate-400 font-modern">Current solar conditions</p>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border font-modern ${getColorClasses(weatherData.solarActivity.color)}`}
            >
              {weatherData.solarActivity.level}
            </span>
          </motion.div>

          {/* Solar Wind - Compact */}
          <motion.div
            className="flex items-center justify-between p-3 glass-effect rounded-xl border border-slate-700/50 hover:bg-slate-700/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 4 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Wind className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-slate-300 font-space">Solar Wind</span>
                <p className="text-xs text-slate-500 font-modern">Speed: {weatherData.solarWind.speed} km/s</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-blue-400 font-bold bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30 font-modern">
                {weatherData.solarWind.density.toFixed(1)} p/cm³
              </span>
            </div>
          </motion.div>

          {/* Geomagnetic Activity - Compact */}
          <motion.div
            className="flex items-center justify-between p-3 glass-effect rounded-xl border border-slate-700/50 hover:bg-slate-700/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 4 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-slate-300 font-space">Geomagnetic</span>
                <p className="text-xs text-slate-500 font-modern">{weatherData.geomagneticActivity.level} conditions</p>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full border font-modern ${getColorClasses(weatherData.geomagneticActivity.color)}`}
            >
              K{weatherData.geomagneticActivity.kIndex}
            </span>
          </motion.div>

          {/* Visibility - Compact */}
          <motion.div
            className="flex items-center justify-between p-3 glass-effect rounded-xl border border-slate-700/50 hover:bg-slate-700/40 transition-all duration-300"
            whileHover={{ scale: 1.02, x: 4 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Eye className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-slate-300 font-space">Visibility</span>
                <p className="text-xs text-slate-500 font-modern">Observation conditions</p>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full border font-modern ${getColorClasses(weatherData.visibility.color)}`}
            >
              {weatherData.visibility.condition}
            </span>
          </motion.div>
        </div>

        {/* Professional Forecast */}
        <motion.div
          className="mt-4 p-4 glass-effect border border-blue-500/30 rounded-xl"
          whileHover={{ scale: 1.01 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-sm font-semibold text-blue-300 uppercase tracking-wide flex items-center space-x-2 font-space">
              <Satellite className="w-4 h-4" />
              <span>Current Forecast</span>
            </span>
          </div>
          <p className="text-sm text-blue-200 leading-relaxed mb-3 font-modern line-clamp-3">{weatherData.forecast}</p>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-modern">Updated: {new Date(weatherData.lastUpdated).toLocaleTimeString()}</span>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span className="font-modern">Live</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

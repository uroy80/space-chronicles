"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Globe, RefreshCw, TrendingUp, Brain } from "lucide-react"
import { getTodaysInsights } from "@/lib/space-events"
import { Button } from "@/components/ui/button"
import { CharmingLogo } from "./charming-logo"

interface DailyInsightsProps {
  currentDate: Date
}

export function DailyInsights({ currentDate }: DailyInsightsProps) {
  const [insights, setInsights] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [hasGeneratedInsights, setHasGeneratedInsights] = useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const generateInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: currentDate.toISOString(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setInsights(data.insights)
        setHasGeneratedInsights(true)
      } else {
        const staticInsights = getTodaysInsights(currentDate)
        setInsights(staticInsights)
        setHasGeneratedInsights(true)
      }
    } catch (error) {
      console.error("Error generating insights:", error)
      const staticInsights = getTodaysInsights(currentDate)
      setInsights(staticInsights)
      setHasGeneratedInsights(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setHasGeneratedInsights(false)
    setInsights("")

    const timer = setTimeout(() => {
      generateInsights()
    }, 500)

    return () => clearTimeout(timer)
  }, [currentDate])

  useEffect(() => {
    if (!insights && !loading && !hasGeneratedInsights) {
      const staticInsights = getTodaysInsights(currentDate)
      setInsights(staticInsights)
    }
  }, [currentDate, insights, loading, hasGeneratedInsights])

  return (
    <motion.div
      className="relative overflow-hidden glass-effect rounded-2xl md:rounded-3xl mb-6 md:mb-10 shadow-2xl border border-blue-500/20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      key={currentDate.toDateString()}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.3 }}
        />

        {/* Responsive floating elements */}
        {[...Array(window.innerWidth < 768 ? 6 : 12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Cosmic rays effect - Hidden on mobile */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent hidden md:block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent hidden md:block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />
      </div>

      <div className="relative z-10 p-6 md:p-10">
        {/* Mobile Header */}
        <div className="flex flex-col space-y-4 mb-6 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3 }}>
                {loading ? <CharmingLogo variant="zap" size="md" /> : <CharmingLogo variant="sparkles" size="md" />}
              </motion.div>
              <div>
                <h2 className="text-xl font-bold font-space text-cosmic">Today's Insights</h2>
                <p className="text-xs text-blue-300 font-modern">Space History Analysis</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={generateInsights}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-blue-500/40 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 glass-effect hover:bg-blue-500/20 transition-all duration-300 font-modern bg-transparent"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
              </Button>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-blue-300">
            <span className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-blue-500/30">
              <Calendar className="w-3 h-3" />
              <span className="font-medium font-modern">{formatDate(currentDate)}</span>
            </span>
            <span className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-full border border-purple-500/30">
              <Globe className="w-3 h-3" />
              <span className="font-modern">Analysis</span>
            </span>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3 }}>
              {loading ? <CharmingLogo variant="zap" size="lg" /> : <CharmingLogo variant="sparkles" size="lg" />}
            </motion.div>

            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold font-space text-cosmic mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Today's Space Insights
              </motion.h2>
              <motion.div
                className="flex items-center space-x-8 text-sm text-blue-300"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full border border-blue-500/30">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium font-modern">{formatDate(currentDate)}</span>
                </span>
                <span className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full border border-purple-500/30">
                  <Globe className="w-4 h-4" />
                  <span className="font-modern">Historical Analysis</span>
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={generateInsights}
              disabled={loading}
              variant="outline"
              size="sm"
              className="border-blue-500/40 hover:border-blue-400/60 text-blue-300 hover:text-blue-200 glass-effect hover:bg-blue-500/20 transition-all duration-300 font-modern bg-transparent"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Refresh Insights
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Enhanced Content Area */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {loading ? (
            <div className="space-y-4 md:space-y-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-6 md:h-8 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded-xl"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="prose prose-invert prose-lg md:prose-xl max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="text-slate-100 leading-relaxed whitespace-pre-line text-base md:text-xl font-modern font-light tracking-wide">
                {insights}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          className="mt-6 md:mt-10 flex flex-col md:flex-row items-center justify-between text-sm border-t border-blue-500/20 pt-6 md:pt-8 space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center space-x-4 md:space-x-6">
            <span className="flex items-center space-x-2 md:space-x-3 text-blue-300">
              <motion.div
                className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <Clock className="w-4 md:w-5 h-4 md:h-5" />
              <span className="font-medium font-modern text-xs md:text-sm">
                {hasGeneratedInsights ? "AI-Enhanced Analysis" : "Historical Database"}
              </span>
            </span>
          </div>

          <motion.div
            className="flex items-center space-x-2 md:space-x-3 glass-effect px-4 md:px-6 py-2 md:py-3 rounded-full border border-blue-500/30"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-blue-300" />
            <span className="text-blue-200 font-medium font-modern text-xs md:text-sm">
              {hasGeneratedInsights ? "Enhanced Insights" : "Space Chronicle Analysis"}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

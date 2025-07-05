"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Newspaper, ChevronDown, ChevronUp, Clock, MapPin } from "lucide-react"
import type { SpaceEvent } from "@/lib/space-events"
import { CharmingLogo } from "./charming-logo"

interface TodaysHeadlinesProps {
  events: SpaceEvent[]
  onEventSelect: (event: SpaceEvent) => void
}

export function TodaysHeadlines({ events, onEventSelect }: TodaysHeadlinesProps) {
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayedEvents = showAllEvents ? events : events.slice(0, 3)
  const hasMoreEvents = events.length > 3

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Launch":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "Discovery":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "Mission":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "Achievement":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      case "Landing":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      default:
        return "text-slate-400 bg-slate-500/20 border-slate-500/30"
    }
  }

  return (
    <motion.div
      className="glass-effect border border-slate-600/40 rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Professional Header */}
      <div className="relative p-6 border-b border-slate-600/40 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5"></div>
        <motion.div
          className="relative z-10 flex items-center justify-between"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.15, rotate: 10 }} transition={{ duration: 0.4 }}>
              <CharmingLogo variant="star" size="md" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold font-space text-cosmic flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-orange-400" />
                <span>Today's Headlines</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-modern">
                {events.length} breaking space event{events.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {hasMoreEvents && (
            <motion.button
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="text-slate-400 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={showAllEvents ? "Show less" : "Show all headlines"}
            >
              {showAllEvents ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </motion.button>
          )}
        </motion.div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {displayedEvents.map((event, index) => (
            <motion.article
              key={event.id}
              className="cursor-pointer group relative"
              onClick={() => onEventSelect(event)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden p-4 glass-effect hover:bg-slate-700/40 rounded-xl border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
                {/* Breaking News Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Enhanced hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Headline Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg font-space"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.div>

                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-red-400 font-bold bg-red-500/20 px-2 py-1 rounded-full border border-red-500/30 font-modern">
                            BREAKING
                          </span>
                          <span className="text-xs text-slate-400 font-medium font-modern">{event.year}</span>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full border font-modern ${getCategoryColor(event.category)}`}
                        >
                          {event.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {event.agency && (
                      <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30 font-modern">
                        {event.agency}
                      </span>
                    )}
                  </div>

                  {/* Headline Title */}
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors duration-300 line-clamp-2 mb-3 leading-tight font-space">
                    {event.title}
                  </h4>

                  {/* News Summary */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3 font-modern">
                    {event.description}
                  </p>

                  {/* News Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span className="font-modern">Historical</span>
                      </span>
                      {event.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span className="font-modern truncate max-w-20">{event.location}</span>
                        </span>
                      )}
                    </div>

                    <motion.div
                      className={`flex items-center text-xs text-orange-400 font-medium font-modern transition-opacity duration-300 ${
                        hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                      initial={{ x: -15 }}
                      animate={{ x: hoveredIndex === index ? 0 : -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Newspaper className="w-3 h-3 mr-1" />
                      <span>Read Story</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreEvents && (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="text-sm text-slate-400 hover:text-slate-300 glass-effect hover:bg-slate-700/50 px-4 py-2 rounded-full inline-flex items-center space-x-2 border border-slate-600/30 transition-all duration-300 font-modern"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Newspaper className="w-3 h-3" />
              <span>{showAllEvents ? `Show Less Headlines` : `+${events.length - 3} More Headlines`}</span>
              {showAllEvents ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <CharmingLogo variant="star" size="lg" />
            </motion.div>
            <h4 className="text-slate-300 font-medium mb-2 font-space">Breaking News Loading</h4>
            <p className="text-slate-500 text-sm font-modern">Scanning space history archives...</p>
          </motion.div>
        )}

        {/* Live News Indicator */}
        {showAllEvents && events.length > 3 && (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs text-slate-500 glass-effect px-3 py-2 rounded-full inline-flex items-center space-x-2 border border-red-500/30 font-modern">
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <span>Live: Showing all {events.length} headlines</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

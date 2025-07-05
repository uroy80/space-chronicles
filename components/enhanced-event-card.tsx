"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Zap } from "lucide-react"
import type { SpaceEvent } from "@/lib/space-events"
import { CharmingLogo } from "./charming-logo"

interface EnhancedEventCardProps {
  event: SpaceEvent
  onClick: () => void
}

const categoryIcons = {
  Launch: "rocket",
  Discovery: "star",
  Mission: "zap",
  Observatory: "globe",
  Landing: "rocket",
  Flyby: "zap",
  Achievement: "star",
  Docking: "rocket",
  Anniversary: "sparkles",
} as const

const categoryColors = {
  Launch: "from-orange-500 to-red-500",
  Discovery: "from-yellow-500 to-orange-500",
  Mission: "from-blue-500 to-purple-500",
  Observatory: "from-green-500 to-blue-500",
  Landing: "from-purple-500 to-pink-500",
  Flyby: "from-cyan-500 to-blue-500",
  Achievement: "from-pink-500 to-purple-500",
  Docking: "from-indigo-500 to-purple-500",
  Anniversary: "from-gray-500 to-slate-500",
}

export function EnhancedEventCard({ event, onClick }: EnhancedEventCardProps) {
  const logoVariant = categoryIcons[event.category as keyof typeof categoryIcons] || "star"
  const gradientColor = categoryColors[event.category as keyof typeof categoryColors] || "from-purple-500 to-pink-500"

  return (
    <motion.div
      className="cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
    >
      <Card className="h-full glass-effect border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
        {/* Enhanced animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Cosmic rays effect */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        <CardHeader className="pb-3 md:pb-4 relative z-10 p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 15 }} transition={{ duration: 0.4 }}>
                  <CharmingLogo variant={logoVariant} size="md" />
                </motion.div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Badge
                    variant="secondary"
                    className="glass-effect text-slate-300 border-slate-600/50 hover:bg-slate-600/60 transition-colors duration-300 font-modern text-xs"
                  >
                    {event.category}
                  </Badge>
                  {event.agency && (
                    <Badge
                      variant="outline"
                      className="text-xs border-blue-500/40 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-300 font-modern"
                    >
                      {event.agency}
                    </Badge>
                  )}
                </div>
              </div>

              <CardTitle className="text-base md:text-xl text-slate-100 leading-tight line-clamp-2 group-hover:text-white transition-colors duration-300 font-space">
                {event.title}
              </CardTitle>
            </div>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mt-3 md:mt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="flex items-center space-x-1 md:space-x-2 glass-effect px-2 md:px-3 py-1 md:py-2 rounded-full border border-slate-700/50">
              <Clock className="w-3 h-3" />
              <span className="font-medium font-modern">{event.year}</span>
            </span>
            {event.location && (
              <span className="flex items-center space-x-1 md:space-x-2 glass-effect px-2 md:px-3 py-1 md:py-2 rounded-full border border-slate-700/50">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-20 md:max-w-32 font-modern">{event.location}</span>
              </span>
            )}
            {event.crew && event.crew.length > 0 && (
              <span className="flex items-center space-x-1 md:space-x-2 glass-effect px-2 md:px-3 py-1 md:py-2 rounded-full border border-slate-700/50">
                <Users className="w-3 h-3" />
                <span className="font-modern">{event.crew.length} crew</span>
              </span>
            )}
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10 p-4 md:p-6 pt-0">
          <CardDescription className="text-slate-200 line-clamp-3 leading-relaxed mb-3 md:mb-4 group-hover:text-slate-100 transition-colors duration-300 font-modern text-sm">
            {event.description}
          </CardDescription>

          {event.significance && (
            <motion.div
              className="glass-effect border-l-4 border-blue-500/50 pl-3 md:pl-4 py-2 md:py-3 mb-3 md:mb-4 rounded-r-xl"
              whileHover={{ x: 4, backgroundColor: "rgba(59, 130, 246, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs text-blue-300 line-clamp-2 leading-relaxed font-modern">{event.significance}</p>
            </motion.div>
          )}

          <motion.div
            className="flex items-center text-sm text-purple-400 font-medium group-hover:text-purple-300 font-modern"
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-4 h-4 mr-2" />
            <span>Explore Details →</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Rocket, Satellite, Star, Users } from "lucide-react"
import type { SpaceEvent } from "@/lib/space-events"

interface EventCardProps {
  event: SpaceEvent
  onClick: () => void
}

const categoryIcons = {
  Launch: Rocket,
  Discovery: Star,
  Mission: Satellite,
  Observatory: Users,
  Landing: Rocket,
  Flyby: Satellite,
  Achievement: Star,
}

const categoryColors = {
  Launch: "from-orange-500 to-red-500",
  Discovery: "from-yellow-500 to-orange-500",
  Mission: "from-blue-500 to-purple-500",
  Observatory: "from-green-500 to-blue-500",
  Landing: "from-purple-500 to-pink-500",
  Flyby: "from-cyan-500 to-blue-500",
  Achievement: "from-pink-500 to-purple-500",
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const IconComponent = categoryIcons[event.category as keyof typeof categoryIcons] || Star
  const gradientColor = categoryColors[event.category as keyof typeof categoryColors] || "from-purple-500 to-pink-500"

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <motion.div
                  className={`p-2 rounded-lg bg-gradient-to-r ${gradientColor}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-4 h-4 text-white" />
                </motion.div>
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                  {event.category}
                </Badge>
              </div>
              <CardTitle className="text-lg text-white leading-tight line-clamp-2">{event.title}</CardTitle>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {event.year}
            </span>
            {event.location && (
              <span className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {event.location}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-gray-300 line-clamp-3 leading-relaxed">{event.description}</CardDescription>

          <motion.div className="mt-4 text-sm text-purple-400 font-medium" whileHover={{ x: 5 }}>
            {"Learn more →"}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

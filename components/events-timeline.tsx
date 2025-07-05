"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Rocket, Satellite, Star, Users } from "lucide-react"

interface SpaceEvent {
  id: string
  date: string
  year: number
  title: string
  description: string
  category: "launch" | "discovery" | "milestone" | "mission"
  significance: string
  imageUrl?: string
}

interface EventsTimelineProps {
  currentDate: Date
}

export function EventsTimeline({ currentDate }: EventsTimelineProps) {
  const [events, setEvents] = useState<SpaceEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching events for current date
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()

    // Mock data based on current date
    const mockEvents: SpaceEvent[] = [
      {
        id: "1",
        date: `${month}/${day}`,
        year: 1969,
        title: "Apollo 11 Mission Planning",
        description: "Critical mission planning sessions were conducted for the historic moon landing mission.",
        category: "milestone",
        significance: "This planning phase was crucial for the success of humanity's first moon landing.",
        imageUrl: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "2",
        date: `${month}/${day}`,
        year: 1990,
        title: "Hubble Space Telescope Deployment",
        description:
          "The Hubble Space Telescope was deployed from Space Shuttle Discovery, revolutionizing our view of the universe.",
        category: "launch",
        significance: "Hubble has provided unprecedented views of distant galaxies and cosmic phenomena.",
        imageUrl: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        date: `${month}/${day}`,
        year: 2004,
        title: "Mars Rover Discovery",
        description: "Spirit and Opportunity rovers made significant geological discoveries on Mars surface.",
        category: "discovery",
        significance: "These discoveries provided evidence of past water activity on Mars.",
        imageUrl: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "4",
        date: `${month}/${day}`,
        year: 2012,
        title: "SpaceX Dragon Mission",
        description: "First commercial spacecraft to dock with the International Space Station.",
        category: "mission",
        significance: "Marked the beginning of commercial space transportation era.",
        imageUrl: "/placeholder.svg?height=200&width=300",
      },
    ]

    setEvents(mockEvents)
    setLoading(false)
  }, [currentDate.getMonth(), currentDate.getDate()]) // Only depend on month and day, not the entire date object

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "launch":
        return <Rocket className="w-5 h-5" />
      case "discovery":
        return <Star className="w-5 h-5" />
      case "milestone":
        return <Users className="w-5 h-5" />
      case "mission":
        return <Satellite className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "launch":
        return "bg-red-500"
      case "discovery":
        return "bg-yellow-500"
      case "milestone":
        return "bg-green-500"
      case "mission":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-20 bg-white/20 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Space Events on {currentDate.toLocaleDateString()}</h2>
        <p className="text-gray-300">Discover the cosmic milestones that happened on this day in history</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start space-x-6 pb-8">
            {/* Timeline dot */}
            <div
              className={`flex-shrink-0 w-16 h-16 ${getCategoryColor(event.category)} rounded-full flex items-center justify-center text-white shadow-lg`}
            >
              {getCategoryIcon(event.category)}
            </div>

            {/* Event card */}
            <Card className="flex-1 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {event.year}
                  </Badge>
                  <Badge className={`${getCategoryColor(event.category)} text-white`}>
                    {event.category.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {event.imageUrl && (
                  <img
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <p className="text-gray-300 mb-4">{event.description}</p>
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-300 font-semibold mb-2">Historical Significance</h4>
                  <p className="text-gray-300 text-sm">{event.significance}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

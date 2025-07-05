export interface SpaceEvent {
  id: string
  title: string
  description: string
  year: number
  month: number
  day: number
  category:
    | "Launch"
    | "Discovery"
    | "Mission"
    | "Observatory"
    | "Landing"
    | "Flyby"
    | "Achievement"
    | "Docking"
    | "Anniversary"
  location?: string
  significance?: string
  agency?: string
  mission?: string
  crew?: string[]
  details?: string
  impact?: string
}

// Minimal seed data - most content will be AI-generated
const spaceEvents: SpaceEvent[] = [
  {
    id: "july-5-2025",
    title: "Russian Progress 92 Cargo Ship Docks with ISS",
    description:
      "The Russian Progress 92 cargo spacecraft successfully docks with the International Space Station, delivering essential supplies including food, fuel, scientific equipment, and crew provisions.",
    year: 2025,
    month: 7,
    day: 5,
    category: "Docking",
    location: "International Space Station",
    agency: "Roscosmos",
    mission: "Progress 92 Resupply Mission",
    significance: "Continues the vital supply chain to the ISS, ensuring crew sustainability and mission continuity.",
    details:
      "Progress spacecraft are unmanned cargo vehicles that have been reliably servicing space stations since 1978. This mission carries approximately 2.5 tons of supplies.",
    impact:
      "Maintains continuous operation of the ISS laboratory and supports ongoing scientific research in microgravity.",
  },
]

export function getEventsForDate(date: Date): SpaceEvent[] {
  const month = date.getMonth() + 1
  const day = date.getDate()

  return spaceEvents.filter((event) => event.month === month && event.day === day).sort((a, b) => a.year - b.year)
}

export function getTodaysInsights(date: Date): string {
  const events = getEventsForDate(date)
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const day = date.getDate()

  if (events.length === 0) {
    return `On ${month} ${day}th in space history, while no major recorded events are in our immediate database for this specific date, space exploration continues daily with ongoing missions, research, and discoveries. The International Space Station orbits Earth every 90 minutes, conducting vital scientific research, while robotic missions throughout the solar system continue their exploration of distant worlds.

Our AI system will search historical archives to discover what significant space events occurred on this date throughout history.`
  }

  let insights = `On ${month} ${day}th in space history, `

  // Highlight the most recent/significant event
  const featuredEvent = events[events.length - 1] // Most recent
  insights += `${featuredEvent.description} `

  if (featuredEvent.agency) {
    insights += `This mission by ${featuredEvent.agency} `
  }

  if (featuredEvent.significance) {
    insights += `represents ${featuredEvent.significance.toLowerCase()} `
  }

  insights += `\n\nKey events on ${month} ${day}th in space history:\n`

  events.forEach((event) => {
    insights += `• ${event.year}: ${event.title}\n`
  })

  insights += `\nOur AI system will search for additional historical events that occurred on this date.`

  return insights
}

export function getDetailedEventAnalysis(event: SpaceEvent): string {
  let analysis = `**${event.title} (${event.year})**\n\n`

  analysis += `${event.description}\n\n`

  if (event.agency) {
    analysis += `**Agency:** ${event.agency}\n`
  }

  if (event.mission) {
    analysis += `**Mission:** ${event.mission}\n`
  }

  if (event.crew && event.crew.length > 0) {
    analysis += `**Crew:** ${event.crew.join(", ")}\n`
  }

  if (event.location) {
    analysis += `**Location:** ${event.location}\n`
  }

  analysis += `\n**Historical Significance:**\n${event.significance}\n\n`

  if (event.details) {
    analysis += `**Technical Details:**\n${event.details}\n\n`
  }

  if (event.impact) {
    analysis += `**Long-term Impact:**\n${event.impact}\n\n`
  }

  return analysis
}

export function getAllEvents(): SpaceEvent[] {
  return spaceEvents.sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month
    if (a.day !== b.day) return a.day - b.day
    return a.year - b.year
  })
}

export function searchEvents(query: string): SpaceEvent[] {
  const lowercaseQuery = query.toLowerCase()
  return spaceEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.category.toLowerCase().includes(lowercaseQuery) ||
      event.agency?.toLowerCase().includes(lowercaseQuery) ||
      event.mission?.toLowerCase().includes(lowercaseQuery),
  )
}
